<template>
  <div class="loading">
    <button @click="goToWeb">Continuar</button>
  </div>
</template>

<script>
import { gsap } from "gsap";
import * as Tone from "tone";

export default {
  methods: {
    async goToWeb() {
      await Tone.start();
      console.log("audio is ready");
      this.$emit("init");
      gsap.to(this.$el, {
        duration: 1,
        autoAlpha: 0,
      });
    },
  },
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