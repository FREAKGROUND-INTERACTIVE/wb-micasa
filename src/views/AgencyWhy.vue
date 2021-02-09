<template>
  <div class="agency-why">
    <div class="agency-why__paragraph">
      <Paragraph
        :mountedAnim="true"
        :mountedDelay="1"
        :title="'Why us?'"
        :text="'Lorem, ipsum dolor sit amet consectetur adipisicing elit.\nAutem, rerum. Repellat placeat veniam reiciendis\nsimilique eos delectus porro modi, quas excepturi nulla quidem\nesse doloribus maiores eaque ipsam quam inventore.'"
      ></Paragraph>
    </div>
    <div class="agency-why__link">
      <Link-button
        ref="LinkButton"
        :mountedAnim="true"
        :link="'/clients-agency'"
      ></Link-button>
    </div>
  </div>
</template>

<script>
import { mutations } from "./../state";

import Paragraph from "@/components/Paragraph";
import LinkButton from "@/components/LinkButton";

export default {
  components: {
    Paragraph,
    LinkButton,
  },
  mounted() {
    mutations.setTitle(" ");
    setTimeout(() => {
      window.addEventListener("wheel", this.handleScroll);
    }, 3000);
  },
  destroyed() {
    window.removeEventListener("wheel", this.handleScroll);
  },
  methods: {
    /**
     ** SCROLL EVENT FUNCTION
     *? Function for route behavior on wheel
     * @param e mouse movement event
     */
    handleScroll(e) {
      window.removeEventListener("wheel", this.handleScroll);
      if (e.deltaY < 0) {
        this.$router.push({ path: "/services-agency" });
      }
      if (e.deltaY > 0) {
        this.$router.push({ path: "/clients-agency" });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "./../assets/styles/setup";
.agency-why {
  @extend .layout;

  .agency-why__paragraph {
    grid-area: content-2;
    place-self: end center;
    margin-bottom: 4rem;
  }

  .agency-why__link {
    @extend .link;
  }
}
</style>