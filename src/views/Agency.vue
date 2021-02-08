<template>
  <transition @leave="leave" :css="false">
    <div class="agency">
      <View-title-bg ref="viewTitleBg"></View-title-bg>
      <Img-view-title ref="imgViewTitle"></Img-view-title>
      <div class="agency__link">
        <Link-button ref="LinkButton" :link="'/about-agency'"></Link-button>
      </div>
    </div>
  </transition>
</template>

<script>
import { state, mutations } from "./../state";
import gsap from "gsap";
import ImgViewTitle from "@/components/ImgViewTitle";
import ViewTitleBg from "@/components/ViewTitleBg";
import LinkButton from "@/components/LinkButton";
export default {
  components: {
    ImgViewTitle,
    ViewTitleBg,
    LinkButton,
  },
  mounted() {
    console.log("title: ", state.title);
    if (state.title != "Agency") {
      mutations.setTitle("Agency");
    }
    this.$refs.LinkButton.initAnim(3);
    setTimeout(() => {
      window.addEventListener("wheel", this.handleScroll);
    }, 3000);
  },
  destroyed() {
    window.removeEventListener("wheel", this.handleScroll);
  },
  methods: {
    handleScroll(e) {
      console.log(e);
    },
    leave(el, done) {
      console.log("leave agency");
      this.$refs.imgViewTitle.leave();
      this.$refs.viewTitleBg.leave();
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
.agency {
  @extend .layout;
  .agency__link {
    @extend .link;
  }
}
</style>
