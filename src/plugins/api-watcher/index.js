import config from '@/environment'

var _apis = new Map([
  [
    'messagesApi',
    {
      url: config.resourceServer.messagesApi.url + '/actuator/health',
      interval: 30,
      watcher: null,
      available: false
    }
  ],
  [
    'usersApi',
    {
      url: config.resourceServer.usersApi.url + '/actuator/health',
      interval: 30,
      watcher: null,
      available: false
    }
  ]
])

const ApiWatcherPlugin = {
  install: function (Vue) {
    Vue.prototype.$watchApis = ApiWatcherPlugin.watchApis
    Vue.prototype.$clearApiWatchers = ApiWatcherPlugin.clearApiWatchers
    Vue.prototype.$apiAvailable = ApiWatcherPlugin.isApiAvailable
  },
  watchApis: async function() {
    _apis.forEach((api, apiName) => {
      ApiWatcherPlugin._watchApi(this, apiName, api.url, api.interval)
    })
  },
  isApiAvailable: function(apiName) {
    return _apis.get(apiName).available
  },
  clearApiWatchers: function() {
    if (this.$store.state.apiWatchers.size > 0) {
      _apis.forEach((api, apiName) => {
        window.clearInterval(api.watcher)
        _apis.get(apiName).watcher = null
        _apis.get(apiName).available = false
      })
    }
  },
  _watchApi: async function(_, apiName, url, interval) {
    if (_apis.get(apiName).watcher) {
      throw new TypeError(`Watcher on ${apiName} already exists.`)
    }
    ApiWatcherPlugin._healthcheck(_, apiName, url)
    let watcherId = window.setInterval(() => {
      ApiWatcherPlugin._healthcheck(_, apiName, url)
    }, interval * 1000)
    _apis.get(apiName).watcher = watcherId
  },
  _healthcheck: async function(_, api, url) {
    try {
      const response = await _.$http.get(url)
      if (response.status === 200 && response.data.status === 'UP') {
        window.console.log(`${api} is up`)
        _apis.get(api).available = true
      }
    } catch (error) {
      window.console.log(`${api} is down`)
      _apis.get(api).available = false
    }
  }
}

  export default ApiWatcherPlugin