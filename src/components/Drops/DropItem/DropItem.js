import moment from 'moment'

import config from '@/environment'

export default  {
  name: 'DropItem',
  props: [],
  created () {
    this.$geolocation.position()
  },
  mounted () {
    this.getDrop()
  },
  data() {
    return {
      id: this.$route.params.id,
      drop: {}
    }
  },
  methods: {
    async getDrop () {
      if (this.geolocalized){
        let latitude = this.geolocation.latitude
        let longitude = this.geolocation.longitude
        var baseURI = config.resourceServer.messagesApi.url + '/' + this.id
        let options = {
          headers: {
            'x-user-geolocation-latitude': latitude,
            'x-user-geolocation-longitude': longitude
          }
        }
        let result = await this.$http.get(baseURI, options)
        this.drop = result.data
      }
    },

    staticMap: function(drop) {
      let url = config.resourceServer.googleApi.url
      let apiKey = config.resourceServer.googleApi.apiKey
      let zoom = 12
      let size = "600x300"
      let coordsMe = this.geolocation.latitude + "," + this.geolocation.longitude
      let coordsDrop = drop.geolocation.latitude + "," + drop.geolocation.longitude
      let coordsMeIconUrl = "https://imgur.com/1UrlCn0.png"
      return url  + "?center=" + coordsMe
                  + "&zoom=" + zoom
                  + "&size=" + size
                  + "&maptype=terrain"
                  + "&markers=icon:" + coordsMeIconUrl + "%7C" + coordsMe
                  + "&markers=color:0x5cadff%7C" + coordsDrop
                  + "&key=" + apiKey
    }
  },
  watch: {
    geolocation: function () {
      this.getDrop()
    }
  },
  components: {
  },
  filters: {
    formatDate: function (date) {
      if (date) {
        return moment(String(date)).format('hh:mm · D MMM YYYY').toLowerCase()
      }
    }
  }
}