const state = {
    authenticated: false,
    me: null,
    claims: null
}

const getters = {
}

const mutations = {
    setMe: (state, infos) => {
        state.me = infos
    },
    setAuthenticated: (state, isAutenticated) => {
        state.authenticated = isAutenticated
    },
    setUserClaims: (state, claims) => {
        state.claims = claims
    }
}

const actions = {
    updateMe: ({commit}, infos) => {
        commit('setMe', infos)
    },
    updateUserClaims: ({commit}, claims) => {
        commit('setUserClaims', claims)
    },
    updateUserAuthenticated: ({commit}, isAuthenticated) => {
        commit('setAuthenticated', isAuthenticated)
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}