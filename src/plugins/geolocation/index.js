import VuexModule from "./store"
import mixin from "./mixin"

var $_store

const GeolocationPlugin = {
  install(Vue, { store }) {
    if (!(store && store.registerModule)) {
      throw new Error("Please provide vuex store.");
    } else {
      store.registerModule('geolocation', VuexModule);
      $_store = store
    }
    Vue.prototype.$geolocation = {
      position: getPosition,
    }

    Vue.mixin(mixin)
  }
}

function getPosition() {
  if(isAvailable()) {
    navigator.geolocation.getCurrentPosition(pos => {
      let currentPos = $_store.state.geolocation.pos
      if (!posEquals(currentPos, pos.coords)) {
        $_store.dispatch('geolocation/updatePosition', pos.coords)
      }
    }, () => {
      $_store.dispatch('geolocation/updatePosition')
    })
  }
}

function isAvailable() {
  return "geolocation" in navigator
}

function posEquals(pos1, pos2) {
  return pos1 != null && pos2 != null
    && pos1.latitude === pos2.latitude
    && pos1.longitude === pos2.longitude
    && pos1.altitude === pos2.altitude
}

export default GeolocationPlugin