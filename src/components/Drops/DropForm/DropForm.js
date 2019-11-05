import config from '@/environment'

export default {
  name: 'drop-form',
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
      let options = {
        headers: {
          'x-user-geolocation-latitude': this.geolocation.latitude,
          'x-user-geolocation-longitude': this.geolocation.longitude,
          'Authorization': `Bearer ${await this.$auth.getAccessToken()}`
        }
      }
      this.$http.post(baseURI, message, options)
      .then ((result) => {
        this.$emit('droped', result.data)
      })
    }
  },
}
