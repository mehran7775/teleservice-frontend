<template>
  <div id="app">
    <PageLoader :is-loaded="response_api.home" />
    <notifications group="foo" />
    <!--    <transition enter-active-class="animate__animated animate__fadeInDown" leave-active-class="fadeOutDown" >-->
    <!--    </transition>-->
    <transition enter-active-class="animate__animated animate__fadeIn">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
import ApiService from "./apiService/ApiService";
import PageLoader from "./components/frontend/loader/PageLoader";
export default {
  name: "App",
  components: { PageLoader },
  data() {
    return {
      result: false,
    };
  },
  created() {},
  computed: {
    response_api() {
      return this.$store.getters.response_api;
    },
  },
  beforeCreate() {
    this.$store.dispatch("get_home");
    let dt = new Date();
    let user_expired_at = localStorage.getItem("user_date_expired_at");
    if (
      user_expired_at == null ||
      user_expired_at <= dt.getTime() ||
      localStorage.getItem("token") == null
    ) {
      localStorage.removeItem("user_date_expired_at");
      localStorage.removeItem("token");
      localStorage.removeItem("store");
      this.$store.commit("change_response_api_login", "falseSuccessCallBack");
    } else {
      this.$store.commit("initialiseStore");
      this.$store.commit("change_response_api_login", "trueSuccessCallBack");
      this.$store.commit("change_response_api_logout", "empty");
    }
  },
};
</script>

<style>
@import "https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css";
#app {
  width: 100%;
  direction: rtl;
}
.alertUpdate {
  width: auto;
  padding: 4px;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 4px;
}
.icon-back {
  cursor: pointer;
}
.icon-back:hover {
  transform: translateX(-15%);
}
.cursor-pointer {
  cursor: pointer;
}
.back-img {
  width: 100%;
  height: 100%;
  position: fixed;
  /* z-index: 1; */
}
.back-img img {
  width: 100%;
  height: 100%;
  background-size: 100% 100%;
  background-repeat: no-repeat;
  background-position: center;
}
.notification-align {
  text-align: right;
  color: red;
}
@media screen and (max-width: 576px) {
  /*input,p,span,div{*/
  /*  font-size: 11px;*/
  /*}*/
  * {
    font-size: 14px;
  }
}
</style>
