import config from '@/environment'
import DropListItem from '@/components/Drops/DropListItem'

export default  {
  name: 'UserDropList',
  components: {
    DropListItem
  },
  created () {
    this.$geolocation.position()
  },
  mounted () {
    this.getUserDrops()
  },
  data() {
    return {
      username: this.$route.params.username,
      drops: []
    }
  },
  watch: {
    geolocation: function () {
      this.getUserDrops()
    }
  },
  methods: {
    async getUserDrops () {
      if (this.geolocalized){
        var baseURI = config.resourceServer.messagesApi.url + '/user/' + this.username
        let options = {
          headers: {
            'x-user-geolocation-latitude': this.geolocation.latitude,
            'x-user-geolocation-longitude': this.geolocation.longitude,
          }
        }
        this.$http.get(baseURI, options)
        .then((result) => {
          this.drops = result.data
        })
      }
    },
  }
}