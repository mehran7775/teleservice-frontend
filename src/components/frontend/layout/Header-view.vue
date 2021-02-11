<template>
  <div class="row">
    <header>
      <div id="nav">
        <div id="brand" class="d-none d-sm-block">
          <router-link to="/" class="route_link navbar-brand" id="brand-img">
            <!--                <img src="pic/Western-Country-Cowboy-HD-Wallpaper.jpg" alt="error" width="50" height="50">-->
            <h6 class="text-dark">خدمات رادیولوژی</h6>
          </router-link>
        </div>
        <ul id="groups" class="navbar-nav">
          <li>
            <router-link to="/" class="route_link nav-item text-dark" exact
              >خانه</router-link
            >
          </li>
          <li>
            <router-link to="/services" class="route_link nav-item text-dark"
              >خدمات</router-link
            >
          </li>
          <li>
            <router-link
              :to="{ name: 'about' }"
              class="route_link nav-item text-dark"
              >درباره ما</router-link
            >
          </li>
        </ul>
      </div>
      <div id="sign">
        <div class="sign">
          <router-link
            v-if="!response_api.login.successCallbackLogin"
            to="/account/register"
          >
            <img
              src="../../../assets/images/icons/register.png"
              alt=""
              title="ثبت نام"
              class="icon-sign"
            />
          </router-link>
          <router-link
            v-if="!response_api.login.successCallbackLogin"
            to="/account/login"
            class="mr-1"
          >
            <img
              src="../../../assets/images/icons/login.png"
              alt=""
              title="ورود"
              class="icon-sign"
            />
          </router-link>
          <img
            v-if="response_api.login.successCallbackLogin"
            class="cursor-pointer icon-sign"
            @click="logout()"
            src="../../../assets/images/icons/logout.png"
            alt=""
            title="خروج"
          />
        </div>
        <div id="wallet">
          <router-link
            class="router_link"
            v-if="
              response_api.login.successCallbackLogin &&
              userDatas.role === 'expert'
            "
            to="/wallet"
          >
            <img
              width="24"
              height="24"
              src="../../../assets/images/icons/wallet-4-24.png"
              alt=""
              title="کیف پول"
            />
          </router-link>
        </div>
      </div>
    </header>
  </div>
</template>

<script>
export default {
  name: "header.vue",
  data() {
    return {
      showRegister: false,
      successCallbackLogin: true,
    };
  },
  computed: {
    response_api() {
      return this.$store.state.response_api;
    },
    userDatas() {
      return this.$store.getters.userDatas;
    },
  },
  methods: {
    logout() {
      this.$store.dispatch("logout");
    },
  },
};
</script>

<style lang="css" scoped>
header {
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  background-color: whitesmoke;
  z-index: 4;
  position: fixed;
  opacity: 0.95;
}
#nav {
  width: 60%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}

#brand {
  width: 35%;
  height: 100%;
}

#brand-img {
  width: 100%;
  display: flex;
  justify-content: end;
  align-items: center;
}
#groups {
  width: 65%;
  height: 100%;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: row;
  justify-content: end;
  align-items: center;
  padding-right: 3%;
}

#groups li {
  height: 30px;
  margin: 8px;
  /* background: chartreuse; */
  text-align: center;
  font-size: 16px;
}
.route_link {
  display: inline-block;
  text-decoration: none;
}
li .route_link {
  width: 100%;
  height: 100%;
  border-radius: 2px;
  padding: 1px 10px;
}
li .route_link:hover {
  /* background: rgb(224, 224, 224); */
  background: #91aab2;
  color: #181b1d;
}
li a.router-link-active {
  background: #91aab2;
  color: #181b1d !important;
}
#sign {
  width: 38%;
  display: flex;
  justify-content: space-around;
  align-items: center;
}
#wallet {
  width: 24px;
  height: 24px;
}
@media screen and (max-width: 576px) {
  #nav {
    width: 74%;
  }
  #nav #groups {
    padding: 0;
  }
  #groups li {
    margin: 1.5px;
    padding: 2px;
    font-size: 16px;
  }
  .icon-sign{
    width: 24px;
    height: 24px;
  }
}

</style>
