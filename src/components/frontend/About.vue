<template>
    <div class="container-fluid">
      <Header></Header>
      <div id="content" class="row mt-4 mt-sm-5">
        <p>this is About</p>
      </div>
      <Footer></Footer>
    </div>
</template>

<script>
  import Header from './layout/Header-view'
  import Footer from './layout/Footer-view'
  export default {
    name: 'About',
    components:{Header,Footer}
  }
</script>

<style scoped>

</style>
