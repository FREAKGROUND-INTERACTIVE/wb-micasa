<template>
  <transition @leave="leave" :css="false">
    <div class="agency-altering">
      <div class="agency-altering__mask">
        <Altering ref="altering"></Altering>
      </div>
      <div class="agency-altering__content">
        <div class="agency-altering__title">
          <h2>ALTERING<br />THE CONSTANT</h2>
        </div>
        <div class="agency-altering__paragraph">
          <Paragraph
            ref="paragraph"
            :title="dataComp.paragraph.title"
            :text="dataComp.paragraph.text"
          ></Paragraph>
        </div>
      </div>
      <div class="agency-altering__bread">
        <Bread-crumb
          ref="bread"
          :number="'02'"
          :title="'Altering'"
          :pages="['About', 'Altering', 'Services', 'Why Us', 'Clients']"
          :mark="1"
          :mountedAnim="true"
          :mountedDelay="2"
        ></Bread-crumb>
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
import BreadCrumb from "@/components/BreadCrumb";

export default {
  components: {
    Altering,
    Paragraph,
    LinkButton,
    BrandHeader,
    BreadCrumb,
  },
  props: {
    data: Object,
  },
  watch: {
    data: function (val) {
      this.dataComp = val.agency.altering;
    },
  },
  data() {
    return {
      dataComp: this.data.agency.altering,
    };
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
      this.$refs.BrandHeader.leave();
      this.$refs.bread.leave();
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

  .agency-altering__bread {
    grid-area: breadCrumb;
    position: absolute;
  }

  .agency-altering__mask {
    @include breakpoint(sm) {
      display: none;
    }
  }

  .agency-altering__content {
    @extend .content;

    @include breakpoint(sm) {
      grid-area: 3 / 2 / 4 / 4;
      grid-template-columns: [colFirst] 5% [col2] 1fr [col3] 5% [colEnd];
      grid-template-rows: repeat(4, 1fr);
      grid-template-areas:
        ". content-1  ."
        ". content-2  ."
        ". content-3  ."
        ". content-3  .";
    }

    .agency-altering__title {
      display: none;

      h2 {
        font-family: $oswald;
        font-weight: 900;
        font-size: 10vw;
      }

      @include breakpoint(sm) {
        display: flex;
        justify-self: center;
        line-height: 5rem;
        text-align: center;
        grid-area: content-1;
      }
    }

    .agency-altering__paragraph {
      grid-area: content-2;
      place-self: end center;
      margin-bottom: 4rem;

      @include breakpoint(lg) {
        margin-bottom: 1rem;
      }
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