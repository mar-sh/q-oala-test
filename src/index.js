import Vue from 'vue';

// babel dependencies for async/await
import 'core-js/stable';
import 'regenerator-runtime/runtime';

import App from './App.vue';
import router from './router';

import './index.css';

new Vue({
  render: createEl => createEl(App),
  router,
}).$mount('#app');
