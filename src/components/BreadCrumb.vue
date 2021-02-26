<template>
  <transition :leave="leave" :css="false">
    <div class="breadcrumb">
      <div class="breadcrumb__number-container">
        <div class="breadcrumb__number">{{ number }}</div>
      </div>
      <div class="breadcrumb__title-container">
        <div class="breadcrumb__title">{{ title }}</div>
      </div>

      <div class="breadcrumb__line">
        <div></div>
      </div>
      <div class="breadcrumb__points">
        <template v-for="(point, index) in pages">
          <div
            :key="point"
            :class="{ in: index == mark }"
            @click="goToPage(index)"
          ></div>
        </template>
      </div>
    </div>
  </transition>
</template>

<script>
import { gsap } from "gsap";

export default {
  props: {
    number: String,
    title: String,
    pages: Array,
    mark: Number,
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
      numberPage: null,
      titlePage: null,
      line: null,
      points: null,
    };
  },
  mounted() {
    this.numberPage = this.$el.querySelector(".breadcrumb__number");
    this.titlePage = this.$el.querySelector(".breadcrumb__title");
    this.line = this.$el.querySelector(".breadcrumb__line > div");
    this.points = this.$el.querySelectorAll(".breadcrumb__points > div");
    //* initAnim function in mounted
    if (this.mountedAnim) {
      this.initAnim(this.mountedDelay);
    }
  },
  methods: {
    initAnim(delay) {
      console.log("init bread");
      const initTl = gsap.timeline({ paused: true, delay: delay });
      initTl.to(this.numberPage, {
        duration: 1,
        y: "0%",
      });
      initTl.to(
        this.titlePage,
        {
          duration: 1,
          y: "0%",
        },
        "<0.4"
      );
      initTl.to(this.line, {
        duration: 0.5,
        width: "100%",
      });
      this.points.forEach((element) => {
        initTl.to(
          element,
          {
            duration: 0.5,
            opacity: 1,
          },
          "<0.2"
        );
      });
      initTl.play();
    },
    goToPage(index) {
      switch (index) {
        case 0:
          if (this.mark != 0) {
            this.$router.push({ name: "AgencyAbout" });
          }
          break;
        case 1:
          if (this.mark != 1) {
            this.$router.push({ name: "AgencyAltering" });
          }
          break;
        case 2:
          if (this.mark != 2) {
            this.$router.push({ name: "ServicesAltering" });
          }
          break;
        case 3:
          if (this.mark != 3) {
            this.$router.push({ name: "AgencyWhy" });
          }
          break;
        case 4:
          if (this.mark != 4) {
            this.$router.push({ name: "AgencyClients" });
          }
          break;

        default:
          break;
      }
    },
    leave(done) {
      const endTl = gsap.timeline({ paused: true });
      const pointsReverse = [...this.points].reverse();
      pointsReverse.forEach((element) => {
        endTl.to(
          element,
          {
            duration: 0.2,
            opacity: 0,
          },
          "<0.1"
        );
      });

      endTl.to(this.line, {
        duration: 0.2,
        width: "0%",
      });
      
      endTl.to(
        this.titlePage,
        {
          duration: 0.2,
          y: "100%",
        }
      );
      
      endTl.to(this.numberPage, {
        duration: 0.2,
        y: "100%",
      });

      endTl.play();

      gsap.to(this.$el, {
        duration: 1,
        y: 0,
        onComplete: done,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "./../assets/styles/setup";

.breadcrumb {
  width: fit-content;
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;

  .breadcrumb__number-container {
    overflow: hidden;
    .breadcrumb__number {
      font-family: $lora;
      padding-right: 0.5rem;
      @include transform(translateY(100%));
    }
  }

  .breadcrumb__title-container {
    overflow: hidden;
    .breadcrumb__title {
      font-family: $mont;
      font-size: 14px;
      font-weight: 300;
      padding-right: 0.7rem;
      @include transform(translateY(100%));
    }
  }

  .breadcrumb__line {
    padding-right: 0.7rem;
    width: 130px;

    div {
      width: 0%;
      height: 1px;
      background-color: $dark;
    }
  }
  .breadcrumb__points {
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    align-items: center;
    div {
      opacity: 0;
      position: relative;
      width: 5px;
      height: 5px;
      border-radius: 50%;
      border: 1px solid $red;
      background-color: transparent;
      margin-right: 0.5rem;
      cursor: pointer;

      &:after {
        font-family: $mont;
        font-size: 12px;
        font-weight: 300;
        position: absolute;
        top: -20px;
        white-space: nowrap;
        opacity: 0;
        @include transform(translateX(-50%));
        @include transition(all 0.5s);
      }

      &:nth-child(1) {
        &:after {
          content: "About";
        }
      }

      &:nth-child(2) {
        &:after {
          content: "Altering";
        }
      }

      &:nth-child(3) {
        &:after {
          content: "Services";
        }
      }

      &:nth-child(4) {
        &:after {
          content: "Why Us";
        }
      }

      &:nth-child(5) {
        &:after {
          content: "Clients";
        }
      }

      &:hover {
        &:after {
          opacity: 1;
        }
      }

      &.in {
        background-color: $red;
      }
    }
  }
}
</style>