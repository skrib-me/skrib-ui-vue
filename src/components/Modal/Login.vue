<template>
  <section class="modal-login" :class="show? 'show':'fade'">
    <div class="modal-login__spinner" v-if="!authenticated">
      <div class="spinner-border" role="status">
        <span class="sr-only">Logging in...</span>
      </div>
    </div>
    <div v-else>
      Logged in, redirect ...
    </div>
  </section>
</template>

<script>
// require('bootstrap/dist/js/bootstrap.js')
import config from '@/environment'
export default {
  name: 'login',
  data() {
    return {
      watcherId: null,
      timedOut: false,
      show: false,
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
  mounted() {
    this.show = true
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
      this.show = false
      this.$router.replace(config.resourceServer.app.baseUrl)
    }
  }
}
</script>
<style lang="scss" scoped>
.modal-login {
  display: block;
  background-color: rgba(0, 0, 0, 0.95);
  transition: all 2s ease-out;
}
.modal-login--hidden {
  opacity: 0;
}
.modal-login__spinner {
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  text-align: center;
  margin: auto;
}
.spinner-border, .sr-only {
  color: $theme-secondary;
}
</style>

