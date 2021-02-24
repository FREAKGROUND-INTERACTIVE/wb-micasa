<template>
  <transition @leave="leave" :css="false">
    <div class="agency-altering">
      <div class="agency-altering__mask">
        <Altering ref="altering"></Altering>
      </div>
      <div class="agency-altering__paragraph">
        <Paragraph
          ref="paragraph"
          :title="'Altering the constant'"
          :text="'We make bold things with a purpose to create real change\nfor the internet and beyond that. In this technology driven\nworld that seems to move faster than the speed of light,\nonly the right narrative to the right people at the right time\nwill pierce through.'"
        ></Paragraph>
      </div>
      <div class="agency-altering__brandheader">
        <Brand-header
          ref="BrandHeader"
          :link="'/'"
          :mountedAnim="true"
        ></Brand-header>
      </div>
      <div class="agency-altering__link">
        <Link-button ref="LinkButton" :link="'/services-agency'"></Link-button>
      </div>
    </div>
  </transition>
</template>

<script>
import { gsap } from "gsap";
import { mutations } from "./../state";

import Altering from "@/components/Altering";
import Paragraph from "@/components/Paragraph";
import LinkButton from "@/components/LinkButton";
import BrandHeader from "@/components/BrandHeader";

export default {
  components: {
    Altering,
    Paragraph,
    LinkButton,
    BrandHeader,
  },
  mounted() {
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
        this.$router.push({ path: "/about-agency" });
      }
      if (e.deltaY > 0) {
        this.$router.push({ path: "/services-agency" });
      }
    },

    /**
     ** INIT ANIMATION FUNCTION
     *? Function for init animation
     * @param delay time for timeLine delay
     */
    initAnim(delay) {
      setTimeout(() => {
        this.$refs.altering.initAnim(0);
        this.$refs.paragraph.initAnim(1);
        this.$refs.LinkButton.initAnim(3);
      }, delay);
    },

    /**
     ** LEAVE FUCTION
     *? Function for leave behavior
     * @param done it return the leave behavior end
     */
    leave(el, done) {
      this.$refs.altering.leave();
      this.$refs.paragraph.leave();
      this.$refs.LinkButton.leave();
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
.agency-altering {
  @extend .layout;

  .agency-altering__paragraph {
    grid-area: content-2;
    place-self: end center;
    margin-bottom: 4rem;

    @include breakpoint(lg) {
      margin-bottom: 1rem;
    }
  }

  .agency-altering__brandheader {
    grid-area: logo;
    z-index: 999;
  }

  .agency-altering__link {
    @extend .link;
    z-index: 999;
  }
}
</style>