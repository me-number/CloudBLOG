---
layout: none
---
importScripts('https://storage.googleapis.com/workbox-cdn/releases/6.4.1/workbox-sw.js');

const { registerRoute } = workbox.routing;
const { CacheFirst, NetworkFirst, StaleWhileRevalidate } = workbox.strategies;

workbox.core.setCacheNameDetails({
  prefix: 'svrooij.io',
  suffix: '{{ site.time | date: "%Y-%m" }}'
});

// 首页与分页统一使用 NetworkFirst 策略，确保内容更新
registerRoute(
  ({url}) => url.pathname === '/' || url.pathname.match(/\/page[0-9]/),
  new NetworkFirst()
);

// 文章页面使用 StaleWhileRevalidate：先展示缓存，后台静默更新
registerRoute(
  new RegExp('/\\d{4}/\\d{2}/\\d{2}/.+'),
  new StaleWhileRevalidate()
);

// 静态资源预缓存
workbox.precaching.precacheAndRoute([
  {% for post in site.posts limit:12 -%}
  { url: '{{ post.url }}', revision: '{{ post.date | date: "%Y-%m-%d"}}' },
  {% endfor -%}
  { url: '/', revision: '{{ site.time | date: "%Y%m%d%H" }}' },
  { url: '/assets/css/index.css', revision: '{{ site.time | date: "%Y%m%d%H" }}' }
]);

// 媒体与静态资源统一使用 CacheFirst
registerRoute(
  ({request, url}) => request.destination === 'image' || url.pathname.includes('/assets/'),
  new CacheFirst({
    plugins: [
      { cacheableResponse: { statuses: [0, 200] } }
    ],
  })
);
