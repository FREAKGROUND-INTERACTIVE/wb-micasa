<template>
  <transition @leave="leave" :css="false">
    <div class="menu-studio">
      <div class="menu-studio__slider">
        <Carrousel ref="carrousel"></Carrousel>
      </div>
      <div class="menu-studio__button" @click="clickButton">
        <Button ref="button" :text="textButtonData" :color="'cyan'"></Button>
      </div>
    </div>
  </transition>
</template>

<script>
import { gsap } from "gsap";
import Carrousel from "@/components/Carrousel";
import Button from "@/components/Button";

export default {
  components: {
    Carrousel,
    Button,
  },
  props: {
    textButton: String,
    mountedAnim: {
      type: Boolean,
      default: false,
    },
    mountedDelay: {
      type: Number,
      default: 0,
    },
  },
  watch: {
    textButton: function (val) {
      this.textButtonData = val;
    },
  },
  data() {
    return {
      textButtonData: this.textButton,
    };
  },
  mounted() {
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
      this.$refs.carrousel.initAnim(delay);
      this.$refs.button.initAnim(delay + 1);
    },

    clickButton() {
      this.$emit("clickButton");
    },

    leave(el, done) {
      this.$refs.carrousel.leave();
      this.$refs.button.leave();
      gsap.to(el, {
        duration: 1,
        x: 0,
        onComplete: done,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "./../assets/styles/setup";

.menu-studio {
  .menu-studio__button {
    position: absolute;
    width: fit-content;
    margin-top: 2rem;
    position: relative;
    left: 50%;
    @include transform(translateX(-50%));
  }
}
</style>