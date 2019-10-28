import Vue from 'vue'
import Vuex from 'vuex'

import geolocation from './modules/geolocation'
import oauth from './modules/oauth'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    geolocation,
    oauth
  },
  state: {
  },
  mutations: {
  },
  actions: {
  },
  strict: process.env.NODE_ENV !== 'production'
})
