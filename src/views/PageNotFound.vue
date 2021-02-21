<template>
  <transition name="found" @leave="leave" :css="false">
    <div class="found">
      <div class="found__img">
        <img
          src="https://res.cloudinary.com/nancloud/image/upload/v1613934318/mi-casa/images/404_wtbxcw.jpg"
          width="1280"
          height="720"
          alt="404 - Page not found"
          @load="initAnim(0)"
        />
      </div>
      <div class="found__content">
        <div class="found__text-container">
          <div class="found__text">Page not found</div>
        </div>
        <div class="found__button-container">
          <div class="found__button" @click="goToHome">go Home!</div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import { mutations } from "@/state";
import gsap from "gsap";
export default {
  data() {
    return {
      img: null,
      text: null,
      button: null,
    };
  },
  mounted() {
    gsap.config({
      force3D: true,
    });
    mutations.setTitle(" ");
    this.img = this.$el.querySelector(".found__img");
    this.text = this.$el.querySelector(".found__text");
    this.button = this.$el.querySelector(".found__button");
  },
  methods: {
    goToHome() {
      this.$router.push({ path: "/" });
    },
    initAnim(delay) {
      setTimeout(() => {
        const tl = new gsap.timeline({ paused: true });
        tl.to(this.img, {
          duration: 1,
          opacity: 1,
        });

        tl.to(
          this.text,
          {
            duration: 0.5,
            y: "0%",
          },
          "<0.5"
        );

        tl.to(
          this.button,
          {
            duration: 0.5,
            y: "0%",
          },
          "<0.2"
        );

        tl.play();
      }, delay);
    },

    leave(el, done) {
      console.log("leave");
      gsap.to(this.img, {
        duration: 0.5,
        opacity: 0,
      });

      gsap.to(this.text, {
        duration: 0.2,
        y: "100%",
      });

      gsap.to(this.button, {
        duration: 0.2,
        y: "100%",
      });

      gsap.to(el, {
        duration: 0.5,
        y: 0,
        onComplete: done
      });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "./../assets/styles/setup";
.found {
  position: fixed;
  width: 100vw;
  height: 100vh;
  overflow: hidden;

  .found__img {
    opacity: 0;
    img {
      pointer-events: none;
      position: absolute;
      width: 100vw;
      max-width: 1280px;
      height: auto !important;
      top: 50%;
      left: 50%;
      @include transform(translate(-50%, -50%));
    }
  }

  .found__content {
    width: 100vw;
    text-align: center;
    margin-bottom: 3rem;
    position: absolute;
    bottom: 0;

    .found__text-container {
      overflow: hidden;
      .found__text {
        @include transform(translateY(100%));
      }
    }

    .found__button-container {
      overflow: hidden;
      .found__button {
        cursor: pointer;
        color: $cyan;
        @include transform(translateY(100%));
      }
    }
  }
}
</style>