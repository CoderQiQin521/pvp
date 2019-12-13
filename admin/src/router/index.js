import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from '../views/Main.vue'
import Login from '../views/Login.vue'
import CategoryEdit from '../views/CategoryEdit.vue'
import CategoryList from '../views/CategoryList.vue'

import ItemEdit from '../views/ItemEdit.vue'
import ItemList from '../views/ItemList.vue'

import HeroeEdit from '../views/HeroeEdit.vue'
import HeroeList from '../views/HeroeList.vue'

import AdminUserEdit from '../views/AdminUserEdit.vue'
import AdminUserList from '../views/AdminUserList.vue'

import ArticleEdit from '../views/ArticleEdit.vue'
import ArticleList from '../views/ArticleList.vue'

import AdEdit from '../views/AdEdit.vue'
import AdList from '../views/AdList.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'main',
    component: Main,
    children: [
      {
        path: '',
        component: CategoryList
      },
      {
        path: '/categories/create',
        component: CategoryEdit
      },
      {
        path: '/categories/edit/:id',
        component: CategoryEdit,
        props: true
      },
      {
        path: '/categories/list',
        component: CategoryList
      },
      {
        path: '/items/create',
        component: ItemEdit
      },
      {
        path: '/items/edit/:id',
        component: ItemEdit,
        props: true
      },
      {
        path: '/items/list',
        component: ItemList
      },
      {
        path: '/heroe/create',
        component: HeroeEdit
      },
      {
        path: '/heroe/edit/:id',
        component: HeroeEdit,
        props: true
      },
      {
        path: '/heroe/list',
        component: HeroeList
      },
      {
        path: '/admin_users/create',
        component: AdminUserEdit
      },
      {
        path: '/admin_users/edit/:id',
        component: AdminUserEdit,
        props: true
      },
      {
        path: '/admin_users/list',
        component: AdminUserList
      },
      {
        path: '/articles/create',
        component: ArticleEdit
      },
      {
        path: '/articles/edit/:id',
        component: ArticleEdit,
        props: true
      },
      {
        path: '/articles/list',
        component: ArticleList
      },
      {
        path: '/ads/create',
        component: AdEdit
      },
      {
        path: '/ads/edit/:id',
        component: AdEdit,
        props: true
      },
      {
        path: '/ads/list',
        component: AdList
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    meta: {
      isPublic: true
    },
    component: Login
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, form, next) => {
  if (!to.meta.isPublic && !localStorage.token) {
    return next('/login')
  }
  next()
})

export default router
