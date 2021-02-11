<template>
    <div class="col bg-danger" v-if="userDatas.role==='expert'">
        <div class="float-right p-3"> موجودی:
            <span v-text="userDatas.wallet"></span>
        </div>
    </div>
</template>


<script>
export default {
    name:"Wallet",
    beforeCreate(){
        this.$store.dispatch('get_wallet');
    },
    computed:{
        userDatas(){
            return this.$store.getters.userDatas
        }
    }
}
</script>


<style scoped>

</style>