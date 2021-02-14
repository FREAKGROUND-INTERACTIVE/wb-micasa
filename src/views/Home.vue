<template>
  <transition @leave="leave" :css="false">
    <div class="home">
      <Home3d></Home3d>
      <div class="home__links">
        <Links-list
          ref="linksList"
          :mountedAnim="true"
          :links="['Agency', 'Studio', 'Powered-by-mi-casa']"
        ></Links-list>
      </div>
    </div>
  </transition>
</template>

<script>
import { mutations } from "./../state";
import { gsap } from "gsap";
import Home3d from "@/components/Home3d";
import LinksList from "@/components/LinksList";
export default {
  name: "Home",
  components: {
    Home3d,
    LinksList,
  },
  mounted() {
    gsap.to(this.$el, {
      duration: 1,
      opacity: "1",
      delay: 0.5,
      onComplete: function () {
        mutations.setTitle("micasa");
      },
    });
  },
  methods: {
    leave(el, done) {
      this.$refs.linksList.leave();
      gsap.to(el, {
        duration: 1,
        opacity: "0",
        onComplete: done,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "./../assets/styles/setup";
.home {
  position: fixed;
  top: 0;
  opacity: 0;
  width: 100%;
  height: 100vh;
  display: grid;
  grid-template-columns: [colFirst] 4% [col2] 1fr [col3] 1fr [col4] 4% [colEnd];
  grid-template-rows: [rowFirst] 6% [row2] 7% [row3] 74% [row4] 7% [row5] 6% [rowEnd];
  grid-template-areas:
    ".    .     .     ."
    ". breadCrumb menu ."
    ". content content ."
    ". logo logo ."
    ".    .     .     .";

  .home__links {
    grid-area: content;
    place-self: end center;
    width: 200px;
  }
}
</style>
