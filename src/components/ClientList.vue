<template>
  <div class="clientList">
    <div v-for="client in list" :key="client.id">
      <img :src="client" alt="Clients" />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    list: Array
  },
};
</script>

<style lang="scss" scoped>
@import "./../assets/styles/setup";

.clientList {

  display: grid;
  grid-template-columns: auto auto auto auto auto;

  div {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: $light;
    width: 170px;
    height: 85px;
    margin: 0.1rem;

    img {
      width: 75%;
      height: 75%;
    }
  }
}
</style>