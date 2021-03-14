<template>
  <transition @leave="leave" :css="false">
    <div class="agency-clients">
      <div class="agency-clients__bread">
        <Bread-crumb
          ref="bread"
          :number="'05'"
          :title="dataComp.bread"
          :pages="['About', 'Altering', 'Services', 'Why Us', 'Clients']"
          :mark="4"
          :mountedAnim="true"
          :mountedDelay="2"
        ></Bread-crumb>
      </div>
      <div class="agency-clients__container">
        <div class="agency-clients__paragraph">
          <Paragraph
            ref="paragraph"
            :class="'center'"
            :title="dataComp.paragraph.title"
            :text="dataComp.paragraph.text"
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
import BreadCrumb from "@/components/BreadCrumb";

export default {
  components: {
    LinkButton,
    Paragraph,
    ClientList,
    BrandHeader,
    BreadCrumb,
  },
  props: {
    data: Object,
    initPage: {
      type: Boolean,
      default: true,
    },
  },
  watch: {
    data: function (val) {
      this.dataComp = val.agency.clients;
    },
    initPage: function (val) {
      if (val) {
        this.initAnim(500);
      }
    },
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
      dataComp: this.data.agency.clients
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
      this.$refs.bread.leave();
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

  .agency-clients__bread {
    grid-area: breadCrumb;
    position: absolute;
  }

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