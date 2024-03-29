import Vue from 'vue'
import App from './App.vue'
import VModal from 'vue-js-modal';

Vue.use(VModal);

export const bus = new Vue();

Vue.config.productionTip = true;

new Vue({
  render: h => h(App),
}).$mount('#app');
