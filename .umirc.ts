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
  metas: [
    { name: 'viewport', content: 'width=device-width, initial-scale=1, maximum-scale=1' }
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
