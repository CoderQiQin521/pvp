import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from '../views/Main.vue'
import CategoryEdit from '../views/CategoryEdit.vue'
import CategoryList from '../views/CategoryList.vue'

import ItemEdit from '../views/ItemEdit.vue'
import ItemList from '../views/ItemList.vue'

import HeroeEdit from '../views/HeroeEdit.vue'
import HeroeList from '../views/HeroeList.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'main',
    component: Main,
    children: [
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
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
