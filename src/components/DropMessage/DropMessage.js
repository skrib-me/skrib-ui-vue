import config from '@/config'

export default {
  name: 'post-message-form',
  created() {
    this.$geolocation()
  },
  data () {
    return {
      show: true,
      form: {
        message: ''
      },
    }
  },
  computed: {
    location: function() {
      return this.$store.state.geolocation.pos
    },
    isAuthenticated: function () {
      return this.$store.state.user.authenticated
    },
    me: function() {
      return this.$store.state.user.me
    }
  },
  methods: {
    onSubmit: function(evt) {
      this.send()
      this.reset(evt)
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
        rayon: 1000,
        geolocation: {
          latitude: this.location.latitude,
          longitude: this.location.longitude,
        },
        body: this.form.message
      }
      var baseURI = config.resourceServer.messagesApi.url
      let bearer = `Bearer ${await this.$auth.getAccessToken()}`
      this.$http.post(baseURI, message, {
        // withCredentials: true,
        headers: {
          'Authorization': bearer
        }
      })
      .then((result) => {
        this.$parent.posts.unshift(result.data)
      })
    }
  },
}
