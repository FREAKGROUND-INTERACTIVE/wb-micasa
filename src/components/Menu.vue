<template>
  <transition>
    <div class="menu">
      <div class="menu__content">
        <div class="menu__info">
          <div class="menu__info-sites" v-if="visible">
            <Paragraph
              :mountedAnim="true"
              :class="'right'"
              :alignImportant="'left'"
              ref="paragraph1"
              :text="'318 Grand Street\nSuite 1G Brooklyn\nNY 11211\ninfo@mi-casa.us'"
              :font="'lora'"
            ></Paragraph>
            <Paragraph
              :mountedAnim="true"
              :class="'right'"
              :alignImportant="'left'"
              ref="paragraph2"
              :text="'70 Hester Street\nNY 10002\ninfo@mi-casa.us'"
              :font="'lora'"
            ></Paragraph>
          </div>
          <div class="menu__info-logo" v-show="false">
            <div @click="showMenu">
              <Brand-header
                :mountedAnim="true"
                :link="linkBrand"
                ref="brand"
              ></Brand-header>
            </div>
          </div>
          <div class="menu__info-dev" v-if="visible">
            <Paragraph
              :mountedAnim="true"
              :class="'right'"
              :alignImportant="'left'"
              ref="paragraph3"
              :text="lang=='en'?'Mi Casa Creative Corporation\nfor all Rights Reserved':'Mi Casa Creative Corporation\ntodos los derechos reservados'"
              :font="'lora'"
            ></Paragraph>
          </div>
        </div>
        <div class="menu__line"></div>
        <button @click="changeLang" v-if="false">Lang</button>
        <div class="menu__social">
          <a
            href="https://www.instagram.com/micasa.nyc/"
            target="_blank"
            rel="noopener noreferrer"
            class="menu__social-logo"
          >
            <img
              width="24"
              height="24"
              src="https://res.cloudinary.com/micasastudios/image/upload/v1617047427/WEBPAGE/ICONS/INSTAGRAM_sw2tfe.svg"
              alt="instagram"
            />
            <p>@micasa.nyc</p>
          </a>
          <a
            href="https://www.facebook.com/micasa.us"
            target="_blank"
            rel="noopener noreferrer"
            class="menu__social-logo"
          >
            <img
              width="24"
              height="24"
              src="https://res.cloudinary.com/micasastudios/image/upload/v1617047427/WEBPAGE/ICONS/FACEBOOK_axulhe.svg"
              alt="Facebook"
            />
            <p>@micasa.us</p>
          </a>
          <a
            href="https://twitter.com/MiCasa_Studios"
            target="_blank"
            rel="noopener noreferrer"
            class="menu__social-logo"
          >
            <img
              width="24"
              height="24"
              src="https://res.cloudinary.com/micasastudios/image/upload/v1617047427/WEBPAGE/ICONS/TWITTER_eba97s.svg"
              alt="Twitter"
            />
            <p>@MiCasa_Studios</p>
          </a>
          <a
            href="https://www.youtube.com/channel/UCaEYVWucHQpLRAKKB_Psmjw"
            target="_blank"
            rel="noopener noreferrer"
            class="menu__social-logo"
          >
            <img
              width="24"
              height="24"
              src="https://res.cloudinary.com/micasastudios/image/upload/v1617047427/WEBPAGE/ICONS/YOUTUBE_jcoujz.svg"
              alt="Youtube"
            />
            <p>@Mi Casa Studios</p>
          </a>
          <a
            href="https://www.linkedin.com/company/micasacreative/"
            target="_blank"
            rel="noopener noreferrer"
            class="menu__social-logo"
          >
            <img
              width="24"
              height="24"
              src="https://res.cloudinary.com/micasastudios/image/upload/v1617047427/WEBPAGE/ICONS/LINKED_IN_o72cjl.svg"
              alt="LinkedIn"
            />
            <p>@micasacreative</p>
          </a>
          <a
            href="https://www.twitch.tv/micasastudios"
            target="_blank"
            rel="noopener noreferrer"
            class="menu__social-logo"
          >
            <img
              width="24"
              height="24"
              src="https://res.cloudinary.com/micasastudios/image/upload/v1627927760/WEBPAGE/ICONS/TWITCH_brs6z7.svg"
              alt="Twitch"
            />
            <p>@micasacreative</p>
          </a>
          <a
            href="https://vimeo.com/micasastudios"
            target="_blank"
            rel="noopener noreferrer"
            class="menu__social-logo"
          >
            <img
              width="24"
              height="24"
              src="https://res.cloudinary.com/micasastudios/image/upload/v1627927760/WEBPAGE/ICONS/VIMEO_hqc3ka.svg"
              alt="Vimeo"
            />
            <p>@micasacreative</p>
          </a>
        </div>
        <div class="menu__links">
          <Menu-title
            :text="lang == 'en'?'Home':'Inicio'"
            @click.native="goTo('/')"
            ref="linksHome"
          ></Menu-title>
          <Menu-title
            :text="lang == 'en'?'Agency':'Agencia'"
            @click.native="goTo('/Agency')"
            ref="linksAgency"
          ></Menu-title>
          <Menu-title
            :text="lang == 'en'?'Studio':'Estudio'"
            @click.native="goTo('/Studio')"
            ref="linksStudio"
          ></Menu-title>
          <Menu-title
            :text="'Powered'"
            @click.native="goTo('/Powered')"
            ref="linksPowered"
          ></Menu-title>
        </div>
      </div>
      <div
        class="menu__button"
        :class="{white: home}"
        @click="showMenu"
        @mouseenter="inHover"
        @mouseleave="outHover"
      >
        <div></div>
        <div></div>
      </div>
    </div>
  </transition>
</template>

<script>
import { state, lang, mutations } from "@/state";
import gsap from "gsap";
import Paragraph from "@/components/Paragraph";
import MenuTitle from "@/components/MenuTitle";
import BrandHeader from "@/components/BrandHeader";

export default {
  components: {
    Paragraph,
    MenuTitle,
    BrandHeader,
  },
  computed: {
    lang() {
      return lang.lg;
    },
    home() {
      return state.inHome;
    }
  },
  data() {
    return {
      visible: false,
      content: null,
      button: null,
      linksSocial: null,
      linksPagina: null,
      lines: null,
      middleLine: null,
      linkBrand: "/",
      links: ["www.instagram.com"],
    };
  },
  mounted() {
    this.content = this.$el.querySelector(".menu__content");

    this.linksSocial = this.$el.querySelector(".menu__social");

    this.middleLine = this.$el.querySelector(".menu__line");

    this.button = this.$el.querySelector(".menu__button");

    this.lines = this.$el.querySelectorAll(".menu__button > div");

    this.lines = [...this.lines];
  },
  methods: {
    showMenu() {
      let that = this;
      if (gsap.isTweening(this.content)) {
        return;
      }
      if (this.visible) {
        that.button.classList.remove("close");
        that.lines.forEach((element) => {
          element.classList.remove("close");
        });
        this.leave();
        gsap.to(this.content, {
          duration: 1.8,
          autoAlpha: 0,
          delay: 1.6,
          // x: "100%",
          onComplete: function () {
            console.log("cerrar");
            that.visible = false;
          },
        });
      } else {
        that.button.classList.add("close");
        that.lines.forEach((element) => {
          element.classList.add("close");
        });
        this.initAnim();
        gsap.to(that.content, {
          duration: 2,
          autoAlpha: 1,
          // x: "0%",
          // onComplete: function () {
          //   that.visible = true;
          // },
        });
      }
    },
    goTo(url) {
      this.showMenu();
      this.$router.push({ path: url });
    },
    inHover() {
      console.log("inHover");
      mutations.inHover();
    },
    outHover() {
      console.log("outHover");
      mutations.outHover();
    },
    initAnim() {
      let that = this;
      this.$refs.linksHome.initAnim(0.4);
      this.$refs.linksAgency.initAnim(0.6);
      this.$refs.linksStudio.initAnim(0.8);
      this.$refs.linksPowered.initAnim(1);
      gsap.to(that.linksSocial, {
        duration: 1,
        opacity: 1,
        // delay: 0.7,
      });
      gsap.to(that.middleLine, {
        duration: 1,
        height: "100vh",
        // delay: 0.7,
        ease: "power4.out",
      });
      setTimeout(() => {
        this.visible = true;
      }, 3);
    },
    changeLang() {
      this.showMenu();
      mutations.changeLang();
    },
    leave() {
      let that = this;
      this.$refs.paragraph1.leave();
      this.$refs.paragraph2.leave();
      this.$refs.paragraph3.leave();
      this.$refs.linksHome.leave();
      this.$refs.linksAgency.leave();
      this.$refs.linksStudio.leave();
      this.$refs.linksPowered.leave();
      this.$refs.brand.leave();

      gsap.to(that.linksSocial, {
        duration: 1,
        opacity: 0,
        delay: 0.3,
      });
      gsap.to(that.middleLine, {
        duration: 0.5,
        height: "0vh",
      });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "./../assets/styles/setup";
.menu {
  .menu__content {
    @extend .menu-layout;
    // @include transform(translateX(100%));
    opacity: 0;
    visibility: hidden;

    .menu__line {
      width: 1px;
      height: 0vh;
      background-color: $dark;
      grid-area: line;
      place-self: start;
      @include breakpoint(sm) {
        display: none;
      }
    }

    .menu__info {
      grid-area: info;
      display: grid;
      margin-right: 4rem;
      grid-template-rows: 1fr 1fr 1fr;
      grid-template-columns: auto;
      grid-template-areas:
        "sites"
        "logo"
        "dev";

      .menu__info-sites {
        grid-area: sites;
        display: grid;
        align-content: space-around;
      }

      .menu__info-logo {
        grid-area: logo;
        display: grid;
        place-self: center end;
        margin-top: 1rem;
      }

      .menu__info-dev {
        grid-area: dev;
        display: flex;
        place-self: end;
        margin: 0 0.5rem 1.5rem 0;
      }

      @include breakpoint(sm) {
        margin-right: 0;
        .menu__info-dev {
          margin: 0;
          place-self: start;
        }
      }
    }

    .menu__social {
      grid-area: social;
      display: flex;
      flex-flow: column nowrap;
      place-self: start;
      margin: 1rem 0 0 6rem;
      opacity: 0;

      .menu__social-logo {
        display: flex;
        flex-flow: row nowrap;
        margin: 0.2rem 0 0.2rem;
        color: $dark;
        @include transition(all 0.5s);

        p {
          font-family: $lora;
          font-size: 14px;
          font-weight: 400;
          place-self: center;
          margin-left: 0.5rem;
        }

        &:hover {
          @include transform(translateX(10%));
        }
      }

      @include breakpoint(sm) {
        place-self: center end;
        margin: 0;

        .menu__social-logo {
          p {
            display: none;
          }
        }
      }
    }

    .menu__links {
      grid-area: links;
      place-self: end start;
      margin-left: 5rem;

      @include breakpoint(sm) {
        place-self: center start;
        margin-left: 0;
      }
    }
  }

  .menu__button {
    z-index: 999;
    grid-area: button;
    position: fixed;
    right: 4.3%;
    top: 6%;
    height: 25px;
    width: 25px;
    cursor: pointer;

    &.close {
      @include transform(rotate(0deg));
      @include transition(all 0.5s);
    }

    &.white {
      div {
        background-color: $light;
      }
    }

    div {
      background-color: $dark;
      width: 22px;
      height: 1px;
      position: absolute;
      top: 50%;
      left: 50%;

      @include transform(translate(-50%, -50%) rotate(0deg));

      @include transition(all 0.5s);

      &:first-child {
        top: 10px;
      }

      &:last-child {
        top: 20px;
      }

      &.close {
        @include transform(translate(-50%, -50%) rotate(45deg));

        &:first-child {
          top: 50%;
          @include transform(translate(-50%, -50%) rotate(45deg));
        }

        &:last-child {
          top: 50%;
          @include transform(translate(-50%, -50%) rotate(-45deg));
        }
      }
    }

    &:hover {
      &.close {
        @include transform(rotate(180deg));
      }

      &:not(.close) {
        div {
          &:first-child {
            top: 7px;
          }

          &:last-child {
            top: 21px;
          }
        }
      }
    }

    @include breakpoint(sm) {
      top: 2%;
      right: 8%;
    }
  }
}
</style>