import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/agency',
    name: 'Agency',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "agency" */ '../views/Agency.vue')
  },
  {
    path: '/about-agency',
    name: 'AgencyAbout',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "agencyAbout" */ '../views/AgencyAbout.vue')
  },
  {
    path: '/altering-agency',
    name: 'AgencyAltering',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "agencyAltering" */ '../views/AgencyAltering.vue')
  },
  {
    path: '/services-agency',
    name: 'ServicesAltering',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "agencyServices" */ '../views/AgencyServices.vue')
  },
  {
    path: '/why-agency',
    name: 'AgencyWhy',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "agencyServices" */ '../views/AgencyWhy.vue')
  },
  {
    path: '/clients-agency',
    name: 'AgencyClients',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "agencyServices" */ '../views/AgencyClients.vue')
  },
  {
    path: '/studio',
    name: 'Studio',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "studio" */ '../views/Studio.vue')
  },
  {
    path: '/locations-studio',
    name: 'StudioLocations',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "studio" */ '../views/StudioLocations.vue')
  },  
  {
    path: '/powered',
    name: 'Powered',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "Powered" */ '../views/Powered.vue')
  },
  {
    path: '/powered-by',
    name: 'PoweredBy',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "Powered" */ '../views/PoweredBy.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
