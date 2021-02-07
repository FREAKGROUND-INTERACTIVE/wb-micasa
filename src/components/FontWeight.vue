<template>
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
</template>

<script>
import { gsap } from "gsap";

export default {
  data() {
    return {
      title: "agency".split("\n"),
      delay: 100, //* miliseconds
    };
  },
  mounted() {
    const chars = this.$el.querySelectorAll(".font__char");
    console.log("chars: ", this.title);
    console.log("chars: ", chars);

    // const divider = window.innerWidth / 9;
    document.addEventListener("mousemove", (e) => {
      // console.log("e: ", (e.clientX / window.innerWidth) * 900);
      [...chars].forEach((element, index) => {
        setTimeout(() => {
          this.weightAnimation(element, (e.clientX / window.innerWidth) * 900);
        }, this.delay * index);
      });
      // console.log(window.innerWidth, e);
      // if (e.clientX <= divider) {
      //   [...chars].forEach((element, index) => {
      //     setTimeout(() => {
      //       this.weightAnimation(element, 100);
      //     }, this.delay * index);
      //   });
      // }
      // if (e.clientX >= divider && e.clientX <= divider * 2) {
      //   [...chars].forEach((element, index) => {
      //     setTimeout(() => {
      //       this.weightAnimation(element, 200);
      //     }, this.delay * index);
      //   });
      // }
      // if (e.clientX >= divider * 2 && e.clientX <= divider * 3) {
      //   [...chars].forEach((element, index) => {
      //     setTimeout(() => {
      //       this.weightAnimation(element, 300);
      //     }, this.delay * index);
      //   });
      // }
      // if (e.clientX >= divider * 3 && e.clientX <= divider * 4) {
      //   [...chars].forEach((element, index) => {
      //     setTimeout(() => {
      //       this.weightAnimation(element, 400);
      //     }, this.delay * index);
      //   });
      // }
      // if (e.clientX >= divider * 4 && e.clientX <= divider * 5) {
      //   [...chars].forEach((element, index) => {
      //     setTimeout(() => {
      //       this.weightAnimation(element, 500);
      //     }, this.delay * index);
      //   });
      // }
      // if (e.clientX >= divider * 5 && e.clientX <= divider * 6) {
      //   [...chars].forEach((element, index) => {
      //     setTimeout(() => {
      //       this.weightAnimation(element, 600);
      //     }, this.delay * index);
      //   });
      // }
      // if (e.clientX >= divider * 6 && e.clientX <= divider * 7) {
      //   [...chars].forEach((element, index) => {
      //     setTimeout(() => {
      //       this.weightAnimation(element, 700);
      //     }, this.delay * index);
      //   });
      // }
      // if (e.clientX >= divider * 7 && e.clientX <= divider * 8) {
      //   [...chars].forEach((element, index) => {
      //     setTimeout(() => {
      //       this.weightAnimation(element, 800);
      //     }, this.delay * index);
      //   });
      // }
      // if (e.clientX >= divider * 8) {
      //   [...chars].forEach((element, index) => {
      //     setTimeout(() => {
      //       this.weightAnimation(element, 900);
      //     }, this.delay * index);
      //   });
      // }
    });
  },
  methods: {
    changeTitle() {},
    weightAnimation(elem, weight) {
      // elem.style.fontWeight = weight;
      // elem.style.fontSize = weight / 50 + 120 + "px";
      //   elem.style.color = (weight/100)

      gsap.to(elem, {
        duration: 1,
        color: "#ff0000",
        onUpdate: function () {
          elem.style.fontVariationSettings = "'wght' " + weight;
          // console.log("weight: ", elem.style.fontWeight);
        },
      });
    },
    sizeAnimation(elem, index, size) {
      elem.style.fontSize = size + 64 + "px";
    },
  },
};
</script>

<style lang="scss" scoped>
@import "./../assets/styles/setup";

.font {
  // position: absolute;
  // top: 50%;
  // left: 50%;
  // @include transform(translate(-50%, -50%));
  .font__phrase {
    display: flex;
    justify-content: center;
    .font__char {
      font-family: $raleway;
      display: inline-block;
      font-size: 8rem;
      color: $red;
      text-transform: uppercase;
      // font-variation-settings: "wght" 100;
      @include transition(all 0.5s);
    }
  }
}
</style>