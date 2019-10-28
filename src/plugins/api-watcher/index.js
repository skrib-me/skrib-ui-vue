import config from '@/config'

var _apis = new Map([
  [
    'messagesApi',
    {
      url: config.resourceServer.messagesApi.url + '/actuator/health',
      interval: 30,
      watcher: null
    }
  ],
  [
    'usersApi',
    {
      url: config.resourceServer.usersApi.url + '/actuator/health',
      interval: 30,
      watcher: null
    }
  ]
])

const ApiWatcherPlugin = {
    install: function (Vue) {
      Vue.prototype.$watchApis = ApiWatcherPlugin.watchApis
      Vue.prototype.$clearApiWatchers = ApiWatcherPlugin.clearApiWatchers
    },
    watchApis: async function() {
      _apis.forEach((api, apiName) => {
        ApiWatcherPlugin._watchApi(this, apiName, api.url, api.interval)
      })
    },
    clearApiWatchers: function() {
      if (this.$store.state.apiWatchers.size > 0) {
        _apis.forEach((api, apiName) => {
          window.clearInterval(api.watcher)
          _apis.get(apiName).watcher = null
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
        }
      } catch (error) {
        window.console.log(`${api} is down`)
      }
    }
  }

  export default ApiWatcherPlugin