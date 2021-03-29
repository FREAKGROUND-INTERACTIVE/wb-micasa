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
          {{ dataComp.textPainter }}
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
            v-for="letter in dataComp.title"
            :key="letter.id"
            class="agency-why__title-letter"
            :class="{ space: letter == ' ' }"
          >
            {{ letter }}
          </div>
        </div>
      </div>
      <div class="agency-why__bread">
        <Bread-crumb
          ref="bread"
          :number="'04'"
          :title="dataComp.bread"
          :pages="['About', 'Altering', 'Services', 'Why Us', 'Clients']"
          :mark="3"
          :mountedAnim="true"
          :mountedDelay="2"
        ></Bread-crumb>
      </div>
      <div class="agency-why__paragraph">
        <Paragraph
          ref="paragraph"
          :title="dataComp.paragraph.title"
          :text="dataComp.paragraph.text"
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
import BreadCrumb from "@/components/BreadCrumb";
import { lang } from "./../state";

export default {
  components: {
    Paragraph,
    LinkButton,
    Painter3d,
    BrandHeader,
    BreadCrumb,
  },
  props: {
    data: Object,
    initPage: {
      type: Boolean,
      default: true,
    },
  },
  watch: {
    data: function (val) {
      this.dataComp = val.agency.why;
    },
    initPage: function (val) {
      if (val) {
        this.initAnim(500);
      }
    },
  },
  data() {
    return {
      colors: [],
      letters: null,
      picker: null,
      dataComp: this.data.agency.why,
    };
  },
  mounted() {
    this.letters = this.$el.querySelectorAll(".agency-why__title-letter");
    this.picker = this.$el.querySelector(".agency-why__color-picker");
    mutations.setTitle(" ");
    setTimeout(() => {
      window.addEventListener("wheel", this.handleScroll);
      window.addEventListener("mousedown", this.hideTitle);
      window.addEventListener("mouseup", this.showTitle);
    }, 3000);
    //* initAnim function in mounted
    if (this.initPage) {
      this.initAnim(1500);
    }

    if (lang.lg == "en") {
      this.letters.forEach((element) => {
        element.classList.add("lang-en");
      });
    } else {
      this.letters.forEach((element) => {
        element.classList.add("lang-es");
      });
    }
  },
  updated() {
    this.letters = this.$el.querySelectorAll(".agency-why__title-letter");

    this.letters.forEach((element) => {
      element.classList.remove("lang-en");
      element.classList.remove("lang-es");
    });

    if (lang.lg == "en") {
      this.letters.forEach((element) => {
        element.classList.add("lang-en");
      });
    } else {
      this.letters.forEach((element) => {
        element.classList.add("lang-es");
      });
    }

    this.initAnim(0);
  },
  destroyed() {
    window.removeEventListener("wheel", this.handleScroll);
    window.removeEventListener("mousedown", this.hideTitle);
    window.removeEventListener("mouseup", this.showTitle);
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
     ** MOUSE DOWN EVENT FUNCTION
     *? Function for hide title when mouse is down
     */
    hideTitle() {
      this.letters.forEach((element) => {
        gsap.to(element, {
          duration: 1,
          opacity: 0,
        });
      });

      gsap.to(this.$el.querySelector(".agency-why__paragraph"), {
        duration: 1,
        opacity: 0,
      });
    },

    /**
     ** MOUSE UP EVENT FUNCTION
     *? Function for show title when mouse is up
     */
    showTitle() {
      this.letters.forEach((element) => {
        gsap.to(element, {
          duration: 1,
          opacity: 1,
        });
      });

      gsap.to(this.$el.querySelector(".agency-why__paragraph"), {
        duration: 1,
        opacity: 1,
      });
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
      this.$refs.bread.leave();
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
      gsap.killTweensOf(this.picker);
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

        &.lang-en {
          font-size: 16vw;
          line-height: 0.95;
        }

        &.lang-es {
          font-size: 9vw;
          line-height: 1.55;
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

  .agency-why__bread {
    grid-area: breadCrumb;
    position: absolute;
    @include breakpoint(sm) {
      display: none;
    }
  }

  .agency-why__brandheader {
    grid-area: logo;
    @include breakpoint(sm) {
      display: none;
    }
  }

  .agency-why__paragraph {
    grid-area: content-2;
    place-self: end center;
    margin-bottom: 4rem;
    @include breakpoint(sm) {
      width: 200%;
      @include transform(translate(-25%, -20%));
    }
    @include breakpoint(lg) {
      margin-bottom: 1rem;
    }
  }

  .agency-why__link {
    @extend .link;
  }
}
</style>