<template>
  <transition @leave="leave" :css="false">
    <div class="agency-services">
      <div class="agency-services__bread">
        <Bread-crumb
          ref="bread"
          :number="'03'"
          :title="'Services'"
          :pages="['About', 'Altering', 'Services', 'Why Us', 'Clients']"
          :mark="2"
          :mountedAnim="true"
          :mountedDelay="2"
        ></Bread-crumb>
      </div>
      <div class="agency-services__title">
        <div class="agency-services__title-up">
          <template v-for="letter in dataComp.titleOne">
            <div :key="letter.id" :class="{ space: letter == ' ' }">
              {{ letter }}
            </div>
          </template>
        </div>
        <div class="agency__slider">
          <Slider3d ref="slider3d"></Slider3d>
        </div>
        <div class="agency-services__title-down">
          <template v-for="letter in dataComp.titleTwo">
            <div :key="letter.id" :class="{ space: letter == ' ' }">
              {{ letter }}
            </div>
          </template>
        </div>
      </div>
      <div class="agency-services__button" @click="openServices">
        <Button ref="Button" :text="dataComp.button"></Button>
      </div>
      <div class="agency-services__brandheader">
        <Brand-header
          ref="BrandHeader"
          :link="'/'"
          :mountedAnim="true"
        ></Brand-header>
      </div>
      <div class="agency-services__link">
        <Link-button ref="LinkButton" :link="'/why-agency'"></Link-button>
      </div>
      <div class="agency-services__content" v-show="showServices">
        <div class="agency-services__content-close" @click="closeServices">
          <Close-button ref="closeButton"></Close-button>
        </div>
        <div class="agency-services__content-paragraph">
          <Services
            ref="services"
            :list="dataComp.list"
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
import Slider3d from "@/components/Slider3d";
import BrandHeader from "@/components/BrandHeader";
import BreadCrumb from "@/components/BreadCrumb";

export default {
  components: {
    Button,
    CloseButton,
    Services,
    LinkButton,
    Slider3d,
    BrandHeader,
    BreadCrumb,
  },
  props: {
    data: Object
  },
  watch: {
    data: function(val) {
      this.dataComp = val.agency.services;
    }
  },
  data() {
    return {
      lettersUp: null,
      lettersDown: null,
      contentServices: null,
      showServices: false,
      dataComp: this.data.agency.services,
    };
  },
  mounted() {
    mutations.setTitle(" ");
    this.lettersUp = this.$el.querySelectorAll(
      ".agency-services__title-up > div"
    );
    this.lettersDown = this.$el.querySelectorAll(
      ".agency-services__title-down > div"
    );
    this.contentServices = this.$el.querySelector(".agency-services__content");
    setTimeout(() => {
      window.addEventListener("wheel", this.handleScroll);
    }, 3000);
    this.initAnim(1500);
  },
  destroyed() {
    window.removeEventListener("wheel", this.handleScroll);
  },
  methods: {
    openServices() {
      this.showServices = true;

      gsap.to(this.contentServices, {
        duration: 1,
        opacity: 1,
      });
      this.$refs.closeButton.initAnim(0.7);
      this.$refs.services.initAnim(1.7);
    },
    closeServices() {
      this.$refs.services.leave();
      // this.$refs.Button.leave();
      gsap.to(this.contentServices, {
        duration: 0.5,
        opacity: 0,
        delay: 1.5,
      });

      setTimeout(() => {
        this.$refs.closeButton.leave();
      }, 1500);

      setTimeout(() => {
        this.showServices = false;
        // this.$refs.Button.initAnim();
      }, 2500);
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
        this.$refs.slider3d.initAnim(1);
        let tl = gsap.timeline({ paused: true });
        let tl2 = gsap.timeline({ paused: true, delay: 1 });

        this.lettersUp.forEach((element) => {
          tl.to(
            element,
            {
              duration: 0.5,
              y: "0%",
            },
            "<0.2"
          );
        });

        this.lettersDown.forEach((element) => {
          tl2.to(
            element,
            {
              duration: 0.5,
              y: "0%",
            },
            "<0.2"
          );
        });

        tl.play();
        tl2.play();
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
      this.$refs.slider3d.leave();
      this.$refs.BrandHeader.leave();
      this.$refs.bread.leave();
      let tl = gsap.timeline({ paused: true });
      let tl2 = gsap.timeline({ paused: true });

      this.lettersUp.forEach((element) => {
        tl.to(
          element,
          {
            duration: 0.2,
            y: "-100%",
          },
          "<0.1"
        );
      });

      this.lettersDown.forEach((element) => {
        tl2.to(
          element,
          {
            duration: 0.2,
            y: "100%",
          },
          "<0.1"
        );
      });

      tl.play();
      tl2.play();
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

  .agency-services__bread {
    grid-area: breadCrumb;
    position: absolute;
    z-index: 4;
  }

  .agency-services__title {
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    text-align: center;
    font-family: $oswald;
    // @include transform(translate(-50%, -50%));

    .agency-services__title-up {
      overflow: hidden;
      z-index: 1;
      position: absolute;
      top: 50%;
      left: 50%;
      @include transform(translate(-50%, -100%));
      div {
        display: inline-block;
        font-size: 10vw;
        font-weight: 900;
        line-height: 1;
        color: transparent;
        -webkit-text-stroke: 1px $dark;
        -webkit-text-fill-color: $light;
        @include transform(translateY(100%));

        &.space {
          margin-left: 2rem;
        }
      }
    }

    .agency__slider {
      position: fixed;
      top: 0;
      left: 0;
      z-index: 2;
    }

    .agency-services__title-down {
      overflow: hidden;
      z-index: 3;
      position: absolute;
      top: 50%;
      left: 50%;
      @include transform(translate(-50%, 0%));
      div {
        display: inline-block;
        font-size: 7.5vw;
        font-weight: 900;
        line-height: 1;
        color: $red;
        @include transform(translateY(-100%));
        &.space {
          margin-left: 2rem;
        }
      }
    }
  }

  .agency-services__brandheader {
    grid-area: logo;
    z-index: 4;
  }

  .agency-services__button {
    grid-area: 3 / 2 / 4 / 4;
    place-self: end center;
    margin-bottom: 4rem;
    z-index: 4;
  }

  .agency-services__content {
    @extend .layout;
    opacity: 0;
    background-color: $light;
    display: flex;
    flex-flow: column nowrap;
    justify-content: center;
    align-content: center;
    z-index: 4;

    .agency-services__content-close {
      grid-area: 3 / 2 / 4 / 4;
      place-self: center;
      margin-bottom: 1rem;
    }

    .agency-services__content-paragraph {
      grid-area: 3 / 2 / 4 / 4;
      place-self: center;
      margin-bottom: 5rem;
    }
  }

  .agency-services__link {
    @extend .link;
    z-index: 4;
  }
}
</style>