<template>
  <div class="services">
    <div class="services__title">
      <h2>Our Services</h2>
    </div>
    <div class="services__list">
      <span v-for="service in list" :key="service">{{ service }}</span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    list: Array,
  },
};
</script>

<style lang="scss" scoped>
@import "./../assets/styles/setup";

.services {
  .services__title {
    h2 {
      text-align: center;
    }
  }

  .services__list {
    display: flex;
    flex-flow: row wrap;
    justify-content: center;
    width: 30vw;

    span {
      &:after {
        content: "\2022";
        margin: 0 0.4rem;
      }

      &:last-child {
        &:after {
          content: "";
        }
      }
    }
  }
}
</style>