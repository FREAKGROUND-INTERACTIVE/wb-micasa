<template>
  <div class="view-title">
    <h1 class="view-title__new">
      <template v-for="letter in newTitle">
        <div
          class="view-title__new-letter"
          :key="letter.id"
          :class="{ space: letter == ' ' }"
        >
          {{ letter }}
        </div>
      </template>
    </h1>
    <h1 class="view-title__old">
      <template v-for="letter in title">
        <div
          class="view-title__old-letter"
          :key="letter.id"
          :class="{ space: letter == ' ' }"
        >
          {{ letter }}
        </div>
      </template>
    </h1>
  </div>
</template>

<script>
export default {
  props: {
    text: String,
  },
  watch: {
    text: function (val) {
      this.newTitle = val;

      this.$el.classList.add("change");

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
  height: 9vh;
  overflow: hidden;
  text-align: left;
  cursor: pointer;

  .view-title__new,
  .view-title__old {
    font-size: 7vh;
    text-transform: uppercase;
    // line-height: 0.5;
    color: transparent;
    -webkit-text-stroke: 1px $dark;
    font-weight: 900;
    white-space: nowrap;
    padding: 0 0.5rem;
    .view-title__new-letter,
    .view-title__old-letter {
      display: inline-block;

      &.space {
        margin-right: 1rem;
      }
    }

    @include transform(translateY(-100%));
    @include transition(all 0.3s ease-out);
  }

  &.change {
    h1 {
      @include transform(translateY(0));
      @include transition(all 0.3s ease-out);
    }
  }

  &:hover {
    .view-title__old {
      -webkit-text-stroke: 1px $red;
    }
  }
}
</style>