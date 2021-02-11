import Vue from 'vue';
import Router from 'vue-router';
import Home from '../components/Home';
import About from '../components/frontend/About';
import Register from '../components/frontend/sign_out/Register';
import Login from '../components/frontend/sign_out/Login';
import Logout from '../components/frontend/sign_out/Logout';
import Dashboard from '../components/frontend/dashboard/Dashboard';
import UserPanel from '../components/frontend/dashboard/UserPanel';
import Services from '../components/frontend/Services';
import CaseShow from '@/components/frontend/cases/CaseShow';
import CaseUpload from '@/components/frontend/cases/CaseUpload';
import ReportRegister from '@/components/frontend/cases/ReportRegister';
import Cases from '@/components/frontend/cases/Cases';
import ReportShow from '@/components/frontend/cases/ReportShow';
import Wallet from '@/components/frontend/Wallet'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      children: [
        {
          path: 'account/register',
          name: 'register',
          component: Register
        },
        {
          path: 'account/login',
          name: 'login',
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
          components: {
            dashboard: Dashboard
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
          path: 'account/dashboard/:id',
          name: 'userPanel',
          components: {
            userPanel: UserPanel
          }
        },
        {
          path:'wallet',
          name:'wallet',
          component:Wallet
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
      component: Services,
      children: [
        {
          path: '',
          name: 'cases',
          components: {
            default: CaseUpload,
            casesExpert: Cases
          }
        },
        {
          path: 'case=:id',
          name: 'case-show',
          components: {
            caseShow: CaseShow
          }
        },
        {
          path: 'register_report/:id',
          name: 'register-report',
          components: {
            reportRegister: ReportRegister
          }
        },
        {
          path: 'report=:id',
          name: 'report-show',
          components: {
            reportShow: ReportShow
          }
        },
      ]
    },
    // {
    //   path: 'me',
    //   component: Me,
    // params:true,
    //   children: [
    //     {
    //       path: 'bavar',
    //       component: Bavar,
    //     },
    //     {
    //        path: 'email',
    //       components:{
    //         default:Email,
    //         helper:EmailOne
    //       }
    //     }
    //   ]
    // }

  ]
})
