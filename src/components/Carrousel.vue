<template>
  <transition @leave="leave" :css="false">
    <div class="carrousel">
      <splide :options="options">
        <splide-slide v-for="img in imgs" :key="img.id">
          <img class="carrousel__img" :src="img" />
        </splide-slide>
        <!-- <splide-slide>
          <img
            class="carrousel__img"
            src="https://res.cloudinary.com/nancloud/image/upload/v1612836564/mi-casa/images/NEIGHBORHOOD3_qljqnw.jpg"
          />
        </splide-slide>
        <splide-slide>
          <img
            class="carrousel__img"
            src="https://res.cloudinary.com/nancloud/image/upload/v1612836564/mi-casa/images/NEIGHBORHOOD3_qljqnw.jpg"
          />
        </splide-slide>
        <splide-slide>
          <img
            class="carrousel__img"
            src="https://res.cloudinary.com/nancloud/image/upload/v1612836564/mi-casa/images/NEIGHBORHOOD3_qljqnw.jpg"
          />
        </splide-slide> -->
      </splide>
    </div>
  </transition>
</template>

<script>
//* Third party libraries
import gsap from "gsap";
import { Splide, SplideSlide } from "@splidejs/vue-splide";
import "@splidejs/splide/dist/css/themes/splide-default.min.css";
export default {
  components: {
    Splide,
    SplideSlide,
  },
  props: {
    imgs: Array,
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
      container: null,
      options: {
        rewind: true,
        width: window.innerWidth > 768? ((window.innerWidth * 28) / 100):((window.innerWidth * 60) / 100), //! Definir el tamaño respectivo de la imagen
        perPage: 1,
        speed: 1000,
        drag: true,
      },
    };
  },
  mounted() {
    //* initAnim function in mounted
    if (this.mountedAnim) {
      this.initAnim(this.mountedDelay);
    }
  },
  methods: {
    /**
     ** INIT ANIMATION FUNCTION
     *? Function for init animation
     * @param delay time for timeLine delay
     */
    initAnim(delay) {
      gsap.to(this.$el, {
        duration: 1,
        height: window.innerWidth > 768? ((window.innerWidth * 28) / 100):((window.innerWidth * 60) / 100),
        delay: delay,
      });
    },

    /**
     ** LEAVE FUCTION
     *? Function for leave behavior
     * @param done it return the leave behavior end
     */
    leave(done) {
      gsap.to(this.$el, {
        duration: 1,
        height: "0px",
        onComplete: done,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "./../assets/styles/setup";

.carrousel {
  width: 28vw;
  height: 0;
  overflow: hidden;
  .carrousel__img {
    width: 28vw;
    height: 28vw;
  }

  @include breakpoint(sm) {
    width: 60vw;
    .carrousel__img {
      width: 60vw;
      height: 60vw;
    }
  }
}
</style>