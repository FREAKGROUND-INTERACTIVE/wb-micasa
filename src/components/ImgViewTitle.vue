<template>
  <transition @leave="leave" :css="false">
    <div class="img-view">
      <div class="img-view__img-container">
        <img
          class="img-view__img"
          width="660"
          height="360"
          :src="url"
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
  props: {
    url: String,
    mountedAnim: {
      type: Boolean,
      default: false,
    },
    mountedDelay: {
      type: Number,
      default: 0,
    },
  },
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
    //* initAnim function in mounted
    if (this.mountedAnim) {
      this.initAnim(this.mountedDelay);
    }
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
      const mFactor = 60;

      gsap.to(this.img, {
        duration: 1,
        x: this.$el.style.left - (posX * mFactor) / 2,
        y: this.$el.style.top - posY * mFactor,
        ease: "power2.out",
      });
    },

    /**
     ** IMG LOADED FUNCTION
     *? Function for image init behavior trigger
     */
    imgLoaded() {
      this.imgAnim(this.mountedDelay);
    },

    /**
     ** IMG dont LOADED FUNCTION
     *? Function for image error load
     */
    imgDontLoaded() {
      //! podriamos tener una imagen base para cuando las imagenes no carguen
      this.initAnim(this.mountedDelay);
    },

    /**
     ** INIT ANIMATION FUNCTION
     *? Function for init animation
     * @param delay time for timeLine delay
     */
    imgAnim() {
      if (window.innerWidth > 768) {
        this.img.style.width =
          Math.floor((window.innerWidth * 40) / 100) + "px";
        this.imgContainer.style.height =
          Math.floor((window.innerWidth * 17) / 100) + "px";
        gsap.to(this.imgContainer, {
          duration: 1.5,
          width: Math.floor((window.innerWidth * 33) / 100),
          ease: "power2.out",
          delay: 1,
        });
      } else {
        this.img.style.width =
          Math.floor((window.innerWidth * 60) / 100) + "px";
        this.imgContainer.style.height =
          Math.floor((window.innerWidth * 25.5) / 100) + "px";
        gsap.to(this.imgContainer, {
          duration: 1.5,
          width: Math.floor((window.innerWidth * 49.5) / 100),
          ease: "power2.out",
          delay: 1,
        });
      }

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
        duration: 1,
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
    height: 0;
    overflow: hidden;
    .img-view__img {
      height: auto;
      position: absolute;
      top: 50%;
      left: 50%;
      @include transform(translate(-50%, -50%));
    }
  }

  @include breakpoint(sm) {
    top: 46.3%;
    .img-view__img-container {
      position: relative;
      width: 0;
      height: 0;
      overflow: hidden;
      .img-view__img {
        height: auto;
        position: absolute;
        top: 50%;
        left: 50%;
        @include transform(translate(-50%, -50%));
      }
    }
  }
}
</style>