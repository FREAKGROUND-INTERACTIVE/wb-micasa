
<template>
  <transition>
    <div class="locations">
      <div class="locations__line"></div>
      <div class="locations__breadcrumb"></div>
      <div class="locations__brandheader">
        <Brand-header :link="link"></Brand-header>
      </div>
      <div class="locations__sites-brooklyn" v-if="!brooklyn">
        <Img-studio
          @mouseenter.native="initLoading(true)"
          @mouseleave.native="backLoading(true)"
          :loading="loading.x"
          :align="'left'"
        ></Img-studio>
      </div>
      <div class="locations__sites-brooklyn-menu" v-show="brooklyn">
        <div class="locations__sites-brooklyn-slider">
          <splide :options="options">
            <splide-slide>
              <img src="https://picsum.photos/550/550" />
            </splide-slide>
            <splide-slide>
              <img src="https://picsum.photos/550/550" />
            </splide-slide>
            <splide-slide>
              <img src="https://picsum.photos/550/550" />
            </splide-slide>
          </splide>
        </div>
      </div>

      <div class="locations__sites-les" v-if="!brooklyn">
        <Img-studio
          @mouseenter.native="initLoading(false)"
          @mouseleave.native="backLoading(false)"
          :loading="loading2.x"
          :align="'right'"
          ref="imgLes"
        ></Img-studio>
      </div>
      <div
        class="locations__sites-brooklyn-content"
        v-show="brooklyn"
        v-if="brooklyn"
      >
        <div
          class="locations__sites-brooklyn-exit"
          @click="brooklyn = !brooklyn"
          v-if="brooklyn"
        >
          <Close-button ref="brooklynClose"></Close-button>
        </div>
        <div class="locations__sites-brooklyn-paragraph">
          <Paragraph
            :title="'Mi Casa Brooklyn'"
            :subtitle="'318 Grand Street, Suite 1G'"
            :subtitle2="'Brooklyn, NY 11211'"
            :text="'Lorem ipsum dolor sit amet,\nconsectetur adipisicing elit. Maxime, a nisi?\nQuaerat tempora itaque debitis eius illum voluptate,\n modi minus nostrum odio perspiciatis labore.\nAnimi eligendi consequuntur odit maiores suscipit.'"
            :mountedAnim="true"
          ></Paragraph>
        </div>
        <div class="locations__sites-brooklyn-button">
          <Button :mountedAnim="true" :mountedDelay="2"></Button>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
//* Third party libraries
import gsap from "gsap";
import { Splide, SplideSlide } from "@splidejs/vue-splide";
import "@splidejs/splide/dist/css/themes/splide-default.min.css";

//* Local Components
import BrandHeader from "@/components/BrandHeader";
import Button from "@/components/Button";
import ImgStudio from "@/components/ImgStudio";
import Paragraph from "@/components/Paragraph";
import CloseButton from "@/components/CloseButton";

export default {
  name: "StudioLocations",
  components: {
    BrandHeader,
    Button,
    ImgStudio,
    Paragraph,
    CloseButton,
    Splide,
    SplideSlide,
  },

  data() {
    return {
      numberPage: "01",
      titlePage: "Agency",
      link: "/",
      loading: {
        x: 0,
      },
      loading2: {
        x: 0,
      },
      brooklyn: false,
      options: {
        rewind: true,
        width: 550, //! Definir el tamaño respectivo de la imagen
        perPage: 1,
        speed: 1000,
        drag: true,
      },
    };
  },
  methods: {
    initLoading(first) {
      let that = this;
      if (first) {
        gsap.to(this.loading, {
          duration: 5,
          x: 100,
          onComplete: function () {
            that.$refs.imgLes.leave();
            setTimeout(() => {
              that.brooklyn = true;
            }, 500);
            setTimeout(() => {
              that.$refs.brooklynClose.initAnim(0);
            }, 1500); //! Verify time for lower bandwidth
          },
        });
      } else {
        gsap.to(this.loading2, {
          duration: 5,
          x: 100,
        });
      }
    },
    backLoading(first) {
      if (first) {
        gsap.killTweensOf(this.loading);
        gsap.to(this.loading, {
          duration: 1,
          x: 0,
        });
      } else {
        gsap.killTweensOf(this.loading2);
        gsap.to(this.loading2, {
          duration: 1,
          x: 0,
        });
      }
    }
  },
};
</script>

<style lang="scss" scoped>
@import "./../assets/styles/setup";

.locations {
  @extend .layout;

  .locations__line {
    grid-area: breadCrumb;
    justify-self: right;
    width: 1px;
    background-color: $dark;
    height: 100vh;
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
  }

  .locations__sites-brooklyn-menu {
    grid-area: content-1;
    place-self: center;

    .locations__sites-brooklyn-slider {
    }
  }

  .locations__sites-brooklyn-content {
    grid-area: content-2;
    place-self: center;
    width: 100%;
    height: 100%;

    display: grid;

    .locations__sites-brooklyn-exit {
      place-self: start end;
    }

    .locations__sites-brooklyn-paragraph {
      place-self: center;
    }

    .locations__sites-brooklyn-button {
      place-self: start center;
    }
  }

  .locations__sites-les {
    grid-area: content-2;
    place-self: center;
  }
}
</style>