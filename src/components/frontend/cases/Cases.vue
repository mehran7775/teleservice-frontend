<template>
<div v-if="items">
    <div class="title">
        <h5 class="text-dark text-right">فایل های رادیولوژی:</h5>
    </div>
    <div class="d-flex justify-content-around align-items-stretch flex-wrap h-100">
        <case v-for="item in items" :name="item.fullNameSick" :meliNumber="item.meliNumber"
         :category="item.category" :status="item.status" :created_at="item.created_at" :expired_at="item.expired_at"
        ></case>
    </div>
</div>
</template>

<script>
import Case from '@/components/frontend/cases/Case'
export default {
    name:'Cases',
    components:{Case},
    data(){
        return{
        
        }
    },
    beforeMount(){
        this.$store.dispatch('get_cases')
    },
    computed:{
        items(){
            return this.$store.getters.cases
        }
    },
    // watch: {
    //     items(){
    //         return this.$store.getters.cases;
    //  this.$forceUpdate();
    //     }
    // },
    
}
</script>

<style scoped>
.title{
  width: auto;
  height: auto;
  padding: 5px;
}
</style>