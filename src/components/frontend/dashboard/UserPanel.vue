<template>
  <div class="w-100">
    <div class="panel" v-if="userDatas.role === 'clerk'">
      <div class="panel-right order-1 order-sm-0">
        <div>
          <span class="text-white" v-text="userDatas.name"></span>
        </div>
        <div class="picUser">
          <!-- <img :src="userDatas.avatar" alt=""> -->
          <div
            class="picUsers"
            title="پروفایل"
            :style="{ backgroundImage: 'url(' + userDatas.avatar + ')' }"
          >
            <input type="file" ref="picture" @change="setProfile()" />
          </div>
        </div>
        <div class="nav-info">
          <ul>
            <li>
              نام کاربری:
              <span v-text="userDatas.username"></span>
            </li>
            <li>
              ایمیل:
              <span v-text="userDatas.email"></span>
            </li>
            <li>
              شماره ملی:
              {{ userDatas.meliNumber }}
            </li>
            <li>
              شهر:
              {{ userDatas.city.toString() }}
            </li>
            <li>
              خیابان:
              {{ userDatas.street.toString() }}
            </li>
          </ul>
        </div>
      </div>
      <div class="panel-left order-2 order-sm-1">
        <div class="w-100">
          <div class="w-75 m-1" v-show="alerts.update.default">
            <div class="alertUpdate bg-success">
              <div>{{ alerts.update.value }}</div>
              <div>
                <span
                  style="cursor: pointer"
                  class="close"
                  @click="$store.commit('change_alerts', 'falseUpdate')"
                  >&times;</span
                >
              </div>
            </div>
          </div>
          <div>
            <div>
              <div class="float-right">
                <img
                  class="m-3 cursor-pointer"
                  width="32"
                  height="32"
                  src="../../../assets/images/icons/edit-property-32.png"
                  alt=""
                  @click="showPanelEdit = !showPanelEdit"
                  title="ویرایش"
                />
              </div>
            </div>
            <div>
              <transition name="bounce">
                <div class="mt-4" v-if="showPanelEdit">
                  <div class="rowMy">
                    <div class="col-12 col-sm-6 form-inline">
                      <label for="nameClerk">نام:</label>
                      <input
                        id="nameClerk"
                        type="text"
                        :class="[
                          validates.isInvalidated.name ? 'is-invalid' : null,
                          validates.isValidated.name ? 'is-valid' : null,
                          'form-control w-75 mr-2',
                        ]"
                        ref="nameClerk"
                        v-model="userDatas.name"
                        @input="validateClerk(userDatas.name, 'nameClerk')"
                      />
                    </div>
                    <br />
                    <div class="col-12 col-sm-6 form-inline">
                      <label for="usernameClerk">نام کاربری:</label>
                      <input
                        type="text"
                        :class="[
                          validates.isInvalidated.username
                            ? 'is-invalid'
                            : null,
                          validates.isValidated.username ? 'is-valid' : null,
                          'form-control w-75 mr-2',
                        ]"
                        id="usernameClerk"
                        name="usernameClerk"
                        ref="usernameClerk"
                        v-model="userDatas.username"
                        @input="
                          validateClerk(userDatas.username, 'usernameClerk')
                        "
                      />
                    </div>
                  </div>
                  <br />
                  <div class="rowMy">
                    <div class="col-12 col-sm-6 form-inline">
                      <label for="emailClerk">ایمیل:</label>
                      <input
                        type="email"
                        :class="[
                          validates.isInvalidated.email ? 'is-invalid' : null,
                          validates.isValidated.email ? 'is-valid' : null,
                          'form-control w-75 mr-2',
                        ]"
                        id="emailClerk"
                        name="emailClerk"
                        ref="emailClerk"
                        v-model="userDatas.email"
                        @input="validateClerk(userDatas.email, 'emailClerk')"
                      />
                    </div>
                  </div>
                  <br />
                  <div class="rowMy">
                    <div class="col-12 col-sm-6 form-inline">
                      <label for="meliNumberClerk">کدملی:</label>
                      <input
                        id="meliNumberClerk"
                        type="text"
                        :class="[
                          validates.isInvalidated.meliNumber
                            ? 'is-invalid'
                            : null,
                          validates.isValidated.meliNumber ? 'is-valid' : null,
                          'form-control w-50 mr-2',
                        ]"
                        ref="meliNumberClerk"
                        v-model="userDatas.meliNumber"
                        @input="
                          validateClerk(userDatas.meliNumber, 'meliNumberClerk')
                        "
                      />
                    </div>
                    <br />
                    <div class="col-12 col-sm-6 form-inline">
                      <label for="meliFileClerk">کپی کارت ملی:</label>
                      <input
                        type="file"
                        class="form-control-file w-50 mr-2"
                        id="meliFileClerk"
                        name="meliFileClerk"
                        ref="meliFileClerk"
                        @change="validateClerk()"
                      />
                      <small class="text-primary">(فرمت:png)</small>
                    </div>
                  </div>
                  <br />
                  <div class="rowMy">
                    <div class="col-12 col-sm-6 form-inline">
                      <label for="expertFileClerk"
                        >بارگزاری مدرک تخصصی صاحب رادیولوژی:</label
                      >
                      <input
                        type="file"
                        class="form-control-file files mr-2"
                        name="expertFileClerk"
                        id="expertFileClerk"
                        ref="expertFileClerk"
                        @change="validateClerk()"
                      />
                      <small class="text-primary">(فرمت:pdf)</small>
                    </div>
                    <div class="col-12 col-sm-6 form-inline">
                      <label for="centerFileClerk"
                        >بارگزاری پروانه تاسیس مرکز رادیولوژی:</label
                      >
                      <input
                        type="file"
                        class="form-control-file files mr-2"
                        name="centerFileClerk"
                        id="centerFileClerk"
                        ref="centerFileClerk"
                        @change="validateClerk()"
                      />
                      <small class="text-primary">(فرمت:pdf)</small>
                    </div>
                  </div>
                  <br />
                  <div class="rowMy">
                    <div class="col-6 form-inline">
                      <label for="cityClerk">شهر:</label>
                      <select
                        class="form-control mr-2"
                        id="cityClerk"
                        ref="cityClerk"
                        @change="validateClerk()"
                      >
                        <!--                        <option value="userDatas.city" v-text="userDatas.city"></option>-->
                        <option
                          :selected="userDatas.city"
                          v-for="city in cities"
                          v-text="city"
                        ></option>
                      </select>
                    </div>
                    <br />
                    <div class="col-12 col-sm-6 form-inline">
                      <label for="streetClerk">خیابان:</label>
                      <input
                        type="text"
                        id="streetClerk"
                        :class="[
                          validates.isInvalidated.street ? 'is-invalid' : null,
                          validates.isValidated.street ? 'is-valid' : null,
                          'form-control w-50 mr-2',
                        ]"
                        v-model="userDatas.street"
                        ref="streetClerk"
                        @input="validateClerk(userDatas.street, 'streetClerk')"
                      />
                    </div>
                  </div>
                  <input
                    type="submit"
                    value="ثبت"
                    class="btn btn-success float-right mt-3 mr-4"
                    :disabled="btnStatus"
                    @click="update('clerk')"
                  />
                </div>
              </transition>
            </div>
          </div>
        </div>
      </div>
      <div class="position-relative m-1 ml-4 order-0 order-sm-2">
        <img
          @click="back()"
          class="icon-back"
          src="../../../assets/images/icons/arrow-115-32.png"
          alt=""
        />
      </div>
    </div>
    <div class="panel" v-else-if="userDatas.role === 'expert'">
      <div class="panel-right order-1 order-sm-0">
        <div>
          <span class="text-white" v-text="userDatas.name"></span>
        </div>
        <div class="picUser">
          <div
            class="picUsers"
            title="پروفایل"
            :style="{ backgroundImage: 'url(' + userDatas.avatar + ')' }"
          >
            <input type="file" ref="pictureExpert" @change="setProfile()" />
          </div>
        </div>
        <div class="nav-info">
          <ul>
            <li>
              نام کاربری:
              <span v-text="userDatas.username"></span>
            </li>
            <li>
              ایمیل:
              <span v-text="userDatas.email"></span>
            </li>
            <li>
              شماره ملی:
              {{ userDatas.meliNumber }}
            </li>
            <li>
              شهر:
              {{ userDatas.city.toString() }}
            </li>
            <li>
              خیابان:
              {{ userDatas.street.toString() }}
            </li>
          </ul>
        </div>
      </div>
      <div class="panel-left order-2 order-sm-1">
        <div style="width: 100%">
          <div class="w-75 m-1" v-show="alerts.update.default">
            <div class="alertUpdate bg-success">
              <div>{{ alerts.update.value }}</div>
              <div>
                <span
                  style="cursor: pointer"
                  class="close"
                  @click="$store.commit('change_alerts', 'falseUpdate')"
                  >&times;</span
                >
              </div>
            </div>
          </div>
          <div>
            <div>
              <div class="float-right">
                <img
                  class="m-3 cursor-pointer"
                  width="32"
                  height="32"
                  src="../../../assets/images/icons/edit-property-32.png"
                  alt=""
                  @click="showPanelEdit = !showPanelEdit"
                />
                <!--                  <button-->
                <!--                    class="btn m-2 editBtn"-->
                <!--                    -->
                <!--                  >ویرایش-->
                <!--                  </button>-->
              </div>
            </div>
            <div>
              <transition name="bounce">
                <div class="mt-4" v-if="showPanelEdit">
                  <div class="rowMy">
                    <div class="col-12 col-sm-6 form-inline">
                      <label for="nameExpert">نام:</label>
                      <input
                        id="nameExpert"
                        type="text"
                        :class="[
                          validates.isInvalidated.name ? 'is-invalid' : null,
                          validates.isValidated.name ? 'is-valid' : null,
                          'form-control w-75 mr-2',
                        ]"
                        ref="nameExpert"
                        v-model="userDatas.name"
                        @input="validateExpert(userDatas.name, 'nameExpert')"
                      />
                    </div>
                    <br />
                    <div class="col-12 col-sm-6 form-inline">
                      <label for="usernameExpert">نام کاربری:</label>
                      <input
                        type="text"
                        :class="[
                          validates.isInvalidated.username
                            ? 'is-invalid'
                            : null,
                          validates.isValidated.username ? 'is-valid' : null,
                          'form-control w-75 mr-2',
                        ]"
                        id="usernameExpert"
                        name="usernameExpert"
                        ref="usernameExpert"
                        v-model="userDatas.username"
                        @input="
                          validateExpert(userDatas.username, 'usernameExpert')
                        "
                      />
                    </div>
                  </div>
                  <br />
                  <div class="rowMy">
                    <div class="col-12 col-sm-6 form-inline">
                      <label for="emailExpert">ایمیل:</label>
                      <input
                        type="email"
                        :class="[
                          validates.isInvalidated.email ? 'is-invalid' : null,
                          validates.isValidated.email ? 'is-valid' : null,
                          'form-control w-75 mr-2',
                        ]"
                        id="emailExpert"
                        name="emailExpert"
                        ref="emailExpert"
                        v-model="userDatas.email"
                        @input="validateExpert(userDatas.email, 'emailExpert')"
                      />
                    </div>
                  </div>
                  <br />
                  <div class="rowMy">
                    <div class="col-12 col-sm-6 form-inline">
                      <label for="meliNumberExpert">کدملی:</label>
                      <input
                        id="meliNumberExpert"
                        type="text"
                        :class="[
                          validates.isInvalidated.meliNumber
                            ? 'is-invalid'
                            : null,
                          validates.isValidated.meliNumber ? 'is-valid' : null,
                          'form-control w-50 mr-2',
                        ]"
                        ref="meliNumberExpert"
                        v-model="userDatas.meliNumber"
                        @input="
                          validateExpert(
                            userDatas.meliNumber,
                            'meliNumberExpert'
                          )
                        "
                      />
                    </div>
                    <br />
                    <div class="col-12 col-sm-6 form-inline">
                      <label for="meliFileExpert">کپی کارت ملی:</label>
                      <input
                        type="file"
                        class="form-control-file w-50 mr-2"
                        id="meliFileExpert"
                        name="meliFileExpert"
                        ref="meliFileExpert"
                        @change="validateExpert()"
                      />
                      <small class="text-primary">(فرمت:png)</small>
                    </div>
                  </div>
                  <br />
                  <div class="rowMy">
                    <div class="col-12 col-sm-6 form-inline">
                      <label for="madrakFile">بارگزاری مدرک تخصص:</label>
                      <input
                        type="file"
                        class="form-control-file files mr-2"
                        name="madrakFile"
                        id="madrakFile"
                        ref="madrakFile"
                        @change="validateExpert()"
                      />
                      <small class="text-primary">(فرمت:pdf)</small>
                    </div>
                  </div>
                  <br />
                  <div class="rowMy">
                    <div class="col-6 form-inline">
                      <label for="cityExpert">شهر:</label>
                      <select
                        class="form-control"
                        id="cityExpert"
                        ref="cityExpert"
                        @change="validateExpert()"
                      >
                        <!--                        <option value="userDatas.city" v-text="userDatas.city"></option>-->
                        <option
                          :selected="userDatas.city"
                          v-for="city in cities"
                          v-text="city"
                        ></option>
                      </select>
                    </div>
                    <br />
                    <div class="col-12 col-sm-6 form-inline">
                      <label for="streetExpert">خیابان:</label>
                      <input
                        type="text"
                        id="streetExpert"
                        :class="[
                          validates.isInvalidated.street ? 'is-invalid' : null,
                          validates.isValidated.street ? 'is-valid' : null,
                          'form-control w-50 mr-2',
                        ]"
                        v-model="userDatas.street"
                        ref="streetExpert"
                        @input="
                          validateExpert(userDatas.street, 'streetExpert')
                        "
                      />
                    </div>
                  </div>
                  <input
                    type="submit"
                    value="ثبت"
                    class="btn btn-success float-right mt-3 mr-4"
                    :disabled="btnStatus"
                    @click="update('expert')"
                  />
                </div>
              </transition>
            </div>
          </div>
        </div>
      </div>
      <div class="position-relative m-1 ml-4 order-0 order-sm-2">
        <img
          @click="back()"
          class="icon-back"
          src="../../../assets/images/icons/arrow-115-32.png"
          alt=""
        />
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import Form from "vform";
export default {
  name: "UserPanel",
  data() {
    return {
      showPanelEdit: false,
      user: new Form({
        name: "",
        username: "",
        email: "",
        meliNumber: "",
        meliFile: "",
        centerFile: "",
        expertFile: "",
        madrakFile: "",
        street: "",
        city: "",
      }),
      userExpert: {
        name: "",
        username: "",
        email: "",
        meliNumber: "",
        meliFile: "",
        madrakFile: "",
        street: "",
        city: "",
      },
      userEditValidate: {
        okName: 0,
        okUserName: 0,
        okEmail: 0,
        okMeliNumber: 0,
        okMeliFile: 0,
        okCenterFile: 0,
        okExpertFile: 0,
        okStreet: 0,
        okMadrakFile: 0,
      },
      btnStatus: true,
    };
  },
  beforeCreate() {
    this.$store.dispatch("get_cities");
    this.$store.dispatch("showDashboard",this.$route.params);
   
  },
  created() {
      if(this.$store.state.userDatas.avatar){
      this.$store.dispatch('getProfile',this.$store.state.userDatas.avatar)
    }
  },
  computed: {
    userDatas() {
      return this.$store.getters.userDatas;
    },
    cities() {
      return this.$store.getters.cities;
    },
    validates() {
      return this.$store.getters.validatesEdit;
    },
    regularExpression() {
      return this.$store.getters.regularExpression;
    },
    alerts() {
      return this.$store.getters.alerts;
    },
  },
  methods: {
    validateClerk(x = null, id = null) {
      this.user.city = this.$refs.cityClerk.value;
      if (typeof this.$refs.centerFileClerk !== "undefined") {
        this.user.centerFile = this.$refs.centerFileClerk.files[0];
      }
      if (typeof this.$refs.expertFileClerk !== "undefined") {
        this.user.expertFile = this.$refs.expertFileClerk.files[0];
      }
      if (typeof this.$refs.meliFileClerk !== "undefined") {
        this.user.meliFile = this.$refs.meliFileClerk.files[0];
      }
      if (x === "") {
        let el = document.getElementById(id);
        el.classList.remove("is-invalid");
      } else {
        switch (x) {
          case this.userDatas.name: {
            let res = x.match(/^[ضصثقفغعهخحجچپشسیبلاتنمکگظطزرذدئو]{3,15}$/);
            if (res) {
              this.$store.dispatch("changeValidate", "trueNameClerkEdit");
              this.userEditValidate.okName = 1;
            } else {
              this.$store.dispatch("changeValidate", "falseNameClerkEdit");
              this.userEditValidate.okName = 2;
            }
            break;
          }
          case this.userDatas.username: {
            let res = x.match(
              /^[a-zA_Zضصثقفغعهخحجچپشسیبلاتنمکگظطزرذآدئو0-9]{4,15}$/gi
            );
            if (res) {
              this.$store.dispatch("changeValidate", "trueUsernameClerkEdit");
              this.userEditValidate.okUserName = 1;
            } else {
              this.$store.dispatch("changeValidate", "falseUsernameClerkEdit");
              this.userEditValidate.okUserName = 2;
            }
            break;
          }
          case this.userDatas.email: {
            let res = x.match(
              /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
            if (res) {
              this.$store.dispatch("changeValidate", "trueEmailClerkEdit");
              this.userEditValidate.okEmail = 1;
            } else {
              this.$store.dispatch("changeValidate", "falseEmailClerkEdit");
              this.userEditValidate.okEmail = 2;
            }
            break;
          }
          case this.userDatas.meliNumber: {
            let res = x.match(/^[0-9]{10}$/g);
            if (res) {
              this.$store.dispatch("changeValidate", "trueMeliNumberClerkEdit");
              this.userEditValidate.okMeliNumber = 1;
            } else {
              this.$store.dispatch(
                "changeValidate",
                "falseMeliNumberClerkEdit"
              );
              this.userEditValidate.okMeliNumber = 2;
            }
            break;
          }
          case this.userDatas.street: {
            let res = x.match(/^[ضصثقفغعهخحجچپشسیبلاتنمکگظطزرذدئو ]{3,15}$/);
            if (res) {
              this.$store.dispatch("changeValidate", "trueStreetClerkEdit");
              this.userEditValidate.okStreet = 1;
            } else {
              this.$store.dispatch("changeValidate", "falseStreetClerkEdit");
              this.userEditValidate.okStreet = 2;
            }
            break;
          }
        }
      }
      if (this.user.meliFile) {
        if (this.user.meliFile["type"] === "image/jpeg") {
          this.userEditValidate.okMeliFile = 1;
        } else {
          this.userEditValidate.okMeliFile = 2;
          alert("فرمت باید به صورت jpeg باشد");
        }
      }
      if (this.user.centerFile) {
        if (this.user.centerFile["type"] === "application/pdf") {
          this.userEditValidate.okCenterFile = 1;
        } else {
          this.userEditValidate.okCenterFile = 2;
          alert("فرمت باید به صورت pdf باشد");
        }
      }
      if (this.user.expertFile) {
        if (this.user.expertFile["type"] === "application/pdf") {
          this.userEditValidate.okExpertFile = 1;
        } else {
          this.userEditValidate.okExpertFile = 2;
          alert("فرمت باید به صورت pdf باشد");
        }
      }
      if (
        (this.userEditValidate.okName === 0 ||
          this.userEditValidate.okName === 1) &&
        (this.userEditValidate.okUserName === 0 ||
          this.userEditValidate.okUserName === 1) &&
        (this.userEditValidate.okEmail === 0 ||
          this.userEditValidate.okEmail === 1) &&
        (this.userEditValidate.okMeliNumber === 0 ||
          this.userEditValidate.okMeliNumber === 1) &&
        (this.userEditValidate.okMeliFile === 0 ||
          this.userEditValidate.okMeliFile === 1) &&
        (this.userEditValidate.okCenterFile === 0 ||
          this.userEditValidate.okCenterFile === 1) &&
        (this.userEditValidate.okExpertFile === 0 ||
          this.userEditValidate.okExpertFile === 1) &&
        (this.userEditValidate.okStreet === 0 ||
          this.userEditValidate.okStreet === 1) &&
        this.user.city
      ) {
        this.user.name = this.$refs.nameClerk.value;
        this.user.username = this.$refs.usernameClerk.value;
        this.user.email = this.$refs.emailClerk.value;
        this.user.meliNumber = this.$refs.meliNumberClerk.value;
        this.user.street = this.$refs.streetClerk.value;
        this.btnStatus = false;
      } else {
        this.btnStatus = true;
      }
    },
    validateExpert(x = null, id = null) {
      this.user.city = this.$refs.cityExpert.value;
      if (typeof this.$refs.madrakFile !== "undefined") {
        this.user.madrakFile = this.$refs.madrakFile.files[0];
      }
      if (typeof this.$refs.meliFileExpert !== "undefined") {
        this.user.meliFile = this.$refs.meliFileExpert.files[0];
      }
      if (x === "") {
        let el = document.getElementById(id);
        el.classList.remove("is-invalid");
      } else {
        switch (x) {
          case this.userDatas.name: {
            let res = x.match(/^[ضصثقفغعهخحجچپشسیبلاتنمکگظطزرذدئو]{3,15}$/);
            if (res) {
              this.$store.dispatch("changeValidate", "trueNameClerkEdit");
              this.userEditValidate.okName = 1;
            } else {
              this.$store.dispatch("changeValidate", "falseNameClerkEdit");
              this.userEditValidate.okName = 2;
            }
            break;
          }
          case this.userDatas.username: {
            let res = x.match(
              /^[a-zA_Zضصثقفغعهخحجچپشسیبلاتنمکگظطزرذدئو0-9]{4,15}$/gi
            );
            if (res) {
              this.$store.dispatch("changeValidate", "trueUsernameClerkEdit");
              this.userEditValidate.okUserName = 1;
            } else {
              this.$store.dispatch("changeValidate", "falseUsernameClerkEdit");
              this.userEditValidate.okUserName = 2;
            }
            break;
          }
          case this.userDatas.email: {
            let res = x.match(
              /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
            if (res) {
              this.$store.dispatch("changeValidate", "trueEmailClerkEdit");
              this.userEditValidate.okEmail = 1;
            } else {
              this.$store.dispatch("changeValidate", "falseEmailClerkEdit");
              this.userEditValidate.okEmail = 2;
            }
            break;
          }
          case this.userDatas.meliNumber: {
            let res = x.match(/^[0-9]{10}$/g);
            if (res) {
              this.$store.dispatch("changeValidate", "trueMeliNumberClerkEdit");
              this.userEditValidate.okMeliNumber = 1;
            } else {
              this.$store.dispatch(
                "changeValidate",
                "falseMeliNumberClerkEdit"
              );
              this.userEditValidate.okMeliNumber = 2;
            }
            break;
          }
          case this.userDatas.street: {
            let res = x.match(/^[ضصثقفغعهخحجچپشسیبلاتنمکگظطزرذدئو ]{3,15}$/);
            if (res) {
              this.$store.dispatch("changeValidate", "trueStreetClerkEdit");
              this.userEditValidate.okStreet = 1;
            } else {
              this.$store.dispatch("changeValidate", "falseStreetClerkEdit");
              this.userEditValidate.okStreet = 2;
            }
            break;
          }
        }
      }
      if (this.user.meliFile) {
        if (this.user.meliFile["type"] === "image/jpeg") {
          this.userEditValidate.okMeliFile = 1;
        } else {
          this.userEditValidate.okMeliFile = 2;
          alert("فرمت باید به صورت jpeg باشد");
        }
      }
      if (this.user.madrakFile) {
        if (this.user.madrakFile["type"] === "application/pdf") {
          this.userEditValidate.okMadrakFile = 1;
        } else {
          this.userEditValidate.okMadrakFile = 2;
          alert("فرمت باید به صورت pdf باشد");
        }
      }
      if (
        (this.userEditValidate.okName === 0 ||
          this.userEditValidate.okName === 1) &&
        (this.userEditValidate.okUserName === 0 ||
          this.userEditValidate.okUserName === 1) &&
        (this.userEditValidate.okEmail === 0 ||
          this.userEditValidate.okEmail === 1) &&
        (this.userEditValidate.okMeliNumber === 0 ||
          this.userEditValidate.okMeliNumber === 1) &&
        (this.userEditValidate.okMeliFile === 0 ||
          this.userEditValidate.okMeliFile === 1) &&
        (this.userEditValidate.okMadrakFile === 0 ||
          this.userEditValidate.okMadrakFile === 1) &&
        (this.userEditValidate.okStreet === 0 ||
          this.userEditValidate.okStreet === 1) &&
        this.user.city
      ) {
        this.user.name = this.$refs.nameExpert.value;
        this.user.username = this.$refs.usernameExpert.value;
        this.user.email = this.$refs.emailExpert.value;
        this.user.meliNumber = this.$refs.meliNumberExpert.value;
        this.user.street = this.$refs.streetExpert.value;
        this.btnStatus = false;
      } else {
        this.btnStatus = true;
      }
    },
    update(name) {
      this.$store.dispatch("update_user", {
        user: this.user,
        id: this.$route.params.id,
      });
    },
    setProfile() {
      let picClerk = null;
      let picExpert = null;
      // if(pic['type'] === "image/jpeg")
      if (
        typeof this.$refs.picture !== "undefined" &&
        this.userDatas.role === "clerk"
      ) {
        picClerk = this.$refs.picture.files[0];
        if (picClerk["type"] === "image/jpeg" && picClerk["size"] <= 2500000) {
          if(this.userDatas.avatar){
            let s=this.userDatas.avatar.split('/')
            let data={
              pic:picClerk,
              name:s[s.length -1]
            }
            this.$store.dispatch('updateProfile',data)
          }else{
            this.$store.dispatch("setProfile",picClerk);
          }
        } else if (picClerk["type"] !== "image/jpeg") {
          alert("فایل باید با فرمت jpg باشد.");
        } else if (picClerk["size"] > 2500000) {
          alert("فایل باید کمتر از 1.5Mb باشد.");
        }
      }
      if (
        typeof this.$refs.pictureExpert !== "undefined" &&
        this.userDatas.role === "expert"
      ) {
        picExpert = this.$refs.pictureExpert.files[0];
        if (
          picExpert["type"] === "image/jpeg" &&
          picExpert["size"] <= 2500000
        ) {
          if(this.userDatas.avatar){
            let s=this.userDatas.avatar.split('/')  
              let data={
              pic:picExpert,
              name:s[s.length -1]
            }          
            this.$store.dispatch('updateProfile',data)
          }else{
            this.$store.dispatch("setProfile", picExpert);
          }
        } else if (picExpert["type"] !== "image/jpeg") {
          alert("فایل باید با فرمت jpg باشد.");
        } else if (picExpert["size"] > 2500000) {
          alert("فایل باید کمتر از 1.5Mb باشد.");
        }
      }
      // console.log(this.$refs.pictureExpert.files[0])
      // this.$store.dispatch("setProfile", pic);
    },
    back() {
      this.$store.dispatch("back");
    },
  },
};
</script>

<style scoped>
.panel {
  width: 100%;
  background-color: rgba(145, 174, 184, 0.86);
  display: flex;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}
.panel-right {
  width: 22%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 3px;
  box-sizing: border-box;
}

.panel-left {
  width: 78%;
  float: left;
  border-right: 1px solid rgba(153, 157, 161, 0.89);
}
.picUsers {
  width: 90px;
  height: 90px;
  /*background-color: black;*/
  border-radius: 100%;
  border: 1px solid rgba(125, 128, 132, 0.89);
  background-size: 100% 100%;
  background-repeat: no-repeat;
  background-position: center;
  overflow: hidden;
}
.rowMy {
  width: 100%;
  display: flex;
}
label {
  text-align: right;
  direction: rtl;
}
.nav-info {
  width: 100%;
  text-align: right;
  padding: 10px;
  box-sizing: border-box;
}

.nav-info ul {
  width: 100%;
  padding: 0;
  margin: 0;
}

.nav-info ul li {
  list-style: none;
  color: white;
}
.picUsers input {
  position: relative;
  top: -28%;
  z-index: 2;
  width: 98%;
  height: 115px;
  border-radius: 80%;
  opacity: 0;
  cursor: pointer;
}
.editBtn {
  background-color: rgba(160, 141, 182, 0.86);
}

.editBtn:hover {
  background-color: rgba(113, 99, 133, 0.86);
}
.is-invalid {
  border: 1px solid #e3356f;
}

.is-valid {
  border: 1px solid #34ce57 !important;
}
@media screen and (max-width: 576px) {
  .panel {
    flex-direction: column;
  }
  .panel-left,
  .panel-right {
    width: 100%;
  }
  .panel-right .nav-info {
    text-align: center;
  }
  .rowMy {
    flex-direction: column;
  }
}
</style>
