ا<template>
  <div class="container-fluid" v-if="response_api.services">
    <Header></Header>
    <div class="row mt-4 mt-sm-5">
      <div class="body">
        <div class="back-img">
          <img src="@/assets/72.jpg" alt="error to uploaded image" />
        </div>
        <div id="content">
          <div class="col-12 bg-white">
            <div
              class="row"
              v-if="
                userDatas.role &&
                userDatas.role === 'clerk' &&
                userDatas.meliNumber &&
                userDatas.meliNumber !== '0'
              "
            >
              <div class="col" id="clerk">
                <transition
                  enter-active-class="animate__animated animate__fadeIn"
                >
                  <router-view name="default"></router-view>
                  <router-view name="caseShow"></router-view>
                  <router-view name="reportShow"></router-view>
                </transition>
              </div>
            </div>
            <div
              class="row"
              v-else-if="
                userDatas.role &&
                userDatas.role === 'expert' &&
                userDatas.meliNumber &&
                userDatas.meliNumber !== '0'
              "
            >
              <div class="w-100 p-4">
                <transition
                  enter-active-class="animate__animated animate__fadeIn"
                >
                  <router-view name="reportRegister"></router-view>
                </transition>
                <transition
                  enter-active-class="animate__animated animate__fadeIn"
                
                >
                  <router-view name="casesExpert"></router-view>
                </transition>
              </div>
            </div>
            <div v-else-if="response_api.login.successCallbackLogin===false">درسایت لاگین کنید و مراحل تکمیل ثبت نام را انجام دهید</div>
            <div v-else> مراحل تکمیل ثبت نام را انجام دهید</div>
          </div>
        </div>
      </div>
    </div>
    <Footer></Footer>
  </div>
</template>

<script>
import Header from "./layout/Header-view";
import Footer from "./layout/Footer-view";
import Cases from "@/components/frontend/cases/Cases";

export default {
  name: "Services",
  components: {
    Header,
    Footer,
    Cases,
  },
  data() {
    return {};
  },
  computed: {
    userDatas() {
      return this.$store.getters.userDatas;
    },
    response_api() {
      return this.$store.getters.response_api;
    },
    categories() {
      return this.$store.getters.categories;
    },
  },
  beforeCreate() {
    this.$store.dispatch("services");
    this.$store.dispatch("get_categories");
  },
  // updated(){
  //     this.$store.dispatch('get_cases')
  // },

  // mounted () {
  // },

  // beforeRouteUpdate(to, from, next) {
  //   this.caseItemShow ? this.caseItemShow=false : this.caseItemShow=true;
  //   next() //make sure you always call next()
  // },
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
#clerk {
  background-color: #a2bbc5;
}
</style>
