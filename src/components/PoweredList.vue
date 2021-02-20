<template>
  <transition @leave="leave" :css="false">
    <div class="powered-list">
      <div class="powered-list__logo" v-for="client in list" :key="client.id">
        <img :src="client" alt="powered-by" />
      </div>
    </div>
  </transition>
</template>

<script>
import { gsap } from "gsap";
export default {
  props: {
    list: Array,
  },
  data() {
    return {
      listClient: null,
    };
  },
  mounted() {
    this.listClient = this.$el.querySelectorAll(".powered-list__logo");
  },
  methods: {
    /**
     ** INIT ANIMATION FUNCTION
     *? Function for init animation
     * @param delay time for timeLine delay
     */
    initAnim(delay) {
      //* create timeLine
      let initTl = gsap.timeline({ paused: "true", delay: delay });

      this.listClient.forEach((element) => {
        initTl.to(
          element,
          {
            duration: 2.5,
            opacity: 1,
            ease: "power2.out",
          },
          "<0.1"
        );
      });

      initTl.play();
    },
    /**
     ** LEAVE FUCTION
     *? Function for leave behavior
     * @param done it return the leave behavior end
     */
    leave(done) {
      //* create timeLine
      let initTl = gsap.timeline({ paused: "true" });

      this.listClient.forEach((element) => {
        initTl.to(
          element,
          {
            duration: 0.1,
            opacity: 0,
            ease: "power2.in",
          },
          "<0.05"
        );
      });

      initTl.play();

      gsap.to(this.$el, {
        duration: 1.5,
        y: 0,
        onComplete: done
      });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "./../assets/styles/setup";

.powered-list {
  display: grid;
  grid-template-columns: auto auto auto auto;

  div {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: $light;
    width: 200px;
    height: 200px;
    margin: 0.7rem;
    opacity: 0;
    cursor: pointer;

    img {
      width: 100%;
      height: 100%;
    }
  }
}
</style>