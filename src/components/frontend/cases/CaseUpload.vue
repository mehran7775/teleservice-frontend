<template>
  <div>
    <div class="case-upload">
      <div class="title-case-upload">
        <h5 class="text-dark text-right">آپلود کردن فایل های رادیولوژی:</h5>
      </div>
      <div class="w-100">
        <div class="form-group">
          <div
            class="d-flex justify-content-center align-items-start flex-wrap"
          >
            <div class="form-inline p-2">
              <label for="fullNameSick">نام کامل بیمار:</label>
              <input
                type="text"
                v-model="formCase.fullNameSick"
                @input="validate(formCase.fullNameSick, 'fullNameSick')"
                name="fullNameSick"
                id="fullNameSick"
                :class="[
                  inValidate.fullNameSick ? 'is-invalid' : null,
                  isValidate.fullNameSick ? 'is-valid' : null,
                  'form-control mr-1',
                ]"
              />
            </div>
            <div class="form-inline p-2 mr-2">
              <label for="meliNumber" class="">شماره ملی بیمار:</label>
              <input
                type="text"
                v-model="formCase.meliNumber"
                @input="validate(formCase.meliNumber, 'meliNumber')"
                name="meliNumber"
                id="meliNumber"
                :class="[
                  inValidate.meliNumber ? 'is-invalid' : null,
                  isValidate.meliNumber ? 'is-valid' : null,
                  'form-control mr-1',
                ]"
              />
            </div>
            <div class="form-inline mr-2 p-2">
              <label for="category">حوزه تخصص:</label>
              <select
                class="form-control mr-1"
                name="category"
                id="category"
                v-model="formCase.category"
              >
                <option
                  v-for="category in categories"
                  v-text="category"
                ></option>
              </select>
            </div>
            <div class="form-inline p-2 mr-2">
              <label for="meliNumber" class="">مدت زمان :</label>
              <input
                type="time"
                v-model="formCase.time"
                name="time"
                id="time"
                @change="validate()"
                class="form-control mr-1"
              />
            </div>
            <div class="form-inline p-2 mr-2">
              <label for="radiologyFile">فایل رادیولوژی:</label>
              <input
                type="file"
                @change="validate()"
                name="radiologyFile"
                ref="radiologyFile"
                id="radiologyFile"
                class="mr-1"
              />
              <small class="text-primary">(فرمت:pdf)</small>
            </div>
          </div>
        </div>
        <!--                    <input type="button" class="btn btn-success ml-5" value="ثبت"-->
        <!--                    @click="showCase"-->
        <!--                    >-->
        <div>
          <b-button
            disabled="true"
            class="btn btn-success"
            id="show-btn"
            @click="$bvModal.show('bv-modal-example')"
            >ثبت</b-button
          >
          <b-modal v-if="showModal" id="bv-modal-example" hide-footer>
            <template #modal-title> Case </template>
            <div>
              <div>
                <span>state:0</span>
              </div>
              <div id="info">
                <ul class="d-flex flex-column justify-content-between">
                  <li>
                    مشخصات بیمار:
                    <span v-text="formCase.fullNameSick"></span>
                  </li>
                  <br />
                  <li>
                    شماره ملی:
                    <span v-text="formCase.meliNumber"></span>
                  </li>
                  <br />
                  <!--                              <li class="form-inline">-->
                  <!--                                <label for="cast">مبلغ موردنظر:</label>-->
                  <!--                                <input type="text" id="cast" name="cast" v-model="formCase.cast" @input="validate(formCase.cast,'cast')" placeholder="به ریال وارد شود"-->
                  <!--                                 :class="[ inValidate.cast ? 'is-invalid' :null , isValidate.cast ? 'is-valid':null,-->
                  <!--                                  'form-control mr-1']"-->
                  <!--                                >-->
                  <!--                              </li>-->
                  <li>
                    حوزه تخصص:
                    <span v-text="formCase.category"></span>
                  </li>
                  <br />
                  <li>
                    مدت زمان:
                    <span v-text="formCase.time"></span>
                  </li>
                </ul>
              </div>
            </div>
            <b-button
              class="btn btn-success mt-3 w-25 float-right"
              block
              @click="register()"
              >ثبت</b-button
            >
          </b-modal>
        </div>
      </div>
    </div>
    <div class="cases">
      <cases></cases>
    </div>
  </div>
</template>

<script>
import Form from "vform";
import Cases from "@/components/frontend/cases/Cases";
export default {
  name: "CaseUpload",
  components: {
    Cases,
  },
  data() {
    return {
      formCase: new Form({
        fullNameSick: "",
        meliNumber: "",
        category: "",
        time: "",
        caseFile: ""
      }),
      isValidate: {
        fullNameSick: "",
        meliNumber: "",
        expertId: "",
        cast: "",
      },
      inValidate: {
        fullNameSick: "",
        meliNumber: "",
        expertId: "",
        cast: "",
      },
      btnStatus: true,
      showModal: false,
      btnStatusModal: true,
    };
  },
  computed: {
    response_api() {
      return this.$store.getters.response_api;
    },
    userDatas() {
      return this.$store.getters.userDatas;
    },
    regularExpression() {
      return this.$store.getters.regularExpression;
    },
    categories() {
      return this.$store.getters.categories;
    },
  },
  beforeCreate() {
    
  },
  methods: {
    validate(x = null, id = null) {
      let okCaseFile = false;
      this.formCase.caseFile = this.$refs.radiologyFile.files[0];
      if (this.formCase.caseFile) {
        if (this.formCase.caseFile["type"] === "application/pdf") {
          okCaseFile = true;
        } else {
          alert("فرمت باید بصورت pdf باشد");
          okCaseFile = false;
        }
      }
      if (x === "") {
        let el = document.getElementById(id);
        el.classList.remove("is-invalid");
      } else {
        switch (x) {
          case this.formCase.fullNameSick: {
            let res = x.match(
              /^([ضصثقفغعهخحجچپشسیبلاتنمکگظطزرذدئو]{3,15})[ ]([ضصثقفغعهخحجچپشسیبلاتنمکگظطزرذدئو]{3,15})$/
            );
            if (res) {
              this.isValidate.fullNameSick = true;
              this.inValidate.fullNameSick = false;
            } else {
              this.inValidate.fullNameSick = true;
              this.isValidate.fullNameSick = false;
            }
            break;
          }
          case this.formCase.meliNumber: {
            let res = x.match(/^[0-9]{10}$/g);
            if (res) {
              this.isValidate.meliNumber = true;
              this.inValidate.meliNumber = false;
            } else {
              this.inValidate.meliNumber = true;
              this.isValidate.meliNumber = false;
            }
            break;
          }
        }
      }
      if (
        this.isValidate.fullNameSick &&
        this.isValidate.meliNumber &&
        this.formCase.category &&
        okCaseFile &&
        this.formCase.time
      ) {
        this.btnStatus = false;
        this.showModal = true;
      } else {
        this.btnStatus = true;
        this.showModal = false;
      }
    },
    register() {
      // let time=new Date().getHours()+':'+new Date().getMinutes()
      this.$store.dispatch("caseUpload", this.formCase);
      this.$bvModal.hide("bv-modal-example");
      //  this.$forceUpdate();
    },
  },
};
</script>

<style scoped>
.case-upload {
  width: 100%;
  padding: 2px;
}
.title-case-upload {
  width: auto;
  height: auto;
  padding: 5px;
}
.title-case-upload h5 {
  margin: 1%;
}
ul li {
  list-style: none;
}
#info {
  direction: rtl;
  text-align: right;
  padding: 5px;
  box-sizing: border-box;
}
input{
  border: none; /* remove the border so we fake it better */
  outline: none; /* remove the outline so we fake it better */
}
</style>