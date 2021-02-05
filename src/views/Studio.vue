<template>
  <transition>
    <div class="studio">
      <div class="studio__link-button">
        <!-- <Link-button :link="link"></Link-button> -->
      </div>
    </div>
  </transition>
</template>

<script>
// import LinkButton from "@/components/LinkButton";

export default {
  name: "Studio",
  components: {
    // LinkButton,
  },
  data() {
    return {
      link: "/studio-02",
    };
  },
};
</script>

<style lang="scss" scoped>
@import "./../assets/styles/setup";

.studio {
  width: 100vw;
  height: 100vh;
  display: grid;
  grid-template-columns: 1fr 0.5fr 2fr 1fr;
  grid-template-rows: 1fr 5fr 1fr;

  .studio__link-button {
      grid-area: 3 / 4;
      display: flex;
      justify-content: center;
      align-content: center;
  }
}
</style>