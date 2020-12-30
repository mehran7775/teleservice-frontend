import Vue from 'vue'
import Router from 'vue-router'
import Home from '../components/Home'
import About from '../components/frontend/About'
import Register from '../components/frontend/sign_out/Register'
import Login from '../components/frontend/sign_out/Login'
import Logout from '../components/frontend/sign_out/Logout'
import Dashboard from '../components/frontend/dashboard/Dashboard'
import UserPanel from '../components/frontend/dashboard/UserPanel'
import Services from '../components/frontend/Services'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      children:[
        {
        path: 'account/register',
        name: 'register',
        component: Register
      },
      {
        path: 'account/login',
        name:'login',
        component: Login
      },
      // {
      //   path: 'account/logout',
      //   name:'logout',
      //   component: Logout
      // }
        {
          path: 'account/dashboard',
          name: 'dashboard',
          components:{
            dashboard:Dashboard
          },
          // children:[
          //   {
          //   path:':id',
          //   name:'userPanel',
          //   component:UserPanel
          // }
          // ]
        },
        {
          path: 'account/dashboard/:id?with=files',
          name: 'userPanel',
          components:{
            userPanel:UserPanel
          }
        }
      ]
    },
    {
      path: '/about',
      name: 'about',
      component: About
    },
    {
      path: '/services',
      name: 'services',
      component: Services
    },
    // {
    //   path: 'me',
    //   component: Me,
    //   children: [
    //     {
    //       path: 'bavar',
    //       component: Bavar,
    //     },
    //     {
    //       path: 'email',
    //       components:{
    //         default:Email,
    //         helper:EmailOne
    //       }
    //     }
    //   ]
    // }

  ]
})
