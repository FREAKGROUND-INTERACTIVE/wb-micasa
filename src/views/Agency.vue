<template>
  <div class="agency">
    Agency
    <Img-view-title></Img-view-title>
  </div>
</template>

<script>
import { state, mutations } from "./../state";
import ImgViewTitle from '@/components/ImgViewTitle';
  export default {
    components: {
      ImgViewTitle
    },
    mounted() {
      if (state.title != 'agency') {
        mutations.setTitle("agency");
      }
    },
  }
</script>

<style lang="scss" scoped>
  .agency {
    width: 100%;
    height: 100vh;
  }
</style>
