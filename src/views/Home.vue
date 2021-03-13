<template>
  <transition @leave="leave" :css="false">
    <div class="home">
      <Color-layer ref="colorLayer" :color="color"></Color-layer>
      <div class="home__3d">
        <Home3d ref="home3d"></Home3d>
      </div>
      <div class="home__links">
        <Links-list
          v-show="false"
          ref="linksList"
          :mountedAnim="true"
          :links="['Agency', 'Studio', 'Powered']"
        ></Links-list>
        <transition name="fade" mode="out-in">
          <div
            class="home__btn"
            v-if="color != 'micasa' && color != ''"
            key="btn"
            @click="goTo(color)"
          >
            <Button :text="dataComp.enterButton" :mountedAnim="true"></Button>
          </div>
          <div class="home__text" v-else key="text"><p>{{dataComp.text}}</p></div>
        </transition>
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
import Button from "@/components/Button";

export default {
  name: "Home",
  components: {
    ColorLayer,
    Home3d,
    LinksList,
    Button,
  },
  props: {
    color: String,
    data: Object,
    initPage: {
      type: Boolean,
      default: true,
    },
  },
  watch: {
    color: function (val) {
      this.setColor = val;
    },
    data: function(val) {
      this.dataComp = val.home;
    },
    initPage: function (val) {
      if (val) {
        this.initAnim(0.5);
      }
    },
  },
  data() {
    return {
      setColor: null,
      dataComp: this.data.home,
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
          setTimeout(() => {
            mutations.setHome(true);
          }, 500);
        },
      });
    },
    goTo(url) {
      switch (url) {
        case 'Agency':
          this.$router.push({name:'Agency'});
          break;
        case 'Agencia':
          this.$router.push({name:'Agency'});
          break;
        case 'Studio':
          this.$router.push({name:'Studio'});
          break;
        case 'Estudio':
          this.$router.push({name:'Studio'});
          break;
        case 'Powered':
          this.$router.push({name:'Powered'});
          break;
        default:
          break;
      }
      
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
    display: flex;
    justify-content: center;

    .home__btn {
      width: fit-content;
      display: none;
    }

    .home__text {
      text-align: center;
    }

    @include breakpoint(sm) {
      @include transform(translateY(-200%));
      .home__btn {
        display: initial;
      }
    }
  }

  &.white {
    background-color: rgba(#ffffff, 0);
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
