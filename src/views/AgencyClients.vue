<template>
  <transition @leave="leave" :css="false">
    <div class="agency-clients">
      <div class="agency-clients__container">
        <div class="agency-clients__paragraph">
          <Paragraph
            ref="paragraph"
            :class="'center'"
            :title="'Our Clients'"
            :text="'We are passionate about what we create and attract others like us. Ideal collaborators\nare agents who seek a fresh perspective. Together we disrupt the status quo.'"
          ></Paragraph>
        </div>
        <div class="agency-clients__logos">
          <Client-list ref="clientList" :list="clientList"></Client-list>
        </div>
      </div>
      <div class="agency-clients__brandheader">
        <Brand-header
          ref="BrandHeader"
          :link="'/'"
          :mountedAnim="true"
        ></Brand-header>
      </div>
      <div class="agency-clients__link">
        <Link-button ref="LinkButton" :link="'/Studio'"></Link-button>
      </div>
    </div>
  </transition>
</template>

<script>
import { mutations } from "./../state";
import { gsap } from "gsap";
import LinkButton from "@/components/LinkButton";
import Paragraph from "@/components/Paragraph";
import ClientList from "@/components/ClientList";
import BrandHeader from "@/components/BrandHeader";

export default {
  components: {
    LinkButton,
    Paragraph,
    ClientList,
    BrandHeader,
  },
  data() {
    return {
      clientList: [
        "https://res.cloudinary.com/nancloud/image/upload/v1612836563/mi-casa/images/LOCATION_wtkgs5.jpg",
        "https://res.cloudinary.com/nancloud/image/upload/v1612836563/mi-casa/images/LOCATION_wtkgs5.jpg",
        "https://res.cloudinary.com/nancloud/image/upload/v1612836563/mi-casa/images/LOCATION_wtkgs5.jpg",
        "https://res.cloudinary.com/nancloud/image/upload/v1612836563/mi-casa/images/LOCATION_wtkgs5.jpg",
        "https://res.cloudinary.com/nancloud/image/upload/v1612836563/mi-casa/images/LOCATION_wtkgs5.jpg",
        "https://res.cloudinary.com/nancloud/image/upload/v1612836563/mi-casa/images/LOCATION_wtkgs5.jpg",
        "https://res.cloudinary.com/nancloud/image/upload/v1612836563/mi-casa/images/LOCATION_wtkgs5.jpg",
        "https://res.cloudinary.com/nancloud/image/upload/v1612836563/mi-casa/images/LOCATION_wtkgs5.jpg",
        "https://res.cloudinary.com/nancloud/image/upload/v1612836563/mi-casa/images/LOCATION_wtkgs5.jpg",
        "https://res.cloudinary.com/nancloud/image/upload/v1612836563/mi-casa/images/LOCATION_wtkgs5.jpg",
        "https://res.cloudinary.com/nancloud/image/upload/v1612836563/mi-casa/images/LOCATION_wtkgs5.jpg",
        "https://res.cloudinary.com/nancloud/image/upload/v1612836563/mi-casa/images/LOCATION_wtkgs5.jpg",
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
        this.$router.push({ path: "/why-agency" });
      }
      if (e.deltaY > 0) {
        this.$router.push({ path: "/studio" });
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
        this.$refs.clientList.initAnim(1);
        this.$refs.LinkButton.initAnim(3);
      }, delay);
    },

    /**
     ** LEAVE FUCTION
     *? Function for leave behavior
     * @param done it return the leave behavior end
     */
    leave(el, done) {
      this.$refs.paragraph.leave();
      this.$refs.LinkButton.leave();
      this.$refs.clientList.leave();
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

.agency-clients {
  @extend .layout;

  .agency-clients__container {
    grid-area: 3 / 2 / 4 / 4;
    display: flex;
    flex-flow: column nowrap;
    justify-content: center;
    align-content: center;

    .agency-clients__paragraph {
      margin-bottom: 1rem;
    }

    .agency-clients__logos {
      place-self: center;
    }
  }

  .agency-clients__brandheader {
    grid-area: logo;
  }

  .agency-clients__link {
    @extend .link;
  }
}
</style>