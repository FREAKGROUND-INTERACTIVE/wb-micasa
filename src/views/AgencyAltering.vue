<template>
<transition @leave="leave" :css="false">
<div class="agency-altering">
    <div class="agency-altering__paragraph">
      <Paragraph
      ref="paragraph"
        :mountedAnim="true"
        :mountedDelay="1"
        :title="'Altering the constant'"
        :text="'We make bold things with a purpose to create real change\nfor the internet and beyond that. In this technology driven\nworld that seems to move faster than the speed of light,\nonly the right narrative to the right people at the right time\nwill pierce through.'"
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
</transition>
  
</template>

<script>
import Paragraph from "@/components/Paragraph";
import LinkButton from "@/components/LinkButton";
import { gsap } from "gsap";

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

    /**
     ** INIT ANIMATION FUNCTION
     *? Function for init animation
     * @param delay time for timeLine delay
     */
    initAnim() {
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
        duration: 2,
        y: 0,
        onComplete: done,
      });
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