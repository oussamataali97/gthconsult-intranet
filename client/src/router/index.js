import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Admin from '../views/Admin.vue'
import Production from '../views/Production.vue'
import Facture from '../views/Facture.vue'
import About from '../views/About.vue'
import Intranet from '../views/Intranet'
import Interface from '../views/Interface'
import Notefrais from '../views/Notefrais'
import Gestionfrais from '../views/Gestionfrais'
import Gestioncalendrier from '../views/Gestioncalendrier'
import Notecalendrier from '../views/Notecalendrier'
import Supportstechniques from '../views/Supportstechniques'
import Analyse from '../views/Analyse'
import Fournisseur from '../views/Fournisseur'
import Agrement from '../views/Agrement'
import Showpdf from '../views/Showpdf'
import Chatgthconsult from '../views/Chatgthconsult'
import Etalonnage from '../views/Etalonnage'
import FicheTechnique from '../views/FicheTechnique'
import GestionRH from '../views/GestionRH'
import Da from '../views/Da'
import Dp from '../views/Dp'
import Dq from '../views/Dq'
import Dt from '../views/Dt'


Vue.use(VueRouter)

//var isAuthenticated = false;

// function guardMyrouteAdmin(to, from, next) {


//   if (sessionStorage.getItem('adminId'))
//     isAuthenticated = true;
//   else
//     isAuthenticated = false;
//   if (isAuthenticated) {
//     next(); // allow to enter route
//   }
//   else {
//     next('/'); // go to '/login';
//   }
// }


const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/intranet',
    name: 'Intranet',
    component: Intranet
  },
  {
    path: '/notefrais',
    name: 'Notefrais',
    component: Notefrais
  },
  {
    path: '/gestionfrais',
    name: 'Gestionfrais',
    component: Gestionfrais
  },
  {
    path: '/gestioncalendrier',
    name: 'Gestioncalendrier',
    component: Gestioncalendrier
  },
  {
    path: '/notecalendrier',
    name: 'Notecalendrier',
    component: Notecalendrier
  },
  {
    path: '/supportstechniques',
    name: 'Supportstechniques',
    component: Supportstechniques
  },
  {
    path: '/admin',
    name: 'Admin',
    component: Admin,
  },
  {
    path: '/facture',
    name: 'Facture',
    component: Facture,
  },
  {
    path: '/production',
    name: 'Production',
    component: Production,
  },
  {
    path: '/analyse',
    name: 'Analyse',
    component: Analyse,
  },
  {
    path: '/fournisseur',
    name: 'Fournisseur',
    component: Fournisseur,
  },
  {
    path: '/agrement',
    name: 'Agrement',
    component: Agrement,
  },
  {
    path: '/showpdf',
    name: 'Showpdf',
    component: Showpdf,
  },
  {
    path: '/chatgthconsult',
    name: 'Chatgthconsult',
    component: Chatgthconsult,
  },
  {
    path: '/about',
    name: 'About',
    component: About
  },
  {
    path: '/interface',
    name: 'Interface',
    component: Interface
  },
  {
    path: '/da',
    name: 'Da',
    component: Da
  },
  {
    path: '/dp',
    name: 'Dp',
    component: Dp
  },
  {
    path: '/dq',
    name: 'Dq',
    component: Dq
  },
  {
    path: '/dt',
    name: 'Dt',
    component: Dt
  },
  {
    path: '/etalonnage',
    name: 'Etalonnage',
    component: Etalonnage
  },
  {
    path: '/fichetechnique',
    name: 'FicheTechnique',
    component: FicheTechnique
  },
  {
    path: '/gestionrh',
    name: 'GestionRH',
    component: GestionRH
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router