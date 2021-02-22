<template>
  <transition @leave="leave" :css="false">
    <div class="brandheader">
      <router-link :to="link"
        ><img
          class="brandheader__img"
          width="60"
          height="60"
          src="https://res.cloudinary.com/tanecujasanda/image/upload/v1613968914/20210215_MICASA/IMG/micasa_SVG_ph6t3v.svg"
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
      default: 0,
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
        duration: 2,
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
      gsap.to(this.brandheader, {
        duration: 1.5,
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
  @include transition(all 0.5s);

  .brandheader__img {
    width: 100%;
    opacity: 0;
  }

  &:hover {
    @include transform(translateY(-10%));
  }
}
</style>