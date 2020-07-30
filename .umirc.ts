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
  routes: [
    {
      path: '/', component: '@/layouts/BaseLayout', routes: [
        { path: '/', component: '@/pages/index' },
        { path: '/make', component: '@/pages/make_guide' },
        { path: '/preview', component: '@/pages/preview_guide' },
        { path: '/poi', component: '@/pages/poi' },
      ]
    },
  ],
});
