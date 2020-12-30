<template>
  <div></div>
</template>

<script>
  export default {
    name: 'Logout',
    created () {
      this.$store.dispatch('logout')
    }
  }
</script>

<style scoped>

</style>
