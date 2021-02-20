<template>
  <transition @leave="leave" :css="false">
    <div class="img-view">
      <div class="img-view__img-container">
        <img
          class="img-view__img"
          width="512"
          height="512"
          :src="imgBg"
          alt="LoremPicsum"
          @load="imgLoaded"
          @error="imgDontLoaded"
        />
        <div class="img-view__title" :class="align">
          <!-- Mi<br />
          Casa<br /> -->
          {{ align == "left" ? "Brooklyn" : "LES" }}
        </div>
      </div>
      <div class="img-view__load"></div>
    </div>
  </transition>
</template>

<script>
import gsap from "gsap";

export default {
  props: {
    loading: {
      type: Number,
      default: 0,
    },
    align: String,
    mountedAnim: {
      type: Boolean,
      default: false,
    },
    mountedDelay: {
      type: Number,
      default: 0,
    },
    imgUrl: String,
  },
  watch: {
    loading: function (val) {
      this.$el.querySelector(".img-view__load").style.width = val + "%";
    },
  },
  data() {
    return {
      imgContainer: null,
      height: window.innerHeight,
      imgBg: this.imgUrl,
    };
  },
  mounted() {
    this.imgContainer = this.$el.querySelector(".img-view__img-container");
    this.img = this.$el.querySelector(".img-view__img");

    //* initAnim function in mounted
    if (this.mountedAnim) {
      this.initAnim(this.mountedDelay);
    }
  },
  destroyed() {
    window.removeEventListener("mousemove", this.mouseMovement);
  },
  methods: {
    imgLoaded() {
      this.$emit("imgLoaded");
    },
    imgDontLoaded() {
      this.$emit("imgLoaded");
    },
    initAnim(delay) {
      gsap.to(this.imgContainer, {
        duration: 1,
        height: "28vw",
        y: 0,
        delay: delay,
      });
    },
    leave(done) {
      gsap.to(this.imgContainer, {
        duration: 1,
        height: 0,
        y: (window.innerWidth * 28) / 100,
        onComplete: function () {
          done;
        },
      });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "./../assets/styles/setup";

.img-view {
  // position: absolute;
  // left: 10%;
  // top: 0;
  display: flex;
  flex-flow: column nowrap;
  // justify-content: center;
  // align-items: center;
  cursor: pointer;

  .img-view__img-container {
    position: relative;
    width: 28vw;
    height: 0vw;
    overflow: hidden;

    .img-view__img {
      position: absolute;
      top: 50%;
      left: 50%;
      width: 28vw;
      height: 28vw;
      @include transform(translate(-50%, -50%));
    }

    .img-view__title {
      position: absolute;

      font-size: 5vw;
      line-height: 0.8;
      color: $light;
      font-weight: 700;

      &.right {
        text-align: right;
        bottom: 40px;
        right: 20px;
      }

      &.left {
        text-align: left;
        bottom: 40px;
        left: 20px;
      }
    }
  }

  .img-view__load {
    width: 0;
    height: 10px;
    background-color: $cyan;
  }
}
</style>