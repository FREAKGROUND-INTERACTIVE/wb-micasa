<template>
  <transition @leave="leave" :css="false">
    <div class="img-view">
      <div class="img-view__img-container">
        <img
          class="img-view__img"
          width="500"
          :height="height"
          :src="'https://picsum.photos/300/'+height"
          alt="LoremPicsum"
          @load="imgLoaded"
        />
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
      default: 0
    }
  },
  watch: {
    loading: function(val) {
      console.log("loading cambiando");
      this.$el.querySelector(".img-view__load").style.width = val + "%"; 
    }
  },
  data() {
    return {
      imgContainer: null,
      height: window.innerHeight
    };
  },
  mounted() {
    this.imgContainer = this.$el.querySelector(".img-view__img-container");
    this.img = this.$el.querySelector(".img-view__img");
    window.addEventListener("mousemove", this.mouseMovement);
  },
  destroyed() {
    window.removeEventListener("mousemove", this.mouseMovement);
  },
  methods: {
    mouseMovement(e) {
      let OldX = window.innerWidth;
      let NewX = 1 - -1;
      let posX = ((e.clientX - 0) * NewX) / OldX + -1;
      // let posX = e.clientX / window.innerWidth;
      let OldY = window.innerHeight;
      let NewY = 1 - -1;
      let posY = ((e.clientY - 0) * NewY) / OldY + -1;
      // let posY = e.clientY / window.innerHeight;
      const mFactor = 50;

      gsap.to(this.img, {
        duration: 1,
        x: this.$el.style.left - posX * mFactor,
        y: this.$el.style.top - posY * mFactor,
        ease: "power2.out",
      });
    },
    imgLoaded() {
      console.log("img loaded");
      this.imgAnim();
    },
    imgAnim() {
      gsap.to(this.imgContainer, {
        duration: 1,
        height: '550px',
        ease: "power2.out",
      });
    },
    leave(done) {
      window.removeEventListener("mousemove", this.mouseMovement);
      gsap.to(this.imgContainer, {
        duration: 0.5,
        width: 0,
        ease: "power2.out",
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
  justify-content: center;
  align-items: center;
  // @include transform(translate(-50%, -50%));
  .img-view__img-container {
    position: relative;
    width: 550px;
    height: 0;
    overflow: hidden;
    .img-view__img {
      position: absolute;
      top: 50%;
      left: 50%;
      @include transform(translate(-50%, -50%) scale(1.3));
    }
  }

  .img-view__load {
    width: 0;
    height: 10px;
    background-color: $red;
  }
}
</style>