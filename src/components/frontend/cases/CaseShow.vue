<template>
  <div id="caseShow">
    <div class="case bg-info">
      <div class="position-relative m-1 ml-4 order-0 order-sm-2">
        <img
          @click="back()"
          class="icon-back"
          src="@/assets/images/icons/arrow-115-32.png"
          alt=""
        />
      </div>
      <div
        class="form-group d-flex flex-column justify-content-between align-items-start"
      >
        <div class="form-inline">
          <label for="fullName">نام کامل بیمار:</label>
          <input
            :class="[
              inValidated.fullName ? 'is-invalid' : null,
              validated.fullName ? 'is-valid' : null,
              'form-control mr-1',
            ]"
            type="text"
            name="fullName"
            id="fullName"
            ref="fullName"
            v-model="caseItem.fullNameSick"
            @input="validate(caseItem.fullNameSick, 'fullName')"
          />
        </div>
        <br />
        <div class="form-inline">
          <label for="meliNumber">شماره ملی:</label>
          <input
            :class="[
              inValidated.meliNumber ? 'is-invalid' : null,
              validated.meliNumber ? 'is-valid' : null,
              'form-control mr-1',
            ]"
            type="text"
            name="meliNumber"
            id="meliNumber"
            ref="meliNumber"
            v-model="caseItem.meliNumber"
            @input="validate(caseItem.meliNumber, 'meliNumber')"
          />
        </div>
        <br />
        <div class="form-inline">
          <label for="expired_at">زمان:</label>
          <input
            :class="[
              inValidated.expired_at ? 'is-invalid' : null,
              validated.expired_at ? 'is-valid' : null,
              'form-control mr-1',
            ]"
            type="time"
            name="expired_at"
            id="expired_at"
            ref="expired_at"
            v-model="caseItem.expired_at"
            @input="validate('time')"
          />
        </div>
        <br>
        <div class="form-inline">
          <label for="category">حوزه تخصص:</label>
          <select
            class="form-control mr-1"
            name="category"
            id="category"
            ref="category"
            v-model="caseItem.category"
            @change="validate()"
          >
            <option :selected="caseItem.category" v-for="category in categories" v-text="category"></option>
          </select>
        </div>
        <br />
        <div class="form-inline">
          <label for="radiolojyFile">فایل رادیولوژی:</label>
          <input
            class="mr-1"
            type="file"
            name="radiolojyFile"
            id="radiolojyFile"
            ref="radiolojyFile"
            @change="validate()"
          />
        </div>
        <div class="mt-4 mr-3">
          <button
            :disabled="btnStatus"
            class="btn btn-success cursor-pointe"
            @click="update()"
          >
            ثبت
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CaseShow",
  data() {
    return {
      sick: {
        id:"",
        fullNameSick: "",
        meliNumber: "",
        expired_at: "",
        file: "",
        category:""
      },
      btnStatus: true,
      validated: {
        fullName: "",
        meliNumber: "",
        expired_at: "",
        file: "",
      },
      inValidated: {
        fullName: "",
        meliNumber: "",
        expired_at: "",
        file: "",
      },
      okValidate: {
        fullName: 0,
        meliNumber: 0,
        expired_at: 0,
        file: 0,
      },
    };
  },
  mounted() {
    // console.log(this.$route.params.id)
    // this.id = this.$route.params.id;
  },
  computed: {
    caseItem() {
      return this.$store.getters.caseItem(this.$route.params.id);
    },
    regularExpression() {
      return this.$store.getters.regularExpression;
    },
    categories(){
        return this.$store.getters.categories
      }
  },
  methods: {
    back() {
      this.$store.dispatch("back");
    },
    validate(x = null, id = null) {
      let t=this.$refs.expired_at.value.split(":",2)
      this.sick.expired_at=t[0]+':'+t[1]
      // console.log(t[0]+':'+t[1])
      this.sick.category = this.$refs.category.value;
      if (typeof this.$refs.radiolojyFile.files[0] !== "undefined") {
        this.$refs.radiolojyFile.files[0]["type"] === "application/pdf"
          ? (this.validated.file = true,
            this.inValidated.file = false,
            this.okValidate.file = 1 ,
            this.sick.file = this.$refs.radiolojyFile.files[0])
          : (this.inValidated.file = true,
            this.validated.file = false,
            this.okValidate.file = 2,
            alert("فایل باید ازنوع pdf باشد."));
      }
      if (x === "") {
        let el = document.getElementById(id);
        el.classList.remove("is-invalid");
      } else {
        switch (x) {
          case this.caseItem.fullNameSick: {
            let res = x.match(
              /^([ضصثقفغعهخحجچپشسیبلاتنمکگظطزرذدئو]{3,15})[ ]([ضصثقفغعهخحجچپشسیبلاتنمکگظطزرذدئو]{3,15})$/
            );
            if (res) {
              this.validated.fullName = true;
              this.inValidated.fullName = false;
              this.okValidate.fullName = 1;
            } else {
              this.validated.fullName = false;
              this.inValidated.fullName = true;
              this.okValidate.fullName = 2;
            }
            break;
          }
          case this.caseItem.meliNumber: {
            let res = x.match(/^[0-9]{10}$/g);
            if (res) {
              this.validated.meliNumber = true;
              this.inValidated.meliNumber = false;
              this.okValidate.meliNumber = 1;
            } else {
              this.validated.meliNumber = false;
              this.inValidated.meliNumber = true;
              this.okValidate.meliNumber = 2;
            }
            break;
          }
          case 'time':{
             this.sick.expired_at = this.$refs.expired_at.value;
             break;
          }
        }
      }
      if (
        (this.okValidate.fullName === 0 || this.okValidate.fullName === 1) &&
        (this.okValidate.meliNumber === 0 ||
          this.okValidate.meliNumber === 1) &&
        (this.okValidate.file === 0 || this.okValidate.file === 1) &&
        this.sick.expired_at
      ) {
        this.btnStatus = false;
        this.sick.fullNameSick = this.$refs.fullName.value;
        this.sick.meliNumber = this.$refs.meliNumber.value;
      } else {
        this.btnStatus = true;
      }
    },
    update() {
       this.sick.id=this.caseItem.id;
      // console.log(this.sick)
      let data={
        case:this.sick
      }
      this.$store.dispatch("update_case",data);
    },
  },
};
</script>

<style scoped>
#caseShow {
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
</style>