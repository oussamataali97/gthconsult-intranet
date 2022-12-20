import App from './App.vue'
import router from './router'
import store from './store'
import Vue from 'vue'
import './assets/formulate.css'
import VueSimpleAlert from "vue-simple-alert";
Vue.use(VueSimpleAlert);

import VueFormulate from '@braid/vue-formulate'
Vue.use(VueFormulate)

import '@fortawesome/fontawesome-free/css/all.css'
import '@fortawesome/fontawesome-free/js/all.js'



Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
