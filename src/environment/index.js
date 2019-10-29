const BASE_URL = process.env.VUE_APP_BASE_URL;
const HOST = window.location.host;

const OKTA_DOMAIN = process.env.VUE_APP_OKTA_DOMAIN;
const OKTA_CLIENT_ID = process.env.VUE_APP_OKTA_CLIENT_ID;
const OKTA_API_TOKEN = process.env.VUE_APP_OKTA_API_TOKEN;

const GOOGLE_STATICS_API_URL = process.env.VUE_APP_GOOGLE_STATICS_API_URL;
const GOOGLE_STATICS_API_KEY = process.env.VUE_APP_GOOGLE_STATICS_API_KEY;

const MESSAGES_API_URL = process.env.VUE_APP_MESSAGES_API_URL;
const USERS_API_URL = process.env.VUE_APP_USERS_API_URL;

export default {
  oidc: {
    clientId: `${OKTA_CLIENT_ID}`,
    issuer: `https://${OKTA_DOMAIN}/oauth2/aus1l1uxckwG9WEQA357`,
    redirectUri: `http://${HOST}/implicit/callback`,
    scopes: ['openid', 'profile', 'email'],
    pkce: true,
    testing: {
      disableHttpsCheck: false
    }
  },
  resourceServer: {
    app: {
      host: `${HOST}`,
      baseUrl: `${BASE_URL}`
    },
    oktaApi: {
      url: `https://${OKTA_DOMAIN}/api/v1`,
      apiToken: `${OKTA_API_TOKEN}`,
      loginTimeout: 10,
      tokenRefresh: 3500
    },
    messagesApi: {
        url: `${MESSAGES_API_URL}`
    },
    usersApi: {
        url: `${USERS_API_URL}`
    },
    googleApi: {
      apiKey: `${GOOGLE_STATICS_API_KEY}`,
      url: `${GOOGLE_STATICS_API_URL}`
    }
  }
}