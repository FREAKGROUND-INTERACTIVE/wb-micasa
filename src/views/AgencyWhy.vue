<template>
  <transition @leave="leave" :css="false">
    <div class="agency-why">
      <div class="agency-why__paragraph">
        <Paragraph
          ref="paragraph"
          :mountedAnim="true"
          :mountedDelay="1"
          :title="'Why us?'"
          :text="'At the heart of our process is financial strategy. With a\ndeep understanding of our Gen Z consumer, we know how\nour message needs to resonate to create real change\nwithin a budget.'"
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
  </transition>
</template>

<script>
import { mutations } from "./../state";
import { gsap } from "gsap";
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

    /**
     ** INIT ANIMATION FUNCTION
     *? Function for init animation
     * @param delay time for timeLine delay
     */
    initAnim() {
      this.$refs.LinkButton.initAnim(0);
    },

    /**
     ** LEAVE FUCTION
     *? Function for leave behavior
     * @param done it return the leave behavior end
     */
    leave(el, done) {
      this.$refs.paragraph.leave();
      this.$refs.LinkButton.leave();
      gsap.to(el, {
        duration: 3,
        y: 0,
        onComplete: done,
      });
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