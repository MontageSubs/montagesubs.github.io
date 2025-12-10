#!/usr/bin/env python3
"""
Generate a work markdown file from TMDB movie ID (requires TMDB_API_KEY).
Usage: python scripts/generate_work_md.py <tmdb_id> [--output <filename>]
"""

import argparse
import sys
from pathlib import Path
from typing import Optional
from datetime import datetime
import re

try:
    import requests
except ImportError:
    print("Error: requests library is required. Install it with: pip install requests")
    sys.exit(1)


class TMDBMovieGenerator:
    """Generate markdown file from TMDB movie data."""
    
    def __init__(self, api_key: Optional[str] = None):
        """
        Initialize the generator.
        
        Args:
            api_key: TMDB API key. If not provided, will be read from TMDB_API_KEY env var.
        """
        import os
        self.api_key = api_key or os.environ.get('TMDB_API_KEY')
        if not self.api_key:
            raise ValueError(
                "TMDB API key not provided. Set TMDB_API_KEY environment variable "
                "or pass api_key parameter."
            )
        self.base_url = "https://api.themoviedb.org/3"
    
    def get_movie_data(self, tmdb_id: int) -> dict:
        """Fetch movie data (with credits + external_ids) from TMDB API."""
        url = f"{self.base_url}/movie/{tmdb_id}"
        params = {
            'api_key': self.api_key,
            'language': 'zh-CN',
            'append_to_response': 'credits,external_ids,translations'
        }
        response = requests.get(url, params=params, timeout=15)
        response.raise_for_status()
        return response.json()

    def get_translation_title(self, movie_data: dict, preferred: list[tuple[str, str]]) -> str:
        """
        Return the first non-empty title from translations matching preferred locales.

        Args:
            movie_data: Movie payload containing translations
            preferred: Ordered list of (iso_639_1, iso_3166_1) tuples to check
        """
        translations = movie_data.get('translations', {}).get('translations', [])
        for iso_639_1, iso_3166_1 in preferred:
            for translation in translations:
                if (
                    translation.get('iso_639_1') == iso_639_1
                    and translation.get('iso_3166_1') == iso_3166_1
                ):
                    title = translation.get('data', {}).get('title') or ''
                    if title:
                        return title
        return ''
    
    def format_cast(self, cast_list: list) -> list:
        """
        Format cast list.
        
        Args:
            cast_list: List of cast dictionaries from TMDB
            
        Returns:
            Formatted list of actor names
        """
        return [actor.get('name', '') for actor in cast_list[:5]]  # Limit to 5
    
    def format_release_date(self, date_str: str) -> str:
        """Return YYYY-MM-DD if valid, else empty string."""
        if not date_str:
            return ''
        try:
            datetime.strptime(date_str, '%Y-%m-%d')
            return date_str
        except ValueError:
            return ''

    def slugify(self, text: str) -> str:
        """Slugify text for filename (ASCII fallback)."""
        text = re.sub(r'\s+', '_', text.strip())
        text = re.sub(r'[^\w_-]+', '', text)
        return text or 'movie'
    
    def generate_markdown(
        self,
        tmdb_id: int,
        title: str = '',
        original_title: str = '',
        director: str = '',
        summary: str = '',
        film_release_date: str = '',
        github_repo: str = '',
        output_filename: Optional[str] = None
    ) -> tuple[str, str]:
        """Generate markdown content from TMDB data."""
        # Fetch data from TMDB
        movie_data = self.get_movie_data(tmdb_id)
        
        english_title = original_title
        if not english_title:
            english_title = self.get_translation_title(
                movie_data,
                preferred=[('en', 'US'), ('en', 'GB')]
            )
        if not english_title:
            english_title = movie_data.get('original_title', '') or movie_data.get('title', '')

        chinese_title = title
        if not chinese_title:
            chinese_title = self.get_translation_title(
                movie_data,
                preferred=[('zh', 'CN'), ('zh', 'SG')]
            )
        if not chinese_title:
            chinese_title = english_title
        
        title = chinese_title
        original_title = english_title
        
        # Use provided values or fallback to TMDB data
        if not summary:
            summary = movie_data.get('overview', '')
        if not film_release_date:
            film_release_date = self.format_release_date(movie_data.get('release_date', ''))
        
        # Extract year from release date
        year = film_release_date.split('-')[0] if film_release_date else datetime.now().year
        
        # Format cast
        cast = self.format_cast(movie_data.get('credits', {}).get('cast', []))

        # Director from crew if not provided
        if not director:
            crew = movie_data.get('credits', {}).get('crew', [])
            directors = [c.get('name') for c in crew if c.get('job') == 'Director']
            if directors:
                director = '、'.join(directors)
        
        # Generate output filename if not provided
        if not output_filename:
            safe_title = self.slugify(original_title or title)
            output_filename = f"{safe_title}_{year}.md"
        
        # Get poster URL
        poster_path = movie_data.get('poster_path', '')
        poster_url = f"https://image.tmdb.org/t/p/w1280{poster_path}" if poster_path else ''
        
        # IMDb ID from external_ids
        imdb_id = movie_data.get('external_ids', {}).get('imdb_id', '')
        
        # Build IMDB link
        imdb_link = f"https://www.imdb.com/title/{imdb_id}/" if imdb_id else ''
        
        # Build Douban link (placeholder - you'll need to fill this manually)
        douban_link = ''

        # Build TMDB link
        tmdb_link = f"https://www.themoviedb.org/movie/{tmdb_id}?language=zh-CN"

        def yaml_escape(text: str) -> str:
            if not text:
                return ''
            # block literal for multi-line or colon-containing text
            if '\n' in text or ':' in text:
                return "|\n  " + text.replace('\n', '\n  ')
            return text
        yaml_summary = yaml_escape(summary)

        # Build markdown frontmatter
        frontmatter = f"""---
layout: work
title: {title}
original_title: {original_title}
year: {year}
poster: {poster_url}
douban_link: {douban_link}
imdb_link: {imdb_link}
tmdb_link: {tmdb_link}
summary: {yaml_summary}
film_release_date: {film_release_date}
subtitle_release_date:
director: {director}
cast:"""
        
        # Add cast
        for actor in cast:
            frontmatter += f"\n  - {actor}"
        
        # Add empty sections for subtitles, downloads, etc.
        frontmatter += """
subtitles:
  - label: 翻译
    names: 
  - label: 校对
    names: 
  - label: 后期
    names: 
downloads:
  - label: SubHD
    url: 
  - label: 字幕库
    url: 
github_repo: {github_repo}
giscus:
  repo: {github_repo}
  repo_id: 
  category_id: 
---
""".format(
            github_repo=github_repo or ''
        )
        
        return frontmatter, output_filename
    
    def save_markdown(self, content: str, output_path: Path) -> None:
        """
        Save markdown content to file.
        
        Args:
            content: Markdown content
            output_path: Path to save the file
        """
        output_path.parent.mkdir(parents=True, exist_ok=True)
        output_path.write_text(content, encoding='utf-8')
        print(f"✓ Markdown file generated: {output_path}")


def main():
    """Main entry point."""
    parser = argparse.ArgumentParser(
        description='Generate work markdown file from TMDB movie ID'
    )
    parser.add_argument('tmdb_id', type=int, help='TMDB movie ID')
    parser.add_argument('--title', default='', help='Chinese title (optional, fetched from TMDB if not provided)')
    parser.add_argument('--original-title', default='', help='Original title (optional, fetched from TMDB if not provided)')
    parser.add_argument('--director', default='', help='Director name (optional, can be filled manually)')
    parser.add_argument('--summary', default='', help='Movie summary (optional, fetched from TMDB if not provided)')
    parser.add_argument('--release-date', default='', help='Film release date in YYYY-MM-DD format')
    parser.add_argument('--github-repo', default='', help='GitHub repository name (e.g., MontageSubs/Movie_Title_Year)')
    parser.add_argument('--output', default='', help='Output filename (defaults to auto-generated)')
    parser.add_argument('--api-key', default='', help='TMDB API key (or set TMDB_API_KEY env var)')
    parser.add_argument('--output-dir', default='_works', help='Output directory (default: _works)')
    
    args = parser.parse_args()
    
    try:
        generator = TMDBMovieGenerator(api_key=args.api_key)
        
        content, filename = generator.generate_markdown(
            tmdb_id=args.tmdb_id,
            title=args.title,
            original_title=args.original_title,
            director=args.director,
            summary=args.summary,
            film_release_date=args.release_date,
            github_repo=args.github_repo,
            output_filename=args.output
        )
        
        output_path = Path(args.output_dir) / filename
        generator.save_markdown(content, output_path)
        
    except ValueError as e:
        print(f"Error: {e}", file=sys.stderr)
        sys.exit(1)
    except Exception as e:
        print(f"Error: {e}", file=sys.stderr)
        sys.exit(1)


if __name__ == '__main__':
    main()
