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
  casses:(state)=> (id) =>{
    if(id ==='all'){
      return state.casses
    }else{
      let arr=new Array()
      state.casses.forEach(function(casse,index){
        if(casse.category == id){
          arr[index]=casse
        }
      })
      let newarr=arr.filter(()=>{
        return true;
      })
      let obj=Object.assign({},newarr)
      return obj;
    }
  },
  caseItem: (state) => (id) => {
    return state.casses.find(
      casse => casse.id == id
    )
  },
  case_details:state=>{
    return state.case_details
  }
}
