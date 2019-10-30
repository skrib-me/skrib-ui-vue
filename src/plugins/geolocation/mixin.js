export default {
    computed: {
        geolocation: function(){
            return this.$store.state.geolocation.pos
        },
        geolocalized: function(){
            return this.$store.state.geolocation.ready
        }
    }
}