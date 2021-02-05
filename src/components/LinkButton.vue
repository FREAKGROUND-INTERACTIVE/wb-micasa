<template>
  <transition v-bind:css="false">
    <div class="linkButton">
      <div class="linkButton__line">
        <div></div>
      </div>
      <router-link :to="linkUrl">
        <div class="linkButton__text">
          <template v-for="letter in text">
            <div :key="letter" class="linkButton__text-letter">
              {{ letter }}
            </div>
          </template>
        </div></router-link
      >
    </div>
  </transition>
</template>

<script>
import { gsap } from "gsap";

export default {
  props: {
    link: String,
  },
  watch: {
    link: function (val) {
      this.linkUrl = val;
    },
  },
  data() {
    return {
      linkUrl: this.link,
      text: "Next",
      letters: null,
      line: null,
    };
  },
  mounted() {
    this.letters = this.$el.querySelectorAll(".linkButton__text-letter");
    this.line = this.$el.querySelector(".linkButton__line > div");
    // this.initAnimation();
  },
  methods: {
    initAnimation() {
      console.log("init");
      let animTl = gsap.timeline({delay: 1.2});
      this.letters.forEach((element) => {
        console.log(element);
        animTl.to(
          element,
          {
            duration: 0.8,
            y: "0%",
            // onComplete: function () {
            //   console.log(index);
            // },
          },
          "<0.2"
        );
      });
      animTl.play();

      gsap.to(this.line, {
        duration: 1,
        width: 130,
        ease: "power2.out",
        delay: 1.5,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "./../assets/styles/setup";

.linkButton {
  position: absolute;
  right: 5%;
  bottom: 5%;
  // @include transform(translate(-50%, -50%));

  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;

  .linkButton__line {
    margin-right: 1rem;
    width: 130px;

    div {
      width: 0;
      height: 1px;
      background-color: #333;

      @include transition(all 0.5s);
    }
  }

  .linkButton__text {
    overflow: hidden;
    font-family: $mont;
    font-size: 14px;
    font-weight: 200;

    .linkButton__text-letter {
      display: inline-block;
      @include transition(all 0.3s);
      @include transform(translateY(100%));

      &:hover {
        &:nth-child(1) {
          font-size: 17px;
        }

        &:nth-child(2) {
          font-size: 17px;
          
        }

        &:nth-child(3) {
          font-size: 17px;
        }
      }
    }
  }

  &:hover {
    .linkButton__line {
      div {
        width: 110px !important;
      }
    }
    .linkButton__text-letter {
      padding-right: 0.2rem;
    }
  }
}
</style>