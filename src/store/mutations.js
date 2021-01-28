import defaultState from './states'
import stableSort from 'bootstrap-vue/esm/utils/stable-sort'

export default {
  // updateValidates(state,payload){
  //   if (payload=== 'isValidated.name'){
  //     state.validates.isValidated.name=true
  //   }
  // },
  // changeCallbackRegister (state, payload) {
  //   state.successCallbackRegister = payload
  // },
  // updateDataUser (state, payload) {
  //   state.update_data_user = payload
  // },
  // changeCallbackLogin (state, payload) {
  //   state.successCallbackLogin = payload
  //
  // },
  // Vue.set(obj, 'newProp', 123)
  change_response_api_home(state,payload){
    state.response_api.home=payload;
  },
  change_response_api_services(state,payload){
    state.response_api.services=payload
  },
  RESET_STATE(state){
    Object.assign(state,defaultState)
  },
  change_response_api_register(state,payload){
    if (payload.success){
      // this.$notify('')
      state.response_api.register.success = payload.success
    }else if (payload.failed) {
      state.response_api.register.failed = payload.failed
    }else if (payload==='result'){
      state.response_api.register.result=true
    }
  },
  change_response_api_login(state,payload){
    if (payload.failed){
      state.response_api.login.failed = payload.failed
    }
    if (payload==='result'){
      state.response_api.login.result=true
    }
    if (payload.success){
      state.response_api.login.failed = false
      state.response_api.login.successCallbackLogin=true
    }
    if (payload==='falseSuccessCallBack'){
      state.response_api.login.successCallbackLogin=false
    }
    if (payload==='trueSuccessCallBack'){
      state.response_api.login.successCallbackLogin=true
    }
    if (payload==='successmpty'){
      state.response_api.login.success=''
    }
  },
  change_response_api_logout(state,payload){
    if (payload==='empty'){
      state.response_api.logout=false
    }
    if (payload.message){
      state.response_api.login.successCallbackLogin=false
    }
  },
  changeValidate (state, payload) {
    if(payload.name){
      state.validatesRegister.isValidated.name = false
      state.validatesRegister.isInvalidated.name = true
      state.validatesRegister.errorUsers.name = payload.name.toString()
    }
    if(payload.username){
      state.validatesRegister.isValidated.username = false
      state.validatesRegister.isInvalidated.username = true
      state.validatesRegister.errorUsers.username = payload.username.toString()
    }
    if(payload.email){
      state.validatesRegister.isValidated.email = false
      state.validatesRegister.isInvalidated.email = true
      state.validatesRegister.errorUsers.email = payload.email.toString()
    }
    if(payload.password){
      state.validatesRegister.isValidated.password = false
      state.validatesRegister.isInvalidated.password = true
      state.validatesRegister.errorUsers.password = payload.password.toString()
    }
    switch (payload) {
      case 'okName':{
        state.validatesRegister.isValidated.name=true
        state.validatesRegister.isInvalidated.name=false
        state.validatesRegister.errorUsers.name=''
        break
      }
      case 'falseName':{
        state.validatesRegister.isValidated.name=false
        state.validatesRegister.isInvalidated.name=true
        break
      }
      case 'okUsername':{
        state.validatesRegister.isValidated.username=true
        state.validatesRegister.isInvalidated.username=false
        state.validatesRegister.errorUsers.username=''
        break
      }
      case 'falseUsername':{
        state.validatesRegister.isValidated.username=false
        state.validatesRegister.isInvalidated.username=true
        break
      }
      case 'okEmail':{
        state.validatesRegister.isValidated.email=true
        state.validatesRegister.isInvalidated.email=false
        state.validatesRegister.errorUsers.email=''
        break
      }
      case 'falseEmail':{
        state.validatesRegister.isValidated.email=false
        state.validatesRegister.isInvalidated.email=true
        break
      }
      case 'okPassword':{
        state.validatesRegister.isValidated.password=true
        state.validatesRegister.isInvalidated.password=false
        state.validatesRegister.errorUsers.password=''
        break
      }
      case 'falsePassword':{
        state.validatesRegister.isValidated.password=false
        state.validatesRegister.isInvalidated.password=true
        break
      }
      case 'okUsernameLogin':{
        state.validatesLogin.isValidated.username=true
        state.validatesLogin.isInvalidated.username=false
        state.validatesLogin.errorUsers.username=''
        state.response_api.login.failed=false
        break
      }
      case 'falseUsernameLogin':{
        state.validatesLogin.isValidated.username=false
        state.validatesLogin.isInvalidated.username=true
        break
      }
      case 'okPasswordLogin':{
        state.validatesLogin.isValidated.password=true
        state.validatesLogin.isInvalidated.password=false
        state.validatesLogin.errorUsers.password=''
        state.response_api.login.failed=false
        break
      }
      case 'falsePasswordLogin':{
        state.validatesLogin.isValidated.password=false
        state.validatesLogin.isInvalidated.password=true
         break
      }
      //
      // case payload.name:{
      //   state.validatesRegister.isValidated.name = false
      //   state.validatesRegister.isInvalidated.name = true
      //   state.validatesRegister.errorUsers.name = payload.name.toString()
      //   break
      // }
      // case payload.username:{
      //   state.validatesRegister.isValidated.username = false
      //   state.validatesRegister.isInvalidated.username = true
      //   state.validatesRegister.errorUsers.username = payload.username.toString()
      //   break
      // }
      // case payload.email:{
      //   state.validatesRegister.isValidated.email = false
      //   state.validatesRegister.isInvalidated.email = true
      //   state.validatesRegister.errorUsers.email = payload.email.toString()
      //   break
      // }
      // case payload.password:{
      //   state.validatesRegister.isValidated.password = false
      //   state.validatesRegister.isInvalidated.password = true
      //   state.validatesRegister.errorUsers.password = payload.password.toString()
      //   break
      // }
      //fullRegister
      case 'trueMeliNumberClerk':{
        state.validatesFullRegister.isValidated.meliNumber=true
        state.validatesFullRegister.isInvalidated.meliNumber=false
        break
      }
      case 'falseMeliNumberClerk':{
        state.validatesFullRegister.isValidated.meliNumber=false
        state.validatesFullRegister.isInvalidated.meliNumber=true
        break
      }
      case 'trueStreetClerk':{
        state.validatesFullRegister.isValidated.street=true
        state.validatesFullRegister.isInvalidated.street=false
        break
      }
      case 'falseStreetClerk':{
        state.validatesFullRegister.isValidated.street=false
        state.validatesFullRegister.isInvalidated.street=true
        break
      }
      case 'trueMeliNumberExpert':{
        state.validatesFullRegisterExpert.isValidated.meliNumber=true
        state.validatesFullRegisterExpert.isInvalidated.meliNumber=false
        break
      }
      case 'falseMeliNumberExpert':{
        state.validatesFullRegisterExpert.isValidated.meliNumber=false
        state.validatesFullRegisterExpert.isInvalidated.meliNumber=true
        break
      }
      case 'trueStreetExpert':{
        state.validatesFullRegisterExpert.isValidated.street=true
        state.validatesFullRegisterExpert.isInvalidated.street=false
        break
      }
      case 'falseStreetExpert':{
        state.validatesFullRegisterExpert.isValidated.street=false
        state.validatesFullRegisterExpert.isInvalidated.street=true
        break
      }
      //Edit

      case 'trueNameClerkEdit':{
        state.validatesEdit.isValidated.name=true
        state.validatesEdit.isInvalidated.name=false
        break
      }
      case 'falseNameClerkEdit':{
        state.validatesEdit.isValidated.name=false
        state.validatesEdit.isInvalidated.name=true
        break
      }
      case 'trueUsernameClerkEdit':{
        state.validatesEdit.isValidated.username=true
        state.validatesEdit.isInvalidated.username=false
        break
      }
      case 'falseUsernameClerkEdit':{
        state.validatesEdit.isValidated.username=false
        state.validatesEdit.isInvalidated.username=true
        break
      }
      case 'trueEmailClerkEdit':{
        state.validatesEdit.isValidated.email=true
        state.validatesEdit.isInvalidated.email=false
        break
      }
      case 'falseEmailClerkEdit':{
        state.validatesEdit.isValidated.email=false
        state.validatesEdit.isInvalidated.email=true
        break
      }
      case 'trueMeliNumberClerkEdit':{
        state.validatesEdit.isValidated.meliNumber=true
        state.validatesEdit.isInvalidated.meliNumber=false
        break
      }
      case 'falseMeliNumberClerkEdit':{
        state.validatesEdit.isValidated.meliNumber=false
        state.validatesEdit.isInvalidated.meliNumber=true
        break
      }
      case 'trueStreetClerkEdit':{
        state.validatesEdit.isValidated.street=true
        state.validatesEdit.isInvalidated.street=false
        break
      }
      case 'falseStreetClerkEdit':{
        state.validatesEdit.isValidated.street=false
        state.validatesEdit.isInvalidated.street=true
        break
      }
    }
  },
  change_alerts(state,payload,x){
    if (payload==='falseUpdate'){
      state.alerts.update.default=false
    }

    if (payload==='آپدیت با موفقیت انجام شد'){
      state.alerts.update.default=true
      state.alerts.update.value=payload
    }
  },
  SELECT_DATA_USER (state, payload) {
    console.log(payload.user)
    state.userDatas.id = payload.user.id
    state.userDatas.name = payload.user.name
    state.userDatas.username = payload.user.username
    state.userDatas.email = payload.user.email
    if(payload.user.meliNumber){
      state.userDatas.meliNumber = payload.user.meliNumber
    }
    if (payload.user.role){
      state.userDatas.role = payload.user.role
    }
    if(payload.user.city){
      state.userDatas.city = payload.user.city
    }
    if (payload.user.street){
      state.userDatas.street = payload.user.street
    }
    if(payload.user.avatar){
      state.userDatas.avatar = payload.user.avatar
    }
    // if (payload.user.meliFile){
    //   state.userDatas.meliFile = payload.user.meliFile
    // }
    // if (payload.user.madrakFile){
    //   state.userDatas.madrakFile = payload.user.madrakFile
    // }
    // if (payload.user.centerFile){
    //   state.userDatas.centerFile = payload.user.centerFile
    // }
    // if (payload.user.expertFile){
    //   state.userDatas.expertFile = payload.user.expertFile
    // }
  },
  initialiseStore(state) {
    if(localStorage.getItem('store')) {
      this.replaceState(
        Object.assign(state, JSON.parse(localStorage.getItem('store')))
      );
    }
  },
  change_response_api_dashboard(state,payload){
    if (payload.result){
      state.response_api.dashboard.default=payload.result
    }
    if (payload==='false'){
      state.response_api.dashboard.default=false
    }
    if (payload==='trueUserPanel'){
      state.response_api.dashboard.panelUser=true
    }
  },
  RESET_DATA_COMPONENT_LOGIN(state){
    state.validatesLogin.isValidated.username=false
    state.validatesLogin.isValidated.password=false
    state.validatesLogin.isInvalidated.username=false
    state.validatesLogin.isInvalidated.password=false
    state.validatesLogin.btnStatus=true
    state.validatesLogin.errorUsers.username=''
    state.validatesLogin.errorUsers.password=''
  },
  // RESET_DATA_FULL_REGISTER(state){
  //   state.validatesFullRegister.isInvalidated.meliNumber=false
  //   state.validatesFullRegister.isInvalidated.street=false
  //   state.validatesFullRegister.isInvalidated.city=false
  //   state.validatesFullRegister.isValidatedalidated.meliNumber=false
  //   state.validatesFullRegister.isValidatedalidated.city=false
  //   state.validatesFullRegister.isValidatedalidated.street=false
  //   state.validatesFullRegister.btnStatus=true
  //   state.validatesFullRegister.errorUsers.city=''
  //   state.validatesFullRegister.errorUsers.meliNumber=''
  //   state.validatesFullRegister.errorUsers.street=''
  // },
  RESET_STATE_DATA(state){
    // let newState={}
    // Object.keys(state).forEach(key =>{
    //   newState[key]=null
    // })
    // this.$store.replaceState(newState)
  },
  SET_PATH_PROFILE (state, payload) {
    state.userDatas.avatar = payload
  },
  SET_ALERT (state, payload) {
    state.alert_success_update.default = true
    state.alert_success_update.value = payload

  },
  SET_CITIES (state,payload){
    state.cities=payload
  },
  CATEGORIES(state,payload){
      state.categories=payload
  },
  SET_CASES(state,payload){
    state.casses=payload
  },
  // SET_CASE(state,payload){
  //   let casse=state.casses.find(casse =>casse.id==payload.id)
  // },
}
