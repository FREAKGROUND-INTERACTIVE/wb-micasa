<template>
  <div class="mouse">
    <div class="mouse__point"></div>
  </div>
</template>

<script>
import { gsap } from "gsap";

export default {
  data() {
    return {
      pos: { x: Number, y: Number },
    };
  },
  mounted() {
    window.addEventListener("mousemove", this.mouseMovement);
  },
  destroyed() {
    window.removeEventListener("mousemove", this.mouseMovement);
  },
  methods: {
    /**
     ** MOUSE MOVEMENT FUNCTION
     *? Function for image behavior on mouse movement
     * @param e mouse movement event
     */
    mouseMovement(e) {
      //   let OldX = window.innerWidth;
      //   let NewX = 1 - -1;
      //   let posX = ((e.clientX - 0) * NewX) / OldX + -1;
      //   let OldY = window.innerHeight;
      //   let NewY = 1 - -1;
      //   let posY = ((e.clientY - 0) * NewY) / OldY + -1;
      //   const mFactor = 25;
      // console.log(e);
      gsap.to(this.$el, {
        duration: 0.2,
        x: e.clientX - window.innerWidth / 2 - 25,
        y: e.clientY - window.innerHeight / 2 - 25,
        ease: "power2.out",
      });
      gsap.to(".mouse__point", {
        duration: 0.2,
        x: e.clientX - window.innerWidth / 2,
        y: e.clientY - window.innerHeight / 2,
        ease: "power2.out",
      });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "./../assets/styles/setup";
.mouse {
  position: absolute;
  top: 50%;
  left: 50%;
  border-radius: 50%;
  border: 1px solid $dark;
  width: 50px;
  height: 50px;

  .mouse__point {
    position: absolute;
    top: 50%;
    left: 50%;
    border-radius: 50%;
    // border: 1px solid $dark;
    background-color: $dark;
    width: 5px;
    height: 5px;
    @include transform(translate(-50%,-50%));
  }
}
</style>