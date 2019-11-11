import Vue from 'vue'
import Router from 'vue-router'
import Auth from '@okta/okta-vue'

import config from '@/environment'

import Home from '@/views/Home'

import dropsRoutes from '@/components/Drops/drops-routes'
import usersRoutes from '@/components/Users/users-routes'

Vue.use(Router)
Vue.use(Auth, config.oidc)

const oktaRoutes = [
  {
    name: 'okta',
    path: '/implicit/callback',
    component: Auth.handleCallback()
  },
  {
    name: 'home.login',
    path: '/login',
    components: {
      default: Home,
      modal: () => import('@/components/Modal/Login')
    }
  },
]

const appRoutes = [
  {
    name: 'home',
    path: '/',
    component: Home
  }
]

const routes = [...appRoutes, ...oktaRoutes, ...dropsRoutes, ...usersRoutes]
const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach(Vue.prototype.$auth.authRedirectGuard())

export default router