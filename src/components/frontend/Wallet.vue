<template>
  <div class="container-fluid" v-if="userDatas.role === 'expert'">
    <header-view />
    <div class="row mt-3 mt-sm-5">
      <div class="w-100 bg-danger">
        <div class="float-left m-1 ml-4">
          <img
            @click="back()"
            class="icon-back"
            src="@/assets/images/icons/arrow-115-32.png"
            alt=""
          />
        </div>
        <div class="float-right p-3">
          موجودی:
          <span v-text="userDatas.wallet"></span>
        </div>
      </div>
    </div>
    <footer-view></footer-view>
  </div>
</template>


<script>
import HeaderView from "@/components/frontend/layout/Header-view";
import FooterView from "@/components/frontend/layout/Footer-view";
export default {
  name: "Wallet",
  components: { HeaderView, FooterView },
  beforeCreate() {
    this.$store.dispatch("get_wallet");
  },
  computed: {
    userDatas() {
      return this.$store.getters.userDatas;
    },
  },
  methods: {
      back() {
        this.$store.dispatch("back");
      },
    },
};
</script>


<style scoped>
</style>