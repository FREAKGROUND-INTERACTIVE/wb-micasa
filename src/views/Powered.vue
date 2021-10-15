<template>
  <transition @leave="leave" :css="false">
    <div class="powered">
      <View-title-bg ref="viewTitleBg"></View-title-bg>
      <Img-view-title ref="imgViewTitle" :url="'https://res.cloudinary.com/micasastudios/image/upload/v1616974995/WEBPAGE/LOADINGS/LOADING_POWERED_tdpqc6.jpg'" v-show="false"></Img-view-title>
      <div class="powered__bar-container">
        <div class="powered__bar"></div>
      </div>
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
  props: {
    initPage: {
      type: Boolean,
      default: true,
    },
  },
  watch: {
    initPage: function (val) {
      if (val) {
        this.initAnim(500);
      }
    },
  },
  mounted() {
    //* initAnim function in mounted
    if (this.initPage) {
      this.initAnim(1500);
    }
  },
  destroyed() {
    mutations.setTitle(" ");
  },
  methods: {
    initAnim(delay) {
      setTimeout(() => {
        this.$refs.viewTitleBg.initAnim(0.5);
        if (state.title != "Powered") {
          mutations.setTitle("Powered");
        }
        gsap.to(".powered__bar", {
          duration: 1,
          width: "100%",
        });
      }, delay);
      setTimeout(() => {
        this.$router.push({ name: "PoweredBy" });
      }, 3000);
    },

    /**
     ** LEAVE FUCTION
     *? Function for leave behavior
     * @param done it return the leave behavior end
     */
    leave(el, done) {
      this.$refs.imgViewTitle.leave();
      this.$refs.viewTitleBg.leave();
      gsap.to(".powered__bar", {
        duration: 1,
        width: "0%",
      });

      gsap.to(el, {
        duration: 1,
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

  .powered__bar-container {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100vw;
    height: 7px;
    .powered__bar {
      width: 0%;
      height: 100%;
      background-color: $green;
    }
  }
}
</style>