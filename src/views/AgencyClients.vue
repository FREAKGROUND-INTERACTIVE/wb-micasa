<template>
  <transition @leave="leave" :css="false">
    <div class="agency-clients">
      <div class="agency-clients__container">
        <div class="agency-clients__paragraph">
          <Paragraph
            ref="paragraph"
            :class="'center'"
            :mountedAnim="true"
            :mountedDelay="1"
            :title="'Our Clients'"
            :text="'We are passionate about what we create and attract others like us. Ideal collaborators\nare agents who seek a fresh perspective. Together we disrupt the status quo.'"
          ></Paragraph>
        </div>
        <div class="agency-clients__logos">
          <Client-list ref="clientList" :list="clientList"></Client-list>
        </div>
      </div>
      <div class="agency-clients__link">
        <Link-button
          ref="LinkButton"
          :mountedAnim="true"
          :link="'/Studio'"
        ></Link-button>
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

export default {
  components: {
    LinkButton,
    Paragraph,
    ClientList,
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
    this.initAnim();
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
    initAnim() {
      this.$refs.paragraph.initAnim();
      this.$refs.LinkButton.initAnim();
      this.$refs.clientList.initAnim(5);
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

.agency-clients {
  @extend .layout;

  .agency-clients__container {
    grid-area: 3 / 2 / 4 / 4;
    display: flex;
    flex-flow: column nowrap;
    justify-content: center;
    align-content: center;
    // margin-bottom: 7rem;

    .agency-clients__paragraph {
      margin-bottom: 2rem;
    }

    .agency-clients__logos {
      place-self: center;
    }
  }

  .agency-clients__link {
    @extend .link;
  }
}
</style>