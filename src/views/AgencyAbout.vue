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
        <Link-button ref="LinkButton" :link="'/agency'"></Link-button>
      </div>
    </div>
  </transition>
</template>

<script>
import { mutations } from "./../state";
import { gsap } from 'gsap';
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
    setTimeout(() => {
      mutations.setTitle(" ");
    }, 1000);
  },
  methods: {
    initAnim() {
      this.$refs.paragraph.initAnim(1);
      this.$refs.fontWeight.initAnim(0);
      this.$refs.LinkButton.initAnim(4);
    },
    leave(el, done) {
      console.log("leave agency");
      this.$refs.paragraph.leave();
      this.$refs.imgBg.leave();
      this.$refs.fontWeight.leave();
      this.$refs.LinkButton.leave();
      gsap.to(el, {
        duration: 1.5,
        y: 0,
        onComplete: done
      });
    }
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