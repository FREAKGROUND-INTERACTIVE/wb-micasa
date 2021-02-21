<template>
  <transition @leave="leave" :css="false">
    <div class="services">
      <div class="services__title">
        <h3>Our Services</h3>
      </div>
      <div class="services__list">
        <div v-for="service in list" :key="service.id" v-html="service"></div>
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
      random: [
        16,
        11,
        20,
        9,
        14,
        4,
        2,
        13,
        7,
        1,
        18,
        5,
        11,
        0,
        8,
        3,
        17,
        6,
        10,
        19,
        12,
        15,
        21,
      ],
    };
  },
  mounted() {
    this.listServices = this.$el.querySelectorAll(".services__list > div");
    this.titleServices = this.$el.querySelector(".services__title > h3");

    //* initAnim function in mounted
    if (this.mountedAnim) {
      this.initAnim(this.mountedDelay);
    }
  },
  methods: {
    initAnim(delay) {
      let that = this;
      //* duration time for animation elements
      let time = 1;

      //* create timeLine
      let initTl = gsap.timeline({
        paused: "true",
        delay: delay,
      });

      initTl.to(this.titleServices, {
        duration: time,
        y: "0%",
      });
      for (let index = 0; index < this.random.length; index++) {
        initTl.to(
          this.listServices[that.random[index]],
          {
            duration: time,
            opacity: 1,
            ease: "power1.inOut",
          },
          "<0.2"
        );
      }

      initTl.play();
    },
    /**
     ** LEAVE FUNCTION
     *? Function for leave behavior
     * @param done it return the leave behavior end
     */
    leave(done) {
      let that = this;
      //* duration time for animation elements
      let time = 1;

      //* create timeLine
      let initTl = gsap.timeline({
        paused: "true",
      });

      initTl.to(this.titleServices, {
        duration: time,
        y: "100%",
      });

      for (let index = 0; index < this.random.length; index++) {
        initTl.to(
          this.listServices[that.random[index]],
          {
            duration: time/30,
            opacity: 0,
            ease: "power1.inOut",
          },
          "<0.05"
        );
      }

      initTl.play();

      gsap.to(this.$el, {
        duration: 1.5,
        onComplete: done
      });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "./../assets/styles/setup";

.services {
  .services__title {
    margin-bottom: 1rem;
    overflow: hidden;
    h3 {
      font-family: $lora;
      font-size: 24px;
      font-weight: 400;
      color: $red;
      text-align: center;
      @include transform(translateY(100%));
    }
  }

  .services__list {
    display: flex;
    flex-flow: row wrap;
    justify-content: center;
    width: 615px;
    cursor: default;

    div {
      opacity: 0;
      margin: 0 0.2rem;
      // &:after {
      //   content: "\2022";
      //   margin: 0 0.4rem;
      // }

      // &:last-child {
      //   &:after {
      //     content: "";
      //   }
      // }

      &:hover {
        color: $red;
        font-weight: 700;
      }
    }
  }
}
</style>