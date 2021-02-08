<template>
  <div class="agency-services">
    <div class="agency-services__button">
      <Button
        :mountedAnim="true"
        :mountedDelay="1"
        :text="'See our Services'"
      ></Button>
    </div>
  </div>
</template>

<script>
import Button from "@/components/Button";
export default {
  components: {
    Button,
  },
};
</script>

<style lang="scss" scoped>
@import "./../assets/styles/setup";

.agency-services {
    @extend .layout;
    .agency-services__button {
        grid-area: content-2;
        place-self: center;
    }
}
</style>