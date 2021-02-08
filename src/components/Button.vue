<template>
  <div class="button">
    <div class="button__title">
      <template v-for="letter in text">
        <div class="button__title-letter" :key="letter.id">
          {{ letter == " " ? "&nbsp;" : letter }}
        </div>
      </template>
    </div>
    <div class="button__line-container">
      <div class="button__line-bg"></div>
      <div class="button__line"></div>
    </div>
  </div>
</template>

<script>
import { gsap } from "gsap";

export default {
  props: {
    text: {
      type: String,
      default: "Hello Baby!",
    },
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
      line: null,
      letters: null,
    };
  },
  mounted() {
    this.line = this.$el.querySelector(".button__line");
    this.letters = this.$el.querySelectorAll(".button__title-letter");
    //* initAnim function in mounted
    if (this.mountedAnim) {
      this.initAnim(this.mountedDelay);
    }
  },
  methods: {
    initAnim(delay) {
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

      animTl.play();
    },
  },
};
</script>

<style lang="scss" scoped>
@import "./../assets/styles/setup";

.button {
  .button__title {
    cursor: pointer;
    overflow: hidden;

    &:after {
      content: "+";
      margin-left: 0.2rem;
      display: inline-block;
      @include transform(rotate(0deg));

      @include transition(all 1s ease-in);
    }

    .button__title-letter {
      display: inline-block;
      @include transform(translateY(100%));
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
      width: 100%;
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
      background-color: #dfdfdf;
      @include transform(translateX(0px));

      @include transition(width 1s, transform 1s);
    }
  }

  &:hover {
    .button__line {
      width: 100px;
      @include transform(translateX(150px));

      @include transition(width 1s, transform 2s 0.5s);
    }
  }
}
</style>