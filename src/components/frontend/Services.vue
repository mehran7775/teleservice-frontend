ا<template>
  <div class="container-fluid" v-if="response_api.category">
    <Header></Header>
    <div class="row mt-4 mt-sm-5">
      <div class="body">
        <div class="back-img">
          <img src="../../assets/72.jpg" alt="error to uploaded image">
        </div>
        <div id="content">
          <div class="col-12 bg-white">
            <div class="row" v-if="userDatas.role && userDatas.role==='clerk' && userDatas.meliNumber && userDatas.meliNumber!=='0'">
              <div class="col" id="clerk">
                <div class="case-upload">
                  <div class="title-case-upload">
                    <h5 class="text-dark text-right">آپلود کردن فایل های رادیولوژی:</h5>
                  </div>
                  <div class="w-100">
                    <div class="form-group">
                      <div class="d-flex justify-content-center align-items-start flex-wrap">
                        <div class="form-inline p-2 pr-4">
                          <label for="fullNameSick">نام کامل بیمار:</label>
                          <input type="text" v-model="formCase.fullNameSick" @input="validate(formCase.fullNameSick,'fullNameSick')" name="fullNameSick" id="fullNameSick"
                                 :class="[ inValidate.fullNameSick ? 'is-invalid' :null , isValidate.fullNameSick ? 'is-valid':null,
                     'form-control mr-1']">
                        </div>
                        <div class="form-inline p-2 mr-2">
                          <label for="meliNumber" class="">شماره ملی بیمار:</label>
                          <input type="text" v-model="formCase.meliNumber" @input="validate(formCase.meliNumber,'meliNumber')" name="meliNumber" id="meliNumber"
                                 :class="[ inValidate.meliNumber ? 'is-invalid' :null , isValidate.meliNumber ? 'is-valid':null,
                     'form-control mr-1']">
                        </div>
                        <div class="form-inline mr-2 p-2">
                          <label for="category">حوزه تخصص:</label>
                          <select class="form-control mr-1" name="category" id="category" v-model="formCase.category"
                          >
                            <option v-for="category in categories" v-text="category"></option>
                          </select>
                        </div>
                        <div class="form-inline p-2 mr-2">
                          <label for="meliNumber" class="">مدت زمان :</label>
                          <input type="time" v-model="formCase.time" name="time" id="time"
                                class="form-control mr-1">
                        </div>
                        <div class="form-inline p-2 mr-2">
                          <label for="radiologyFile">فایل رادیولوژی:</label>
                          <input type="file" @change="validate()"  name="radiologyFile" ref="radiologyFile" id="radiologyFile" class="mr-1">
                          <small class="text-primary">(فرمت:pdf)</small>
                        </div>
                      </div>
                    </div>
<!--                    <input type="button" class="btn btn-success ml-5" value="ثبت"-->
<!--                    @click="showCase"-->
<!--                    >-->
                    <div>
                      <b-button class="btn btn-success" id="show-btn" @click="$bvModal.show('bv-modal-example')" :disabled="btnStatus">ثبت</b-button>
                      <b-modal v-if="showModal" id="bv-modal-example" hide-footer>
                        <template #modal-title>
                          Case
                        </template>
                        <div>
                          <div>
                            <span>state:0</span>
                          </div>
                          <div id="info">
                            <ul class="d-flex flex-column justify-content-between">
                              <li>مشخصات بیمار:
                                <span v-text="formCase.fullNameSick"></span>
                              </li>
                              <br>
                              <li>شماره ملی:
                                <span v-text="formCase.meliNumber"></span>
                              </li>
                              <br>
<!--                              <li class="form-inline">-->
<!--                                <label for="cast">مبلغ موردنظر:</label>-->
<!--                                <input type="text" id="cast" name="cast" v-model="formCase.cast" @input="validate(formCase.cast,'cast')" placeholder="به ریال وارد شود"-->
<!--                                 :class="[ inValidate.cast ? 'is-invalid' :null , isValidate.cast ? 'is-valid':null,-->
<!--                                  'form-control mr-1']"-->
<!--                                >-->
<!--                              </li>-->
                              <li>حوزه تخصص:
                                <span v-text="formCase.category"></span>
                              </li>
                              <br>
                              <li>مدت زمان:
                                <span v-text="formCase.time"></span>
                              </li>
                            </ul>
                          </div>
                        </div>
                        <b-button class="btn btn-success mt-3 w-25 float-right" block @click="register()">ثبت</b-button>
                      </b-modal>
                    </div>
                  </div>
                </div>
                <div class="cases">
                  <cases></cases>
                </div>
              </div>
            </div>
            <div class="row" v-else-if="userDatas.role && userDatas.role==='expert' && userDatas.meliNumber && userDatas.meliNumber!=='0'">
              <div class="cases-all">
                فایل های case
              </div>
            </div>
            <div v-else>
              برای ارائه خدمت ابتدا درسایت ثبت نام کنید و...
            </div>
          </div>
        </div>
      </div>
    </div>
    <Footer></Footer>
  </div>
</template>

<script>
  import Header from './layout/Header-view'
  import Footer from './layout/Footer-view'
  import Form from 'vform'
  import Cases from '@/components/frontend/cases/Cases'
  import ApiService from '../../apiService/ApiService'
  export default {
    name: 'Services',
     components:{
      Header,Footer,Cases
    },
    data(){
      return{
        formCase:new Form({
          fullNameSick:'',
          meliNumber:'',
          category:'',
          time:'',
          caseFile:''
        }),
        isValidate:{
          fullNameSick:'',
          meliNumber:'',
          expertId:'',
          cast:''
        },
        inValidate:{
          fullNameSick:'',
          meliNumber:'',
          expertId:'',
          cast:''
        },
        btnStatus:true,
        showModal:false,
        btnStatusModal:true
      }
    },
    beforeCreate(){
      this.$store.dispatch('service');
      this.$store.dispatch('get_categories');
    },
    computed:{
      response_api(){
        return this.$store.getters.response_api
      },
      userDatas(){
        return this.$store.getters.userDatas
      },
      regularExpression () {
        return this.$store.getters.regularExpression
      },
      categories(){
        return this.$store.getters.categories
      }
    },
    // updated(){
    //     this.$store.dispatch('get_cases')
    // },
  
    // mounted () {
    // },
    methods:{
      showCase(){

      },
      validate(x=null,id=null){
        let okCaseFile=false
        this.formCase.caseFile=this.$refs.radiologyFile.files[0]
        if (this.formCase.caseFile){
          if (this.formCase.caseFile['type'] !== 'application/pdf'){
            alert("فرمت باید بصورت pdf باشد")
            okCaseFile=false
          }else{
            okCaseFile=true
          }
        }
        if (x===''){
          let el=document.getElementById(id)
          el.classList.remove("is-invalid")
        }else{
          switch (x) {
            case this.formCase.fullNameSick: {
              let res = x.match(/^([ضصثقفغعهخحجچپشسیبلاتنمکگظطزرذدئو]{3,15})[ ]([ضصثقفغعهخحجچپشسیبلاتنمکگظطزرذدئو]{3,15})$/)
              if (res) {
                this.isValidate.fullNameSick=true
                this.inValidate.fullNameSick=false
              } else {
                this.inValidate.fullNameSick=true
                this.isValidate.fullNameSick=false
              }
              break
            }
            case this.formCase.meliNumber: {
              let res = x.match(/^[0-9]{10}$/g)
              if (res) {
                this.isValidate.meliNumber=true
                this.inValidate.meliNumber=false
              } else {
                this.inValidate.meliNumber=true
                this.isValidate.meliNumber=false
              }
              break
            }
          }
        }
      if (this.isValidate.fullNameSick && this.isValidate.meliNumber && this.formCase.category
        && okCaseFile && this.formCase.time)
      {
        this.btnStatus=false
        this.showModal=true
      }else {
        this.btnStatus=true
        this.showModal=false
      }
    },
      register(){
        this.$store.dispatch('caseUpload',this.formCase);
         this.$bvModal.hide('bv-modal-example');
        //  this.$forceUpdate();
      }
    }
  }
</script>

<style scoped>
.body{
  width: 100%;
  position: relative;
}
#content{
  position: relative;
  z-index: 3;
  opacity: 0.8;
}
#clerk{
  background-color:#A2BBC5;
}
.case-upload{
  width: 100%;
}
.title-case-upload{
  width: auto;
  height: auto;
  padding: 5px;
}
.title-case-upload h5{
  margin: 1%;
}
ul li{
  list-style: none;
}
#info{
  direction: rtl;
  text-align: right;
  padding: 5px;
  box-sizing: border-box;
}
.cases{
  width:100%;
}
</style>
