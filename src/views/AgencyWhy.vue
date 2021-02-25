<template>
  <transition @leave="leave" :css="false">
    <div class="agency-why">
      <div class="agency-why__painter">
        <Painter3d
          ref="painter"
          :mountedAnim="true"
          :mountedDelay="3"
        ></Painter3d>
      </div>
      <div class="agency-why__color-picker">
        <p class="agency-why__color-text">
          (Pick a Color to paint the Object in the center)
        </p>
        <div class="agency-why__colors">
          <div class="agency-why__color red"></div>
          <div class="agency-why__color yellow"></div>
          <div class="agency-why__color green"></div>
          <div class="agency-why__color cyan"></div>
          <div class="agency-why__color blue"></div>
          <div class="agency-why__color pink"></div>
        </div>
      </div>
      <div class="agency-why__title">
        <div class="agency-why__title-container">
          <div
            v-for="letter in 'WHY US?'"
            :key="letter.id"
            class="agency-why__title-letter"
            :class="{ space: letter == ' ' }"
          >
            {{ letter }}
          </div>
        </div>
      </div>
      <div class="agency-why__paragraph">
        <Paragraph
          ref="paragraph"
          :title="'Why us?'"
          :text="'At the heart of our process is financial strategy. With a\ndeep understanding of our Gen Z consumer, we know how\nour message needs to resonate to create real change\nwithin a budget.'"
        ></Paragraph>
      </div>
      <div class="agency-why__brandheader">
        <Brand-header
          ref="BrandHeader"
          :link="'/'"
          :mountedAnim="true"
        ></Brand-header>
      </div>
      <div class="agency-why__link">
        <Link-button ref="LinkButton" :link="'/clients-agency'"></Link-button>
      </div>
    </div>
  </transition>
</template>

<script>
import { mutations } from "./../state";
import { gsap } from "gsap";
import Paragraph from "@/components/Paragraph";
import LinkButton from "@/components/LinkButton";
import Painter3d from "@/components/Painter3d";
import BrandHeader from "@/components/BrandHeader";

export default {
  components: {
    Paragraph,
    LinkButton,
    Painter3d,
    BrandHeader,
  },
  data() {
    return {
      colors: [],
      letters: null,
      picker: null,
    };
  },
  mounted() {
    this.letters = this.$el.querySelectorAll(".agency-why__title-letter");
    this.picker = this.$el.querySelector(".agency-why__color-picker");
    mutations.setTitle(" ");
    setTimeout(() => {
      window.addEventListener("wheel", this.handleScroll);
    }, 3000);
    this.initAnim(1500);
  },
  destroyed() {
    window.removeEventListener("wheel", this.handleScroll);
  },
  methods: {
    /**
     ** SCROLL EVENT FUNCTION
     *? Function for route behavior on wheel
     * @param e mouse movement event
     */
    handleScroll(e) {
      window.removeEventListener("wheel", this.handleScroll);
      if (e.deltaY < 0) {
        this.$router.push({ path: "/services-agency" });
      }
      if (e.deltaY > 0) {
        this.$router.push({ path: "/clients-agency" });
      }
    },

    /**
     ** INIT ANIMATION FUNCTION
     *? Function for init animation
     * @param delay time for timeLine delay
     */
    initAnim(delay) {
      setTimeout(() => {
        this.$refs.paragraph.initAnim(2);
        this.$refs.LinkButton.initAnim(3);
        const letterTl = new gsap.timeline({ paused: true });
        this.letters.forEach((element) => {
          letterTl.to(
            element,
            {
              duration: 1,
              y: 0,
            },
            "<0.2"
          );
        });
        letterTl.play();
        gsap.to(this.picker, {
          duration: 2,
          opacity: 1,
          delay: 3,
        });
      }, delay);
    },

    /**
     ** LEAVE FUCTION
     *? Function for leave behavior
     * @param done it return the leave behavior end
     */
    leave(el, done) {
      this.$refs.paragraph.leave();
      this.$refs.LinkButton.leave();      
      this.$refs.BrandHeader.leave();
      this.$refs.painter.leave();
      const letterTl = new gsap.timeline({ paused: true });
      this.letters.forEach((element) => {
        letterTl.to(
          element,
          {
            duration: 0.3,
            y: "100%",
          },
          "<0.05"
        );
      });
      letterTl.play();
      gsap.to(this.picker, {
        duration: 0.5,
        opacity: 0,
      });
      gsap.to(el, {
        duration: 1.5,
        y: 0,
        onComplete: done,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "./../assets/styles/setup";
.agency-why {
  @extend .layout;

  .agency-why__color-picker {
    opacity: 0;
    position: absolute;
    top: 8%;
    left: 50%;
    @include transform(translateX(-50%));
    width: fit-content;
    .agency-why__color-text {
      text-align: center;
      font-family: $lora;
      font-size: 14px;
    }
    .agency-why__colors {
      // margin: 0.5rem 0;
      display: flex;
      flex-flow: row nowrap;
      .agency-why__color {
        width: 35px;
        height: 35px;
        margin: 1rem 0.5rem;
        cursor: pointer;

        &.red {
          background-color: $red;
        }

        &.yellow {
          background-color: $yellow;
        }

        &.green {
          background-color: $green;
        }

        &.cyan {
          background-color: $cyan;
        }

        &.blue {
          background-color: $blue;
        }

        &.pink {
          background-color: $pink;
        }
      }
    }
  }

  .agency-why__title {
    position: absolute;
    top: 50%;
    left: 50%;
    width: fit-content;
    white-space: nowrap;
    pointer-events: none;
    @include transform(translate(-50%, -50%));

    .agency-why__title-container {
      overflow: hidden;
      .agency-why__title-letter {
        display: inline-block;
        font-family: $oswald;
        font-weight: 900;
        font-size: 16vw;
        line-height: 0.95;
        color: $red;
        @include transform(translateY(100%));

        &.space {
          margin-left: 3vw;
        }
      }
    }
  }

  .agency-why__painter {
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
  }

  .agency-why__brandheader {
    grid-area: logo;
  }

  .agency-why__paragraph {
    grid-area: content-2;
    place-self: end center;
    margin-bottom: 4rem;
    @include breakpoint(lg) {
      margin-bottom: 1rem;
    }
  }

  .agency-why__link {
    @extend .link;
  }
}
</style>