<template>
<div class="case d-flex flex-column">
  <div :class="[report ? 'h-75' : 'h-100']">
      <ul class="info">
          <li>نام بیمار:
              <span v-text="name"></span>
          </li>
          <li>کدملی بیمار:
              <span v-text="meliNumber"></span>
          </li>
          <li>حوزه تخصص:
              <span v-text="category"></span>
          </li>
          <!-- <li>زمان ثبت:
              <span v-text="created_at"></span>
          </li> -->
          <li>تا ساعت:
              <span v-text="expired_at"></span>
          </li>
      </ul>
  </div>
  <div v-if="report" class="w-100 h-25 bg-danger">65464</div>
</div>
</template>


<script>
export default {
    name:'Case',
    props:['name','meliNumber','category','status','expired_at','created_at','report'],
    data(){
        return{
          
        }
    }
    
}
</script>
<style lang="css" scoped>
.case{
    width:14%;
    background:whitesmoke;
    border-radius: 8px;
    margin-top: 1%;
    margin-bottom: 1%;
    cursor: pointer;
    box-shadow: 1px 1px 1px wheat;
    opacity: 0.95;
}
.case:hover{
    transform: translateY(-4%);
}
.info{
    width: 100%;
    text-align: right;
    padding: 8px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    justify-content: start;
    align-content: center;
}
.info li{
    list-style: none;
    width: 100%;
}
</style>>