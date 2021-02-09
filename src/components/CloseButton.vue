<template>
  <transition @leave="leave" :css="false">
    <div class="close-button">
      <div></div>
      <div></div>
    </div>
  </transition>
</template>

<script>
import { gsap } from "gsap";

export default {
  props: {
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
      lines: null,
    };
  },
  mounted() {
    this.lines = this.$el.querySelectorAll(".close-button > div");
    this.lines = [...this.lines];

    //* initAnim function in mounted
    if (this.mountedAnim) {
      this.initAnim(this.mountedDelay);
    }
  },
  methods: {
    initAnim(delay) {
      this.lines.forEach((element) => {
        gsap.to(element, {
          duration: 1,
          width: "100%",
          delay: delay,
        });
      });
    },
    /**
     ** LEAVE FUCTION
     *? Function for leave behavior
     * @param done it return the leave behavior end
     */
    leave(done) {
      this.lines.forEach((element) => {
        gsap.to(element, {
          duration: 0.5,
          width: "0%",
          onComplete: done,
        });
      });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "./../assets/styles/setup";

.close-button {
  width: 35px;
  height: 35px;
  cursor: pointer;
  position: relative;

  @include transform(rotate(0deg));
  @include transition(all 0.5s);
  @include transform-origin(center center);

  div {
    width: 0%;
    height: 1px;
    background-color: $dark;
    position: absolute;
    top: 50%;
    left: 50%;

    &:first-child {
      @include transform(translate(-50%, -50%) rotate(45deg));
    }

    &:last-child {
      @include transform(translate(-50%, -50%) rotate(-45deg));
    }
  }

  &:hover {
    @include transform(rotate(180deg));
  }
}
</style>