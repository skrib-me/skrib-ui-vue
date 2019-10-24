import moment from 'moment'

import DropMessage from '@/components/DropMessage'
import config from '@/config'

export default  {
  name: 'posts',
  props: [],
  created () {
    this.$geolocation()
  },
  mounted() {
    this.getPosts()
  },
  data() {
    return {
      posts: []
    }
  },
  methods: {
    async getPosts () {
      if (this.geolocalized) {
        let latitude = this.geolocation.latitude
        let longitude = this.geolocation.longitude
        let baseURI = config.resourceServer.messagesApi.url + '?latitude= ' + latitude + '&longitude=' + longitude
        // let bearer = `Bearer ${await this.$auth.getAccessToken()}`
        await this.$http.get(baseURI)
        .then((result) => {
          this.posts = result.data
        })
      }
    },

    postDetail: function(id) {
      this.$router.push('/p/' + id)
    }
  },
  computed: {
    geolocation: function(){
      return this.$store.state.geolocation.pos
    },
    geolocalized: function(){
      return this.$store.state.geolocation.ready
    }
  },
  watch: {
    geolocation: function () {
      this.getPosts()
    }
  },
  components: {
    DropMessage
  },
  filters: {
    formatDate: function (date) {
      if (date) {
        let diffHours = moment().diff(date, 'hours')
        if (diffHours < 24) {
          if (diffHours > 1) {
            return diffHours + "h"
          }
          let diffMinutes = moment().diff(date, 'minutes')
          return diffMinutes + "m"
        } else if (diffHours > 24 * 365) {
            return moment(String(date)).format('D MMM').toLowerCase()
          } else {
            return moment(String(date)).format('D MMM YYYY').toLowerCase()
        }
      }
    },

    formatDistance: function(distance) {
      return distance + "m"
    }
  }
}