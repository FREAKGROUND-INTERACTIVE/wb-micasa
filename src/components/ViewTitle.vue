<template>
  <div class="view-title">
    <div class="view-title__container">
      <h1
        class="view-title__new"
        :class="{
          red: (newTitle == 'Agency' || newTitle == 'Agencia') && !home,
          blue: (newTitle == 'Studio' || newTitle == 'Estudio') && !home,
          green: newTitle == 'Powered' && !home,
        }"
      >
        <template v-for="letter in newTitle">
          <div class="view-title__new-letter" :key="letter.id">
            {{ letter == " " ? "&nbsp;" : letter }}
          </div>
        </template>
      </h1>
      <h1
        class="view-title__old"
        :class="{
          red: (newTitle == 'Agency' || newTitle == 'Agencia') && !home,
          blue: (newTitle == 'Studio' || newTitle == 'Estudio') && !home,
          green: newTitle == 'Powered' && !home,
        }"
      >
        <template v-for="letter in title">
          <div class="view-title__old-letter" :key="letter.id">
            {{ letter == " " ? "&nbsp;" : letter }}
          </div>
        </template>
      </h1>
    </div>

    <div class="view-title__quote">
      <p
        class="view-title__quote-text"
        :class="{
          green: newTitle == 'Powered' && !home,
        }"
      >
        by MI-CASA
      </p>
    </div>
  </div>
</template>

<script>
import { gsap } from "gsap";
export default {
  props: {
    text: String,
    home: Boolean,
  },
  watch: {
    text: function (val) {
      this.newTitle = val;

      this.$el.classList.add("change");
      if (val == "Powered") {
        gsap.to(this.$el.querySelector(".view-title__quote-text"), {
          duration: 0.3,
          y: "0%",
        });
      } else {
        gsap.to(this.$el.querySelector(".view-title__quote-text"), {
          duration: 0.3,
          y: "-100%",
        });
      }

      setTimeout(() => {
        this.title = this.newTitle;
        this.$el.classList.remove("change");
      }, 300);
    },
  },
  data() {
    return {
      title: this.text,
      newTitle: this.text,
    };
  },
};
</script>

<style lang="scss" scoped>
@import "./../assets/styles/setup";

.view-title {
  position: absolute;
  left: 50%;
  top: 50%;
  pointer-events: none;
  @include transform(translate(-50%, -50%));

  .view-title__container {
    height: 20vh;
    overflow: hidden;
    text-align: center;
    .view-title__new,
    .view-title__old {
      font-size: 22vh;
      text-transform: uppercase;
      line-height: 1;
      color: white;
      font-weight: 900;
      white-space: nowrap;
      padding: 0 1rem;
      @include transform(translateY(-100%));
      @include transition(color 0.5s 0.5s);

      .view-title__new-letter,
      .view-title__old-letter {
        display: inline-block;
      }

      &.red {
        color: $red;
      }

      &.blue {
        color: $cyan;
      }

      &.green {
        color: $green;
      }
    }

    @include breakpoint(sm) {
      height: 8vh;
      .view-title__new,
      .view-title__old {
        font-size: 9vh;
      }
    }
  }

  .view-title__quote {
    position: absolute;
    width: 100%;
    overflow: hidden;

    .view-title__quote-text {
      text-align: center;
      color: white;
      font-weight: 900;
      font-size: 5vh;
      @include transform(translateY(-100%));
      @include transition(color 0.5s 0.5s);

      &.red {
        color: $red;
      }

      &.blue {
        color: $cyan;
      }

      &.green {
        color: $green;
      }
    }
  }
  &.change {
    .view-title__container {
      h1 {
        @include transform(translateY(0));
        @include transition(all 0.3s ease-out);
      }
    }
  }
}
</style>