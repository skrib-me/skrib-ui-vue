import Vue from 'vue'
import Router from 'vue-router'
import Auth from '@okta/okta-vue'

import config from '@/config'

import PostList from './views/PostList'

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
      name: 'post-list',
      component: PostList
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('./views/Login')
    },
    {
      path: '/p/:id',
      name: 'post',
      component: () => import('./components/Posts/Post')
    }
  ]
})

router.beforeEach(Vue.prototype.$auth.authRedirectGuard())

export default router