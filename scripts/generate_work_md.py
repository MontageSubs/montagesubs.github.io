#!/usr/bin/env python3
"""
Generate a work markdown file from TMDB movie ID.
Usage: python scripts/generate_work_md.py <tmdb_id> [--output <filename>]
"""

import argparse
import json
import sys
from pathlib import Path
from typing import Optional
from datetime import datetime

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
        """
        Fetch movie data from TMDB API.
        
        Args:
            tmdb_id: The TMDB movie ID
            
        Returns:
            Dictionary containing movie data
        """
        url = f"{self.base_url}/movie/{tmdb_id}"
        params = {
            'api_key': self.api_key,
            'language': 'zh-CN'
        }
        
        response = requests.get(url, params=params)
        response.raise_for_status()
        return response.json()
    
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
        """
        Format release date. Returns empty string if invalid.
        
        Args:
            date_str: Date string in format YYYY-MM-DD
            
        Returns:
            Formatted date or empty string
        """
        if not date_str:
            return ''
        try:
            datetime.strptime(date_str, '%Y-%m-%d')
            return date_str
        except ValueError:
            return ''
    
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
        """
        Generate markdown content from TMDB data.
        
        Args:
            tmdb_id: TMDB movie ID
            title: Chinese title (will fetch from TMDB if not provided)
            original_title: Original title (will fetch from TMDB if not provided)
            director: Director name (optional, can be filled manually)
            summary: Movie summary (will fetch from TMDB if not provided)
            film_release_date: Film release date (will fetch from TMDB if not provided)
            github_repo: GitHub repository name (optional)
            output_filename: Output filename (defaults to auto-generated from title and year)
            
        Returns:
            Tuple of (markdown_content, output_filename)
        """
        # Fetch data from TMDB
        movie_data = self.get_movie_data(tmdb_id)
        
        # Use provided values or fallback to TMDB data
        if not original_title:
            original_title = movie_data.get('title', '')
        if not title:
            # Try to get Chinese title from TMDB
            title = movie_data.get('title', '')
        if not summary:
            summary = movie_data.get('overview', '')
        if not film_release_date:
            film_release_date = self.format_release_date(movie_data.get('release_date', ''))
        
        # Extract year from release date
        year = film_release_date.split('-')[0] if film_release_date else datetime.now().year
        
        # Format cast
        cast = self.format_cast(movie_data.get('credits', {}).get('cast', []))
        
        # Generate output filename if not provided
        if not output_filename:
            safe_title = original_title.replace(' ', '_').replace('/', '_')
            output_filename = f"{safe_title}_{year}.md"
        
        # Get poster URL
        poster_path = movie_data.get('poster_path', '')
        poster_url = f"https://image.tmdb.org/t/p/w1280{poster_path}" if poster_path else ''
        
        # Get IMDB ID (requires additional request to external_ids endpoint)
        imdb_id = ''
        try:
            external_url = f"{self.base_url}/movie/{tmdb_id}/external_ids"
            external_params = {'api_key': self.api_key}
            external_response = requests.get(external_url, params=external_params)
            external_data = external_response.json()
            imdb_id = external_data.get('imdb_id', '')
        except Exception:
            pass
        
        # Build IMDB link
        imdb_link = f"https://www.imdb.com/title/{imdb_id}/" if imdb_id else ''
        
        # Build Douban link (placeholder - you'll need to fill this manually)
        douban_link = ''
        
        # Build TMDB link
        tmdb_link = f"https://www.themoviedb.org/movie/{tmdb_id}-{original_title.lower().replace(' ', '-')}?language=zh-CN"
        
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
summary: {summary}
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
  - label: OpenSubtitles
    url: 
github_repo: {github_repo}
giscus:
  repo: {github_repo}
  repo_id: 
  category_id: 
---
""".format(github_repo=github_repo or '')
        
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
