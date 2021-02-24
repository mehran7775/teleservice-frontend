<template>
  <div
    class="w-75 m-auto border p-4 register"
    v-if="
      response_api.register.result &&
      response_api.login.successCallbackLogin === false
    "
  >
    <router-link to="/" class="close float-left">
      <img src="../../../assets/close-window-16.png" alt="" />
    </router-link>
    <form @submit.prevent="register">
      <fieldset>
        <legend align="right">ثبت نام:</legend>
        <div class="form-group text-right p-2">
          <div class="form-group">
            <label for="name">نام:</label><br />
            <input
              v-model="form.name"
              @input="checkValidate(form.name, 'name')"
              name="name"
              type="text"
              id="name"
              :class="[
                validatesRegister.isInvalidated.name ? 'is-invalid' : null,
                validatesRegister.isValidated.name ? 'is-valid' : null,
                'form-control',
              ]"
              placeholder="نام خودرا به فارسی وارد کنید..."
            />
            <small
              class="disabled text-danger"
              v-show="validatesRegister.errorUsers.name"
              v-text="validatesRegister.errorUsers.name"
            ></small>
          </div>
          <div class="form-group">
            <label for="username" class="pt-1">نام کاربری:</label>
            <input
              v-model="form.username"
              @input="checkValidate(form.username, 'username')"
              name="username"
              id="username"
              type="text"
              :class="[
                validatesRegister.isInvalidated.username ? 'is-invalid' : null,
                validatesRegister.isValidated.username ? 'is-valid' : null,
                'form-control',
              ]"
              placeholder="نام کاربری را وارد کنید..."
            />
            <small
              class="disabled text-danger"
              v-show="validatesRegister.errorUsers.username"
              v-text="validatesRegister.errorUsers.username"
            ></small>
          </div>
          <div class="form-group">
            <label for="email" class="pt-1">ایمیل:</label>
            <input
              v-model="form.email"
              @input="checkValidate(form.email, 'email')"
              name="email"
              type="email"
              id="email"
              :class="[
                validatesRegister.isInvalidated.email ? 'is-invalid' : null,
                validatesRegister.isValidated.email ? 'is-valid' : null,
                'form-control',
              ]"
              placeholder="ایمیل خودرا وارد کنید..."
            />
            <small
              class="disabled text-danger"
              v-show="validatesRegister.errorUsers.email"
              v-text="validatesRegister.errorUsers.email"
            ></small>
          </div>
          <div class="form-group">
            <label for="password" class="pt-1">رمز عبوری:</label>
            <input
              v-model="form.password"
              @input="checkValidate(form.password, 'password')"
              name="password"
              id="password"
              type="password"
              :class="[
                validatesRegister.isInvalidated.password ? 'is-invalid' : null,
                validatesRegister.isValidated.password ? 'is-valid' : null,
                'form-control',
              ]"
              placeholder="رمز عبور را وارد کنید..."
            />
            <small
              class="disabled text-danger"
              v-show="validatesRegister.errorUsers.password"
              v-text="validatesRegister.errorUsers.password"
            ></small>
          </div>
          <input
            class="btn btn-success mt-3 mr-1"
            type="submit"
            :disabled="btnStatus"
            value="ثبت"
          />
          <input type="hidden" v-model="form.csrf_token" />
        </div>
      </fieldset>
    </form>
  </div>
  <!-- <div class="p-3" v-else>
    <p class="text-right text-warning">شما در سایت ثبت نام کرده و لاگین کرده اید.</p>
  </div> -->
</template>

<script>
// import {mapState,mapActions,mapGetters} from 'vuex'
import Form from "vform";
import Login from "./Login";
import Vue from "vue";
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";
Vue.use(Loading);
export default {
  name: "Register",
  // beforeCreate () {
  //   this.$store.dispatch('getRegister')
  // },
  data() {
    return {
      form: new Form({
        name: "",
        username: "",
        email: "",
        password: "",
        csrf_token: localStorage.getItem("csrf_token"),
      }),
      btnStatus: true,
    };
  },
  beforeCreate() {
    this.$store.dispatch("getRegister");
  },
  computed: {
    // ...mapState(['response_api']),
    validatesRegister() {
      return this.$store.getters.validatesRegister;
    },
    response_api() {
      return this.$store.getters.response_api;
    },
  },
  methods: {
    checkValidate(x, id) {
      if (x === "") {
        let el = document.getElementById(id);
        el.classList.remove("is-invalid");
      } else {
        switch (x) {
          case this.form.name: {
            let res = x.match(this.$store.state.regularExpression.regName);
            if (res) {
              this.$store.dispatch("changeValidate", "okName");
            } else {
              this.$store.dispatch("changeValidate", "falseName");
            }
            break;
          }
          case this.form.username: {
            let res = x.match(this.$store.state.regularExpression.regUsername);
            if (res) {
              this.$store.dispatch("changeValidate", "okUsername");
            } else {
              this.$store.dispatch("changeValidate", "falseUsername");
            }
            break;
          }
          case this.form.email: {
            let res = x.match(this.$store.state.regularExpression.regEmail);
            if (res) {
              this.$store.dispatch("changeValidate", "okEmail");
            } else {
              this.$store.dispatch("changeValidate", "falseEmail");
            }
            break;
          }
          case this.form.password: {
            let res = x.match(this.$store.state.regularExpression.regPassword);
            if (res) {
              this.$store.dispatch("changeValidate", "okPassword");
            } else {
              this.$store.dispatch("changeValidate", "falsePassword");
            }
            break;
          }
        }
      }

      this.btnStatus = !(
        this.validatesRegister.isValidated.name === true &&
        this.validatesRegister.isValidated.username === true &&
        this.validatesRegister.isValidated.email === true &&
        this.validatesRegister.isValidated.password === true
      );
    },
    register() {
      this.$store.dispatch("register", this.form);
    },
  },
};
</script>

<style lang="css" scoped>
.is-invalid {
  border: 1px solid #e3356f;
}

.is-valid {
  border: 1px solid #34ce57 !important;
}
@media screen and (max-width: 576px) {
  form input,
  .register {
    font-size: 11px;
  }
}
</style>
