<template>
  <transition @leave="leave" :css="false">
    <div class="home">
      <Color-layer ref="colorLayer" :color="color"></Color-layer>
      <div class="home__3d">
        <Home3d ref="home3d"></Home3d>
      </div>
      <div class="home__links">
        <Links-list
          ref="linksList"
          :mountedAnim="true"
          :links="['Agency', 'Studio', 'Powered']"
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
    initPage: {
      type: Boolean,
      default: true,
    },
  },
  watch: {
    color: function (val) {
      this.setColor = val;
    },
    initPage: function (val) {
      if (val) {
        this.initAnim(1);
      }
    },
  },
  data() {
    return {
      setColor: null,
    };
  },
  mounted() {
    //* initAnim function in mounted
    if (this.initPage) {
      this.initAnim(1.5);
    }
  },
  methods: {
    initAnim(delay) {
      gsap.to(this.$el, {
        duration: 2,
        opacity: "1",
        delay: delay,
        onComplete: function () {
          mutations.setTitle("micasa");
          mutations.setHome(true);
        },
      });
    },
    leave(el, done) {
      this.$el.classList.add("white");
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
  position: fixed;
  top: 0;
  opacity: 0;
  width: 100%;
  height: 100vh;
  display: grid;
  background-color: #dfdfdf;
  grid-template-columns: [colFirst] 4% [col2] 1fr [col3] 1fr [col4] 4% [colEnd];
  grid-template-rows: [rowFirst] 6% [row2] 7% [row3] 74% [row4] 7% [row5] 6% [rowEnd];
  grid-template-areas:
    ".    .     .     ."
    ". breadCrumb menu ."
    ". content content ."
    ". logo logo ."
    ".    .     .     .";

  .home__3d {
    position: fixed;
    z-index: 9998;
  }

  .home__links {
    grid-area: logo;
    place-self: end center;
    width: 200px;
    z-index: 9998;
  }

  &.white {
    background-color: rgba(#ffffff, 0);
  }
}
</style>
