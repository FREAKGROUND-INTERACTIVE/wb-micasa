<template>
  <transition @leave="leave" :css="false">
    <div class="font">
      <template v-for="item in title">
        <div class="font__phrase" :key="item">
          <template v-for="char in item">
            <div class="font__char" :key="char.id">
              {{ char == " " ? "&nbsp;" : char }}
            </div>
          </template>
        </div>
      </template>
    </div>
  </transition>
</template>

<script>
import { gsap } from "gsap";

export default {
  props: {
    text: String,
    mountedAnim: {
      type: Boolean,
      default: false,
    },
    mountedDelay: {
      type: Number,
      default: 0,
    },
  },
  watch: {
    text: function(val) {
      this.title = val.split("\n");    }
  },
  data() {
    return {
      title: this.text.split("\n"), //* split text in lines
      chars: null, //* variable for character elements
    };
  },
  mounted() {
    //* select character elements
    this.chars = this.$el.querySelectorAll(".font__char");
    //* convert collection to array
    this.chars = [...this.chars];
    //* initAnim function in mounted
    if (this.mountedAnim) {
      this.initAnim(this.mountedDelay);
    }
  },
  updated() {
    this.chars = this.$el.querySelectorAll(".font__char");
    this.initAnim(0);
  },
  destroyed() {
    window.removeEventListener("mousemove", this.mouseMovement);
  },
  methods: {
    /**
     ** INIT ANIMATION FUNCTION
     *? Function for init animation
     * @param delay time for timeLine delay
     */
    initAnim(delay) {
      console.log('Empezo initAnim');
      //* create timeLine
      let initTl = gsap.timeline({ paused: "true", delay: delay });
      
      this.chars.forEach((element) => {
        initTl.to(
          element,
          {
            duration: 1.5,
            y: 0,
            ease: "power2.out",
          },
        "<0.3"
        );
      });
      
      initTl.play();

      //* add mouseMove event listener to character elements
      document.addEventListener("mousemove", this.mouseMovement);
    },

    /**
     ** MOUSE MOVEMENT FUNCTION
     *? Function for image behavior on mouse movement
     * @param e mouse movement event
     */
    mouseMovement(e) {
      this.chars.forEach((element, index) => {
        setTimeout(() => {
          this.weightAnimation(element, (e.clientX / window.innerWidth) * 900);
        }, 300 * index);
        // this.weightAnimation(
        //   element,
        //   (e.clientX / window.innerWidth) * 900,
        //   index
        // );
      });
    },

    /**
     ** WEIGHT ANIMATION FUNCTION
     *? Function for weight font animation
     * @param elem element to animate
     * @param weight weight value for animate
     */
    weightAnimation(elem, weight) {
      gsap.to(elem, {
        duration: 1,
        // fontSize: weight / 30 + 220 + "px",
        onUpdate: function () {
          elem.style.fontVariationSettings = "'wght' " + weight;
        },
      });
    },

    /**
     ** LEAVE FUCTION
     *? Function for leave behavior
     * @param done it return the leave behavior end
     */
    leave(done) {
      // this.chars.forEach((element) => {
      //   gsap.to(element, {
      //     duration: 1,
      //     y: "100%",
      //     onComplete: done,
      //   });
      // });

      //* create timeLine
      let initTl = gsap.timeline({ paused: "true"});

      this.chars.forEach((element) => {
        initTl.to(
          element,
          {
            duration: 0.3,
            y: "-100%",
            ease: "power2.in",
            onComplete: done,
          },
          "<0.2"
        );
      });

      initTl.play();
    },
  },
};
</script>

<style lang="scss" scoped>
@import "./../assets/styles/setup";

.font {
  pointer-events: none;
  overflow: hidden;
  .font__phrase {
    display: flex;
    justify-content: center;
    .font__char {
      font-family: $oswald;
      line-height: 1;
      font-weight: 900;
      display: inline-block;
      font-size: 13vw;
      color: $red;
      text-transform: uppercase;
      font-variation-settings: "wght" 900;
      @include transform(translateY(100%));
    }
  }
}
</style>