<template>
    <div class="row">
      <header>
        <div id="nav">
          <div id="brand" class="d-none d-sm-block">
            <router-link to="/" class="navbar-brand" id="brand-img">
              <!--                <img src="pic/Western-Country-Cowboy-HD-Wallpaper.jpg" alt="error" width="50" height="50">-->
              <h6 class="text-dark">خدمات رادیولوژی</h6>
            </router-link>
          </div>
          <ul id="groups" class="navbar-nav">
            <li>
              <router-link to="/" class="nav-item text-dark">خانه</router-link>
            </li>
            <li>
              <router-link to="/services" class="nav-item text-dark">خدمات</router-link>
            </li>
            <li>
              <router-link to="/about" class="nav-item text-dark">درباره ما</router-link>
            </li>
          </ul>
        </div>
        <div id="sign">
          <div class="sign">
            <router-link  v-if="!response_api.login.successCallbackLogin" to="/account/register">
              <img src="../../../assets/images/icons/register.png" alt="" title="ثبت نام">
            </router-link>
            <router-link v-if="!response_api.login.successCallbackLogin" to="/account/login" class="mr-1">
              <img src="../../../assets/images/icons/login.png" alt="" title="ورود">
            </router-link>
            <img v-if="response_api.login.successCallbackLogin" class="cursor-pointer" @click="logout()"
                 src="../../../assets/images/icons/logout.png" alt="" title="خروج">
          </div>
        </div>
      </header>
    </div>
</template>

<script>
  export default {
    name: 'header.vue',
    data(){
      return{
        showRegister:false,
        successCallbackLogin:true
      }
    },
    computed:{
      response_api(){
        return this.$store.state.response_api
      }
    },
    methods:{
      logout(){
        this.$store.dispatch('logout')
      }
    }
  }
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
    padding-right: 4%;
  }

  #groups li {
    width: auto;
    height: 30px;
    margin: 8px;
    text-align: center;
    padding: 5px;
    border-radius: 2px;
    font-size: 16px;
  }

  #sign {
    width: 38%;
    display: flex;
    justify-content: end;
    align-items: center;
  }
  @media screen and (max-width: 576px){
    #nav{
      width: 74%;
    }
    #nav #groups{
      padding: 0;
    }
    #groups li{
      margin: 1.5px;
      padding: 2px;
      font-size: 16px;
    }
    #sign{
      width: 24%;
    }
  }
</style>
