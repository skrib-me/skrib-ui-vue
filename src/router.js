import Vue from 'vue'
import Router from 'vue-router'
import Auth from '@okta/okta-vue'

import config from '@/environment'

import PostList from '@/views/PostList'
import postsRoutes from '@/components/Posts/post-routes'

Vue.use(Router)
Vue.use(Auth, config.oidc)

const oktaRoutes = [
  {
    path: '/implicit/callback',
    name: 'okta',
    component: Auth.handleCallback()
  },
  {
    path: '/login',
    name: 'okta-login',
    component: () => import('@/views/Login')
  },
]

const appRoutes = [
  {
    path: '/',
    name: 'post-list',
    component: PostList
  }
]

const routes = [...appRoutes, ...oktaRoutes, ...postsRoutes]
const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach(Vue.prototype.$auth.authRedirectGuard())

export default router