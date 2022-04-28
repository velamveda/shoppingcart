import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import CartView from '../views/CartView.vue'
import LogIn from '../views/LogIn.vue'
import SignUp from '../views/SignUp.vue'
import ProductDescription from '../components/ProductDescription.vue'
import PageNotFound from '../components/PageNotFound.vue'


const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
  },
  {
    path: '/cart',
    name: 'cart',
    component:CartView
    
  },

  {
    path:'/login',
    name:'login',
    component:LogIn
  },

  {
    path:'/signup',
    name:'signup',
    component:SignUp
  },

  {
    path:'/productdescription',
    name:'productdescription',
    component: ProductDescription
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: PageNotFound
  }
 
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
