<template>
  <div :class="[(report && status===0) ? 'study' : (report && status===1) ? 'end':'notStudy', 'case overflow-hidden']">
    <transition enter-active-class="animate__animated animate__fadeIn">
      <div v-if="delete_case">
        <div class="text-right p-2">
          <span>آیا میخواهید این مورد را حذف کنید؟</span>
        </div>
        <div class="d-flex align-items-center justify-content-center">
          <div class="butMe" @click="remove(id)">
            <button class="btn">بله</button>
          </div>
          <div class="butMe mr-2" @click="alert_remove()">
            <button class="btn">خیر</button>
          </div>
        </div>
      </div>
    </transition>
    <transition enter-active-class="animate__animated animate__fadeIn">
      <div v-if="!delete_case">
        <div
          id="edit_delete"
          @mouseover="dropdown()"
          @mouseleave="hideDropDown()"
        >
          <div class="d-flex justify-content-center">
            <img src="@/assets/images/icons/arrow-216-24.png" alt="" />
          </div>
          <div
            class="dropDown"
            v-if="showDropDown && userDatas.role == 'clerk'"
          >
            <ul>
              <li :class="[status===1 ? 'disabled': null]" @click="caseShow(id)">ویرایش</li>
              <li @click="alert_remove()">حذف</li>
              <li @click="download()">دانلود</li>
              <li :class="[status===1 ? 'disabled': null]" v-if="report" @click="reportShow(id)">استعلام گزارش</li>
            </ul>
          </div>
          <div
            class="dropDown"
            v-if="showDropDown && userDatas.role === 'expert'"
          >
            <ul>
              <li @click="download()">دانلود</li>
              <!-- <li @click="Delete()">حذف</li> -->
              <li :class="[report ? 'disabled' : null]" @click="register_report(id)">ثبت گزارش</li>
            </ul>
          </div>
        </div>
        <div class="d-flex flex-column w-100">
          <div >
            <ul class="info">
              <li>
                نام بیمار:
                <span v-text="name"></span>
              </li>
              <li>
                کدملی بیمار:
                <span v-text="meliNumber"></span>
              </li>
              <li>
                حوزه تخصص:
                <span v-text="category"></span>
              </li>
              <!-- <li>زمان ثبت:
                <span v-text="created_at"></span>
            </li> -->
              <li>
                تا ساعت:
                <span v-text="expired_at"></span>
              </li>
              <li>
                قیمت:
                <span v-text="cost + ' تومان'"></span>
              </li>
              <li>
                حالت:
                <span v-if="!report" v-text="'بررسی نشده'"></span>
                <span v-else-if="report && status===0" v-text="'تعویق'"></span>
                <span v-else-if="status===1" v-text="'بررسی شده'"></span>
              </li>
              <li v-if="report && userDatas.role==='clerk'">
                گزارش:
                <span v-text="report"></span>
              </li>
            </ul>
          </div>
          <!-- <div v-if="report" v-text="report">

          </div> -->
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: "Case",
  props: {
    id: "",
    name: "",
    meliNumber: "",
    category: "",
    status: "",
    expired_at: "",
    created_at: "",
    report: "",
    name_file: "",
    cost:""
  },
  // props: [
  //   "id",
  //   "name",
  //   "meliNumber",
  //   "category",
  //   "status",
  //   "expired_at",
  //   "created_at",
  //   "report",
  // "delete"
  // ],
  data() {
    return {
      showDropDown: false,
      showItemDelete: false,
      delete_case: false,
    };
  },
  methods: {
    caseShow(id) {
      this.$router.push({ name: "case-show", params: { id: id } });
    },
    reportShow(id){
      this.$router.push({name:"report-show",params:{id:id}});
    },
    dropdown() {
      this.showDropDown = true;
    },
    hideDropDown() {
      this.showDropDown = false;
    },
    alert_remove() {
      this.delete_case = !this.delete_case;
      // this.$store.commit('ALER_DELETE_CASE',this.delete_case)
    },
    remove(id) {
      let x = this.$store.dispatch("remove_case", id);
      this.delete_case = !x;
    },
    download() {
      this.$store.dispatch("download", this.name_file);
    },
    register_report(id) {
      this.$router.push({ name: "register-report", params: { id: id } });
    },
  },
  computed: {
    userDatas() {
      return this.$store.getters.userDatas;
    },
  },
};
</script>
<style lang="css" scoped>
.case {
  width: 180px;
  height:300px;
  border-radius: 8px;
  margin-top: 3%;
  margin-bottom: 1%;
  cursor: pointer;
  opacity: 0.95;
}
.case:hover {
  transform: translateY(-4%);
}
.info {
  width: 100%;
  text-align: right;
  padding: 8px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-content: center;
}
.info li {
  list-style: none;
  width: 100%;
}
.study {
  background-color: #fde5a3;
  box-shadow: 1px 1px 1px rgb(216, 190, 119);
}
.notStudy {
  background-color: rgb(202, 152, 169);
  box-shadow: 1px 1px 1px rgb(207, 143, 143);
}
.end{
   background-color: rgb(155, 207, 125);
    box-shadow: 1px 1px 1px rgb(138, 184, 111);
}
#edit_delete {
  position: inherit;
  left: 0;
  top: 0;
  z-index: 4;
  float: left;
  margin: 4%;
  border-radius: 10%;
  overflow: hidden;
  text-align: right;
}
.dropDown ul li:hover {
  font-weight: bold;
  transform: translateY(-2px);
}
#itemDelete {
  widows: 100%;
  height: 100%;
  position: absolute;
  z-index: 9999;
  top: 0;
  left: 0;
  opacity: 0.8;
  background: blue;
}
.butMe button:hover {
  font-weight: bold;
  transform: translateY(-2px);
}
ul li {
  list-style: none;
}
.disabled {
    pointer-events:none;
    opacity:0.6;
}
/* .h {
  height: 10%;
}
.full_h {
  height: 27%;
} */
/* #edit-delete:hover{
    animation: dropdown 1s;
}
@keyframes dropdown{
    0%{
        height: 10%;
    }
    100%{
        height: 27%;
    }
} */
</style>