<template>
  <div>
    <div v-if="response_api.dashboard" id="dashboard">
      <div class="float-left m-1 ml-4">
        <img
          @click="back()"
          class="icon-back"
          src="../../../assets/images/icons/arrow-115-32.png"
          alt=""
        />
      </div>
      <tabs>
        <tab name="متصدی رادیولوژی" :selected="true">
          <div class="panel">
            <div class="w-100 p-2">
              <div class="w-25" v-show="alerts.update.default">
                <div class="alertUpdate bg-success">
                  <div>{{ alerts.update.value }}</div>
                  <div>
                    <span
                      class="close"
                      @click="
                        this.$store.commit('change_alerts', 'falseUpdate')
                      "
                      >&times;</span
                    >
                  </div>
                </div>
              </div>
              <div class="rowMy">
                <div class="title h4">تکمیل ثبت نام:</div>
              </div>
              <br />
              <div class="rowMy">
                <div class="col-12 col-sm-6 form-inline">
                  <label for>کدملی:</label>
                  <input
                    type="text"
                    id="meliNumber"
                    :class="[
                      validates.isInvalidated.meliNumber ? 'is-invalid' : null,
                      validates.isValidated.meliNumber ? 'is-valid' : null,
                      'form-control w-50 mr-2',
                    ]"
                    v-model="formClerk.meliNumber"
                    @input="checkValidate(formClerk.meliNumber, 'meliNumber')"
                  />
                </div>
                <br />
                <div class="col-6">
                  <div class="form-inline">
                    <label for>کپی کارت ملی:</label>
                    <input
                      type="file"
                      class="form-control-file w-50 mr-2"
                      name="meliFile"
                      ref="meliFile"
                      @change="checkValidate"
                    />
                  </div>
                  <small class="text-primary">(فرمت:jpg)</small>
                </div>
              </div>
              <br />
              <div class="rowMy">
                <div class="col-12 col-sm-6 form-inline">
                  <label for>بارگزاری مدرک تخصصی صاحب رادیولوژی:</label>
                  <input
                    type="file"
                    class="form-control-file files mr-2"
                    name="expertFile"
                    ref="expertFile"
                    @change="checkValidate"
                  />
                  <small class="text-primary">(فرمت:pdf/اختیاری)</small>
                </div>
                <div class="col-6 form-inline">
                  <label for>بارگزاری پروانه تاسیس مرکز رادیولوژی:</label>
                  <input
                    type="file"
                    class="form-control-file files mr-2"
                    name="centerFile"
                    ref="centerFile"
                    @change="checkValidate"
                  />
                  <!--                    value="userDatas.centerFile"-->
                  <small class="text-primary">(فرمت:pdf)</small>
                </div>
              </div>
              <br />
              <div class="rowMy">
                <div class="col-6 form-inline">
                  <label for="cityClerk">شهر:</label>
                  <select
                    name="cityClerk"
                    id="cityClerk"
                    class="form-control"
                    v-model="formClerk.city"
                    @change="checkValidate"
                  >
                    <option v-for="city in cities" v-text="city"></option>
                  </select>
                </div>
                <br />
                <div class="col-12 col-sm-6 form-inline">
                  <label for>خیابان:</label>
                  <input
                    type="text"
                    id="street"
                    :class="[
                      validates.isInvalidated.street ? 'is-invalid' : null,
                      validates.isValidated.street ? 'is-valid' : null,
                      'form-control w-50 mr-2',
                    ]"
                    v-model="formClerk.street"
                    @input="checkValidate(formClerk.street, 'street')"
                  />
                </div>
              </div>
              <input
                type="submit"
                value="ثبت"
                class="btn btn-success float-right mt-3 mr-4"
                :disabled="btnStatus"
                @click="fullRegisterClerk()"
              />
            </div>
          </div>
        </tab>
        <tab name="متخصص رادیولوژی">
          <div class="panel">
            <div class="w-100 p-2">
              <div class="w-25" v-show="alerts.update.default">
                <div class="alertUpdate bg-success">
                  <div>{{ alerts.update.value }}</div>
                  <div>
                    <span
                      class="close"
                      @click="
                        this.$store.commit('change_alerts', 'falseUpdate')
                      "
                      >&times;</span
                    >
                  </div>
                </div>
              </div>
              <div class="rowMy">
                <div class="title h4">تکمیل ثبت نام:</div>
              </div>
              <br />
              <div class="rowMy">
                <div class="col-12 col-sm-6 form-inline">
                  <label for="meliNumberExpert">کدملی:</label>
                  <input
                    type="text"
                    id="meliNumberExpert"
                    :class="[
                      validatesExpert.isInvalidated.meliNumber
                        ? 'is-invalid'
                        : null,
                      validatesExpert.isValidated.meliNumber
                        ? 'is-valid'
                        : null,
                      'form-control w-50 mr-2',
                    ]"
                    v-model="formExpert.meliNumber"
                    @input="
                      checkValidateExpert(formExpert.meliNumber, 'meliNumber')
                    "
                  />
                </div>
                <br />
                <div class="col-12 col-sm-6 form-inline">
                  <div class="form-inline">
                    <label for>کپی کارت ملی:</label>
                    <input
                      type="file"
                      class="form-control-file w-50 mr-2"
                      name="meliFileExpert"
                      ref="meliFileExpert"
                      @change="checkValidateExpert"
                    />
                  </div>
                  <small class="text-primary">(فرمت:jpg)</small>
                </div>
              </div>
              <br />
              <div class="rowMy">
                <div class="col-12 col-sm-6 form-inline">
                  <label for>بارگزاری مدرک فایل تخصص:</label>
                  <input
                    type="file"
                    class="form-control-file files mr-2"
                    name="madrakFile"
                    ref="madrakFile"
                    @change="checkValidateExpert"
                  />
                  <small class="text-primary">(فرمت:pdf)</small>
                </div>
              </div>
              <br />
              <div class="rowMy">
                <div class="col-6 form-inline">
                  <label for="cityExpert">شهر:</label>
                  <select
                    id="cityExpert"
                    class="form-control"
                    v-model="formExpert.city"
                    @change="checkValidate"
                  >
                    <option v-for="city in cities" v-text="city"></option>
                  </select>
                </div>
                <br />
                <div class="col-12 col-sm-6 form-inline">
                  <label for="streetExpert">خیابان:</label>
                  <input
                    type="text"
                    id="streetExpert"
                    :class="[
                      validatesExpert.isInvalidated.street
                        ? 'is-invalid'
                        : null,
                      validatesExpert.isValidated.street ? 'is-valid' : null,
                      'form-control w-50 mr-2',
                    ]"
                    v-model="formExpert.street"
                    @input="checkValidateExpert(formExpert.street, 'street')"
                  />
                </div>
              </div>
              <input
                type="submit"
                value="ثبت"
                class="btn btn-success float-right mt-3 mr-4"
                :disabled="btnStatusExpert"
                @click="fullRegisterExpert()"
              />
            </div>
          </div>
        </tab>
      </tabs>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import Form from "vform";
import Tabs from "@/components/frontend/tabs/Tabs";
import Tab from "@/components/frontend/tabs/Tab";
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";
Vue.use(Loading);
export default {
  name: "Dashboard",
  components: {
    Tabs,
    Tab,
  },
  data() {
    return {
      formClerk: new Form({
        meliNumber: "",
        meliFile: "",
        centerFile: "",
        expertFile: "",
        city: "",
        street: "",
      }),
      formExpert: new Form({
        meliNumber: "",
        meliFile: "",
        madrakFile: "",
        city: "",
        street: "",
      }),
      btnStatus: true,
      btnStatusExpert: true,
    };
  },
  computed: {
    response_api() {
      return this.$store.getters.response_api;
    },
    userDatas() {
      return this.$store.getters.userDatas;
    },
    alerts() {
      return this.$store.getters.alerts;
    },
    validates() {
      return this.$store.getters.validatesFullRegister;
    },
    validatesExpert() {
      return this.$store.getters.validatesFullRegisterExpert;
    },
    regularExpression() {
      return this.$store.getters.regularExpression;
    },
    cities() {
      return this.$store.getters.cities;
    },
  },
  beforeCreate() {
    this.$store.dispatch("getDashboard");
    this.$store.dispatch("get_cities");
  },
  methods: {
    back() {
      this.$store.dispatch("back");
    },
    checkValidate(x = null, id = null) {
      if (x === "") {
        let el = document.getElementById(id);
        el.classList.remove("is-invalid");
      } else {
        switch (x) {
          case this.formClerk.meliNumber: {
            let res = x.match(/^[0-9]{10}$/g);
            if (res) {
              this.$store.dispatch("changeValidate", "trueMeliNumberClerk");
            } else {
              this.$store.dispatch("changeValidate", "falseMeliNumberClerk");
            }
            break;
          }
          case this.formClerk.street: {
            let res = x.match(/^[ضصثقفغعهخحجچپشسیبلاتنمکگظطزرذدئو]{3,15}$/);
            if (res) {
              this.$store.dispatch("changeValidate", "trueStreetClerk");
            } else {
              this.$store.dispatch("changeValidate", "falseStreetClerk");
            }
            break;
          }
        }
      }
      this.formClerk.centerFile = this.$refs.centerFile.files[0];
      this.formClerk.meliFile = this.$refs.meliFile.files[0];
      this.formClerk.expertFile = this.$refs.expertFile.files[0];
      if (this.formClerk.meliFile) {
        if (this.formClerk.meliFile["type"] !== "image/jpeg") {
          alert("فرمت باید بصورت jpeg باشد");
        }
      }
      if (this.formClerk.centerFile) {
        if (this.formClerk.centerFile["type"] !== "application/pdf") {
          alert("فرمت باید بصورت pdf باشد");
        }
      }
      if (this.formClerk.expertFile) {
        if (this.formClerk.expertFile["type"] !== "application/pdf") {
          alert("فرمت باید بصورت pdf باشد");
        }
      }
      var status;
      if (this.formClerk.centerFile && this.formClerk.meliFile) {
        if (
          this.formClerk.meliFile["type"] === "image/jpeg" &&
          this.formClerk.centerFile["type"] === "application/pdf"
        ) {
          status = true;
          if (this.formClerk.expertFile) {
            if (this.formClerk.expertFile["type"] === "application/pdf") {
              status = true;
            } else {
              status = false;
            }
          }
        } else {
          status = false;
        }
      } else {
        status = false;
      }
      this.btnStatus = !(
        this.validates.isValidated.meliNumber &&
        this.validates.isValidated.street &&
        this.formClerk.city &&
        status
      );
    },
    checkValidateExpert(x = null, id = null) {
      if (x === "") {
        let el = document.getElementById(id);
        el.classList.remove("is-invalid");
      } else {
        switch (x) {
          case this.formExpert.meliNumber: {
            let res = x.match(/^[0-9]{10}$/g);
            if (res) {
              this.$store.dispatch("changeValidate", "trueMeliNumberExpert");
            } else {
              this.$store.dispatch("changeValidate", "falseMeliNumberExpert");
            }
            break;
          }
          case this.formExpert.street: {
            let res = x.match(/^[ضصثقفغعهخحجچپشسیبلاتنمکگظطزرذدئو]{3,15}$/);
            if (res) {
              this.$store.dispatch("changeValidate", "trueStreetExpert");
            } else {
              this.$store.dispatch("changeValidate", "falseStreetExpert");
            }
            break;
          }
        }
      }
      this.formExpert.meliFile = this.$refs.meliFileExpert.files[0];
      this.formExpert.madrakFile = this.$refs.madrakFile.files[0];
      if (this.formExpert.meliFile) {
        if (this.formExpert.meliFile["type"] !== "image/jpeg") {
          alert("فرمت باید بصورت jpeg باشد");
        }
      }
      if (this.formExpert.madrakFile) {
        if (this.formExpert.madrakFile["type"] !== "application/pdf") {
          alert("فرمت باید بصورت pdf باشد");
        }
      }
      var status2;
      if (this.formExpert.madrakFile && this.formExpert.meliFile) {
        if (
          this.formExpert.meliFile["type"] === "image/jpeg" &&
          this.formExpert.madrakFile["type"] === "application/pdf"
        ) {
          status2 = true;
        } else {
          status2 = false;
        }
      } else {
        status2 = false;
      }
      this.btnStatusExpert = !(
        this.validatesExpert.isValidated.meliNumber &&
        this.validatesExpert.isValidated.street &&
        this.formExpert.city &&
        status2
      );
    },
    fullRegisterClerk() {
      this.$store.dispatch("fullRegisterClerk", this.formClerk);
    },
    fullRegisterExpert() {
      this.$store.dispatch("fullRegisterExpert", this.formExpert);
    },
  },
};
</script>

<style scoped>
.panel {
  width: 100%;
  background-color: rgba(145, 174, 184, 0.86);
  display: flex;
}

#dashboard {
  width: 100%;
  background-color: rgba(171, 184, 152, 0.86);
  /*margin: auto;*/
  border-radius: 2px;
  text-align: right;
}

.rowMy {
  width: 100%;
  display: flex;
}

.is-none {
  border: none;
}

@media screen and (max-width: 576px) {
  .rowMy {
    flex-direction: column;
  }
}
</style>
