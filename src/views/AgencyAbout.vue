<template>
  <transition @leave="leave" :css="false">
    <div class="agency-about">
      <div class="agency-about__img">
        <Img-bg ref="imgBg" @imgLoaded="initAnim"></Img-bg>
      </div>
      <div class="agency-about__title">
        <Font-weight ref="fontWeight" :text="'agency'"></Font-weight>
      </div>
      <div class="agency-about__paragraph">
        <Paragraph
          ref="paragraph"
          :quote="'About us'"
          :title="'Mi Casa Studios'"
          :text="'Here at Mi Casa Studios we are more\nthan an agency. We are the home base\nfor a creative community that nurtures\nits menbers and provides fertile\nground for ideas to grow.'"
          :align="'left'"
        ></Paragraph>
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
export default {
  components: {
    ImgBg,
    FontWeight,
    Paragraph,
    LinkButton,
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
        this.$router.push({ path: "/agency" });
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
      this.$refs.paragraph.initAnim(1);
      this.$refs.fontWeight.initAnim(0);
      this.$refs.LinkButton.initAnim(4);
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

  .agency-about__img {
    grid-area: breadCrumb;
    justify-self: end;
  }

  .agency-about__title {
    grid-area: content-1;
    justify-self: end;
    align-self: center;
    z-index: 1;
    @include transform(translateX(10%));
  }

  .agency-about__paragraph {
    grid-area: content-2;
    justify-self: center;
    align-self: center;
  }

  .agency-about__link {
    @extend .link;
  }
}
</style>