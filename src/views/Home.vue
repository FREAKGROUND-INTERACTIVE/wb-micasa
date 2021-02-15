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
import * as Tone from "tone";

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
      switch (val) {
        case "Agency":
          this.toneJs("C3");
          setTimeout(() => {
            this.$el.classList.remove("studio");
            this.$el.classList.remove("powered");
            this.$el.classList.add("agency");
          }, 1000);
          break;
        case "Studio":
          this.toneJs("C4");
          setTimeout(() => {
            this.$el.classList.remove("agency");
            this.$el.classList.remove("powered");
            this.$el.classList.add("studio");
          }, 1000);
          break;
        case "powered":
          this.toneJs("C5");
          setTimeout(() => {
          this.$el.classList.remove("agency");
          this.$el.classList.remove("studio");
          this.$el.classList.add("powered");
          }, 1000);
          break;
        default:
          break;
      }
    },
  },
  data() {
    return {
      ready: false,
    };
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
    toneJs(note) {
      const synth = new Tone.Synth().toDestination();

      synth.triggerAttackRelease(note, "8n");
    },
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

  .home__links {
    grid-area: content;
    place-self: end center;
    width: 200px;
  }

  &.agency {
    background-color: $red;
  }

  &.studio {
    background-color: $cyan;
  }

  &.powered {
    background-color: $green;
  }
}
</style>
