<template>
  <transition @leave="leave" :css="false">
    <div class="powered-by">
      <div class="powered-by__container">
        <div class="powered-by__paragraph">
          <Paragraph
            ref="paragraph"
            :align="'center'"
            :title="'Powered by Micasa'"
            :color="'green'"
            :text="''"
          ></Paragraph>
        </div>
        <div class="powered-by__logos">
          <Powered-list ref="poweredList" :list="poweredList"></Powered-list>
        </div>
      </div>
      <div class="powered-by__brandheader">
        <Brand-header
          ref="BrandHeader"
          :link="'/'"
          :mountedAnim="true"
        ></Brand-header>
      </div>
    </div>
  </transition>
</template>

<script>
import { mutations } from "./../state";
import { gsap } from "gsap";
import Paragraph from "@/components/Paragraph";
import PoweredList from "@/components/PoweredList";
import BrandHeader from "@/components/BrandHeader";

export default {
  components: {
    Paragraph,
    PoweredList,
    BrandHeader
  },
  data() {
    return {
      poweredList: [
        "https://res.cloudinary.com/nancloud/image/upload/v1612836563/mi-casa/images/LOCATION_wtkgs5.jpg",
        "https://res.cloudinary.com/nancloud/image/upload/v1612836563/mi-casa/images/LOCATION_wtkgs5.jpg",
        "https://res.cloudinary.com/nancloud/image/upload/v1612836563/mi-casa/images/LOCATION_wtkgs5.jpg",
        "https://res.cloudinary.com/nancloud/image/upload/v1612836563/mi-casa/images/LOCATION_wtkgs5.jpg",
        "https://res.cloudinary.com/nancloud/image/upload/v1612836563/mi-casa/images/LOCATION_wtkgs5.jpg",
        "https://res.cloudinary.com/nancloud/image/upload/v1612836563/mi-casa/images/LOCATION_wtkgs5.jpg",
        "https://res.cloudinary.com/nancloud/image/upload/v1612836563/mi-casa/images/LOCATION_wtkgs5.jpg",
        "https://res.cloudinary.com/nancloud/image/upload/v1612836563/mi-casa/images/LOCATION_wtkgs5.jpg",
      ],
    };
  },
  mounted() {
    mutations.setTitle(" ");
    this.initAnim(1500);
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
        this.$router.push({ path: "/powered" });
      }
    },

    /**
     ** INIT ANIMATION FUNCTION
     *? Function for init animation
     * @param delay time for timeLine delay
     */
    initAnim(delay) {
      setTimeout(() => {
        this.$refs.paragraph.initAnim(0);
        this.$refs.poweredList.initAnim(1);
      }, delay);
    },

    /**
     ** LEAVE FUCTION
     *? Function for leave behavior
     * @param done it return the leave behavior end
     */
    leave(el, done) {
      this.$refs.paragraph.leave();
      this.$refs.poweredList.leave();
      gsap.to(el, {
        duration: 1.5,
        y: 0,
        onComplete: done,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "./../assets/styles/setup";

.powered-by {
  @extend .layout;

  .powered-by__container {
    grid-area: 3 / 2 / 4 / 4;
    display: flex;
    flex-flow: column nowrap;
    justify-content: center;
    align-content: center;

    .powered-by__paragraph {
      margin-bottom: 1rem;
    }

    .powered-by__logos {
      place-self: center;
    }
  }

  .powered-by__brandheader {
    grid-area: logo;
  }

  .powered-by__link {
    @extend .link;
  }
}
</style>