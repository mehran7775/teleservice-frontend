<template>
    <div class="row">
      <div id="footer">
          <h1>this is Footer</h1>
      </div>
    </div>
</template>

<script>
import { mdbFooter, mdbContainer, mdbRow, mdbCol } from 'mdbvue';
  export default {
    name: 'Footer',
    components:{mdbFooter,
      mdbContainer,
      mdbRow,
      mdbCol}
  }
</script>

<style scoped>
  #footer {
    width: 100%;
    height: 180px;
    position: relative;
    z-index: 3;
    background-color: #929FBA;
    direction: rtl;
    text-align: right;
  }
</style>
