<template>
  <transition v-bind:css="false">
    <div class="linkButton">
      <div class="linkButton__line">
        <div></div>
      </div>
      <router-link :to="linkUrl" :name="linkUrl.replace('/', '')">
        <div class="linkButton__text">
          <template v-for="letter in dataComp.button">
            <div :key="letter.id" class="linkButton__text-letter">
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
import { lang } from "./../state";

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
  watch: {
    link: function (val) {
      this.linkUrl = val;
    },
  },
  computed: {
    dataComp() {
      return lang.data.generals
    }
  },
  data() {
    return {
      linkUrl: this.link, //* link for router
      text: lang.lg == 'en' ? 'Next' : 'Siguiente', //* text for button
      letters: null, //* variable for character elements
      line: null, //* variable for line element
    };
  },
  mounted() {
    //* select characters
    this.letters = this.$el.querySelectorAll(".linkButton__text-letter");
    //* select line
    this.line = this.$el.querySelector(".linkButton__line > div");
    //* initAnim function in mounted
    if (this.mountedAnim) {
      this.initAnim(this.mountedDelay);
    }

    // if (lang.lg == 'en') {
    //   this.text = "Next"
    // } else {
    //   console.log('Cambio a espanol');
    //   this.text = "Siguiente"
    // }
  },
  updated() {
    //* select characters
    this.letters = this.$el.querySelectorAll(".linkButton__text-letter");
    this.initAnim(0);
  },
  methods: {
    /**
     ** INIT ANIMATION FUNCTION
     *? Function for init animation
     * @param delay time for timeLine delay
     */
    initAnim(delay) {
      //* create timeLine
      let animTl = gsap.timeline({ paused: "true", delay: delay });

      //* animate characters
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

      let that = this;

      //* animate line
      gsap.to(this.line, {
        duration: 1.6,
        width: 130,
        ease: "power2.out",
        delay: delay,
        onComplete: function () {
          that.$el.style.pointerEvents = "auto";
        },
      });
    },

    /**
     ** LEAVE FUCTION
     *? Function for leave behavior
     * @param done it return the leave behavior end
     */
    leave(done) {
      this.$el.style.pointerEvents = "none";
      //* animate characters
      this.letters.forEach((element) => {
        element.style.paddingRight = "0.2rem";
        gsap.to(element, {
          duration: 0.4,
          y: "100%",
        });
      });

      //* animate line
      gsap.to(this.line, {
        duration: 0.4,
        width: 0,
        ease: "power2.out",
        onComplete: done,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "./../assets/styles/setup";

.linkButton {
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;
  pointer-events: none;

  @include breakpoint(sm) {
    justify-content: flex-end;
  }

  .linkButton__line {
    margin-right: 1rem;
    width: 130px;

    div {
      width: 0px;
      height: 1px;
      background-color: $dark;

      @include transition(all 0.5s);
    }

    @include breakpoint(sm) {
      display: none;
    }
  }

  .linkButton__text {
    overflow: hidden;
    font-family: $mont;
    font-size: 14px;
    font-weight: 300;
    color: $dark;

    .linkButton__text-letter {
      display: inline-block;
      @include transition(all 0.3s);
      @include transform(translateY(100%));

      &:hover {
        // color: $red;
        font-weight: 400;
        // &:nth-child(1) {
        //   font-size: 17px;
        // }

        // &:nth-child(2) {
        //   font-size: 17px;
        // }

        // &:nth-child(3) {
        //   font-size: 17px;
        // }
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