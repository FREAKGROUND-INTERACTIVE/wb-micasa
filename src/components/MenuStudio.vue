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
          "https://res.cloudinary.com/micasastudios/image/upload/v1616976874/WEBPAGE/STUDIO/BKLYN/STUDIO/BKLYNSTDIO_1_grdqmx.jpg",
          "https://res.cloudinary.com/micasastudios/image/upload/v1616976874/WEBPAGE/STUDIO/BKLYN/STUDIO/BKLYNSTDIO_3_gi5zeg.jpg",
          "https://res.cloudinary.com/micasastudios/image/upload/v1616976874/WEBPAGE/STUDIO/BKLYN/STUDIO/BKLYNSTDIO_4_enlb3a.jpg",
          "https://res.cloudinary.com/micasastudios/image/upload/v1616976874/WEBPAGE/STUDIO/BKLYN/STUDIO/BKLYNSTDIO_5_rbscps.jpg",
          "https://res.cloudinary.com/micasastudios/image/upload/v1616976874/WEBPAGE/STUDIO/BKLYN/STUDIO/BKLYNSTDIO_6_q5khsb.jpg",
        ],
        hood: [
          "https://res.cloudinary.com/micasastudios/image/upload/v1616977066/WEBPAGE/STUDIO/BKLYN/HOOD/BKLYN_HOOD_1_evjcjs.jpg",
          "https://res.cloudinary.com/micasastudios/image/upload/v1616977066/WEBPAGE/STUDIO/BKLYN/HOOD/BKLYN_HOOD_2_qxizuj.jpg",
          "https://res.cloudinary.com/micasastudios/image/upload/v1616977067/WEBPAGE/STUDIO/BKLYN/HOOD/BKLYN_HOOD_3_uwxq2d.jpg",
          "https://res.cloudinary.com/micasastudios/image/upload/v1616977067/WEBPAGE/STUDIO/BKLYN/HOOD/BKLYN_HOOD_4_rnqm18.jpg",
        ]
      },
      imgLes: {
        studio: [
          "https://res.cloudinary.com/nancloud/image/upload/v1612836564/mi-casa/images/LOCATION4_kovpmt.jpg",
          "https://res.cloudinary.com/nancloud/image/upload/v1612836564/mi-casa/images/LOCATION4_kovpmt.jpg",
          "https://res.cloudinary.com/nancloud/image/upload/v1612836564/mi-casa/images/LOCATION4_kovpmt.jpg",
        ],
        hood: [
          "https://res.cloudinary.com/micasastudios/image/upload/v1616978210/WEBPAGE/STUDIO/LES/HOOD/LES_HOOD_1_d0vtne.jpg",
          "https://res.cloudinary.com/micasastudios/image/upload/v1616978210/WEBPAGE/STUDIO/LES/HOOD/LES_HOOD_2_fj3n5z.jpg",
          "https://res.cloudinary.com/micasastudios/image/upload/v1616978210/WEBPAGE/STUDIO/LES/HOOD/LES_HOOD_3_pp5d8c.jpg",
          "https://res.cloudinary.com/micasastudios/image/upload/v1616978211/WEBPAGE/STUDIO/LES/HOOD/LES_HOOD_4_hndt7u.jpg",
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