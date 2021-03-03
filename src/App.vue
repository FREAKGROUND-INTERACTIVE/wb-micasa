<template>
  <div id="app">
    <router-view :color="title" :initAudio="initAudio" :data="dataLang"/>
    <View-title :text="title" :home="home"></View-title>
    <Menu></Menu>

    <Loading @init="init" :count="loadingCount" :finish="loadingDone" v-if="false"></Loading>
    <!-- <Mouse :inHover="inHover"></Mouse> -->
  </div>
</template>

<script>
import { state, mouse, loading, mutations, lang } from "./state";
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
    loadingCount() {
      return loading.count;
    },
    loadingDone() {
      return loading.loaded;
    },
    dataLang() {
      return lang.data;
    }
  },
  data() {
    return {
      initAudio: false
    }
  },
  mounted() {
    console.log("data:", this.dataLang);
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
