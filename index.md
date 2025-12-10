---
layout: default
title: 翻译作品
---

<div class="poster-grid">
  {% assign works = site.works | sort: 'film_release_date' | reverse %}
  {% for work in works %}
    <a class="poster-item" href="{{ work.url | relative_url }}">
        <img src="{{ work.poster }}" alt="{{ work.title }}">
      <h3>{{ work.title }}</h3>
      <p class="poster-info">{{ work.year }}</p>
    </a>
  {% endfor %}
</div>
