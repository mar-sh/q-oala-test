import Vue from 'vue';
import Router from 'vue-router';

import NotFound from './pages/NotFound';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: '/',
  routes: [
    {
      path: '/',
      name: 'home',
      component: () =>
        import(/* webpackChunkName: "Home" */ './pages/Home.vue'),
    },
    {
      path: '*',
      name: 'not-found',
      component: NotFound,
    },
  ],
});
