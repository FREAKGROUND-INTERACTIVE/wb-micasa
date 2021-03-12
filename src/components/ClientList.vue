<template>
  <transition @leave="leave" :css="false">
    <div class="clientList">
      <div class="client-list__logo" v-for="client in list" :key="client.id">
        <img :src="client" alt="Clients" />
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
      random: [
        0,
        20,
        1,
        19,
        2,
        18,
        3,
        17,
        4,
        16,
        5,
        15,
        6,
        14,
        7,
        13,
        8,
        12,
        9,
        11,
        10
      ],
    }
  },
  mounted() {
    this.listClient = this.$el.querySelectorAll(".client-list__logo");
  },
  methods: {
    /**
     ** INIT ANIMATION FUNCTION
     *? Function for init animation
     * @param delay time for timeLine delay
     */
    initAnim(delay) {
      let that = this;
      //* create timeLine
      let initTl = gsap.timeline({ paused: "true", delay: delay });

      for (let index = 0; index < this.random.length; index++) {
        initTl.to(
          this.listClient[that.random[index]],
          {
            duration: 0.8,
            opacity: 1,
            ease: "power2.out",
          },
          "<0.1"
        );
      }

      initTl.play();
    },
    /**
     ** LEAVE FUCTION
     *? Function for leave behavior
     * @param done it return the leave behavior end
     */
    leave(done) {
      let that = this;
       //* duration time for animation elements
      let time = 1;
      //* create timeLine
      let initTl = gsap.timeline({ paused: "true"});

      for (let index = 0; index < this.random.length; index++) {
        gsap.killTweensOf(this.listClient[that.random[index]]);
        initTl.to(
          this.listClient[that.random[index]],
          {
            duration: time/30,
            opacity: 0,
            ease: "power2.inOut",
          },
          "<0.05"
        );
      }

      // this.listClient.forEach((element) => {
      //   initTl.to(
      //     element,
      //     {
      //       duration: 0.1,
      //       opacity: 0,
      //       ease: "power2.in",
      //     },
      //     "<0.05"
      //   );
      // });

      initTl.play();
      console.log(done);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "./../assets/styles/setup";

.clientList {
  display: grid;
  grid-template-columns: auto auto auto auto auto;

  div {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: $light;
    width: 170px;
    height: 85px;
    margin: 0.1rem;
    opacity: 0;

    img {
      width: 75%;
      height: 75%;
    }
  }
}
</style>