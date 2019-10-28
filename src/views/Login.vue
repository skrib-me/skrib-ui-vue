<template>
  <section>
    <p v-if="!authenticated">Logging in ...</p>
    <p v-else>Logged in, redirect ...</p>
    </section>
</template>

<script>
import config from '@/config'
export default {
  name: 'login',
  data() {
    return {
      watcherId: null,
      timedOut: false
    }
  },
  created() {
    let startTime = new Date()
    this.watcherId = window.setInterval(() => {
      let pingTime = new Date()
      let diffInSec = (pingTime - startTime) / 60000
      if (diffInSec > config.resourceServer.oktaApi.loginTimeout) {
        this.timedOut = true
      } else {
        this.$me()
      }
    }, 1000)
  },
  watch: {
    authenticated: function() {
      if (this.authenticated) {
        this.goHome()
      }
    },
    timedOut: function() {
      this.goHome()
    }
  },
  computed: {
    authenticated: function () {
      return this.$store.state.oauth.authenticated
    }
  },
  methods: {
    goHome: function () {
      if (this.watcherId) {
        window.clearInterval(this.watcherId)
      }
      this.$router.push(config.resourceServer.app.baseUrl)
    }
  }
}
</script>

