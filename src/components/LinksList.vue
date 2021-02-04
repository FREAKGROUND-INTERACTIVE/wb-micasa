<template>
  <transition @leave="leave" :css="false">
    <div class="link">
      <router-link
        class="link__item"
        :to="links[0].toString()"
        @mouseover.native="setTitle(links[0].toString(), false)"
        @mouseleave.native="setTitle('micasa', true)"
      ></router-link>
      <router-link
        class="link__item"
        :to="links[1].toString()"
        @mouseover.native="setTitle(links[1].toString(), false)"
        @mouseleave.native="setTitle('micasa', true)"
      ></router-link>
      <router-link
        class="link__item"
        :to="links[2].toString()"
        @mouseover.native="setTitle('powered', false)"
        @mouseleave.native="setTitle('micasa', true)"
      ></router-link>
      <!-- <template v-for="item in links">
        <router-link
          :key="item"
          class="link__item"
          :to="item.toString()"
          @mouseover.native="item.toString()"
        ></router-link>
        <a
          :key="item"
          :href="item.toString()"
          target="_blank"
          rel="noopener noreferrer"
          class="link__item"
          v-if="isExternal"
        ></a>
      </template> -->
    </div>
  </transition>
</template>

<script>
import { mutations } from "./../state";
import { gsap } from "gsap";

export default {
  props: {
    links: Array,
    size: Number,
    color: String,
  },
  data() {
    return {
      items: null,
      backTitle: false,
    };
  },
  mounted() {
    this.items = this.$el.querySelectorAll(".link__item");
    this.setSize(this.items);
    this.setColor(this.items);
  },
  methods: {
    setSize(items) {
      items.forEach((elem, index) => {
        gsap.to(elem, {
          duration: 0.5,
          width: "15px",
          height: "15px",
          delay: index * 0.5,
        });
      });
    },
    setColor(items) {
      items.forEach((elem) => {
        elem.style.borderColor = `#${this.color ? this.color : "fff"}`;
        elem.style.borderColor = `#${this.color ? this.color : "fff"}`;
        elem.style.borderColor = `#${this.color ? this.color : "fff"}`;
        elem.style.borderColor = `#${this.color ? this.color : "fff"}`;
      });
    },
    setTitle(title, back) {
      let tOut;
      if (back) {
        this.backTitle = true;
        tOut = setTimeout(() => {
          if (this.backTitle) {
            // mutations.setTitle(title);
            this.backTitle = false;
          }
        }, 5000);
      } else {
        this.backTitle = false;
        clearTimeout(tOut);
        mutations.setTitle(title);
      }
    },
    leave: function (done) {
      this.exitAnimation(done);
      console.log("Se fue");
    },
    exitAnimation() {
      this.items.forEach((elem, index) => {
        gsap.to(elem, {
          duration: 0.5,
          width: 0,
          height: 0,
          delay: index * 0.5,
        });
      });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "./../assets/styles/setup";

.link {
  //* for this vue
  position: absolute;
  top: 50%;
  left: 50%;
  @include transform(translate(-50%, -50%));
  //* end for this vue

  width: 100%;
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;

  .link__item {
    width: 0;
    height: 0;
    border-radius: 50%;
    border: 1px solid #fff;
    //   margin: 0 2rem;
    @include transition(all 0.6s ease-out);

    cursor: pointer;

    &:hover {
      background-color: #fff;
      width: 25px !important;
      height: 25px !important;
    }
  }
}
</style>