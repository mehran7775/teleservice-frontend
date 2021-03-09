<template>
  <div class="w-100 login">
    <div
      class="w-75 m-auto border p-4"
      v-if="
        response_api.login.result &&
        response_api.login.successCallbackLogin === false
      "
    >
      <router-link to="/" class="close float-left">
        <img src="../../../assets/close-window-16.png" alt="" />
      </router-link>
      <form @submit.prevent="login()">
        <fieldset class="text-right">
          <legend align="right">ورود</legend>
          <div class="form-group p-2">
            <div class="form-group">
              <label for="email" class="pt-1">ایمیل:</label>
              <input
                v-model="form.email"
                @input="checkValidate(form.email, 'email')"
                name="email"
                type="text"
                id="email"
                :class="[
                  inValidate.email ? 'is-invalid' : null,
                  validate.email ? 'is-valid' : null,
                  'form-control',
                ]"
                placeholder="ایمیل را وارد کنید..."
              />
              <small
                class="disabled text-danger"
                v-show="validatesLogin.errorUsers.email"
                v-text="validatesLogin.errorUsers.email"
              ></small>
            </div>
            <input
              v-show="!response_api.login.withEmail"
              class="btn btn-success mt-3 mr-1"
              :disabled="btnStatus"
              type="submit"
              value="ادامه"
            />
            <!--                        <input type="hidden" v-model="form.csrf_token" >-->
          </div>
        </fieldset>
      </form>
      <form
        v-show="response_api.login.withEmail"
        @submit.prevent="do_loginWithEmail()"
      >
        <fieldset class="text-right">
          <div class="form-group p-2">
            <div class="form-group">
              <label class="pt-1 text-warning"
                >رمزی که به ایمیلتان ارسال شده است را وارد کنید</label
              >
              <input
                v-model="form.password"
                @input="checkValidate(form.password, 'password')"
                id="password"
                name="password"
                type="password"
                :class="[
                  inValidate.password ? 'is-invalid' : null,
                  validate.password ? 'is-valid' : null,
                  'form-control',
                ]"
                placeholder="رمز عبور را وارد کنید..."
              />
              <small
                class="disabled text-danger"
                v-show="validatesLogin.errorUsers.password"
                v-text="validatesLogin.errorUsers.password"
              ></small>
            </div>
          </div>
           <div
            v-show="response_api.login.failed"
            v-text="response_api.login.failed"
            class="alert alert-danger"
          ></div>
          <div class="form-check mt-3">
            <label>من را بخاطر بسپار:</label>
            <input
              type="checkbox"
              class="form-check-input"
              v-model="form.remember"
            /><br />
          </div>
          <input
            class="btn btn-success mt-3 mr-1"
            :disabled="btnStatus2"
            type="submit"
            value="ورود"
          />
        </fieldset>
      </form>
    </div>
    <!-- <div class="p-3" v-else>
        <p class="text-right text-warning">شما در سایت لاگین هستید.</p>
      </div> -->
  </div>
</template>

<script>
import Form from "vform";
import state from "../../../store/states";
export default {
  name: "Login",
  data() {
    return {
      form: new Form({
        email: "",
        password: "",
        remember: false,
      }),
      validate: {
        email: null,
        password: null,
      },
      inValidate: {
        email: null,
        password: null,
      },
      btnStatus: true,
      btnStatus2: true,
    };
  },
  beforeCreate() {
    this.btnStatus = true;
    this.$store.dispatch("getLogin");
  },
  // destroyed(){

  // },
  created() {
    this.$store.dispatch("reset_data_component_login");
  },
  computed: {
    validatesLogin() {
      return this.$store.getters.validatesLogin;
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
          case this.form.email: {
            this.$store.commit("LOGIN_WITH_EMAIL", false);
            const res = x.match(this.$store.state.regularExpression.regEmail);
            if (res) {
              this.validate.email = true;
              this.inValidate.email = false;
              // this.$store.dispatch("changeValidate", "okUsernameLogin");
            } else {
              this.validate.email = false;
              this.inValidate.email = true;
            }
            break;
          }
          case this.form.password: {
            const res = x.match(
              this.$store.state.regularExpression.regPassword
            );
            if (res) {
              this.validate.password = true;
              this.inValidate.password = false;
              this.$store.dispatch("changeValidate", "okPasswordLogin");
            } else {
              this.validate.password = false;
              this.inValidate.password = true;
            }
            break;
          }
        }
      }
      this.btnStatus = !(this.validate.email === true);
      this.btnStatus2 = !(this.validate.password === true);
    },
    login() {
      this.$store.dispatch("send_codeLogin_to_email", this.form.email);
    },
    do_loginWithEmail() {
      this.$store.dispatch("login_with_email", this.form);
    },
  },
};
</script>

<style scoped>
.is-invalid {
  border: 1px solid #e3356f;
}

.is-valid {
  border: 1px solid #34ce57 !important;
}
@media screen and (max-width: 576px) {
  form input,
  .login {
    font-size: 11px;
  }
}
</style>
