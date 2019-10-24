export default {
  name: 'user-menu',
  data () {
    return {
    }
  },
  methods: {
    logout: async function () {
      await this.$logout()
      this.$router.push({ path: '/' }).catch(() => {})
    },
    login: async function() {
      await this.$login("/login")
    }
  },
  computed: {
    me: function() {
      return this.$store.state.user.me
    },
    isAuthenticated: function() {
      return this.$store.state.user.authenticated
    }
  }
}
