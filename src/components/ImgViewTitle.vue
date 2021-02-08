<template>
  <transition @leave="leave" :css="false">
    <div class="img-view">
      <div class="img-view__img-container">
        <img
          class="img-view__img"
          width="660"
          height="360"
          src="https://picsum.photos/660/360"
          alt="LoremPicsum"
          @load="imgLoaded"
          @error="imgDontLoaded"
        />
      </div>
    </div>
  </transition>
</template>

<script>
import gsap from "gsap";

export default {
  data() {
    return {
      imgContainer: null, //* variable for image container
      img: null, //* variable for image
    };
  },
  mounted() {
    //* select image container
    this.imgContainer = this.$el.querySelector(".img-view__img-container");
    //* select image
    this.img = this.$el.querySelector(".img-view__img");
  },
  destroyed() {
    window.removeEventListener("mousemove", this.mouseMovement);
  },
  methods: {
    /**
     ** MOUSE MOVEMENT FUNCTION
     *? Function for image behavior on mouse movement
     * @param e mouse movement event
     */
    mouseMovement(e) {
      let OldX = window.innerWidth;
      let NewX = 1 - -1;
      let posX = ((e.clientX - 0) * NewX) / OldX + -1;
      // let posX = e.clientX / window.innerWidth;
      let OldY = window.innerHeight;
      let NewY = 1 - -1;
      let posY = ((e.clientY - 0) * NewY) / OldY + -1;
      // let posY = e.clientY / window.innerHeight;
      const mFactor = 100;

      gsap.to(this.img, {
        duration: 1,
        x: this.$el.style.left - posX * mFactor,
        y: this.$el.style.top - posY * mFactor,
        ease: "power2.out",
      });
    },

    /**
     ** IMG LOADED FUNCTION
     *? Function for image init behavior trigger
     */
    imgLoaded() {
      this.imgAnim();
    },

    /**
     ** IMG dont LOADED FUNCTION
     *? Function for image error load
     */
    imgDontLoaded() {
      //! podriamos tener una imagen base para cuando las imagenes no carguen
      this.initAnim(0);
    },

    /**
     ** INIT ANIMATION FUNCTION
     *? Function for init animation
     * @param delay time for timeLine delay
     */
    imgAnim() {
      gsap.to(this.imgContainer, {
        duration: 0.5,
        width: 660,
        ease: "power2.out",
        delay: 1,
      });
      window.addEventListener("mousemove", this.mouseMovement);
    },

    /**
     ** LEAVE FUCTION
     *? Function for leave behavior
     * @param done it return the leave behavior end
     */
    leave(done) {
      window.removeEventListener("mousemove", this.mouseMovement);
      gsap.to(this.imgContainer, {
        duration: 0.5,
        height: 0,
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
  position: absolute;
  left: 50%;
  top: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  @include transform(translate(-50%, -50%));
  .img-view__img-container {
    position: relative;
    width: 0;
    height: 360px;
    overflow: hidden;
    .img-view__img {
      position: absolute;
      top: 50%;
      left: 50%;
      @include transform(translate(-50%, -50%) scale(1.6));
    }
  }
}
</style>