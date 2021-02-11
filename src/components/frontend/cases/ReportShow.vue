<template>
  <div id="report_show">
    <div class="report_show bg-info">
      <div class="position-relative m-1 ml-4 order-0 order-sm-2">
        <img
          @click="back()"
          class="icon-back"
          src="@/assets/images/icons/arrow-115-32.png"
          alt=""
        />
      </div>
      <div>
        <ul
          class="d-flex flex-column justify-content-between align-items-start"
        >
          <li>
            نام کامل بیمار:
            <span v-text="caseItem.fullNameSick"></span>
          </li>
          <li>
            شماره ملی:
            <span v-text="caseItem.meliNumber"></span>
          </li>
        </ul>
      </div>
      <div id="show"
        class="w-100 d-flex flex-column justify-content-between align-items-start"
      >
        <div class="titr"><h5>گزارش:</h5></div>
        <div class="text-dark text-right p-2" v-text="caseItem.report"></div>
      </div>
      <div>
          <button class="btn btn-success" @click="verify_report()">تایید گزارش</button>
          <button class="btn btn-danger" @click="dontVerify_report()">رد گزارش</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ReportShow",
  data() {
    return {};
  },
  computed: {
    caseItem() {
      return this.$store.getters.caseItem(this.$route.params.id);
    },
  },
  methods: {
    back() {
      this.$store.dispatch("back");
    },
    verify_report(){
      this.$store.dispatch('verify_report',this.$route.params.id);
    },
    dontVerify_report(){
         this.$store.dispatch('dont_verify_report',this.$route.params.id);
    }
  },
};
</script>

<style scoped>
#report_show {
  width: 100%;
  position: relative;
  margin: auto;
  z-index: 10;
  border-radius: 5%;
}
.report_show {
  width: 80%;
  margin: auto;
  padding: 20px;
}
</style>