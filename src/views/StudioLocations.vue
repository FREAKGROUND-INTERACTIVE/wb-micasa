
<template>
  <transition @leave="leave" :css="false">
    <div class="locations">
      <div class="locations__line"></div>
      <div class="locations__breadcrumb"></div>
      <div class="locations__brandheader">
        <Brand-header :link="'/'" :mountedAnim="true" ref="BrandHeader"></Brand-header>
      </div>

      <!--* LEFT SIDE -->
      <div class="locations__sites-brooklyn" v-show="!les">
        <Img-studio
          @mouseenter.native="initLoading(true)"
          @mouseleave.native="backLoading(true)"
          @imgLoaded="initAnim(150)"
          :loading="loading.x"
          :align="'left'"
          :imgUrl="'https://res.cloudinary.com/nancloud/image/upload/v1612836564/mi-casa/images/LOCATION3_pdy2cb.jpg'"
          ref="imgBrooklyn"
        ></Img-studio>
      </div>
      <div class="locations__sites-brooklyn-menu">
        <Menu-studio
          ref="menuBrooklyn"
          :textButton="hoodBrooklyn ? 'Studio' : 'Neighborhood'"
          @clickButton="hoodBrooklyn = !hoodBrooklyn"
        ></Menu-studio>
      </div>
      <div class="locations__sites-les-content" v-if="les">
        <div class="locations__sites-les-exit" @click="closeLes">
          <Close-button
            ref="lesClose"
            :mountedAnim="true"
            :mountedDelay="1"
            :color="'cyan'"
          ></Close-button>
        </div>
        <div class="locations__sites-les-paragraph">
          <Paragraph
            :align="'right'"
            ref="lesParagraph"
            :title="hoodLes ? infoHoodLes.title : infoStudioLes.title"
            :subtitle="infoStudioLes.subtitle"
            :subtitle2="infoStudioLes.subtitle2"
            :text="infoStudioLes.text"
            :color="'cyan'"
            :mountedAnim="true"
          ></Paragraph>
        </div>
        <div class="locations__sites-les-button">
          <Button
            ref="lesButton"
            :mountedAnim="true"
            :mountedDelay="2"
            :text="'Book Now'"
            :color="'cyan'"
          ></Button>
        </div>
      </div>

      <!--* RIGHT SIDE -->
      <div class="locations__sites-les" v-show="!brooklyn">
        <Img-studio
          @mouseenter.native="initLoading(false)"
          @mouseleave.native="backLoading(false)"
          @imgLoaded="initAnim(0)"
          :loading="loading2.x"
          :align="'right'"
          :imgUrl="'https://res.cloudinary.com/nancloud/image/upload/v1612836564/mi-casa/images/LOCATION4_kovpmt.jpg'"
          ref="imgLes"
        ></Img-studio>
      </div>
      <div class="locations__sites-les-menu">
        <Menu-studio
          ref="menuLes"
          :textButton="hoodLes ? 'Studio' : 'Neighborhood'"
          @clickButton="hoodLes = !hoodLes"
          :color="'cyan'"
        ></Menu-studio>
      </div>
      <div class="locations__sites-brooklyn-content" v-if="brooklyn">
        <div class="locations__sites-brooklyn-exit" @click="closeBrooklyn">
          <Close-button
            ref="brooklynClose"
            :mountedAnim="true"
            :mountedDelay="1"
            :color="'cyan'"
          ></Close-button>
        </div>
        <div class="locations__sites-brooklyn-paragraph">
          <Paragraph
            ref="brooklynParagraph"
            :title="
              hoodBrooklyn ? infoHoodBrooklyn.title : infoStudioBrooklyn.title
            "
            :subtitle="infoStudioBrooklyn.subtitle"
            :subtitle2="infoStudioBrooklyn.subtitle2"
            :text="infoStudioBrooklyn.text"
            :mountedAnim="true"
            :color="'cyan'"
          ></Paragraph>
        </div>
        <div class="locations__sites-brooklyn-button">
          <Button
            ref="brooklynButton"
            :mountedAnim="true"
            :mountedDelay="2"
            :text="'Book Now'"
            :color="'cyan'"
          ></Button>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
//* Third party libraries
import gsap from "gsap";

//* Local Components
import BrandHeader from "@/components/BrandHeader";
import Button from "@/components/Button";
import ImgStudio from "@/components/ImgStudio";
import Paragraph from "@/components/Paragraph";
import CloseButton from "@/components/CloseButton";
import MenuStudio from "@/components/MenuStudio";

export default {
  name: "StudioLocations",
  components: {
    BrandHeader,
    Button,
    ImgStudio,
    Paragraph,
    CloseButton,
    MenuStudio,
  },

  data() {
    return {
      loading: {
        x: 0,
      },
      loading2: {
        x: 0,
      },
      brooklyn: false,
      hoodBrooklyn: false,
      infoStudioBrooklyn: {
        title: "Mi Casa Brooklyn",
        subtitle: "318 Grand Street, Suite 1G",
        subtitle2: "Brooklyn, NY 11211",
        text:
          "Lorem ipsum dolor sit amet,\nconsectetur adipisicing elit. Maxime, a nisi?\nQuaerat tempora itaque debitis eius illum voluptate,\n modi minus nostrum odio perspiciatis labore.\nAnimi eligendi consequuntur odit maiores suscipit.",
      },
      infoHoodBrooklyn: {
        title: "Williamsburg",
        subtitle: "318 Grand Street, Suite 1G",
        subtitle2: "Brooklyn, NY 11211",
        text:
          "Lorem ipsum dolor sit amet,\nconsectetur adipisicing elit. Maxime, a nisi?\nQuaerat tempora itaque debitis eius illum voluptate,\n modi minus nostrum odio perspiciatis labore.\nAnimi eligendi consequuntur odit maiores suscipit.",
      },
      les: false,
      hoodLes: false,
      infoStudioLes: {
        title: "Mi Casa LES",
        subtitle: "318 Grand Street, Suite 1G",
        subtitle2: "Brooklyn, NY 11211",
        text:
          "Lorem ipsum dolor sit amet,\nconsectetur adipisicing elit. Maxime, a nisi?\nQuaerat tempora itaque debitis eius illum voluptate,\n modi minus nostrum odio perspiciatis labore.\nAnimi eligendi consequuntur odit maiores suscipit.",
      },
      infoHoodLes: {
        title: "Flacosburg",
        subtitle: "318 Grand Street, Suite 1G",
        subtitle2: "Brooklyn, NY 11211",
        text:
          "Lorem ipsum dolor sit amet,\nconsectetur adipisicing elit. Maxime, a nisi?\nQuaerat tempora itaque debitis eius illum voluptate,\n modi minus nostrum odio perspiciatis labore.\nAnimi eligendi consequuntur odit maiores suscipit.",
      },
      line: null,
      initImg: 0,
    };
  },
  mounted() {
    this.line = this.$el.querySelector(".locations__line");
    setTimeout(() => {
      window.addEventListener("wheel", this.handleScroll);
    }, 3000);
    // this.initAnim(1);
  },
  destroyed() {
    window.removeEventListener("wheel", this.handleScroll);
  },
  methods: {
    initAnim(delay) {
      this.initImg += 1;
      if (this.initImg == 2) {
        setTimeout(() => {
          this.$refs.imgBrooklyn.initAnim(0.2);
          this.$refs.imgLes.initAnim(0.2);
          gsap.to(this.line, {
            duration: 1,
            height: "100vh",
            delay: delay,
          });
        }, 1500);
      }
    },
    initLoading(first) {
      let that = this;
      if (first) {
        gsap.to(this.loading, {
          duration: 3,
          x: 100,
          ease: "power4.easeOut",
          onComplete: function () {
            that.loading.x = 0;
            that.$refs.imgLes.leave();
            that.$refs.imgBrooklyn.leave();
            that.$refs.menuBrooklyn.initAnim(2);
            setTimeout(() => {
              that.brooklyn = true;
            }, 2000);
          },
        });
      } else {
        gsap.to(this.loading2, {
          duration: 3,
          x: 100,
          ease: "power4.easeOut",
          onComplete: function () {
            that.loading2.x = 0;
            that.$refs.imgLes.leave();
            that.$refs.imgBrooklyn.leave();
            that.$refs.menuLes.initAnim(2);
            setTimeout(() => {
              that.les = true;
            }, 2000);
          },
        });
      }
    },
    backLoading(first) {
      if (first) {
        gsap.killTweensOf(this.loading);
        gsap.to(this.loading, {
          duration: 1,
          x: 0,
          ease: "power4.easeIn",
        });
      } else {
        gsap.killTweensOf(this.loading2);
        gsap.to(this.loading2, {
          duration: 1,
          x: 0,
        });
      }
    },
    closeBrooklyn() {
      this.$refs.brooklynClose.leave();
      this.$refs.brooklynParagraph.leave();
      this.$refs.brooklynButton.leave();
      this.$refs.imgBrooklyn.initAnim(2.5);
      this.$refs.imgLes.initAnim(2.5);
      setTimeout(() => {
        this.$refs.menuBrooklyn.leave();
        this.brooklyn = false;
      }, 1300);
    },

    closeLes() {
      this.$refs.lesClose.leave();
      this.$refs.lesParagraph.leave();
      this.$refs.lesButton.leave();
      this.$refs.imgBrooklyn.initAnim(2.5);
      this.$refs.imgLes.initAnim(2.5);
      setTimeout(() => {
        this.$refs.menuLes.leave();
        this.les = false;
      }, 1300);
    },

    /**
     ** SCROLL EVENT FUNCTION
     *? Function for route behavior on wheel
     * @param e mouse movement event
     */
    handleScroll(e) {
      if (e.deltaY < 0 && !this.brooklyn && !this.les) {
        window.removeEventListener("wheel", this.handleScroll);
        this.$router.push({ path: "/" });
      }
    },

    leave(el, done) {
      this.$refs.imgBrooklyn.leave();
      this.$refs.imgLes.leave();
      this.$refs.BrandHeader.leave();
      gsap.to(this.line, {
        duration: 0.5,
        height: "0vh",
      });
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

.locations {
  @extend .layout;

  .locations__line {
    grid-area: 1 / 2 / 6 / -3;
    justify-self: right;
    width: 1px;
    background-color: $dark;
    height: 0vh;
  }

  .locations__breadcrumb {
    grid-area: breadCrumb;
  }

  .locations__brandheader {
    grid-area: logo;
  }

  .locations__sites-brooklyn {
    grid-area: content-1;
    place-self: center;
    width: 28vw;
    height: 28vw;
    // background-color: red;
  }

  .locations__sites-brooklyn-menu {
    grid-area: content-1;
    place-self: center;
    width: 28vw;
    height: 28vw;
    // background-color: rgb(99, 0, 0);
  }

  .locations__sites-brooklyn-content {
    grid-area: content-2;
    place-self: center;
    width: 100%;
    height: 100%;
    z-index: 99;
    display: grid;

    .locations__sites-brooklyn-exit {
      position: fixed;
      top: 50%;
      left: 50%;
      background: $light;
      @include transform(translate(-50%, -50%));
    }

    .locations__sites-brooklyn-paragraph {
      place-self: end center;
    }

    .locations__sites-brooklyn-button {
      place-self: center;
    }
  }

  .locations__sites-les {
    grid-area: content-2;
    place-self: center;
    width: 28vw;
    height: 28vw;
    // background-color: green;
  }

  .locations__sites-les-menu {
    grid-area: content-2;
    place-self: center;
    width: 28vw;
    height: 28vw;
    // background-color: rgb(1, 43, 1);
  }

  .locations__sites-les-content {
    grid-area: content-1;
    place-self: center;
    width: 100%;
    height: 100%;
    z-index: 99;
    display: grid;

    .locations__sites-les-exit {
      position: fixed;
      top: 50%;
      left: 50%;
      background: $light;
      @include transform(translate(-50%, -50%));
    }

    .locations__sites-les-paragraph {
      place-self: end center;
    }

    .locations__sites-les-button {
      place-self: center;
    }
  }
}
</style>