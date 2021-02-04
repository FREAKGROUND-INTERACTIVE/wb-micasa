<template>
  <div id="app">
    <router-view />
    <View-title :text="title"></View-title>
  </div>
</template>

<script>
import { state, mutations } from "./state";
import ViewTitle from "@/components/ViewTitle";
export default {
  components: {
    ViewTitle,
  },
  computed: {
    title() {
      return state.title;
    },
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
