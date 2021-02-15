<template>
  <transition @leave="leave" :css="false">
    <div class="agency-services">
      <div class="agency-services__button" @click="showServices = true">
        <Button
          ref="Button"
          :text="'See our Services'"
        ></Button>
      </div>
      <div class="agency-services__link">
        <Link-button ref="LinkButton" :link="'/why-agency'"></Link-button>
      </div>
      <div class="agency-services__content" v-if="showServices">
        <div class="agency-services__content-close" @click="closeServices">
          <Close-button ref="closeButton" :mountedAnim="true"></Close-button>
        </div>
        <div class="agency-services__content-paragraph">
          <Services
            ref="services"
            :mountedAnim="true"
            :list="[
              'Service 1',
              'Service 2',
              'Service 3',
              'Service 4',
              'Service 1',
              'Service 2',
              'Service 3',
              'Service 4',
              'Service 1',
              'Service 2',
              'Service 3',
              'Service 4',
              'Service 1',
              'Service 2',
              'Service 3',
              'Service 4',
              'Service 1',
              'Service 2',
              'Service 3',
              'Service 4',
              'Service 1',
              'Service 2',
              'Service 3',
              'Service 4',
              'Service 1',
              'Service 2',
              'Service 3',
              'Service 4',
              'Service 1',
              'Service 2',
              'Service 3',
              'Service 4',
            ]"
          ></Services>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import { gsap } from "gsap";
import { mutations } from "./../state";

import Button from "@/components/Button";
import CloseButton from "@/components/CloseButton";
import Services from "@/components/Services";
import LinkButton from "@/components/LinkButton";

export default {
  components: {
    Button,
    CloseButton,
    Services,
    LinkButton,
  },
  mounted() {
    mutations.setTitle(" ");
    setTimeout(() => {
      window.addEventListener("wheel", this.handleScroll);
    }, 3000);
    this.initAnim(1500);
  },
  destroyed() {
    window.removeEventListener("wheel", this.handleScroll);
  },
  data() {
    return {
      showServices: false,
    };
  },
  methods: {
    closeServices() {
      this.$refs.services.leave();
      this.$refs.closeButton.leave();
      this.$refs.Button.leave();

      setTimeout(() => {
        this.showServices = false;
        this.$refs.Button.initAnim();
      }, 2000);
    },
    /**
     ** SCROLL EVENT FUNCTION
     *? Function for route behavior on wheel
     * @param e mouse movement event
     */
    handleScroll(e) {
      window.removeEventListener("wheel", this.handleScroll);
      if (e.deltaY < 0) {
        this.$router.push({ path: "/altering-agency" });
      }
      if (e.deltaY > 0) {
        this.$router.push({ path: "/why-agency" });
      }
    },
    /**
     ** INIT ANIMATION FUNCTION
     *? Function for init animation
     * @param delay time for timeLine delay
     */
    initAnim(delay) {
      setTimeout(() => {
        this.$refs.Button.initAnim(0);
        this.$refs.LinkButton.initAnim(3);
      }, delay);
    },
    /**
     ** LEAVE FUCTION
     *? Function for leave behavior
     * @param done it return the leave behavior end
     */
    leave(el, done) {
      this.$refs.Button.leave();
      this.$refs.LinkButton.leave();
      gsap.to(el, {
        duration: 1.5,
        y: 0,
        onComplete: done,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "./../assets/styles/setup";

.agency-services {
  @extend .layout;

  .agency-services__button {
    grid-area: 3 / 2 / 4 / 4;
    place-self: end center;
    margin-bottom: 4rem;
  }

  .agency-services__content {
    @extend .layout;
    background-color: $light;
    display: flex;
    flex-flow: column nowrap;
    justify-content: center;
    align-content: center;

    .agency-services__content-close {
      grid-area: 3 / 2 / 4 / 4;
      place-self: center;
      margin-bottom: 2.5rem;
    }

    .agency-services__content-paragraph {
      grid-area: 3 / 2 / 4 / 4;
      place-self: center;
      margin-bottom: 5rem;
    }
  }

  .agency-services__link {
    @extend .link;
  }
}
</style>