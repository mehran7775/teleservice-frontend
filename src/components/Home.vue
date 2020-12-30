<template>
  <div class="container-fluid" v-if="response_api.home">
    <Header></Header>
    <div class="row mt-4 mt-sm-5" >
      <div class="body">
        <div class="back-img">
          <img src="../assets/72.jpg" alt="error to uploaded image">
        </div> 
        <div id="content">
          <div class="col-12 bg-white">
            <div class="d-flex justify-content-start p-3">
              <router-link v-if="response_api.login.successCallbackLogin && userDatas.role==='0' && userDatas.meliNumber==='0'"
               class="btn btn-info" :to="{name:'dashboard'}">پنل کاربری</router-link>
              <router-link v-if="userDatas.role && userDatas.role!=='0' && userDatas.meliNumber && userDatas.meliNumber!=='0'"
                           class="btn btn-info" :to="{name:'userPanel' ,params:{id:userDatas.id}}">پنل کاربری</router-link>
            </div>
            <div class="row">
              <transition enter-active-class="animate__animated animate__slideInRight" leave-active-class="animate__animated animate__slideOutLeft">
                <router-view name="userPanel" v-if="userDatas.role
               && userDatas.role!=='0'"/>
                <router-view name="dashboard"/>
              </transition>
              <transition enter-active-class="animate__animated animate__fadeInDown" leave-active-class="animate__animated animate__fadeOutDown">
                <router-view></router-view>
              </transition>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Footer></Footer>
<!--    <router-view name="userPanel"></router-view>-->
  </div>
</template>

<script>
  import Header from './frontend/layout/Header-view'
  import Footer from './frontend/layout/Footer-view'
  import Register from './frontend/sign_out/Register'
  import Login from './frontend/sign_out/Login'
  import Logout from './frontend/sign_out/Logout'
  import Vue from 'vue'
  import {mapState, mapGetters, mapMutations, mapActions} from 'vuex'
  import {store} from '../store'
  // import SweetAlertIcons from 'vue-sweetalert-icons';
  // Vue.use(SweetAlertIcons);
  export default {
    name: 'Home',
    components: {Header, Footer,Register,Login},
    data () {
      return {
        newLink: '',
        msg: '',
        user: {
          meliNumber: '',
          meliFile: '',
          centerFile: '',
          expertFile: '',
          street: '',
          city: '',
        },
        userExpert: {
          meliNumber: '',
          madrakFile: '',
          meliFile: '',
          street: '',
          city: ''
        },
        show: true,
        path_picture: '',
        errorsFormClerk: {
          minLength: {default: false, value: ''},
          maxLength: {default: false, value: ''},
          alphaString: {default: false, value: ''}
        },
        completeRegister: false,
        showPanel: false,
        userEditValidate: {
          okMeliNumber: 0,
          okMeliFile: 0,
          okCenterFile: 0,
          okExpertFile: 0,
          okStreet: 0,
          okMadrakFile: 0
        }
      }
    },
    computed: {
      response_api(){
        return this.$store.getters.response_api
      },
      userDatas(){
        return this.$store.getters.userDatas
      },
      ...mapState(['successCallbackLogin', 'userDatas', 'alert_success_update',
        'cities'
      ])
    },
    beforeCreate () {
      this.$store.dispatch('get_home');


    },
    mounted () {
    },
    methods: {
      setProfile () {
        let pic = this.$refs.picPro.files[0]
        if (pic && pic['type'] === 'image/jpeg') {
          this.$store.dispatch('setProfile', pic)
        } else {
          alert('no')
        }
      },
      uploadCheckEdit () {
        this.user.centerFile = this.$refs.centerFileEdit.files[0]
        this.user.meliFile = this.$refs.meliFileEdit.files[0]
        this.user.expertFile = this.$refs.expertFileEdit.files[0]
        this.user.meliNumber = this.$refs.meliNumberEdit.value
        this.user.street = this.$refs.streetEdit.value
        let el = document.getElementById('cityEdit')
        if (typeof el.options[el.selectedIndex] !== 'undefined') {
          this.user.city = el.options[el.selectedIndex].value
        }
        if (this.user.meliNumber) {
          if (this.user.meliNumber.match(store.state.regularExpression.reg_meliNumber)) {
            this.userEditValidate.okMeliNumber = 1
          } else {
            this.userEditValidate.okMeliNumber = 2
            alert('کدملی را صحیحح وارد کنید')
          }
        }
        if (this.user.street) {
          if (this.user.street.match(store.state.regularExpression.regName)) {
            this.userEditValidate.okStreet = 1
          } else {
            this.userEditValidate.okStreet = 2
            alert('نام خیابان را صحیح وارد کنید')
          }
        }
        if (this.user.meliFile) {
          if (this.user.meliFile['type'] === 'image/jpeg') {
            this.userEditValidate.okMeliFile = 1
          } else {
            this.userEditValidate.okMeliFile = 2
            alert('فرمت باید به صورت jpeg باشد')
          }
        }
        if (this.user.centerFile) {
          if (this.user.centerFile['type'] === 'application/pdf') {
            this.userEditValidate.okCenterFile = 1
          } else {
            this.userEditValidate.okCenterFile = 2
            alert('فرمت باید به صورت pdf باشد')
          }
        }
        if (this.user.expertFile) {
          if (this.user.expertFile['type'] === 'application/pdf') {
            this.userEditValidate.okExpertFile = 1
          } else {
            this.userEditValidate.okExpertFile = 2
            alert('فرمت باید به صورت pdf باشد')
          }
        }
        if ((this.userEditValidate.okMeliNumber === 0 || this.userEditValidate.okMeliNumber === 1) && (this.userEditValidate.okMeliFile === 0 || this.userEditValidate.okMeliFile === 1) && (this.userEditValidate.okCenterFile === 0 || this.userEditValidate.okCenterFile === 1)
          && (this.userEditValidate.okExpertFile === 0 || this.userEditValidate.okExpertFile === 1) && (this.userEditValidate.okStreet === 0 || this.userEditValidate.okStreet === 1)
          && (this.user.city || !this.user.city)) {
          this.btnStatus = false
        } else {
          this.btnStatus = true
        }

      },
      uploadCheckEditExpert () {
        this.userExpert.meliFile = this.$refs.meliFileEditExpert.files[0]
        this.userExpert.madrakFile = this.$refs.expertFileEditExpert.files[0]
        this.userExpert.meliNumber = this.$refs.meliNumberEditExpert.value
        this.userExpert.street = this.$refs.streetEditExpert.value
        this.userExpert.city = this.$refs.cityEditExpert.value
        if (this.userExpert.meliNumber) {
          if (this.userExpert.meliNumber.match(store.state.regularExpression.reg_meliNumber)) {
            this.userEditValidate.okMeliNumber = 1
          } else {
            this.userEditValidate.okMeliNumber = 2
            alert('کدملی را صحیحح وارد کنید')
          }
        }
        if (this.userExpert.street) {
          if (this.userExpert.street.match(store.state.regularExpression.regName)) {
            this.userEditValidate.okStreet = 1
          } else {
            this.userEditValidate.okStreet = 2
            alert('نام خیابان را صحیح وارد کنید')
          }
        }
        if (this.userExpert.meliFile) {
          if (this.userExpert.meliFile['type'] === 'image/jpeg') {
            this.userEditValidate.okMeliFile = 1
          } else {
            this.userEditValidate.okMeliFile = 2
            alert('فرمت باید به صورت jpeg باشد')
          }
        }
        if (this.userExpert.madrakFile) {
          if (this.userExpert.madrakFile['type'] === 'application/pdf') {
            this.userEditValidate.okExpertFile = 1
          } else {
            this.userEditValidate.okExpertFile = 2
            alert('فرمت باید به صورت pdf باشد')
          }
        }
        if ((this.userEditValidate.okMeliNumber === 0 || this.userEditValidate.okMeliNumber === 1) && (this.userEditValidate.okMeliFile === 0 || this.userEditValidate.okMeliFile === 1) && (this.userEditValidate.okMadrakFile === 0 || this.userEditValidate.okMadrakFile === 1)
          && (this.userEditValidate.okStreet === 0 || this.userEditValidate.okStreet === 1)
          && (this.userExpert.city || !this.userExpert.city)) {
          this.btnStatus = false
        } else {
          this.btnStatus = true
        }
      },
    }
  }
</script>

<style scoped>
  .body {
    width: 100%;
    position: relative;
  }

  /* #back-img {
    width: 100%;
    height: 600px;
    z-index: 1;
  }
  #back-img img {
    width: 100%;
    height: 100%;
    background-size: 100% 100%;
    background-repeat: no-repeat;
    background-position: center;
  } */
  #content{
    position: relative;
    z-index: 3;
    opacity: 0.8;
  }
  /*.alertMe {*/
  /*  width: 100%;*/
  /*  position: absolute;*/
  /*  z-index: 3;*/
  /*}*/
</style>
