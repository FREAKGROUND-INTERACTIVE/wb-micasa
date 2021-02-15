<template>
  <transition name="home" @leave="leave" :css="false" mode="out-in">
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
          this.playerAgency.play();
          this.playerStudio.stop();
          this.playerPowered.stop();
          break;
        case "Studio":
          this.playerAgency.stop();
          this.playerStudio.play();
          this.playerPowered.stop();
          break;
        case "Powered":
          this.playerAgency.stop();
          this.playerStudio.stop();
          this.playerPowered.play();
          break;
        default:
          break;
      }
    },
  },
  data() {
    return {
      ready: false,
      playerAgency: null,
      playerStudio: null,
      playerPowered: null,
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

    this.playerSetup();
  },
  methods: {
    toneJs(val) {
      switch (val) {
        case "Agency":
          if (this.playerStudio.state == "started") {
            gsap.to(this.playerStudio.volume, {
              duration: 1,
              value: 0,
              onComplete: function () {
                this.playerStudio.stop();
              },
            });
          }
          this.playerAgency.start();
          console.log("Agency suena");
          break;
        case "Studio":
          this.playerStudio.start();
          console.log("Studio suena");
          break;
        case "powered":
          this.playerPowered.start();
          console.log("powered suena");
          break;
        default:
          break;
      }
    },
    playerSetup() {
      class Player {
        constructor(sample) {
          this.player = new Tone.Player(sample).toDestination();
        }
        play() {
          this.player.loop = true;
          this.player.start();
          gsap.to(this.player.volume, {
            duration: 4,
            value: 0.7,
          });
        }
        stop() {
          let that = this;
          gsap.to(this.player.volume, {
            duration: 0.2,
            value: 0,
            onComplete: function () {
              that.player.stop();
            },
          });
        }
        playing() {
          if (this.player.state == "started") {
            return true;
          } else {
            return false;
          }
        }
      }

      this.playerAgency = new Player(
        "https://tonejs.github.io/audio/drum-samples/breakbeat.mp3"
      );
      this.playerStudio = new Player(
        "https://tonejs.github.io/audio/drum-samples/breakbeat.mp3"
      );
      this.playerPowered = new Player(
        "https://tonejs.github.io/audio/drum-samples/breakbeat.mp3"
      );
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
    z-index: 999999;
  }

  .home__links {
    grid-area: content;
    place-self: end center;
    width: 200px;
    z-index: 999999;
  }

  &.white {
    background-color: rgba(#ffffff, 0);
  }
}
</style>
