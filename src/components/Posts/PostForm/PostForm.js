import config from '@/environment'

export default {
  name: 'post-form',
  props: [
  ],
  data () {
    return {
      show: true,
      submitting: false,
      form: {
        message: ''
      },
    }
  },
  created() {
    this.$geolocation.position()
  },
  computed: {
    isAuthenticated: function () {
      return this.$store.state.oauth.authenticated
    },
    me: function() {
      return this.$store.state.oauth.me
    }
  },
  methods: {
    onSubmit: function(evt) {
      if (!this.submitting) {
        this.submitting = true
        this.send().then(() => {
          this.reset(evt)
        })
        this.submitting = false
      }
    },

    reset: function(evt) {
      evt.preventDefault()
      this.form.message = ''
      this.show = false
      this.$nextTick(() => {
        this.show = true
      })
    },

    send: async function() {
      let message = {
        rayon: this.me.preferences.rayon,
        geolocation: {
          latitude: this.geolocation.latitude,
          longitude: this.geolocation.longitude,
        },
        body: this.form.message
      }
      var baseURI = config.resourceServer.messagesApi.url
      let bearer = `Bearer ${await this.$auth.getAccessToken()}`
      return this.$http.post(baseURI, message, {
        // withCredentials: true,
        headers: {
          'Authorization': bearer
        }
      })
      .then ((result) => {
        this.$emit('posted', result.data)
      })
    }
  },
}
