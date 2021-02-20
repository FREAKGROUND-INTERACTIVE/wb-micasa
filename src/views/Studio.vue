<template>
  <transition @leave="leave" :css="false">
    <div class="studio">
      <View-title-bg ref="viewTitleBg"></View-title-bg>
      <Img-view-title ref="imgViewTitle"></Img-view-title>
    </div>
  </transition>
</template>

<script>
import { state, mutations } from "./../state";
import gsap from "gsap";
import ImgViewTitle from "@/components/ImgViewTitle";
import ViewTitleBg from "@/components/ViewTitleBg";
export default {
  components: {
    ImgViewTitle,
    ViewTitleBg,
  },
  mounted() {
    this.initAnim(1500);
  },
  destroyed() {
    mutations.setTitle(" ");
  },
  methods: {
    initAnim(delay) {
      setTimeout(() => {
        this.$refs.viewTitleBg.initAnim(0.5);
        if (state.title != "Studio") {
          mutations.setTitle("Studio");
        }
      }, delay);
      setTimeout(() => {
        this.$router.push({ name:'StudioLocations'});
      }, 6000);
    },

    /**
     ** LEAVE FUCTION
     *? Function for leave behavior
     * @param done it return the leave behavior end
     */
    leave(el, done) {
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
.studio {
  @extend .layout;
}
</style>
