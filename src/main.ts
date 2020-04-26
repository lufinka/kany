import Vue from 'vue';
import App from './App.vue';
import './prototype/date';
import './prototype/number';
import './prototype/string';
import router from './router';
import ElementUI from 'element-ui';
import store from './store';
import axios from 'axios';
import VueAxios from 'vue-axios';

Vue.use(VueAxios, axios);
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
