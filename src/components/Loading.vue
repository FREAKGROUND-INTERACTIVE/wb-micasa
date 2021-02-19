<template>
    <div class="loading">
      <button @click="goToWeb">Continuar</button>
    </div>
</template>

<script>
import { gsap } from "gsap";
export default {
  methods: {
    goToWeb() {
      this.$emit("init");
      gsap.to(this.$el, {
        autoAlpha: 0
      });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "./../assets/styles/setup";
.loading {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: red;
  z-index: 9999;
  opacity: 1;
}
</style>