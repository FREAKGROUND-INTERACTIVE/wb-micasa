<template>
  <transition @leave="leave" :css="false">
    <div class="home">
      <Home3d></Home3d>
      <div class="home__links">
        <Links-list :links="['Agency', 'Studio', 'Powered-by-mi-casa']"></Links-list>
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
    });
    mutations.setTitle("micasa");
  },
  methods: {
    leave(el, done) {
      console.log("leave home");
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
  position: absolute;
  top: 0;
  opacity: 0;
  width: 100%;
  height: 100vh;

  .home__links {
    position: absolute;
    width: 250px;
    bottom: 17%;
    left: 50%;
    @include transform(translateX(-50%));
  }
}
</style>
