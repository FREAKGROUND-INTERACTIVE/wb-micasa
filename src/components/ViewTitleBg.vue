<template>
  <transition @leave="leave" :css="false">
    <div class="view-title-bg">
      <div class="view-title-bg__up">
        {{ title }}
      </div>
      <div class="view-title-bg__down">
        {{ title }}
      </div>
    </div>
  </transition>
</template>

<script>
import { state } from "./../state";
import gsap from "gsap";

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
      titleUp: null, //* variable for up title
      titleDown: null, //* variable for down title
    };
  },
  computed: {
    title() {
      return state.title;
    },
  },
  mounted() {
    //* select up title
    this.titleUp = this.$el.querySelector(".view-title-bg__up");
    //* select down title
    this.titleDown = this.$el.querySelector(".view-title-bg__down");
    //* initAnim function in mounted
    if (this.mountedAnim) {
      this.initAnim(this.mountedDelay);
    }
  },
  methods: {
    /**
     ** INIT ANIMATION FUNCTION
     *? Function for init animation
     * @param delay time for timeLine delay
     */
    initAnim(delay) {
      gsap.to(this.titleUp, {
        duration: 1.5,
        y: "-85%",
        opacity: "1",
        ease: "power4.out",
        delay: delay,
      });
      gsap.to(this.titleDown, {
        duration: 1.5,
        y: "-15%",
        opacity: "1",
        ease: "power4.out",
        delay: delay,
      });
    },

    /**
     ** LEAVE FUCTION
     *? Function for leave behavior
     * @param done it return the leave behavior end
     */
    leave(done) {
      gsap.to(this.titleUp, {
        duration: 1,
        y: "-200%",
        opacity: "0",
        ease: "power4.out",
        // delay: 1.5
      });
      gsap.to(this.titleDown, {
        duration: 1,
        y: "100%",
        opacity: "0",
        ease: "power4.out",
        // delay: 1.5,
        onComplete: done,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "./../assets/styles/setup";

.view-title-bg {
  position: fixed;
  left: 50%;
  top: 50%;
  @include transform(translate(-50%, -50%));
  height: 20vh;
  //   overflow: hidden;
  text-align: center;
  pointer-events: none;

  .view-title-bg__up,
  .view-title-bg__down {
    font-size: 22vh;
    text-transform: uppercase;
    line-height: 1;
    color: white;
    font-weight: 900;
    white-space: nowrap;
    padding: 0 1rem;
    -webkit-text-stroke: 1px black;
    opacity: 0;
    color: transparent;
  }

  .view-title-bg__up {
    @include transform(translateY(0));
  }
  .view-title-bg__down {
    @include transform(translateY(-100%));
  }

  @include breakpoint(sm) {
    // top: 46.3%;
    height: 8vh;
    .view-title-bg__up,
    .view-title-bg__down {
      font-size: 9vh;
    }
  }
}
</style>