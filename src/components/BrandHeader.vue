<template>
  <div class="brandheader">
    <router-link :to="link"><img width="60" height="60" src="https://picsum.photos/1920/1080" alt="BrandHeader"></router-link>
  </div>
</template>

<script>
  export default {
    props: {
      link: String
    }
  }
</script>

<style lang="scss" scoped>
@import "./../assets/styles/setup";

.brandheader {
}
</style>