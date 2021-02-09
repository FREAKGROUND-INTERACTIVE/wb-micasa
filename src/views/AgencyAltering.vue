<template>
  <div class="agency-altering">
    <div class="agency-altering__paragraph">
      <Paragraph
        :mountedAnim="true"
        :mountedDelay="1"
        :title="'Altering the constant'"
        :text="'Lorem, ipsum dolor sit amet consectetur adipisicing elit.\nAutem, rerum. Repellat placeat veniam reiciendis\nsimilique eos delectus porro modi, quas excepturi nulla quidem\nesse doloribus maiores eaque ipsam quam inventore.'"
      ></Paragraph>
    </div>
    <div class="agency-altering__link">
      <Link-button
        ref="LinkButton"
        :mountedAnim="true"
        :link="'/services-agency'"
      ></Link-button>
    </div>
  </div>
</template>

<script>
import Paragraph from "@/components/Paragraph";
import LinkButton from "@/components/LinkButton";
export default {
  components: {
    Paragraph,
    LinkButton,
  },
  mounted() {
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
        this.$router.push({ path: "/about-agency" });
      }
      if (e.deltaY > 0) {
        this.$router.push({ path: "/services-agency" });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "./../assets/styles/setup";
.agency-altering {
  @extend .layout;

  .agency-altering__paragraph {
    grid-area: content-2;
    place-self: end center;
    margin-bottom: 4rem;
  }

  .agency-altering__link {
    @extend .link;
  }
}
</style>