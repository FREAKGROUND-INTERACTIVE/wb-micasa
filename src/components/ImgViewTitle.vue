<template>
  <div class="imgView">
    <img width="660" height="360" src="https://picsum.photos/1920/1080" alt="LoremPicsum">
  </div>
</template>

<script>
import gsap from "gsap";

  export default {
    mounted() {
      document.addEventListener("mousemove", this.mouseMovement);
    },
    methods: {
      mouseMovement(e) {
        let posX = e.clientX / window.innerWidth;
        let posY = e.clientY / window.innerHeight;
        const mFactor = 100;

        console.log(posX);

        gsap.to(this.$el, {
          duration: 1,
          x: this.$el.style.left-(posX * mFactor),
          y: this.$el.style.top-(posY * mFactor),
          ease: "Power4.out"
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
@import "./../assets/styles/setup";

  .imgView {
    position: absolute;
    left: 50%;
    top: 50%;
    @include transform(translate(-50%, -50%));

  }
</style>