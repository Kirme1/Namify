import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Name from './views/Name.vue'
import Account from './views/Account.vue'
import UpdateAccount from './views/UpdateAccount.vue'
import Login from './views/Login.vue'
import NotFound from './views/404.vue'
import Tag from './views/Tag.vue'

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
      path: '/name/:id',
      name: 'name',
      component: Name
    },
    {
      path: '/account',
      name: 'account',
      component: Account
    },
    {
      path: '/accounts/update',
      name: 'updateAccount',
      component: UpdateAccount
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/404',
      name: '404',
      component: NotFound
    },
    {
      path: '/tag/:id',
      name: 'tag',
      component: Tag
    }
  ]
})
