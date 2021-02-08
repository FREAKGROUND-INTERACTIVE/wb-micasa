
<template>
  <transition>
    <div class="locations">
      <div class="locations__line"></div>
      <div class="locations__breadcrumb">
        <Bread-crumb
          :number="numberPage"
          :title="titlePage"
          :pages="[1, 2, 3, 4, 5, 6]"
        ></Bread-crumb>
      </div>
      <div class="locations__brandheader">
        <Brand-header :link="link"></Brand-header>
      </div>
      <div class="locations__sites">
        <div class="locations__sites-brooklyn">
          <!-- <img
            width="550"
            height="550"
            src="https://picsum.photos/550/550?random=1"
            alt="Brooklyn"
          /> -->
          <Img-studio
            @mouseenter.native="initLoading"
            @mouseleave.native="backLoading"
            :loading="loading.x"
          ></Img-studio>
        </div>
        <div class="locations__sites-brooklyn-button">
          <Button></Button>
        </div>
        <div class="locations__sites-les">
          <!-- <img
            width="550"
            height="550"
            src="https://picsum.photos/550/550?random=2"
            alt="Les"
          /> -->
          <Img-studio></Img-studio>
        </div>
        <div class="locations__sites-les-button">
          <Button></Button>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import gsap from "gsap";
import BreadCrumb from "@/components/BreadCrumb";
import BrandHeader from "@/components/BrandHeader";
import Button from "@/components/Button";
import ImgStudio from "@/components/ImgStudio";

export default {
  name: "StudioLocations",
  components: {
    BreadCrumb,
    BrandHeader,
    Button,
    ImgStudio,
  },
  data() {
    return {
      numberPage: "01",
      titlePage: "Agency",
      link: "/",
      loading: {
        x: 0,
      },
    };
  },
  methods: {
    initLoading() {
      console.log("animacion andando");
      gsap.to(this.loading, {
        duration: 5,
        x: 100,
      });
    },
    backLoading() {
      gsap.to(this.loading, {
        duration: 1,
        x: 0,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "./../assets/styles/setup";

.locations {
  width: 100vw;
  height: 100vh;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 10% 80% 10%;

  .locations__line {
    grid-area: 1 / 1 / 4 / 2;
    border-right: 1px solid $dark;
    height: 100%;
  }

  .locations__breadcrumb {
    grid-area: 1 / 1;
    display: flex;
    flex-flow: row nowrap;
    margin-left: 2rem;
  }

  .locations__brandheader {
    grid-area: 3 / 1 / 4 / 2;
    display: flex;
    flex-flow: row nowrap;
    margin-left: 2rem;
  }

  .locations__sites {
    grid-area: 2 / 1 / 3 / 3;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr 0.1fr;
    grid-template-areas:
      "brooklyn       les"
      "brooklynButton lesButton";

    .locations__sites-brooklyn {
      grid-area: brooklyn;
      place-self: center;
      // display: flex;
      // justify-content: center;
      // align-self: center;

      img {
        width: 100%;
        height: 100%;
      }
    }

    .locations__sites-brooklyn-button {
      grid-area: brooklynButton;
      display: flex;
      flex-flow: row nowrap;
      justify-content: center;
      align-self: center;
    }

    .locations__sites-les {
      grid-area: les;
      display: flex;
      justify-content: center;
      align-self: center;
    }

    .locations__sites-les-button {
      grid-area: lesButton;
      display: flex;
      flex-flow: row nowrap;
      justify-content: center;
      align-self: center;
    }
  }
}
</style>