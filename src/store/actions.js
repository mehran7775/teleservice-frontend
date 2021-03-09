import Vue from 'vue'
import ApiService from '../apiService/ApiService'
import router from '../router'
import { resetState } from './index'
import Notifications from 'vue-notification'
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
Vue.use(Notifications);
Vue.use(Loading);
export default {
  get_home({ commit }) {
    ApiService.get('/')
      .then(response => {
        if (response.data.result === true && response.status === 200) {
          commit('change_response_api_home', response.data.result);
        }
      })
      .catch(error => {
        console.log(error.response)
      })
  },
  reset_state({ commit }) {
    commit('RESET_STATE')
  },
  back() {
    router.go(-1)
  },
  getRegister({ commit }) {
    ApiService.get('account/register', {
      headers: {
        'X-Request-With': 'XMLHttpRequest'
      }
    })
      .then(response => {
        if (response.data.result === 'ok' && response.status === 200) {
          commit('change_response_api_register', 'result')
          localStorage.setItem('csrf_token', response.data['csrf_token'])
          // this.$router.replace('/')//mohem
        }
      }).catch(error => {
        console.log(error)
      })
  },
  changeValidate({ commit }, payload) {
    commit('changeValidate', payload)
  },
  register({ commit }, form) {
    let loader = Vue.$loading.show({
      container: null,
      canCancel: false,
      onCancel: this.yourCallbackMethod,
      color: "#000000",
      loader: "spinner",
      width: 64,
      height: 64,
      backgroundColor: "#C0C0C1",
      opacity: 0.5,
      zIndex: 999,
    });
    ApiService.post('account/register', form, {
      headers: {
        'X-Request-With': 'XMLHttpRequest'
      }
    })
      .then(response => {
        loader.hide();
        if (response.data.success && response.status === 201) {
          console.log(response)
          Vue.notify({
            group: 'foo',
            type: 'success',
            text: response.data.success,
          })
          router.push({ path: '/' })
        }
      })
      .catch(error => {
        loader.hide();
        commit('changeValidate', error.response.data.errors)
      })
  },
  getLogin({ commit }) {
    const error = ApiService.get('account/login', {
      headers: {
        'X-Request-With': 'XMLHttpRequest'
      }
    })
      .then(response => {
        if (response.data.result === 'ok' && response.status === 200) {
          commit('change_response_api_login', 'result')
        }
      }).catch(error => {
        console.log(error)
      })
  },
  reset_data_component_login({ commit }) {
    commit('RESET_DATA_COMPONENT_LOGIN')
  },
  send_codeLogin_to_email({ commit }, payload) {
    let loader = Vue.$loading.show({
      container: null,
      canCancel: false,
      onCancel: this.yourCallbackMethod,
      color: "#000000",
      loader: "spinner",
      width: 64,
      height: 64,
      backgroundColor: "#C0C0C1",
      opacity: 0.5,
      zIndex: 999,
    });
    let email = new FormData();
    email.append('email', payload);
    ApiService.post('account/loginWithEmail', email, {
      headers: {
        'X-Request-With': 'XMLHttpRequest'
      }
    }).then(response => {
      if (response.status === 200) {
        loader.hide();
        Vue.notify({
          group: 'foo',
          type: 'success',
          text: response.data.result,
        })
        commit('LOGIN_WITH_EMAIL', true);
      }
    }).catch(error => {
      console.log(error)
    })
  },
  login_with_email({ commit }, form) {
    let loader = Vue.$loading.show({
      container: null,
      canCancel: false,
      onCancel: this.yourCallbackMethod,
      color: "#000000",
      loader: "spinner",
      width: 64,
      height: 64,
      backgroundColor: "#C0C0C1",
      opacity: 0.5,
      zIndex: 999,
    });
    ApiService.post('account/doLoginWithEmail', form, {
      headers: {
        'X-Request-With': 'XMLHttpRequest'
      }
    })
      .then(response => {
        // console.log(response);
        if (response.status === 200 && response.data.success) {
          loader.hide();
          localStorage.setItem('token', response.data.token)
          commit('SELECT_DATA_USER', response.data)
          Vue.notify({
            group: 'foo',
            type: 'success',
            text: response.data.success,
          })
          let date = new Date();
          let expired_date = date.setHours(date.getHours() + 4)
          localStorage.setItem('user_date_expired_at', expired_date)
          commit('change_response_api_login', response.data)
          router.push({ path: '/' })
        }
      }).catch(error => {
        loader.hide();
        commit('change_response_api_login', error.response.data);
      })
  },
  login({ commit }, form) {
    let loader = Vue.$loading.show({
      container: null,
      canCancel: false,
      onCancel: this.yourCallbackMethod,
      color: "#000000",
      loader: "spinner",
      width: 64,
      height: 64,
      backgroundColor: "#C0C0C1",
      opacity: 0.5,
      zIndex: 999,
    });
    ApiService.post('account/login', form, {
      headers: {
        'X-Request-With': 'XMLHttpRequest'
      }
    })
      .then(response => {
        if (response.status === 200 && response.data.success) {
          loader.hide();
          localStorage.setItem('token', response.data.token)
          commit('SELECT_DATA_USER', response.data)
          Vue.notify({
            group: 'foo',
            type: 'success',
            text: response.data.success,
          })
          let date = new Date();
          let expired_date = date.setHours(date.getHours() + 4)
          localStorage.setItem('user_date_expired_at', expired_date)
          commit('change_response_api_login', response.data)
          router.push({ path: '/' })
        }
        // console.log(response.data.failed)
      })
      .catch(error => {
        loader.hide();
        commit('change_response_api_login', error.response.data)
      })
  },
  logout({ commit }) {
    ApiService.post('account/logOut', null, {
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      }
    })
      .then(response => {
        resetState()
        this.dispatch('get_home');
        commit('change_response_api_logout', response.data)
        localStorage.removeItem('token')
        localStorage.removeItem('user_date_expired_at')
        Vue.notify({
          group: 'foo',
          type: 'warn',
          text: response.data.message,
        })
        router.push({ path: '/' })
      }).catch(error => {
        console.log(error)
      })
    //commit('change_response_api_logout',response.data)
  },
  getDashboard({ commit }) {
    ApiService.get('account/dashboard', {
      headers: {
        'X-Request-With': 'XMLHttpRequest',
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      }
    })
      // .then(() => null, err =>{});
      .then(response => {
        if (response.status === 200 && response.data.result === 'ok') {
          commit('change_response_api_dashboard', response.data)
        }
      }).catch(error => {
        console.log(error.response)
      }
      )
  },
  fullRegisterClerk({ commit }, user) {
    let loader = Vue.$loading.show({
      container: null,
      canCancel: false,
      onCancel: this.yourCallbackMethod,
      color: "#000000",
      loader: "spinner",
      width: 64,
      height: 64,
      backgroundColor: "#C0C0C1",
      opacity: 0.5,
      zIndex: 999,
    });
    let formClerk = new FormData();
    formClerk.append('meliNumber', user.meliNumber);
    formClerk.append('meliFile', user.meliFile);
    formClerk.append('centerFile', user.centerFile);
    formClerk.append('expertFile', user.expertFile);
    formClerk.append('city', user.city);
    formClerk.append('street', user.street);
    formClerk.append('role', 'clerk');
    ApiService.post('account/dashboard', formClerk, {
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      }
    })
      .then(response => {
        loader.hide();
        // console.log(response)
        let data = {
          id: response.data.id,
        }
        this.dispatch('showDashboard', data)
        commit('change_response_api_dashboard', 'trueUserPanel')
        router.replace({ name: 'userPanel', params: { id: response.data.id } })
      }).catch(error => {
        loader.hide();
        console.log(error.response)
      })
  },
  fullRegisterExpert({ commit }, userExpert) {
    let loader = Vue.$loading.show({
      container: null,
      canCancel: false,
      onCancel: this.yourCallbackMethod,
      color: "#000000",
      loader: "spinner",
      width: 64,
      height: 64,
      backgroundColor: "#C0C0C1",
      opacity: 0.5,
      zIndex: 999,
    });
    let formExpert = new FormData();
    formExpert.append('meliNumber', userExpert.meliNumber)
    formExpert.append('meliFile', userExpert.meliFile)
    formExpert.append('madrakFile', userExpert.madrakFile)
    formExpert.append('city', userExpert.city)
    formExpert.append('street', userExpert.street)
    formExpert.append('role', 'expert')
    ApiService.post('account/dashboard', formExpert, {
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      }
    })
      .then(response => {
        loader.hide();
        let data = {
          id: response.data.id
        }
        this.dispatch('showDashboard', data)
        commit('change_response_api_dashboard', 'trueUserPanel')
        router.replace({ name: 'userPanel', params: { id: response.data.id } })
        // commit('SET_ALERT', response.data.message)
      }).catch(error => {
        loader.hide();
        console.log(error.response)
      })
  },
  showDashboard({ commit }, data) {
    ApiService.get('account/dashboard/' + data.id, {
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      }
    })
      .then(response => {
        let item = {
          user: response.data.user,
        }
        commit('SELECT_DATA_USER', item)
      }).catch(error => {
        console.log(error.response)
      })
  },
  setProfile({ commit }, pic) {
    let loader = Vue.$loading.show({
      container: null,
      canCancel: true,
      onCancel: this.yourCallbackMethod,
      color: "#000000",
      loader: "spinner",
      width: 64,
      height: 64,
      backgroundColor: "#C0C0C1",
      opacity: 0.5,
      zIndex: 999,
    });
    let picture = new FormData()
    picture.append('profile', pic)
    ApiService.post('account/profile', picture, {
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      }
    })
      .then(response => {
        loader.hide();
        console.log(response.data)
        Vue.notify({
          group: 'foo',
          type: 'success',
          text: response.data.message,
        });
        this.dispatch('getProfile', response.data.name_profile)
      }).catch(error => {
        loader.hide();
        console.log(error)
      })
  },
  getProfile({ commit }, id) {
    ApiService.get('account/profile/' + id, {
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      }
    })
      .then(response => {
        console.log(response)
        commit('SET_PATH_PROFILE', response.data.avatar)
      }).catch(error => {
        console.log(error)
      })
  },
  updateProfile({ commit }, payload) {
    let loader = Vue.$loading.show({
      container: null,
      canCancel: true,
      onCancel: this.yourCallbackMethod,
      color: "#000000",
      loader: "spinner",
      width: 64,
      height: 64,
      backgroundColor: "#C0C0C1",
      opacity: 0.5,
      zIndex: 999,
    });
    let data = new FormData
    console.log(payload.name)
    data.append('_method', 'put')
    data.append('profile', payload.pic)
    ApiService.post('account/profile/' + payload.name, data, {
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      }
    })
      .then(response => {
        loader.hide();
        this.dispatch('getProfile', response.data.name_profile)
      }).catch(error => {
        loader.hide();
        console.log(error)
      })
  },
  reset_state_data({ commit }) {
    commit('RESET_STATE_DATA')
  },
  update_user({ commit }, payload) {
    let loader = Vue.$loading.show({
      container: null,
      canCancel: false,
      onCancel: this.yourCallbackMethod,
      color: "#000000",
      loader: "spinner",
      width: 64,
      height: 64,
      backgroundColor: "#C0C0C1",
      opacity: 0.5,
      zIndex: 999,
    });
    let user = payload.user
    let formData = new FormData()
    formData.append('name', user.name)
    formData.append('username', user.username)
    formData.append('email', user.email)
    formData.append('meliNumber', user.meliNumber)
    if (user.meliFile) {
      formData.append('meliFile', user.meliFile)
    }
    if (user.centerFile) {
      formData.append('centerFile', user.centerFile)
    }
    if (user.expertFile) {
      formData.append('expertFile', user.expertFile)
    }
    if (user.madrakFile) {
      formData.append('madrakFile', user.madrakFile)
    }
    formData.append('city', user.city)
    formData.append('street', user.street)
    formData.append('_method', 'put')
    ApiService.post('account/dashboard/' + payload.id, formData
      , {
        headers: {
          'X-Request-With': 'XMLHttpRequest',
          'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
      }).then(response => {
        loader.hide();
        this.dispatch('showDashboard', payload)
        commit('change_alerts', response.data.message)
      }).catch(error => {
        loader.hide();
        console.log(error)
      })
  },
  get_cities({ commit }) {
    ApiService.get('cities', {
      headers: {
        'X-Request-With': 'XMLHttpRequest'
      }
    })
      .then(response => {
        let cities = []
        response.data.forEach(function (object, i) {
          cities[i] = response.data[i].name
        })
        // console.log(Object.assign({},cities))
        let data = Object.assign({}, cities)
        commit('SET_CITIES', data)
      })
      .catch(error => {
        console.log(error)
      })
  },
  services({ commit }) {
    ApiService.get('services', {
      headers: {
        'Accept': 'application/json',
      }
    }).then(response => {
      commit('change_response_api_services', response.data.result);
    }).catch(error => {

    })
  },
  caseUpload({ commit }, payload) {
    let loader = Vue.$loading.show({
      container: null,
      canCancel: false,
      onCancel: this.yourCallbackMethod,
      color: "#000000",
      loader: "spinner",
      width: 64,
      height: 64,
      backgroundColor: "#C0C0C1",
      opacity: 0.5,
      zIndex: 999,
    });
    const data = new FormData();
    data.append('full_name', payload.fullNameSick);
    data.append('number_meli', payload.meliNumber);
    data.append('category', payload.category);
    data.append('caseFile', payload.caseFile);
    data.append('expired_at', payload.time);
    ApiService.post('case', data, {
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      }
    }).then(response => {
      loader.hide();
      Vue.notify({
        group: 'foo',
        type: 'success',
        text: response.data,
      });
      this.dispatch('get_casses');
    }).catch(error => {
      loader.hide();
      console.log(error.response)
    })
  },
  get_categories({ commit }) {
    ApiService.get('categories', {
      headers: {
        'Accept': 'application/json'
      }
    }).then(response => {
      commit('CATEGORIES', response.data)
    }).catch(error => {
      console.log(error.response)
    })
  },
  get_casses({ commit }) {
    ApiService.get('case', {
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      }
    }).then(response => {
      if (response.status === 200) {
        commit('SET_CASES', response.data)
      }
    }).catch(error => {
      console.log(error.reponse)
    })
  },
  update_case({ commit }, payload) {
    let loader = Vue.$loading.show({
      container: null,
      canCancel: false,
      onCancel: this.yourCallbackMethod,
      color: "#000000",
      loader: "spinner",
      width: 64,
      height: 64,
      backgroundColor: "#C0C0C1",
      opacity: 0.5,
      zIndex: 999,
    });
    const data = new FormData();
    data.append('full_name', payload.case.fullNameSick);
    data.append('number_meli', payload.case.meliNumber);
    data.append('category', payload.case.category);
    if (payload.case.file) {
      data.append('caseFile', payload.case.file)
    }
    data.append('expired_at', payload.case.expired_at);
    data.append('_method', 'put')
    ApiService.post('case/' + payload.case.id, data, {
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      }
    }).then(response => {
      loader.hide();
      Vue.notify({
        group: 'foo',
        type: 'success',
        text: response.data.message,
      });
      this.dispatch('back');
    }).catch(error => {
      loader.hide();
      console.log(error.response)
    })
  },
  remove_case({ commit }, payload) {
    let res = null
    ApiService.delete('case/' + payload, {
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      }
    }).then(response => {
      Vue.notify({
        group: 'foo',
        type: 'success',
        text: response.data.message,
      });
      this.dispatch('get_casses')
      res = true
    }).catch(error => {
      Vue.notify({
        group: 'foo',
        type: 'warn',
        text: error.response.data.message,
      });
      res = false
    })
    return res
  },
  download({ commit }, payload) {
    ApiService.get('download/' + payload, {
      headers: {
        'Accept': 'application/pdf',
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      },
      responseType: 'blob'
    }).then(response => {
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      let r = Math.random().toString(20).substring(2);
      link.setAttribute('download', 'file-case-' + r + '.pdf');
      document.body.appendChild(link);
      link.click();
    }).catch(error => {
      console.log(error)
    })
  },
  register_report({ commit }, payload) {
    let loader = Vue.$loading.show({
      container: null,
      canCancel: false,
      onCancel: this.yourCallbackMethod,
      color: "#000000",
      loader: "spinner",
      width: 64,
      height: 64,
      backgroundColor: "#C0C0C1",
      opacity: 0.5,
      zIndex: 999,
    });
    const data = new FormData();
    data.append('report', payload.report);
    data.append('id', payload.id);
    ApiService.post('report', data, {
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      }
    }).then(response => {
      loader.hide();
      Vue.notify({
        group: 'foo',
        type: 'success',
        text: response.data.message,
      });
      this.dispatch('back');
    }).catch(error => {
      loader.hide();
      console.log(error);
    })
  },
  verify_report({ commit }, payload) {
    let loader = Vue.$loading.show({
      container: null,
      canCancel: false,
      onCancel: this.yourCallbackMethod,
      color: "#000000",
      loader: "spinner",
      width: 64,
      height: 64,
      backgroundColor: "#C0C0C1",
      opacity: 0.5,
      zIndex: 999,
    });
    const data = new FormData;
    data.append('id', payload);
    ApiService.post('verifyReport', data, {
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      }
    }).then(response => {
      loader.hide();
      Vue.notify({
        group: 'foo',
        type: 'success',
        text: response.data.message,
      });
      this.dispatch('back');
    }).catch(error => {
      loader.hide();
      console.log(error)
    })
  },
  dont_verify_report({ commit }, payload) {
    let loader = Vue.$loading.show({
      container: null,
      canCancel: false,
      onCancel: this.yourCallbackMethod,
      color: "#000000",
      loader: "spinner",
      width: 64,
      height: 64,
      backgroundColor: "#C0C0C1",
      opacity: 0.5,
      zIndex: 999,
    });
    const data = new FormData;
    data.append('id', payload);
    ApiService.post('dontVerifyReport', data, {
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      }
    }).then(response => {
      loader.hide();
      // console.log;(response);
      Vue.notify({
        group: 'foo',
        type: 'success',
        text: response.data.message,
      });
      this.dispatch('back');
    }).catch(error => {
      loader.hide();
      console.log(error)
    })
  },
  get_wallet({ commit }) {
    ApiService.get('wallet', {
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      }
    }).then(response => {
      commit('SET_WALLET', response.data.wallet)
    }).catch(error => {
      console.log(error)
    })
  }
}
