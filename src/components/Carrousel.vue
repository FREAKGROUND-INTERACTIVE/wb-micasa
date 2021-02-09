<template>
  <transition @leave="leave" :css="false">
    <div class="carrousel">
      <splide :options="options">
        <splide-slide>
          <img
            src="https://res.cloudinary.com/nancloud/image/upload/v1606967826/urbina/imgs/02_tah2q3.png"
            width="550"
            height="550"
          />
        </splide-slide>
        <splide-slide>
          <img
            src="https://res.cloudinary.com/nancloud/image/upload/v1606967826/urbina/imgs/02_tah2q3.png"
            width="550"
            height="550"
          />
        </splide-slide>
        <splide-slide>
          <img
            src="https://res.cloudinary.com/nancloud/image/upload/v1606967826/urbina/imgs/02_tah2q3.png"
            width="550"
            height="550"
          />
        </splide-slide>
      </splide>
    </div>
  </transition>
</template>

<script>
//* Third party libraries
// import gsap from "gsap";
import { Splide, SplideSlide } from "@splidejs/vue-splide";
import "@splidejs/splide/dist/css/themes/splide-default.min.css";
export default {
  components: {
    Splide,
    SplideSlide,
  },
  props: {
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
      options: {
        rewind: true,
        width: 550, //! Definir el tamaño respectivo de la imagen
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
      console.log("initAnim: ", delay);
    },

    /**
     ** LEAVE FUCTION
     *? Function for leave behavior
     * @param done it return the leave behavior end
     */
    leave(done) {
      console.log("leave: ", done);
    },
  },
};
</script>

<style lang="scss" scoped>
</style>