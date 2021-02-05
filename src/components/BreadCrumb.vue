<template>
  <div class="breadcrumb">
    <div class="breadcrumb__number">{{ numberPage }}</div>
    <div class="breadcrumb__title">{{ titlePage }}</div>
    <div class="breadcrumb__line">
      <div></div>
    </div>
    <div class="breadcrumb__points">
      <template v-for="point in pages">
        <div :class="point" :key="point">
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import { gsap } from "gsap";

export default {
  props: {
    number: String,
    title: String,
    pages: Array
  },
  watch: {
    number: function(val) {
      this.numberPage = val;
    },
    title: function(val) {
      // this.titlePage = val;
      console.log(val);
      const line = this.$el.querySelector(".breadcrumb__line > div");
      let points = this.$el.querySelectorAll(".breadcrumb__points > div");
      points = Array.prototype.slice.call(points, 0).reverse();

      let tl = gsap.timeline({
        repeat: 1,
        yoyo: true
      });

      points.forEach(element => {
        tl.to(element, {
          duration: 0.3,
          opacity: 0,
          ease: "power4.out"
        })
      });
      tl.to(line, {
        duration: 3,
        width: 0,
        ease: "power4.out",
        onComplete: this.changeTitle,
        onCompleteParams: [val],
      });
      tl.play();
      
    }
  },
  data() {
    return {
      numberPage: this.number,
      titlePage: this.title,

    }
  },
  methods: {
    changeTitle(val) {
      this.titlePage = val;
    }
  }
};
</script>

<style lang="scss" scoped>
@import "./../assets/styles/setup";

.breadcrumb {

  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;

  .breadcrumb__number {
    font-weight: bold;
    padding-right: 0.5rem;
  }
  .breadcrumb__title {
    padding-right: 0.7rem;
  }
  .breadcrumb__line {
    padding-right: 0.7rem;

    div {
      width: 130px;
      height: 1px;
      background-color: #333;
    }
  }
  .breadcrumb__points {
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    align-items: center;
    div {
      width: 5px;
      height: 5px;
      border-radius: 50%;
      background-color: #333;
      margin-right: 0.5rem;
    }
  }
}
</style>