import Vue from 'vue'
import Router from 'vue-router'
import Posts from './views/Posts.vue'
import Auth from '@okta/okta-vue'

import config from '@/config'

Vue.use(Router)
Vue.use(Auth, config.oidc)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/implicit/callback',
      name: 'okta',
      component: Auth.handleCallback()
    },
    {
      path: '/',
      name: 'posts',
      component: Posts
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('./views/Login')
    },
    {
      path: '/p/:id',
      name: 'post',
      component: () => import('./components/Post')
    }
  ]
})

router.beforeEach(Vue.prototype.$auth.authRedirectGuard())

export default router