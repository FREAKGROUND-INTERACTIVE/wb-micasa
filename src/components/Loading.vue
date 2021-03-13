<template>
  <div class="loading">
    <div class="loading__gif">
      <img
        src="https://res.cloudinary.com/nancloud/image/upload/v1613945675/mi-casa/images/loading_dg7yne.gif"
        width="150"
        height="150"
        alt="MI-CASA Loading"
      />
    </div>
    <div class="loading__content">
      <div class="loading__button" @click="goToWeb" v-if="loadingDone">
        <Button ref="Button" :text="'Play'" :mountedAnim="true"></Button>
      </div>
      <div class="loading__text">
        Loading<br />{{ Math.floor(loadingCount.x) }}%
      </div>
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
    goToWeb() {
      let that = this;
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
      width: fit-content;
    }
  }
}
</style>