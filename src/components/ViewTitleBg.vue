<template>
  <div class="view-title-bg">
    <div class="view-title-bg__up">
      {{ title }}
    </div>
    <div class="view-title-bg__down">
      {{ title }}
    </div>
  </div>
</template>

<script>
import { state } from "./../state";
import gsap from "gsap";

export default {
  data() {
    return {
      titleUp: null,
      titleDown: null,
    };
  },
  computed: {
    title() {
      return state.title;
    },
  },
  mounted() {
    this.titleUp = this.$el.querySelector(".view-title-bg__up");
    this.titleDown = this.$el.querySelector(".view-title-bg__down");
    this.ioAnim(true);
  },
  methods: {
    leave(done) {
      this.ioAnim(false, done);
    },
    ioAnim(init, done) {
      if (init) {
        const tlUp = new gsap.timeline();
        // tlUp.to(this.titleUp, {
        //   duration: 0.5,
        //   opacity: "1",
        //   ease: "power4.out",
        //   delay: 0.5,
        // });
        tlUp.to(this.titleUp, {
          duration: 1,
          y: "-100%",
          opacity: "1",
          ease: "power4.out",
          delay: 0.5,
        });
        const tlDown = new gsap.timeline();
        // tlDown.to(this.titleDown, {
        //   duration: 0.5,
        //   opacity: "1",
        //   ease: "power4.out",
        //   delay: 0.5,
        // });
        tlDown.to(this.titleDown, {
          duration: 1,
          y: "0%",
          opacity: "1",
          ease: "power4.out",
          delay: 0.5,
        });
      } else {
        const tlUp = new gsap.timeline();
        tlUp.to(this.titleUp, {
          duration: 0.5,
          y: "0%",
          opacity: "0",
          ease: "power4.out",
          delay: 0.5,
        });

        const tlDown = new gsap.timeline();
        tlDown.to(this.titleDown, {
          duration: 0.5,
          y: "-100%",
          opacity: "0",
          ease: "power4.out",
          delay: 0.5,
          onComplete: done,
        });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "./../assets/styles/setup";

.view-title-bg {
  position: absolute;
  left: 50%;
  top: 50%;
  @include transform(translate(-50%, -50%));
  height: 14vh;
  //   overflow: hidden;
  text-align: center;
  pointer-events: none;

  .view-title-bg__up,
  .view-title-bg__down {
    font-size: 16vh;
    text-transform: uppercase;
    line-height: 1;
    color: white;
    font-weight: 900;
    white-space: nowrap;
    padding: 0 1rem;
    -webkit-text-stroke: 1px black;
    opacity: 0;
    color: transparent;
  }

  .view-title-bg__up {
    // @include transform(translateY(-100%));
  }
  .view-title-bg__down {
    @include transform(translateY(-100%));
  }
}
</style>