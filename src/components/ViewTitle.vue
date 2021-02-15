<template>
  <div class="view-title">
    <h1
      class="view-title__new"
      :class="{
        red: newTitle == 'Agency' && !home,
        blue: newTitle == 'Studio' && !home,
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
        red: newTitle == 'Agency' && !home,
        blue: newTitle == 'Studio' && !home,
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
</template>

<script>
export default {
  props: {
    text: String,
    home: Boolean,
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
  position: absolute;
  left: 50%;
  top: 50%;
  @include transform(translate(-50%, -50%));
  height: 20vh;
  overflow: hidden;
  text-align: center;
  pointer-events: none;

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

  &.change {
    h1 {
      @include transform(translateY(0));
      @include transition(all 0.3s ease-out);
    }
  }
}
</style>