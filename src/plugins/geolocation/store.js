const state = {
  ready: false,
  pos: null
}

const getters = {
}

const mutations = {
  setLocation: (state, location) => {
    state.pos = location
    state.ready = (location != null)
  }
}

const actions = {
  updatePosition: ({commit}, location) => {
    commit('setLocation', location)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}