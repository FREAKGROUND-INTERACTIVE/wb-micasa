<template>
  <transition @leave="leave" :css="false">
    <div class="services">
      <div class="services__title">
        <h2>Our Services</h2>
      </div>
      <div class="services__list">
        <span v-for="service in list" :key="service.id">{{ service }}</span>
      </div>
    </div>
  </transition>
</template>

<script>
import { gsap } from "gsap";

export default {
  props: {
    list: Array,
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
      listServices: null,
      titleServices: null,
    };
  },
  mounted() {
    this.listServices = this.$el.querySelector(".services__list");
    this.titleServices = this.$el.querySelector(".services__title");

    //* initAnim function in mounted
    if (this.mountedAnim) {
      this.initAnim(this.mountedDelay);
    }
  },
  methods: {
    initAnim(delay) {
      //* duration time for animation elements
      let time = 1;

      //* create timeLine
      let initTl = gsap.timeline({
        paused: "true",
        delay: delay,
      });

      initTl.to(
        this.titleServices,
        {
          duration: time,
          opacity: 1,
          ease: "power1.inOut",
        },
        "<0.2"
      );

      initTl.to(
        this.listServices,
        {
          duration: time,
          opacity: 1,
          ease: "power1.inOut",
        },
        "<0.2"
      );

      initTl.play();
    },
    /**
     ** LEAVE FUNCTION
     *? Function for leave behavior
     * @param done it return the leave behavior end
     */
    leave(done, delay) {
      //* duration time for animation elements
      let time = 1;

      //* create timeLine
      let initTl = gsap.timeline({
        paused: "true",
        delay: delay,
      });

      initTl.to(
        this.titleServices,
        {
          duration: time,
          opacity: 0,
          ease: "power1.inOut",
        },
        "<0.2"
      );

      initTl.to(
        this.listServices,
        {
          duration: time,
          opacity: 0,
          ease: "power1.inOut",
          onComplete: done,
        },
        "<0.2"
      );

      initTl.play();
    },
  },
};
</script>

<style lang="scss" scoped>
@import "./../assets/styles/setup";

.services {
  .services__title {
    opacity: 0;
    margin-bottom: 1rem;
    h2 {
      font-family: $lora;
      font-size: 24px;
      font-weight: 400;
      color: $red;
      text-align: center;
    }

  }

  .services__list {
    display: flex;
    flex-flow: row wrap;
    justify-content: center;
    width: 30vw;
    opacity: 0;

    span {
      &:after {
        content: "\2022";
        margin: 0 0.4rem;
      }

      &:last-child {
        &:after {
          content: "";
        }
      }
    }
  }
}
</style>