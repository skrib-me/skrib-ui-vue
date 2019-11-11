import Vue from 'vue'
import App from './App.vue'

import Auth from '@okta/okta-vue'
import axios from 'axios'
import BootstrapVue from 'bootstrap-vue'

import Geolocation from '@/plugins/geolocation'
import OktaOAuth from '@/plugins/oauth'
import ApiWatcher from '@/plugins/api-watcher'

import config from '@/environment'
import router from './router'
import store from './store'
import i18n from './i18n'

import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.config.productionTip = false

Vue.prototype.$http = axios

Vue.use(BootstrapVue)
Vue.use(Auth, config.oidc)

Vue.use(Geolocation, { store })
Vue.use(OktaOAuth, { store })
Vue.use(ApiWatcher)

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
