import moment from 'moment'

import config from '@/environment'

export default  {
  name: 'post',
  props: [],
  created () {
    this.$geolocation()
  },
  mounted () {
    this.getPost()
  },
  data() {
    return {
      id: this.$route.params.id,
      post: {}
    }
  },
  methods: {
    async getPost () {
      if (this.geolocalized){
        let latitude = this.geolocation.latitude
        let longitude = this.geolocation.longitude
        var baseURI = config.resourceServer.messagesApi.url + '/' + this.id + '?latitude= ' + latitude + '&longitude=' + longitude
        await this.$http.get(baseURI)
        .then((result) => {
          this.post = result.data
        })
      }
    },

    staticMap: function(post) {
      let url = config.resourceServer.googleApi.url
      let apiKey = config.resourceServer.googleApi.apiKey
      let zoom = 12
      let size = "600x300"
      let coordsMe = this.geolocation.latitude + "," + this.geolocation.longitude
      let coordsPost = post.geolocation.latitude + "," + post.geolocation.longitude
      let coordsMeIconUrl = "https://imgur.com/1UrlCn0.png"
      return url  + "?center=" + coordsMe
                  + "&zoom=" + zoom
                  + "&size=" + size
                  + "&maptype=terrain"
                  + "&markers=icon:" + coordsMeIconUrl + "%7C" + coordsMe
                  + "&markers=color:0x5cadff%7C" + coordsPost
                  + "&key=" + apiKey
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
      this.getPost()
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