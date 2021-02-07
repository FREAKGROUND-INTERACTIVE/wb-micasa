<template>
  <transition @leave="leave" :css="false">
    <div class="agency-about">
      <div class="agency-about__img">
        <Img-bg ref="imgViewTitle"></Img-bg>
      </div>
      <div class="agency-about__title">
        <Font-weight></Font-weight>
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
    </div>
  </transition>
</template>

<script>
import { mutations } from "./../state";
import { gsap } from 'gsap';
import ImgBg from "@/components/ImgBg";
import FontWeight from "@/components/FontWeight";
import Paragraph from "@/components/Paragraph";
export default {
  components: {
    ImgBg,
    FontWeight,
    Paragraph,
  },
  mounted() {
    setTimeout(() => {
      mutations.setTitle(" ");
    }, 1000);
  },
  methods: {
    leave(el, done) {
      this.$refs.paragraph.leave();
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
  width: 100vw;
  height: 100vh;
  display: grid;
  grid-template-columns: [colFirst] 5% [col2] 1fr [col3] 1fr [col4] 5% [colEnd];
  grid-template-rows: 10% [row2] 80% [row3] 10% [rowEnd];
  grid-template-areas:
    ". breadCrumb menu ."
    ". content-1 content-2 ."
    ". logo button .";

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
}
</style>