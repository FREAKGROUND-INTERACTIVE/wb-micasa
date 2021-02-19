<template>
  <div id="app">
    <router-view :color="title" :initAudio="initAudio"/>
    <View-title :text="title" :home="home"></View-title>
    <Menu></Menu>

    <Loading @init="init"></Loading>
    <!-- <Mouse :inHover="inHover"></Mouse> -->
  </div>
</template>

<script>
import { state, mouse, mutations } from "./state";
import ViewTitle from "@/components/ViewTitle";
import Menu from "@/components/Menu";
import Loading from "@/components/Loading";
// import Mouse from "@/components/Mouse";
export default {
  components: {
    ViewTitle,
    Menu,
    Loading
    // Mouse,
  },
  computed: {
    title() {
      return state.title;
    },
    home() {
      return state.inHome;
    },
    inHover() {
      // console.log("computed app hover", mouse.hover);
      return mouse.hover;
    },
  },
  data() {
    return {
      initAudio: false
    }
  },
  mounted() {
    let path = window.location.pathname;
    switch (path) {
      case "/Agency":
        mutations.setTitle("agency");
        break;
      case "/Studio":
        mutations.setTitle("studio");
        break;
      case "/Powered-by-mi-casa":
        mutations.setTitle("powered");
        break;

      default:
        break;
    }
  },
  methods: {
    init() {
      this.initAudio = true;
    }
  }
};
</script>

<style lang="scss">
@import "./assets/styles/setup";
</style>
