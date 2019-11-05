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
        let baseURI = config.resourceServer.messagesApi.url
        let options = {
          headers: {
            'x-user-geolocation-latitude': latitude,
            'x-user-geolocation-longitude': longitude
          }
        }
        this.$http.get(baseURI, options)
        .then((result) => {
          this.drops = result.data
        })
      }
    }
  }
}