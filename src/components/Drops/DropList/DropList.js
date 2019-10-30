import moment from 'moment'

import config from '@/environment'

export default  {
  name: 'DropList',
  props: [
    'unshift'
  ],
  data() {
    return {
      drops: []
    }
  },
  watch: {
    geolocation: function () {
      this.getDrops()
    },
    unshift: function(drop) {
      if (drop) {
        this.drops.unshift(drop)
      }
    }
  },
  created () {
    this.$geolocation.position()
  },
  mounted() {
    this.getDrops()
  },
  methods: {
    async getDrops () {
      if (this.geolocalized) {
        let latitude = this.geolocation.latitude
        let longitude = this.geolocation.longitude
        let baseURI = config.resourceServer.messagesApi.url + '?latitude= ' + latitude + '&longitude=' + longitude
        // let bearer = `Bearer ${await this.$auth.getAccessToken()}`
        await this.$http.get(baseURI)
        .then((result) => {
          this.drops = result.data
        })
      }
    },

    goToDropItem: function(id) {
      this.$router.push('/drops/' + id)
    }
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