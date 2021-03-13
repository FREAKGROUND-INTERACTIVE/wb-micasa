<template>
  <div class="colors">
    <svg
      class="shape-overlays red"
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
    >
      <path class="shape-overlays__path"></path>
      <path class="shape-overlays__path"></path>
      <path class="shape-overlays__path"></path>
    </svg>
    <svg
      class="shape-overlays blue"
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
    >
      <path class="shape-overlays__path"></path>
      <path class="shape-overlays__path"></path>
      <path class="shape-overlays__path"></path>
    </svg>
    <svg
      class="shape-overlays green"
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
    >
      <path class="shape-overlays__path"></path>
      <path class="shape-overlays__path"></path>
      <path class="shape-overlays__path"></path>
    </svg>
    <svg
      class="shape-overlays gray"
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
    >
      <path class="shape-overlays__path"></path>
      <path class="shape-overlays__path"></path>
      <path class="shape-overlays__path"></path>
    </svg>
  </div>
</template>

<script>
import { ease } from "@/assets/utils/easings";
import { mutations } from "@/state";

export default {
  props: {
    color: String,
  },
  watch: {
    color: function (val, oldVal) {
      // console.log("inHome: ", mutations.getHome());
      if (val != oldVal && mutations.getHome()) {
        switch (val) {
          case "Agency":
            this.anim(1);
            break;
          case "Agencia":
            this.anim(1);
            break;
          case "Studio":
            this.anim(2);
            break;
          case "Estudio":
            this.anim(2);
            break;
          case "Powered":
            this.anim(3);
            break;
          case "micasa":
            this.anim(4);
            break;

          default:
            break;
        }
      }
    },
  },
  data() {
    return {
      elmOverlay: null,
      elmOverlay2: null,
      elmOverlay3: null,
      elmOverlay4: null,
      red: null,
      cyan: null,
      green: null,
      gray: null,
      index: 1,
    };
  },
  mounted() {
    let that = this;
    class ShapeOverlays {
      constructor(elm) {
        this.elm = elm;
        this.path = elm.querySelectorAll("path");
        this.numPoints = 4;
        this.duration = 800;
        this.delayPointsArray = [];
        this.delayPointsMax = 180;
        this.delayPerPath = 70;
        this.timeStart = Date.now();
        this.isOpened = false;
        this.isAnimating = false;
      }
      toggle() {
        if (this.isAnimating) return;
        this.isAnimating = true;
        const range = Math.random() * Math.PI * 2;
        for (var i = 0; i < this.numPoints; i++) {
          const radian = (i / (this.numPoints - 1)) * Math.PI * 2;
          this.delayPointsArray[i] =
            ((Math.sin(radian + range) + 1) / 2) * this.delayPointsMax;
        }
        this.open();
        // if (this.isOpened === false) {
        //   this.open();
        // } else {
        //   this.close();
        // }
      }
      open() {
        this.isOpened = true;
        this.elm.classList.add("is-opened");
        this.elm.style.zIndex = that.index.toString();
        that.index += 1;
        this.timeStart = Date.now();
        this.renderLoop();
      }
      close() {
        if (this.elm.classList.contains("is-opened")) {
          this.isOpened = false;
          this.elm.classList.remove("is-opened");
          this.timeStart = Date.now();
          this.renderLoop();
        } else {
          return;
        }
      }
      updatePath(time) {
        const points = [];
        for (var i = 0; i < this.numPoints; i++) {
          points[i] =
            ease.cubicInOut(
              Math.min(
                Math.max(time - this.delayPointsArray[i], 0) / this.duration,
                1
              )
            ) * 100;
        }

        let str = "";
        str += this.isOpened ? `M 0 0 V ${points[0]} ` : `M 0 ${points[0]} `;
        for (let i = 0; i < this.numPoints - 1; i++) {
          const p = ((i + 1) / (this.numPoints - 1)) * 100;
          const cp = p - ((1 / (this.numPoints - 1)) * 100) / 2;
          str += `C ${cp} ${points[i]} ${cp} ${points[i + 1]} ${p} ${
            points[i + 1]
          } `;
        }
        str += this.isOpened ? `V 0 H 0` : `V 100 H 0`;
        return str;
      }
      render() {
        if (this.isOpened) {
          for (var i = 0; i < this.path.length; i++) {
            this.path[i].setAttribute(
              "d",
              this.updatePath(
                Date.now() - (this.timeStart + this.delayPerPath * i)
              )
            );
          }
        } else {
          for (let i = 0; i < this.path.length; i++) {
            this.path[i].setAttribute(
              "d",
              this.updatePath(
                Date.now() -
                  (this.timeStart +
                    this.delayPerPath * (this.path.length - i - 1))
              )
            );
          }
        }
      }
      renderLoop() {
        this.render();
        if (
          Date.now() - this.timeStart <
          this.duration +
            this.delayPerPath * (this.path.length - 1) +
            this.delayPointsMax
        ) {
          requestAnimationFrame(() => {
            this.renderLoop();
          });
        } else {
          this.isAnimating = false;
        }
      }
    }

    this.elmOverlay = document.querySelector(".red");
    this.elmOverlay2 = document.querySelector(".blue");
    this.elmOverlay3 = document.querySelector(".green");
    this.elmOverlay4 = document.querySelector(".gray");
    this.red = new ShapeOverlays(this.elmOverlay);
    this.blue = new ShapeOverlays(this.elmOverlay2);
    this.green = new ShapeOverlays(this.elmOverlay3);
    this.gray = new ShapeOverlays(this.elmOverlay4);
  },
  methods: {
    anim(value) {
      switch (value) {
        case 1:
          this.red.toggle();
          break;
        case 2:
          this.blue.toggle();
          break;
        case 3:
          this.green.toggle();
          break;
        case 4:
          // this.red.close();
          // this.blue.close();
          // this.green.close();
          this.gray.toggle();
          break;

        default:
          break;
      }
    },
    leave() {
      this.red.close();
      this.blue.close();
      this.green.close();
      this.gray.close();
    },
  },
};
</script>

<style lang="scss" scoped>
@import "./../assets/styles/setup";

.colors {
  .shape-overlays {
    width: 100vw;
    height: 100vh;
    position: fixed;
    // top: 0;
    bottom: 0;
    left: 0;
    @include transform(rotate(180deg));

    path {
      @include transition(fill 0.5s);
    }

    &.red {
      path:nth-of-type(1) {
        fill: lighten($red, 20%);
      }
      path:nth-of-type(2) {
        fill: lighten($red, 10%);
      }
      path:nth-of-type(3) {
        fill: $red;
      }
    }

    &.blue {
      path:nth-of-type(1) {
        fill: lighten($cyan, 20%);
      }
      path:nth-of-type(2) {
        fill: lighten($cyan, 10%);
      }
      path:nth-of-type(3) {
        fill: $cyan;
      }
    }

    &.green {
      path:nth-of-type(1) {
        fill: lighten($green, 20%);
      }
      path:nth-of-type(2) {
        fill: lighten($green, 10%);
      }
      path:nth-of-type(3) {
        fill: $green;
      }
    }

    &.gray {
      path:nth-of-type(1) {
        fill: lighten(#dfdfdf, 20%);
      }
      path:nth-of-type(2) {
        fill: lighten(#dfdfdf, 10%);
      }
      path:nth-of-type(3) {
        fill: #dfdfdf;
      }
    }
  }
}
</style>