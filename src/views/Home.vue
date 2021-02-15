<template>
  <transition @leave="leave" :css="false">
    <div class="home">
      <Color-layer ref="colorLayer" :color="color"></Color-layer>
      <Home3d ref="home3d"></Home3d>
      <div class="home__links">
        <Links-list
          ref="linksList"
          :mountedAnim="true"
          :links="['Agency', 'Studio', 'Powered-by-mi-casa']"
        ></Links-list>
      </div>
    </div>
  </transition>
</template>

<script>
import { mutations } from "./../state";
import { gsap } from "gsap";

import ColorLayer from "@/components/ColorLayer";
import Home3d from "@/components/Home3d";
import LinksList from "@/components/LinksList";

export default {
  name: "Home",
  components: {
    ColorLayer,
    Home3d,
    LinksList,
  },
  props: {
    color: String,
  },
  watch: {
    color: function (val) {
      setTimeout(() => {
        switch (val) {
          case "Agency":
            this.$el.classList.remove("studio");
            this.$el.classList.remove("powered");
            this.$el.classList.add("agency");
            break;
          case "Studio":
            this.$el.classList.remove("agency");
            this.$el.classList.remove("powered");
            this.$el.classList.add("studio");
            break;
          case "powered":
            this.$el.classList.remove("agency");
            this.$el.classList.remove("studio");
            this.$el.classList.add("powered");
            break;

          default:
            break;
        }
      }, 1000);
    },
  },
  mounted() {
    gsap.to(this.$el, {
      duration: 1,
      opacity: "1",
      delay: 0.5,
      onComplete: function () {
        mutations.setTitle("micasa");
        mutations.setHome(true);
      },
    });
  },
  methods: {
    leave(el, done) {
      this.$el.classList.remove("agency");
      this.$el.classList.remove("studio");
      this.$el.classList.remove("powered");
      this.$refs.home3d.leave();
      this.$refs.linksList.leave();
      this.$refs.colorLayer.leave();
      mutations.setHome(false);
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
.home {
  position: absolute;
  top: 0;
  opacity: 0;
  width: 100%;
  height: 100vh;
  background-color: #dfdfdf;

  .home__links {
    position: absolute;
    width: 250px;
    bottom: 17%;
    left: 50%;
    @include transform(translateX(-50%));
  }

  &.agency {
    background-color: #6a342e;
  }

  &.studio {
    background-color: #2e6a30;
  }

  &.powered {
    background-color: #2e496a;
  }
}
</style>
