<template>
  <div class="colors">
    <svg
      class="shape-overlays"
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
import { mutations } from '@/state';

export default {
  props: {
    color: String,
  },
  watch: {
    color: function (val, oldVal) {
      console.log("inHome: ",mutations.getHome());
      if (val != oldVal && val != "micasa" && mutations.getHome()) {
        switch (val) {
          case "Agency":
            this.elmOverlay.classList.remove("green");
            this.elmOverlay.classList.remove("blue");
            this.elmOverlay.classList.add("red");
            break;
          case "Studio":
            this.elmOverlay.classList.remove("blue");
            this.elmOverlay.classList.remove("red");
            this.elmOverlay.classList.add("green");
            break;
          case "powered":
            this.elmOverlay.classList.remove("red");
            this.elmOverlay.classList.remove("green");
            this.elmOverlay.classList.add("blue");
            break;

          default:
            break;
        }
        this.anim();
      }
    },
  },
  data() {
    return {
      elmOverlay: null,
      overlay: null,
    };
  },
  mounted() {
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
        this.timeStart = Date.now();
        this.renderLoop();
      }
      close() {
        this.isOpened = false;
        this.elm.classList.remove("is-opened");
        this.timeStart = Date.now();
        this.renderLoop();
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

    this.elmOverlay = document.querySelector(".shape-overlays");
    this.overlay = new ShapeOverlays(this.elmOverlay);
  },
  methods: {
    anim() {
      if (this.overlay.isAnimating) {
        return false;
      }
      this.overlay.toggle();
    },
    leave() {
      this.overlay.close();
    }
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
      @include transition (fill 0.5s);
    }

    &.red {
      path:nth-of-type(1) {
        fill: #eacec4;
      }
      path:nth-of-type(2) {
        fill: #8b5b4c;
      }
      path:nth-of-type(3) {
        fill: #6a342e;
      }
    }

    &.green {
      path:nth-of-type(1) {
        fill: #c9eac4;
      }
      path:nth-of-type(2) {
        fill: #4c8b4c;
      }
      path:nth-of-type(3) {
        fill: #2e6a30;
      }
    }

    &.blue {
      path:nth-of-type(1) {
        fill: #c4dbea;
      }
      path:nth-of-type(2) {
        fill: #4c688b;
      }
      path:nth-of-type(3) {
        fill: #2e496a;
      }
    }
  }
}
</style>