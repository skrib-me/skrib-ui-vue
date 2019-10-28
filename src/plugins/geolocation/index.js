const GeolocationPlugin = {
  install: function (Vue) {
    Vue.prototype.$geolocation = GeolocationPlugin.getGeolocation
  },
  getGeolocation: function() {
    if(GeolocationPlugin._isAvailable()) {
      navigator.geolocation.getCurrentPosition(pos => {
        let currentPos = this.$store.state.geolocation.pos
        if (!GeolocationPlugin._posEquals(currentPos, pos.coords)) {
          this.$store.dispatch('geolocation/updateLocation', pos.coords)
        }
      }, () => {
        this.$store.dispatch('geolocation/updateLocation')
      })
    }
  },
  _isAvailable: function() {
    return "geolocation" in navigator
  },
  _posEquals: function(pos1, pos2) {
    return pos1 != null && pos2 != null
      && pos1.latitude === pos2.latitude
      && pos1.longitude === pos2.longitude
      && pos1.altitude === pos2.altitude
  }
}

export default GeolocationPlugin