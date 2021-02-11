<template>
  <div class="container-fluid" v-if="response_api.home">
    <Header></Header>
    <div class="row mt-4 mt-sm-5">
      <div class="body">
        <div class="back-img">
          <img src="../assets/72.jpg" alt="error to uploaded image" />
        </div>
        <div id="content">
          <div class="col-12 bg-white">
            <div class="d-flex justify-content-start p-3">
              <router-link
                v-if="
                  response_api.login.successCallbackLogin &&
                  userDatas.role === '0' &&
                  userDatas.meliNumber === '0'
                "
                class="btn-info router_link"
                :to="{ name: 'dashboard' }"
                >پنل کاربری</router-link
              >
              <router-link
                v-if="
                  userDatas.role &&
                  userDatas.role !== '0' &&
                  userDatas.meliNumber &&
                  userDatas.meliNumber !== '0'
                "
                class="btn-info router_link"
                :to="{ name: 'userPanel', params: { id: userDatas.id } }"
                >پنل کاربری</router-link
              >
            </div>
            <div class="row">
              <transition
                enter-active-class="animate__animated animate__slideInRight"
                leave-active-class="animate__animated animate__slideOutLeft"
              >
                <router-view
                  name="userPanel"
                  v-if="userDatas.role && userDatas.role !== '0'"
                />
                <router-view name="dashboard" />
              </transition>
              <transition
                enter-active-class="animate__animated animate__slideInRight"
                leave-active-class="animate__animated animate__slideOutLeft"
              >
                <router-view></router-view>
              </transition>
            </div>
            <div id="slide">
              <slide/>
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
import Vue from "vue";

import Header from "./frontend/layout/Header-view";
import Footer from "./frontend/layout/Footer-view";
import Register from "./frontend/sign_out/Register";
import Login from "./frontend/sign_out/Login";
// import Logout from './frontend/sign_out/Logout'
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
// import {store} from '../store'
// import SweetAlertIcons from 'vue-sweetalert-icons';
// Vue.use(SweetAlertIcons);
import Slide from "@/components/frontend/slider/Slide";
import Slider from '@/components/frontend/slider/Slider'
export default {
  name: "Home",
  components: { Header, Footer, Register, Login, Slide,Slider },
  data() {
    return {
      newLink: "",
      msg: "",
      user: {
        meliNumber: "",
        meliFile: "",
        centerFile: "",
        expertFile: "",
        street: "",
        city: "",
      },
      userExpert: {
        meliNumber: "",
        madrakFile: "",
        meliFile: "",
        street: "",
        city: "",
      },
      show: true,
      path_picture: "",
      errorsFormClerk: {
        minLength: { default: false, value: "" },
        maxLength: { default: false, value: "" },
        alphaString: { default: false, value: "" },
      },
      completeRegister: false,
      showPanel: false,
      userEditValidate: {
        okMeliNumber: 0,
        okMeliFile: 0,
        okCenterFile: 0,
        okExpertFile: 0,
        okStreet: 0,
        okMadrakFile: 0,
      },
    };
  },
  computed: {
    response_api() {
      return this.$store.getters.response_api;
    },
    userDatas() {
      return this.$store.getters.userDatas;
    },
    ...mapState([
      "successCallbackLogin",
      "userDatas",
      "alert_success_update",
      "cities",
    ]),
  },
  beforeCreate() {
    this.$store.dispatch("get_home");
  },
  mounted() {},
  methods: {
    setProfile() {
      let pic = this.$refs.picPro.files[0];
      if (pic && pic["type"] === "image/jpeg") {
        this.$store.dispatch("setProfile", pic);
      } else {
        alert("no");
      }
    },
  },
};
</script>

<style scoped>
.body {
  width: 100%;
  position: relative;
}
#content {
  position: relative;
  z-index: 3;
  opacity: 0.8;
}
.router_link {
  width: 85px;
  height: 30px;
  text-align: center;
  display: inline-block;
  text-decoration: none;
  border-radius: 4px;
  padding: 2px;
  box-sizing: border-box;
}
#slide{
  /* background-color: rgba(145, 174, 184, 0.86); */
}
</style>
