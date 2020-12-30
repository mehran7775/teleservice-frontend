import { mapActions } from 'vuex'
import states from './states'

export default {
  userDatas:state=>{
    return state.userDatas
  },
  cities:state=>{
    return state.cities
  },
  response_api:state=>{
    return state.response_api
  },
  alerts:state=>{
    return state.alerts
  },
  validatesRegister:state=>{
    return state.validatesRegister
  },
  validatesLogin:state=>{
    return state.validatesLogin
  },
  validatesFullRegister:state=>{
    return state.validatesFullRegister
  },
  validatesFullRegisterExpert:state=>{
    return state.validatesFullRegisterExpert
  },
  validatesEdit:state=>{
    return state.validatesEdit
  },
  regularExpression: state=>{
    return state.regularExpression
  },
  categories:state=>{
    return state.categories
  },
  cases:state=>{
    return state.cases
  }
  // mehran:({state,getters,dispatch})=>{

  // }
}
