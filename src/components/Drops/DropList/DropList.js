import config from '@/environment'
import DropListItem from '@/components/Drops/DropListItem'

export default  {
  name: 'DropList',
  components: {
    DropListItem
  },
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
    }
  }
}