
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
          <img
            width="550"
            height="550"
            src="https://picsum.photos/1920/1080?random=1"
            alt="Brooklyn"
          />
        </div>
        <div class="locations__sites-brooklyn-button">
          <Button></Button>
        </div>
        <div class="locations__sites-les">
          <img
            width="550"
            height="550"
            src="https://picsum.photos/1920/1080?random=2"
            alt="Les"
          />
        </div>
        <div class="locations__sites-les-button">
          <Button></Button>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import BreadCrumb from "@/components/BreadCrumb";
import BrandHeader from "@/components/BrandHeader";
import Button from "@/components/Button";

export default {
  name: "StudioLocations",
  components: {
    BreadCrumb,
    BrandHeader,
    Button,
  },
  data() {
    return {
      numberPage: "01",
      titlePage: "Agency",
      link: "/",
    };
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
  grid-template-rows: 0.9fr 5fr 0.9fr;

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
    grid-template-areas: "brooklyn les" "brooklynButton lesButton";

    .locations__sites-brooklyn {
      grid-area: brooklyn;
      display: flex;
      justify-content: center;
      align-self: center;
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