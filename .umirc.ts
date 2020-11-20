import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  title: '旅游攻略',
  antd: {},
  dva: {
    immer: true,
  },
  analytics: {
    baidu: '8fb256f92cc56f3ee50dbcb35e748b21',
  },
  externals: {
    AMap: 'window.AMap',
    AMapUI: 'window.AMapUI',
  },
  metas: [
    {
      name: 'viewport',
      content: 'width=device-width, initial-scale=1, maximum-scale=1',
    },
    {
      name: 'keywords',
      content:
        '旅游, 攻略, 旅游攻略, 时空路由, 时空, 路由, travel, guide, travel guide, timeroute, route, time',
    },
    {
      name: 'description',
      content:
        '做了一个简单的旅游攻略制作网站，还在尝试中，从数据结构、逻辑功能到UI设计，都没有一个明确的目标。这是一个艰巨的任务，都要慢慢摸索。',
    },
  ],
  scripts: [
    'https://webapi.amap.com/maps?v=1.4.15&key=bca26f48f82f1946c58e76f241173019',
    'https://webapi.amap.com/ui/1.1/main.js?v=1.1.1',
  ],
  links: [
    {
      rel: 'stylesheet',
      href: 'https://api.mapbox.com/mapbox-gl-js/v1.11.1/mapbox-gl.css',
    },
  ],
  routes: [
    {
      path: '/',
      exact: false,
      component: '@/layouts/BaseLayout',
      routes: [
        {
          path: '/',
          exact: false,
          component: '@/layouts/PubLayout',
          routes: [
            { path: '/', exact: true, component: '@/pages/index' },
            { path: '/login', exact: true, component: '@/pages/login' },
            { path: '/register', exact: true, component: '@/pages/register' },
            { path: '/make', exact: true, component: '@/pages/make' },
            {
              path: '/',
              exact: false,
              component: '@/layouts/PrivateLayout',
              routes: [
                {
                  path: '/dashboard',
                  exact: true,
                  component: '@/pages/dashboard',
                },
                { path: '/guide', exact: true, component: '@/pages/guides' },
                {
                  path: '/guide/:id',
                  exact: true,
                  component: '@/pages/guide/[id]',
                },
                { path: '/poi', exact: true, component: '@/pages/poi' },
              ],
            },
          ],
        },
      ],
    },
  ],
  theme: {
    'primary-color': '#4caf50',
    'font-size-base': '14px',
    'border-width-base': '2px',
    'layout-header-height': '48px',
    'layout-footer-height': '36px',
  },
});
