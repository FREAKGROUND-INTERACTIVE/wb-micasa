<template>
  <transition @leave="leave" :css="false">
    <div class="powered">
      <View-title-bg ref="viewTitleBg"></View-title-bg>
      <Img-view-title ref="imgViewTitle"></Img-view-title>
      <div class="powered__link">
        <Link-button ref="LinkButton" :link="'/powered-by'"></Link-button>
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
    setTimeout(() => {
      window.addEventListener("wheel", this.handleScroll);
    }, 3000);
    this.initAnim(1500);
  },
  destroyed() {
    mutations.setTitle(" ");
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
      // console.log(e);
      if (e.deltaY < 0) {
        this.$router.push({ path: "/" });
      }
      if (e.deltaY > 0) {
        this.$router.push({ path: "/powered-by" });
      }
    },

    initAnim(delay) {
      setTimeout(() => {
        this.$refs.viewTitleBg.initAnim(0.5);
        this.$refs.LinkButton.initAnim(3);
        if (state.title != "Powered") {
          mutations.setTitle("Powered");
        }
      }, delay);
    },

    /**
     ** LEAVE FUCTION
     *? Function for leave behavior
     * @param done it return the leave behavior end
     */
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
.powered {
  @extend .layout;
  .powered__link {
    @extend .link;
  }
}
</style>