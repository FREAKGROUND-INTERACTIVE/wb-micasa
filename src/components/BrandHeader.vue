<template>
  <transition @leave="leave" :css="false">
    <div class="brandheader">
      <router-link :to="link"
        ><img
          class="brandheader__img"
          width="60"
          height="60"
          src="https://res.cloudinary.com/micasastudios/image/upload/v1617047290/WEBPAGE/ICONS/micasa_SVG_wrfidk.svg"
          alt="BrandHeader"
      /></router-link>
    </div>
  </transition>
</template>

<script>
import { gsap } from "gsap";

export default {
  props: {
    link: String,
    mountedAnim: {
      type: Boolean,
      default: false,
    },
    mountedDelay: {
      type: Number,
      default: 2,
    },
  },
  data() {
    return {
      brandheader: null,
    };
  },
  mounted() {
    this.brandheader = this.$el.querySelector(".brandheader__img");

    //* initAnim function in mounted
    if (this.mountedAnim) {
      this.initAnim(this.mountedDelay);
    }
  },
  methods: {
    initAnim(delay) {
      gsap.to(this.brandheader, {
        duration: 1,
        opacity: 1,
        delay: delay,
      });
    },
    /**
     ** LEAVE FUCTION
     *? Function for leave behavior
     * @param done it return the leave behavior end
     */
    leave(done) {
      this.brandheader.style.pointerEvents = "none";
      gsap.to(this.brandheader, {
        duration: 0.3,
        opacity: 0,
        onComplete: done,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "./../assets/styles/setup";

.brandheader {
  width: 60px;
  height: 60px;
  @include transform(translateY(-50%));

  .brandheader__img {
    width: 100%;
    opacity: 0;
    @include transition(all 1s);
    &:hover {
      @include transform(scale(1.2));
    }
  }
}
</style>