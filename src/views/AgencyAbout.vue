<template>
  <transition @leave="leave" :css="false">
    <div class="agency-about">
      <div class="agency-about__content">
        <div class="agency-about__img">
          <Img-bg ref="imgBg" @imgLoaded="initAnim"></Img-bg>
          <div class="agency-about__title">
            <Font-weight ref="fontWeight" :text="dataComp.title"></Font-weight>
          </div>
        </div>
        <div class="agency-about__paragraph">
          <Paragraph
            ref="paragraph"
            :quote="dataComp.paragraph.quote"
            :title="dataComp.paragraph.title"
            :text="dataComp.paragraph.text"
            :align="'left'"
          ></Paragraph>
        </div>
      </div>

      <div class="agency-about__bread">
        <Bread-crumb
          ref="bread"
          :number="'01'"
          :title="'About'"
          :pages="['About', 'Altering', 'Services', 'Why Us', 'Clients']"
          :mark="0"
          :mountedAnim="true"
          :mountedDelay="2"
        ></Bread-crumb>
      </div>
      <div class="agency-about__brandheader">
        <Brand-header
          ref="BrandHeader"
          :link="link"
          :mountedAnim="true"
        ></Brand-header>
      </div>
      <div class="agency-about__link">
        <Link-button ref="LinkButton" :link="'/altering-agency'"></Link-button>
      </div>
    </div>
  </transition>
</template>

<script>
import { mutations } from "./../state";
import { gsap } from "gsap";
import ImgBg from "@/components/ImgBg";
import FontWeight from "@/components/FontWeight";
import Paragraph from "@/components/Paragraph";
import LinkButton from "@/components/LinkButton";
import BrandHeader from "@/components/BrandHeader";
import BreadCrumb from "@/components/BreadCrumb";
export default {
  components: {
    ImgBg,
    FontWeight,
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
      this.dataComp = val.agency.about;
    },
  },
  data() {
    return {
      dataComp: this.data.agency.about,
      link: "/",
      numberPage: "01",
      titlePage: "Agency",
    };
  },
  mounted() {
    mutations.setTitle(" ");
    setTimeout(() => {
      window.addEventListener("wheel", this.handleScroll);
    }, 3000);
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
        this.$router.push({ path: "/" });
      }
      if (e.deltaY > 0) {
        this.$router.push({ path: "/altering-agency" });
      }
    },

    /**
     ** INIT ANIMATION FUNCTION
     *? Function for init animation
     * @param delay time for timeLine delay
     */
    initAnim() {
      setTimeout(() => {
        this.$refs.imgBg.initAnim(0);
        this.$refs.paragraph.initAnim(0.5);
        this.$refs.fontWeight.initAnim(0.9);
        this.$refs.LinkButton.initAnim(3);
      }, 1500);
    },

    /**
     ** LEAVE FUCTION
     *? Function for leave behavior
     * @param done it return the leave behavior end
     */
    leave(el, done) {
      this.$refs.paragraph.leave();
      this.$refs.imgBg.leave();
      this.$refs.fontWeight.leave();
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
.agency-about {
  @extend .layout;

  .agency-about__bread {
    grid-area: breadCrumb;
    position: absolute;
  }

  .agency-about__brandheader {
    grid-area: logo;
  }

  .agency-about__content {
    @extend .content;

    @include breakpoint(sm) {
      grid-area: 3 / 2 / 4 / 4;
      grid-template-columns: [colFirst] 5% [col2] 1fr [col3] 5% [colEnd];
      grid-template-rows: repeat(3, 1fr);
      grid-template-areas: 
      ". content-1  ."
      ". content-1  ."
      ". content-2  .";
    }

    .agency-about__img {
      grid-area: 1 / 1 / 2 / 2;
      display: grid;
      grid-template-columns: 1fr 74%;
      grid-template-areas: ". img";
      justify-self: end;
      width: 100%;

      // @include breakpoint(sm) {
      //   grid-area: 3 / 2 / 4 / 4;
      //   grid-template-columns: [colFirst] 5% [col2] 1fr [col3] 5% [colEnd];
      //   grid-template-rows: [rowFirst] 0.7fr [row2] 0.3fr [rowEnd];
      //   grid-template-areas:
      //   ".  img ."
      //   ".  text .";
      // }

      @include breakpoint(sm) {
        grid-area: content-1;
        grid-template-columns: 1fr;
        grid-template-areas: "img";
      }

      .agency-about__title {
        grid-area: img;
        justify-self: center;
        align-self: center;
        z-index: 1;
        // position: absolute;
        // @include transform(translateX(10%));

        @include breakpoint(sm) {
        }
      }
    }

    .agency-about__paragraph {
      grid-area: content-2;
      justify-self: center;
      align-self: center;
      margin-right: 5rem;
    }
  }

  .agency-about__link {
    @extend .link;
  }
}
</style>