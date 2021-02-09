<template>
  <div class="agency-services">
    <div class="agency-services__button" @click="showServices = true">
      <Button
        :mountedAnim="true"
        :mountedDelay="1"
        :text="'See our Services'"
      ></Button>
    </div>
    <div class="agency-services__link">
      <Link-button
        ref="LinkButton"
        :mountedAnim="true"
        :link="'/why-agency'"
      ></Link-button>
    </div>
    <div class="agency-services__content" v-if="showServices">
      <div class="agency-services__content-close" @click="showServices = false">
        <Close-button :mountedAnim="true"></Close-button>
      </div>
      <div class="agency-services__content-paragraph">
        <Services
          :list="['Service 1', 'Service 2', 'Service 3', 'Service 4']"
        ></Services>
      </div>
    </div>
  </div>
</template>

<script>
import { mutations } from "./../state";

import Button from "@/components/Button";
import CloseButton from "@/components/CloseButton";
import Services from "@/components/Services";
import LinkButton from "@/components/LinkButton";

export default {
  components: {
    Button,
    CloseButton,
    Services,
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
  data() {
    return {
      showServices: false,
    };
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
        this.$router.push({ path: "/altering-agency" });
      }
      if (e.deltaY > 0) {
        this.$router.push({ path: "/why-agency" });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "./../assets/styles/setup";

.agency-services {
  @extend .layout;

  .agency-services__button {
    grid-area: 2 / 2 / 3 / 4;
    place-self: end center;
    margin-bottom: 5rem;
  }

  .agency-services__content {
    @extend .layout;
    background-color: #dfdfdf;

    .agency-services__content-close {
      grid-area: 2 / 2 / 3 / 4;
      place-self: start center;
    }

    .agency-services__content-paragraph {
      grid-area: 2 / 2 / 3 / 4;
      place-self: center;
    }
  }

  .agency-services__link {
    @extend .link;
  }
}
</style>