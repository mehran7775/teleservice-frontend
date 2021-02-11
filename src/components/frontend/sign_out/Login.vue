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
        <fieldset>
          <legend align="right">ورود</legend>
          <div class="form-group text-right p-2">
            <div class="form-group">
              <label class="pt-1">نام کاربری:</label>
              <input
                v-model="form.username"
                @input="checkValidate(form.username, 'username')"
                name="username"
                type="text"
                id="username"
                :class="[
                  inValidate.username ? 'is-invalid' : null,
                  validate.username ? 'is-valid' : null,
                  'form-control',
                ]"
                placeholder="نام کاربری را وارد کنید..."
              />
              <small
                class="disabled text-danger"
                v-show="validatesLogin.errorUsers.username"
                v-text="validatesLogin.errorUsers.username"
              ></small>
            </div>
            <div class="form-group">
              <label class="pt-1">رمز عبوری:</label>
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
            <div class="form-check mt-3">
              <label>من را بخاطر بسپار:</label>
              <input
                type="checkbox"
                class="form-check-input"
                v-model="form.remember"
              /><br />
            </div>
            <div
              v-show="response_api.login.failed"
              v-text="response_api.login.failed"
              class="alert alert-danger"
            ></div>
            <input
              class="btn btn-success mt-3 mr-1"
              :disabled="btnStatus"
              type="submit"
              value="ورود"
            />
            <!--                        <input type="hidden" v-model="form.csrf_token" >-->
          </div>
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
        username: "",
        password: "",
        remember: false,
      }),
      validate: {
        username: null,
        password: null,
      },
      inValidate: {
        username: null,
        password: null,
      },
      btnStatus: true,
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
          case this.form.username: {
            const res = x.match(
              this.$store.state.regularExpression.regUsername
            );
            if (res) {
              this.validate.username = true;
              this.inValidate.username = false;
              this.$store.dispatch("changeValidate", "okUsernameLogin");
            } else {
              this.validate.username = false;
              this.inValidate.username = true;
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
      this.btnStatus = !(
        this.validate.username === true &&
        this.validate.password === true
      );
    },
    login() {
      this.$store.dispatch("login", this.form);
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
