<template>
  <div class="mouse">
    <div class="mouse__circle"></div>
    <div class="mouse__point"></div>
  </div>
</template>

<script>
import { gsap } from "gsap";

export default {
  props: {
    inHover: Boolean,
  },
  watch: {
    inHover: function(val) {
      console.log("inHover mouse", val);
      if (val) {
        this.mouseHover();
      }else {
        this.mouseUp();
      }
      
    }
  },
  data() {
    return {
      pos: { x: Number, y: Number },
      radio: 25,
    };
  },
  mounted() {
    window.addEventListener("mousemove", this.mouseMovement);
    window.addEventListener("mousedown", this.mouseClick);
    window.addEventListener("mouseup", this.mouseUp);
    this.$el.style.width = this.radio * 2 + "px";
    this.$el.style.height = this.radio * 2 + "px";
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
      gsap.to(this.$el, {
        duration: 0.2,
        x: e.clientX - window.innerWidth / 2 - this.$el.offsetWidth / 2,
        y: e.clientY - window.innerHeight / 2 - this.$el.offsetHeight / 2,
        ease: "power4.out",
      });
    },
    /**
     ** MOUSE CLICK FUNCTION
     *? Function for image behavior on mouse Click
     * @param e mouse Click event
     */
    mouseClick() {
      gsap.to(this.$el, {
        duration: 0.1,
        scale: 0.7,
      });
    },
    /**
     ** MOUSE UP FUNCTION
     *? Function for image behavior on mouse Up
     * @param e mouse Up event
     */
    mouseUp() {
      gsap.to(this.$el, {
        duration: 0.1,
        scale: 1,
      });
    },
    /**
     ** MOUSE HOVER FUNCTION
     *? Function for image behavior on mouse Hover
     * @param e mouse Hover event
     */
    mouseHover() {
      gsap.to(this.$el, {
        duration: 0.2,
        scale: 1.3,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "./../assets/styles/setup";
.mouse {
  margin: 0.1rem;
  position: absolute;
  top: 50%;
  left: 50%;

  // width: 50px;
  // height: 50px;
  pointer-events: none;
  @include transform(tranlate(-50%, -50%));

  .mouse__circle {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    border: 1px solid $dark;
  }

  .mouse__point {
    position: fixed;
    top: 50%;
    left: 50%;
    border-radius: 50%;
    // border: 1px solid $dark;
    background-color: $dark;
    width: 5px;
    height: 5px;
    @include transform(translate(-50%, -50%));
  }
}
</style>