<template>
  <transition @leave="leave" :css="false">
    <div class="agency">
      <View-title-bg ref="viewTitleBg" :mountedAnim="true" :mountedDelay="0.5"></View-title-bg>
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
      window.removeEventListener("wheel", this.handleScroll);
      console.log(e);
    },
    leave(el, done) {
      this.$refs.imgViewTitle.leave();
      this.$refs.viewTitleBg.leave();
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
.agency {
  @extend .layout;
  .agency__link {
    @extend .link;
  }
}
</style>
