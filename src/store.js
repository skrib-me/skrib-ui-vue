import Vue from 'vue'
import Vuex from 'vuex'
import {UPDATE_LOCATION} from './store-mutation-types'
import {UPDATE_AUTHENTICATED} from './store-mutation-types'
import {UPDATE_ME} from './store-mutation-types'
import {UPDATE_USER_CLAIMS} from './store-mutation-types'
import {UPDATE_WATCHME} from './store-mutation-types'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    geolocation: {
      ready: false,
      pos: null
    },
    user: {
      watcherId: null,
      authenticated: false,
      me: null,
      claims: null
    }
  },
  mutations: {
    [UPDATE_LOCATION]: (state, location) => {
      state.geolocation.pos = location
      state.geolocation.ready = (location != null)
    },
    [UPDATE_ME]: (state, infos) => {
      state.user.me = infos
    },
    [UPDATE_AUTHENTICATED]: (state, isAutenticated) => {
      state.user.authenticated = isAutenticated
    },
    [UPDATE_USER_CLAIMS]: (state, claims) => {
      state.user.claims = claims
    },
    [UPDATE_WATCHME]: (state, watcherId) => {
      state.user.watcherId = watcherId
    }
  },
  actions: {
    updateLocation: ({commit}, location) => {
      commit(UPDATE_LOCATION, location)
    },
    updateMe: ({commit}, infos) => {
      commit(UPDATE_ME, infos)
    },
    updateUserClaims: ({commit}, claims) => {
      commit(UPDATE_ME, claims)
    },
    updateUserAuthenticated: ({commit}, isAuthenticated) => {
      commit(UPDATE_AUTHENTICATED, isAuthenticated)
    },
    watchMe: ({commit}, watcherId) => {
      commit(UPDATE_WATCHME, watcherId)
    }
  }
})
