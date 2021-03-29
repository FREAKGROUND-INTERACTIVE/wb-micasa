<template>
  <div class="loading">
    <div class="loading__gif">
      <img
        src="https://res.cloudinary.com/micasastudios/image/upload/v1617046448/WEBPAGE/ICONS/loading_j4zixi.gif"
        width="150"
        height="150"
        alt="MI-CASA Loading"
      />
    </div>
    <div class="loading__content">
      <transition name="fade" mode="out-in">
        <div class="loading__button" v-if="loadingDone" key="btns">
          <Button ref="Button" :text="'English'" :mountedAnim="true" @click.native="goToWeb('en')"></Button>
          <Button ref="Button" :text="'Español'" :mountedAnim="true" @click.native="goToWeb('es')"></Button>
        </div>
        <div class="loading__text" v-else key="loading">
          Loading<br />{{ Math.floor(loadingCount.x) }}%
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import { gsap } from "gsap";
import { mutations } from "@/state";
import Button from "@/components/Button";

export default {
  components: {
    Button,
  },
  props: {
    count: Number,
    finish: Boolean,
  },
  watch: {
    count: function (val) {
      let that = this;
      gsap.to(this.loadingCount, {
        duration: 1,
        x: val,
        onComplete: function () {
          console.log("count: ", that.loadingCount.x);
          if (that.loadingCount.x >= 99) {
            that.loadingDone = true;
            // that.goToWeb();
          }
        },
      });
      //this.loadingCount = val;
    },
    finish: function (val) {
      // this.loadingDone = val;
      console.log("finish loading: ", val);
    },
  },
  data() {
    return {
      loadingCount: { x: this.count },
      loadingDone: this.finish,
    };
  },
  mounted() {
    if (window.location.pathname != "/") {
      mutations.loadingCharge(100);
    }
  },
  methods: {
    goToWeb(lang) {
      let that = this;
      mutations.changeLang(lang);
      gsap.to(this.$el, {
        duration: 1,
        autoAlpha: 0,
        onComplete: function () {
          that.loadingDone = true;
          that.$emit("init");
        },
      });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "./../assets/styles/setup";
.loading {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: $light;
  z-index: 9999;
  opacity: 1;

  .loading__gif {
    position: absolute;
    top: 50%;
    left: 50%;
    @include transform(translate(-50%, -50%));
  }

  .loading__content {
    position: absolute;
    left: 50%;
    bottom: 15%;
    text-align: center;
    @include transform(translateX(-50%));
    .loading__button {
      width: 30vw;
      display: flex;
      flex-flow: row nowrap;
      justify-content: space-between;

      @include breakpoint(sm) {
        width: 70vw;
      }
    }
  }

  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.5s;
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
  }
}
</style>