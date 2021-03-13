<template>
  <transition @leave="leave" :css="false">
    <div
      class="paragraph"
      :class="{
        left: align == 'left',
        right: align == 'right',
        center: align == 'center',
      }"
    >
      <div class="paragraph__quote-container" v-if="quote">
        <div class="paragraph__quote">{{ quote }}</div>
      </div>
      <div class="paragraph__title-container">
        <h2
          class="paragraph__title"
          :class="{ cyan: color == 'cyan', green: color == 'green' }"
        >
          {{ titleData }}
        </h2>
      </div>
      <div class="paragraph__subtitle-container" v-if="subtitle">
        <h3 class="paragraph__subtitle">{{ subtitle }}</h3>
      </div>
      <div class="paragraph__subtitle-container" v-if="subtitle2">
        <h3 class="paragraph__subtitle2">{{ subtitle2 }}</h3>
      </div>
      <p class="paragraph__text" :class="{ lora: font == 'lora' }">
        <template v-for="item in splitText">
          <div class="paragraph__split-container" :key="item">
            <div class="paragraph__split-text">
              {{ item }}
            </div>
          </div>
        </template>
      </p>
    </div>
  </transition>
</template>

<script>
import { gsap } from "gsap";

export default {
  props: {
    quote: String,
    title: String,
    color: String,
    font: String,
    subtitle: String,
    subtitle2: String,
    text: String,
    align: String,
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
    title: function (val) {
      setTimeout(() => {
        this.titleData = val;
      }, 1000);
    },
    text: function (val) {
      this.leave();
      setTimeout(() => {
        this.splitText = val.split(/\r?\n/);
      }, 1000);
      setTimeout(() => {
        this.initAnim(0);
      }, 3000);
    },
  },
  data() {
    return {
      titleData: this.title,
      splitText: this.text.split(/\r?\n/), //* split text in lines
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
      //* duration time for animation elements
      let time = 1;

      //* create timeLine
      let initTl = gsap.timeline({
        paused: "true",
        delay: delay,
      });

      //* quote animation
      if (this.quote) {
        initTl.to(".paragraph__quote", {
          duration: time,
          y: "0%",
          ease: "power1.inOut",
        });
      }

      //* title animation
      initTl.to(
        ".paragraph__title",
        {
          duration: time,
          y: "0%",
          ease: "power1.inOut",
        },
        "<0.2"
      );

      //* subtitle animation
      if (this.subtitle) {
        initTl.to(
          ".paragraph__subtitle",
          {
            duration: time,
            y: "0%",
            ease: "power1.inOut",
          },
          "<0.2"
        );
      }

      //* subtitle2 animation
      if (this.subtitle2) {
        initTl.to(
          ".paragraph__subtitle2",
          {
            duration: time,
            y: "0%",
            ease: "power1.inOut",
          },
          "<0.2"
        );
      }

      //* text lines animation
      this.$el.querySelectorAll(".paragraph__split-text").forEach((element) => {
        initTl.to(
          element,
          {
            duration: time,
            y: "0%",
            ease: "power1.inOut",
          },
          "<0.2"
        );
      });

      initTl.play();
    },

    /**
     ** LEAVE FUCTION
     *? Function for leave behavior
     * @param done it return the leave behavior end
     */
    leave(done) {
      //* duration time for animation elements
      let time = 1.5;

      //* text lines animation
      this.$el.querySelectorAll(".paragraph__split-text").forEach((element) => {
        gsap.to(element, {
          duration: time,
          y: "100%",
          ease: "power1.inOut",
        });
      });

      //* subtitle animation
      if (this.subtitle) {
        gsap.to(".paragraph__subtitle", {
          duration: time,
          y: "100%",
          ease: "power1.inOut",
        });
      }

      //* subtitle2 animation
      if (this.subtitle2) {
        gsap.to(".paragraph__subtitle2", {
          duration: time,
          y: "100%",
          ease: "power1.inOut",
        });
      }

      //* title animation
      gsap.to(".paragraph__title", {
        duration: time,
        y: "100%",
        ease: "power1.inOut",
        onComplete: function () {
          if (!this.quote) {
            done;
          }
        },
      });

      //* quote lines animation
      if (this.quote) {
        gsap.to(".paragraph__quote", {
          duration: time,
          y: "100%",
          ease: "power1.inOut",
          onComplete: done,
        });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "./../assets/styles/setup";

.paragraph {
  .paragraph__quote-container,
  .paragraph__subtitle-container,
  .paragraph__title-container {
    overflow: hidden;
  }

  .paragraph__quote {
    font-family: $lora;
    font-size: 0.875rem;
    font-weight: 400;
    @include transform(translateY(100%));
  }

  .paragraph__subtitle-container {
    .paragraph__subtitle,
    .paragraph__subtitle2 {
      font-family: $lora;
      font-size: 0.875rem;
      font-weight: 400;
      @include transform(translateY(100%));
    }
  }

  .paragraph__title-container {
    margin: 0.5rem 0;

    .paragraph__title {
      font-family: $lora;
      font-size: 24px;
      font-weight: 400;
      color: $red;
      @include transform(translateY(100%));

      &.cyan {
        color: $cyan;
      }
      &.green {
        color: $green;
      }
    }
  }

  .paragraph__text {
    font-family: $fira;
    font-size: 1rem;
    font-weight: 300;
    margin-top: 0.5rem;

    .paragraph__split-container {
      overflow: hidden;

      .paragraph__split-text {
        @include transform(translateY(100%));
      }
    }

    &.lora {
      font-family: $lora;
      font-size: 0.875rem;
      font-weight: 400;
    }

    @include breakpoint(sm) {
      font-size: 0.85rem;
    }
  }

  &.left {
    text-align: left;
  }

  &.right {
    text-align: right;
  }

  &.center {
    text-align: center;
  }

  @include breakpoint(sm) {
    text-align: center !important;
  }
}
</style>