---
layout: default
title: 翻译作品
---

<div class="poster-grid">
  {% for work in site.works %}
    <div class="poster-item">
      <a href="{{ work.url }}">
        <img src="{{ work.poster }}" alt="{{ work.title }}">
      </a>
      <h3>{{ work.title }}</h3>
      <p class="poster-info">{{ work.year }}</p>
    </div>
  {% endfor %}
</div>