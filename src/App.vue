<template>
  <div id="app">
    <router-view :color="title"/>
    <View-title :text="title" :home="home"></View-title>
    <Menu></Menu>
  </div>
</template>

<script>
import { state, mutations } from "./state";
import ViewTitle from "@/components/ViewTitle";
import Menu from "@/components/Menu";
export default {
  components: {
    ViewTitle,
    Menu,
  },
  computed: {
    title() {
      return state.title;
    },
    home() {
      return state.inHome;
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
