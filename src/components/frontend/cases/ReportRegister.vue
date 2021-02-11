<template>
  <div id="report">
    <div class="case bg-info">
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
      <div
        id="register_report"
        class="w-100 d-flex flex-column justify-content-between align-items-start"
      >
        <div class="titr"><h5>گزارش را وارد کنید:</h5></div>
        <div class="texterea mt-2">
          <textarea
            class="w-100 p-2"
            dir="rtl"
            id="content_report"
            ref="report"
          ></textarea>
        </div>
        <div>
          <input
            @click="register_report()"
            class="btn btn-success mr-5"
            type="button"
            value="ثبت"
          />
          
        </div>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  name: "ReportRegister",
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
    register_report() {
      let val = this.$refs.report.value;
      if (val === "") {
        content_report.focus();
        content_report.placeholder='لطفا گزارش را وارد کنید';
      } else {
        if (val.length > 2000) {
          alert("تعدا کاراکترها بیشتراز حد مجاز است");
        } else {
          let t = this.caseItem.expired_at.split(":", 2);
          this.caseItem.expired_at = t[0] + ":" + t[1];
          let data = {
            id: this.caseItem.id,
            report: val,
          };
          this.$store.dispatch("register_report",data);
        }
      }
    },
  },
};
</script>


<style scoped>
#report {
  width: 100%;
  position: relative;
  margin: auto;
  z-index: 10;
  border-radius: 5%;
}
.case {
  width: 80%;
  margin: auto;
  padding: 20px;
}
.texterea {
  width: 90%;
  margin: auto;
}
.texterea textarea {
  height: 250px;
}
</style>