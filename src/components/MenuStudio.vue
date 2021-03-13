<template>
  <transition @leave="leave" :css="false">
    <div class="menu-studio">
      <div class="menu-studio__slider">
        <Carrousel ref="carrousel1" :imgs="isBrooklyn?imgBrooklyn.studio:imgLes.studio"></Carrousel>
      </div>
      <div class="menu-studio__slider2">
        <Carrousel ref="carrousel2" :imgs="isBrooklyn?imgBrooklyn.hood:imgLes.hood"></Carrousel>
      </div>
      <div class="menu-studio__button" @click="clickButton" v-show="updateBtn">
        <Button ref="button" :text="textButtonData" :color="'cyan'" :isUpdate="updateBtn"></Button>
      </div>
    </div>
  </transition>
</template>

<script>
import { gsap } from "gsap";
import Carrousel from "@/components/Carrousel";
import Button from "@/components/Button";

export default {
  components: {
    Carrousel,
    Button,
  },
  props: {
    isBrooklyn: {
      type: Boolean,
      default: false,
    },
    btnUpdate: Boolean,
    textButton: String,
    mountedAnim: {
      type: Boolean,
      default: false,
    },
    mountedDelay: {
      type: Number,
      default: 0,
    },
  },
  watch: {
    textButton: function (val) {
      this.textButtonData = val;
    },
    btnUpdate: function (val) {
      this.updateBtn = val;
    },
  },
  data() {
    return {
      textButtonData: this.textButton,
      activeCarrousel: true,
      updateBtn: this.btnUpdate,
      imgBrooklyn: {
        studio: [
          "https://res.cloudinary.com/nancloud/image/upload/v1612836564/mi-casa/images/LOCATION3_pdy2cb.jpg",
          "https://res.cloudinary.com/nancloud/image/upload/v1612836564/mi-casa/images/LOCATION3_pdy2cb.jpg",
          "https://res.cloudinary.com/nancloud/image/upload/v1612836564/mi-casa/images/LOCATION3_pdy2cb.jpg",
        ],
        hood: [
          "https://res.cloudinary.com/nancloud/image/upload/v1612836564/mi-casa/images/NEIGHBORHOOD4_wbdu4z.jpg",
          "https://res.cloudinary.com/nancloud/image/upload/v1612836564/mi-casa/images/NEIGHBORHOOD4_wbdu4z.jpg",
          "https://res.cloudinary.com/nancloud/image/upload/v1612836564/mi-casa/images/NEIGHBORHOOD4_wbdu4z.jpg",
        ]
      },
      imgLes: {
        studio: [
          "https://res.cloudinary.com/nancloud/image/upload/v1612836564/mi-casa/images/LOCATION4_kovpmt.jpg",
          "https://res.cloudinary.com/nancloud/image/upload/v1612836564/mi-casa/images/LOCATION4_kovpmt.jpg",
          "https://res.cloudinary.com/nancloud/image/upload/v1612836564/mi-casa/images/LOCATION4_kovpmt.jpg",
        ],
        hood: [
          "https://res.cloudinary.com/nancloud/image/upload/v1612836564/mi-casa/images/NEIGHBORHOOD_q9farf.jpg",
          "https://res.cloudinary.com/nancloud/image/upload/v1612836564/mi-casa/images/NEIGHBORHOOD_q9farf.jpg",
          "https://res.cloudinary.com/nancloud/image/upload/v1612836564/mi-casa/images/NEIGHBORHOOD_q9farf.jpg",
        ]
      }
    };
  },
  mounted() {
    //* initAnim function in mounted
    if (this.mountedAnim) {
      this.initAnim(this.mountedDelay);
    }
  },
  methods: {
    /**
     ** INIT ANIMATION FUNCTION
     *? Function for init animation
     * @param delay time for timeLine delay
     */
    initAnim(delay) {
      this.$refs.carrousel1.initAnim(delay);
      this.$refs.button.initAnim(delay + 1);
    },

    clickButton() {
      if (this.activeCarrousel) {
        // this.$refs.carrousel1.leave();
        this.$refs.carrousel2.initAnim(1);
      } else {
        this.$refs.carrousel2.leave();
        // this.$refs.carrousel1.initAnim(1);
      }
      this.activeCarrousel = !this.activeCarrousel;
      this.$emit("clickButton");
    },

    leave(el, done) {
      this.$refs.carrousel1.leave();
      this.$refs.carrousel2.leave();
      this.$refs.button.leave();
      gsap.to(el, {
        duration: 1,
        x: 0,
        onComplete: done,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "./../assets/styles/setup";

.menu-studio {
  position: relative;
  .menu-studio__slider2 {
    position: absolute;
    top: 0;
  }
  .menu-studio__button {
    position: absolute;
    width: fit-content;
    margin-top: 2rem;
    // position: relative;
    left: 50%;
    @include transform(translateX(-50%) rotate(0deg));

    @include breakpoint(sm) {
      margin-top: 0;
      top: 44%;
      left: -10vw;
      @include transform(translateX(-50%) rotate(270deg));
    }
  }
}
</style>