import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Name from './views/Name.vue'
import Account from './views/Account.vue'
import UpdateAccount from './views/UpdateAccount.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/name',
      name: 'name',
      component: Name
    },
    {
      path: '/account',
      name: 'account',
      component: Account
    },
    {
      path: '/account/update',
      name: 'updateAccount',
      component: UpdateAccount
    }
  ]
})
