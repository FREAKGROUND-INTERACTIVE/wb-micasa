<template>
  <transition @leave="leave" :css="false">
    <div class="powered-by">
      <div class="powered-by__container">
        <div class="powered-by__paragraph">
          <Paragraph
            ref="paragraph"
            :align="'center'"
            :title="dataComp.title"
            :color="'green'"
            :text="''"
            :font="'mont'"
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
  props: {
    data: Object,
    initPage: {
      type: Boolean,
      default: true,
    },
  },
  watch: {
    data: function(val) {
      this.dataComp = val.powered;
    },
    initPage: function (val) {
      if (val) {
        this.initAnim(500);
      }
    },
  },
  data() {
    return {
      dataComp: this.data.powered,
      poweredList: [
        {img:"https://res.cloudinary.com/micasastudios/image/upload/v1617045024/WEBPAGE/PWRD%20BY/POWERED_1_xtxt8w.jpg", url:"https://www.instagram.com/debatethehype/?hl=en"},
        {img:"https://res.cloudinary.com/micasastudios/image/upload/v1617045024/WEBPAGE/PWRD%20BY/POWERED_2_eydwi2.jpg", url:"https://www.instagram.com/halfmoonbk/?hl=en"},
        {img:"https://res.cloudinary.com/micasastudios/image/upload/v1617045024/WEBPAGE/PWRD%20BY/POWERED_3_n8brt5.jpg", url:""},
        {img:"https://res.cloudinary.com/micasastudios/image/upload/v1624070983/WEBPAGE/PWRD%20BY/POWERED_4_pijyh5.jpg", url:"https://www.kapchiy.com/"}
      ],
    };
  },
  mounted() {
    mutations.setTitle(" ");
    setTimeout(() => {
      window.addEventListener("wheel", this.handleScroll);
    }, 3000);
     //* initAnim function in mounted
    if (this.initPage) {
      this.initAnim(1500);
    }
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
        this.$router.push({ path: "/" });
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
      this.$refs.BrandHeader.leave();
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
    @include breakpoint(sm) {
      display: none;
    }
  }

  .powered-by__link {
    @extend .link;
  }
}
</style>