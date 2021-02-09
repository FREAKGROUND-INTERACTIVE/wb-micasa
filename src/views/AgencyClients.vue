<template>
  <div class="agency-clients">
    <div class="agency-clients__paragraph">
      <Paragraph
        :class="'center'"
        :mountedAnim="true"
        :mountedDelay="1"
        :title="'Our Clients'"
        :text="'Lorem, ipsum dolor sit amet consectetur adipisicing elit.\nAutem, rerum. Repellat placeat veniam reiciendis\nsimilique eos delectus porro modi, quas excepturi nulla quidem\nesse doloribus maiores eaque ipsam quam inventore.'"
      ></Paragraph>
    </div>
    <div class="agency-clients__logos">
      <Client-list :list="clientList"></Client-list>
    </div>
    <div class="agency-clients__link">
      <Link-button
        ref="LinkButton"
        :mountedAnim="true"
        :link="'/Studio'"
      ></Link-button>
    </div>
  </div>
</template>

<script>
import { mutations } from "./../state";

import LinkButton from "@/components/LinkButton";
import Paragraph from "@/components/Paragraph";
import ClientList from "@/components/ClientList";

export default {
  components: {
    LinkButton,
    Paragraph,
    ClientList,
  },
  data() {
    return {
      clientList: [
        "https://picsum.photos/1920/1080?random=1",
        "https://picsum.photos/1920/1080?random=2",
        "https://picsum.photos/1920/1080?random=3",
        "https://picsum.photos/1920/1080?random=4",
        "https://picsum.photos/1920/1080?random=5",
        "https://picsum.photos/1920/1080?random=1",
        "https://picsum.photos/1920/1080?random=2",
        "https://picsum.photos/1920/1080?random=3",
        "https://picsum.photos/1920/1080?random=4",
        "https://picsum.photos/1920/1080?random=5",
        "https://picsum.photos/1920/1080?random=1",
        "https://picsum.photos/1920/1080?random=2",
        "https://picsum.photos/1920/1080?random=3",
        "https://picsum.photos/1920/1080?random=4",
        "https://picsum.photos/1920/1080?random=5",
        "https://picsum.photos/1920/1080?random=1",
        "https://picsum.photos/1920/1080?random=2",
        "https://picsum.photos/1920/1080?random=3",
        "https://picsum.photos/1920/1080?random=4",
        "https://picsum.photos/1920/1080?random=5",
      ],
    };
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
        this.$router.push({ path: "/why-agency" });
      }
      if (e.deltaY > 0) {
        this.$router.push({ path: "/studio" });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "./../assets/styles/setup";

.agency-clients {
  @extend .layout;

  .agency-clients__paragraph {
    grid-area: 2 / 2 / 3 / 4;
    place-self: start center;
    margin-top: 3rem;
  }

  .agency-clients__logos {
    grid-area: 2 / 2 / 3 / 4;
    place-self: center;
  }

  .agency-clients__link {
    @extend .link;
  }
}
</style>