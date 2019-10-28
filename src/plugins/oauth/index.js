import config from '@/config'

var watcherId

const OktaPlugin = {
    install: function (Vue) {
      Vue.prototype.$me = OktaPlugin.me
      Vue.prototype.$watchMe = OktaPlugin.watchMe
      Vue.prototype.$clearWatchMe = OktaPlugin.clearWatchMe
      Vue.prototype.$userClaims = OktaPlugin.userClaims
      Vue.prototype.$logout = OktaPlugin.logout
      Vue.prototype.$login = OktaPlugin.login
    },
    userClaims: async function() {
      let isAuthenticated = await this.$auth.isAuthenticated()
      if(isAuthenticated) {
        this.$store.dispatch('updateUserClaims', await this.$auth.getUser())
      } else {
        this.$store.dispatch('updateUserClaims', null)
      }
      this.$store.dispatch('updateUserAuthenticated', isAuthenticated)
    },
    userinfos: async function() {
      let isAuthenticated = await this.$auth.isAuthenticated()
      if(isAuthenticated) {
        this.$store.dispatch('updateMe', await this.$auth.getUser())
      } else {
        this.$store.dispatch('updateMe', null)
      }
      this.$store.dispatch('updateUserAuthenticated', isAuthenticated)
    },
    me: async function() {
      let isAuthenticated = await this.$auth.isAuthenticated()
      if(isAuthenticated) {
        let bearer = `Bearer ${await this.$auth.getAccessToken()}`
        let me = await this.$http.get(config.resourceServer.usersApi.url + '/me', {
          headers: {
            'Authorization': bearer
          }
        })
        this.$store.dispatch('updateMe', me.data)
      } else {
        this.$store.dispatch('updateMe', null)
      }
      this.$store.dispatch('updateUserAuthenticated', isAuthenticated)
    },
    watchMe: async function(interval) {
      if (watcherId) {
        throw new TypeError("Watcher on /me already exists")
      }
      this.$me()
      watcherId = window.setInterval(() => {
        this.$me()
      }, interval * 1000)
    },
    clearWatchMe: function() {
      if (watcherId) {
        window.clearInterval(watcherId)
        watcherId = null
      }
    },
    login: async function (redirectPath) {
      await this.$auth.loginRedirect(redirectPath)
    },
    logout: async function () {
      await this.$auth.logout()
      this.$me()
    }
  }

  export default OktaPlugin