<template>
  <transition @leave="leave" :css="true">
    <div class="altering">
      <Altering3d ref="mask3d" :mask="true" :pos="mouseEvent"></Altering3d>
      <div class="altering__title">
        <div
          class="altering__title-letter"
          v-for="letter in lang == 'en' ? 'ALTERING' : 'ALTERAR'"
          :key="letter.id"
        >
          {{ letter }}
        </div>
      </div>
      <div class="altering__mask">
        <div class="altering__mask-content">
          <Altering3d ref="back3d" :mask="false" :pos="mouseEvent"></Altering3d>
          <h3 class="altering__mask-content-title">
            {{ lang == "en" ? "THE CONSTANT" : "LO CONSTANTE" }}
          </h3>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import { gsap } from "gsap";
import Altering3d from "@/components/Altering3d";
import { lang } from "@/state";

export default {
  components: {
    Altering3d,
  },
  computed: {
    lang() {
      return lang.lg;
    },
  },
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
      mask: null,
      content: null,
      letters: null,
      mouseEvent: null,
      firstMove: true,
      maskActive: false,
    };
  },
  mounted() {
    this.mask = this.$el.querySelector(".altering__mask");
    this.content = this.$el.querySelector(".altering__mask-content");
    this.letters = this.$el.querySelectorAll(".altering__title-letter");
    window.addEventListener("mousemove", this.mouseMovement);
    window.addEventListener("touchmove", this.mouseMovement);
    //* initAnim function in mounted
    if (this.mountedAnim) {
      this.initAnim(this.mountedDelay);
    }
  },
  destroyed() {
    window.removeEventListener("mousemove", this.mouseMovement);
    window.removeEventListener("touchmove", this.mouseMovement);
  },
  methods: {
    /**
     ** MOUSE MOVEMENT FUNCTION
     *? Function for image behavior on mouse movement
     * @param e mouse movement event
     */
    mouseMovement(e) {
      if (this.firstMove && this.maskActive) {
        this.$refs.mask3d.initAnim(0);
        this.$refs.back3d.initAnim(0);
        this.firstMove = false;
      }
      this.mouseEvent = e;
      gsap.to(this.mask, {
        duration: 0.5,
        x: window.innerWidth > 768? e.clientX - this.mask.offsetWidth / 2: e.touches[0].clientX - this.mask.offsetWidth / 2,
        ease: "power2.out",
      });

      gsap.to(this.content, {
        duration: 0.5,
        x: window.innerWidth > 768? e.clientX * -1 + this.mask.offsetWidth / 2: e.touches[0].clientX * -1 + this.mask.offsetWidth / 2,
        ease: "power2.out",
      });
    },

    /**
     ** INIT ANIMATION FUNCTION
     *? Function for init animation
     * @param delay time for timeLine delay
     */
    initAnim(delay) {
      let that = this;
      let letterTl = new gsap.timeline({ paused: true, delay: delay });
      this.letters.forEach((element) => {
        letterTl.to(
          element,
          {
            duration: 0.5,
            y: "0%",
          },
          "<0.2"
        );
      });

      letterTl.to(this.mask, {
        duration: 2,
        width: "20vw",
        onStart: function () {
          that.maskActive = true;
        },
      });
      letterTl.play();
    },

    leave(done) {
      this.$refs.mask3d.leave();
      this.$refs.back3d.leave();
      let letterTl = new gsap.timeline({ paused: true });
      this.letters.forEach((element) => {
        letterTl.to(
          element,
          {
            duration: 0.2,
            y: "100%",
          },
          "<0.1"
        );
      });
      gsap.to(this.mask, {
        duration: 1,
        width: "0vw",
        onComplete: done,
      });
      letterTl.play();
    },
  },
};
</script>

<style lang="scss" scoped>
@import "./../assets/styles/setup";

.altering {
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;

  .altering__title {
    position: absolute;
    top: 50%;
    left: 50%;
    overflow: hidden;
    z-index: 1;
    @include transform(translate(-50%, -50%));
    .altering__title-letter {
      pointer-events: none;
      display: inline-block;
      font-family: $oswald;
      font-weight: 900;
      font-size: 12vw;
      white-space: nowrap;
      color: transparent;
      -webkit-text-stroke: 1px $dark;
      line-height: 0.95;
      @include transform(translateY(100%));
    }
  }

  .altering__mask {
    position: absolute;
    width: 0vw;
    height: 100vh;
    overflow: hidden;
    z-index: 2;

    .altering__mask-content {
      position: absolute;
      width: 100vw;
      height: 100vh;
      top: 0;
      left: 0;
      background-color: #dfdfdf;
      .altering__mask-content-title {
        pointer-events: none;
        position: absolute;
        top: 50%;
        left: 50%;
        font-family: $oswald;
        font-size: 12vw;
        white-space: nowrap;
        color: $red;
        @include transform(translate(-50%, -50%));
      }
    }
  }
}
</style>