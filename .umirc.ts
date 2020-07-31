import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  title: "旅游攻略",
  antd: {},
  dva: {
    immer: true,
  },
  externals: {
    'mapbox-gl': 'mapboxgl',
  },
  metas: [
    { name: 'viewport', content: 'width=device-width, initial-scale=1, maximum-scale=1' },
    {
      name: 'keywords',
      content: '旅游, 攻略, 旅游攻略, 时空路由, 时空, 路由, travel, guide, travel guide, timeroute, route, time',
    },
    {
      name: 'description',
      content: '做了一个简单的旅游攻略制作网站，还在尝试中，从数据结构、逻辑功能到UI设计，都没有一个明确的目标。这是一个艰巨的任务，都要慢慢摸索。',
    },
  ],
  scripts: ['https://api.mapbox.com/mapbox-gl-js/v1.11.1/mapbox-gl.js'],
  links: [
    {
      rel: 'stylesheet',
      href: 'https://api.mapbox.com/mapbox-gl-js/v1.11.1/mapbox-gl.css',
    },
  ],
  routes: [
    {
      path: '/', component: '@/layouts/BaseLayout', routes: [
        { path: '/', component: '@/pages/index' },
        { path: '/guide', component: '@/pages/guide' },
        { path: '/poi', component: '@/pages/poi' },
      ]
    },
  ],
  theme: {
    "primary-color": "#4caf50",
    "font-size-base": "16px",
    "height-base": "36px",
    "height-lg": "44px",
    "height-sm": "28px",
    "border-width-base": "2px",
    "layout-header-height": "48px",
  }
});
