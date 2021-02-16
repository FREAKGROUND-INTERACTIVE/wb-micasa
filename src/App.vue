<template>
  <div id="app">
    <router-view :color="title"/>
    <View-title :text="title" :home="home"></View-title>
    <Menu></Menu>
    <Mouse :inHover="inHover"></Mouse>
  </div>
</template>

<script>
import { state, mouse, mutations } from "./state";
import ViewTitle from "@/components/ViewTitle";
import Menu from "@/components/Menu";
import Mouse from "@/components/Mouse";
export default {
  components: {
    ViewTitle,
    Menu,
    Mouse,
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
};
</script>

<style lang="scss">
@import "./assets/styles/setup";
</style>
