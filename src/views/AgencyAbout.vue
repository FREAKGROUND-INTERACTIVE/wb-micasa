<template>
  <div class="agency-about">
    agency about
    <Img-bg ref="imgViewTitle"></Img-bg>
  </div>
</template>

<script>
import {  mutations } from "./../state";
import ImgBg from "@/components/ImgBg";
export default {
  components: {
    ImgBg,
  },
  mounted() {
    setTimeout(() => {
      mutations.setTitle(" ");
    }, 1000);
  },
};
</script>

<style lang="scss" scoped>
</style>