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
      id: this.$route.params.id,
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
        let latitude = this.geolocation.latitude
        let longitude = this.geolocation.longitude
        var baseURI = config.resourceServer.messagesApi.url + '/users/' + this.id + '?latitude= ' + latitude + '&longitude=' + longitude
        await this.$http.get(baseURI)
        .then((result) => {
          this.drops = result.data
        })
      }
    },
  }
}