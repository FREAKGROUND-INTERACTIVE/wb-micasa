<template>
  <transition @leave="leave" :css="false">
    <div class="button">
      <div class="button__title">
        <template v-for="letter in textData">
          <div
            class="button__title-letter"
            :key="letter.id"
            :class="{ space: letter == ' ' }"
          >
            {{ letter }}
          </div>
        </template>
        <div class="button__title-letter x" :class="{ cyan: color == 'cyan' }">+</div>
      </div>
      <div class="button__line-container">
        <div class="button__line-bg"></div>
        <div class="button__line"></div>
      </div>
    </div>
  </transition>
</template>

<script>
import { gsap } from "gsap";

export default {
  props: {
    text: String,
    color: String,
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
    text: function (val) {
      this.leave();
      setTimeout(() => {
        this.textData = val;
      }, 1000);
    },
  },
  data() {
    return {
      textData: this.text,
      line: null,
      letters: null,
    };
  },
  mounted() {
    this.line = this.$el.querySelector(".button__line-bg");
    this.letters = this.$el.querySelectorAll(".button__title-letter");
    //* initAnim function in mounted
    if (this.mountedAnim) {
      this.initAnim(this.mountedDelay);
    }
  },
  updated() {
    this.letters = this.$el.querySelectorAll(".button__title-letter");
    this.initAnim(0);
  },
  methods: {
    /**
     ** INIT ANIMATION FUNCTION
     *? Function for init animation
     * @param delay time for timeLine delay
     */
    initAnim(delay) {
      let that = this;
      let animTl = gsap.timeline({ delay: delay });
      this.letters.forEach((element) => {
        animTl.to(
          element,
          {
            duration: 0.8,
            y: "0%",
          },
          "<0.2"
        );
      });
      animTl.to(
        this.line,
        {
          duration: 1,
          width: "100%",
          onComplete: function () {
            that.$el.style.pointerEvents = "all";
          },
        },
        "<0"
      );
      animTl.play();
    },
    /**
     ** LEAVE FUCTION
     *? Function for leave behavior
     * @param done it return the leave behavior end
     */
    leave(done) {
      this.letters.forEach((element) => {
        gsap.to(element, {
          duration: 0.5,
          y: "100%",
        });
      });
      gsap.to(this.line, {
        duration: 1,
        width: "0%",
        onComplete: done,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "./../assets/styles/setup";

.button {
  pointer-events: none;
  .button__title {
    cursor: pointer;
    overflow: hidden;

    // &:after {
    //   content: "+";
    //   margin-left: 0.2rem;
    //   display: inline-block;
    //   @include transform(rotate(0deg));

    //   @include transition(all 1s ease-in);
    // }

    .button__title-letter {
      font-size: 1.2rem;
      display: inline-block;
      @include transform(translateY(100%));
      &.space {
        margin-right: 0.3rem;
      }
      &.x {
        margin-left: 0.2rem;
        @include transition(all 0.5s);
      }
    }
  }

  .button__line-container {
    position: relative;
    margin-top: 0.3rem;
    width: 100%;
    height: 3px;
    overflow-y: hidden;
    overflow-x: hidden;
    box-sizing: border-box;

    .button__line-bg {
      background-color: $dark;
      width: 0;
      height: 1px;
      position: absolute;
      top: 1px;
      left: 0;
    }

    .button__line {
      position: absolute;
      height: 3px;
      width: 0;
      top: 0;
      left: 0;
      background-color: $light;
      @include transform(translateX(0px));

      @include transition(width 1s, transform 1s);
    }
  }

  &:hover {
    .button__title {
      .button__title-letter {
        &.x {
          color: $red;

          &.cyan {
            color: $cyan;
          }
        }
      }
    }
    .button__line {
      width: 100px;
      @include transform(translateX(150px));

      @include transition(width 1s, transform 2s 0.5s);
    }
  }
}
</style>