<template>
  <transition>
    <div class="menu">
      <div class="menu__content">
        <div class="menu__info">
          <div class="menu__info-sites">
            <Paragraph
              :mountedAnim="true"
              :mountedDelay="1"
              :class="'right'"
              :text="'318 Grand Street, Suite 1G\nBrooklyn, NY 11211\nmicasastudios@gmail.com\n(+1) 855-766-3835'"
            ></Paragraph>
            <Paragraph
              :mountedAnim="true"
              :mountedDelay="2"
              :class="'right'"
              :text="'318 Grand Street, Suite 1G\nBrooklyn, NY 11211\nmicasastudios@gmail.com\n(+1) 855-766-3835'"
            ></Paragraph>
          </div>
          <div class="menu__info-dev">
            <Paragraph
              :mountedAnim="true"
              :mountedDelay="3"
              :class="'right'"
              :text="'All Rights Reserved\nDeveloped by Freakground Interactive\n2021'"
            ></Paragraph>
          </div>
        </div>
        <div class="menu__line"></div>
        <div class="menu__social"></div>
        <div class="menu__links">
          <Menu-title :text="'Home'" @click.native="goTo('/')"></Menu-title>
          <Menu-title
            :text="'Agency'"
            @click.native="goTo('/Agency')"
          ></Menu-title>
          <Menu-title
            :text="'Studio'"
            @click.native="goTo('/Studio')"
          ></Menu-title>
          <Menu-title
            :text="'Powered by micasa'"
            @click.native="goTo('/Powered')"
          ></Menu-title>
        </div>
      </div>
      <div class="menu__button" @click="showMenu" @mouseenter="inHover" @mouseleave="outHover">
        <div></div>
        <div></div>
      </div>
    </div>
  </transition>
</template>

<script>
import { mutations } from '@/state';
import gsap from "gsap";
import Paragraph from "@/components/Paragraph";
import MenuTitle from "@/components/MenuTitle";

export default {
  components: {
    Paragraph,
    MenuTitle,
  },
  data() {
    return {
      visible: false,
      content: null,
      button: null,
      lines: null,
    };
  },
  mounted() {
    this.content = this.$el.querySelector(".menu__content");

    this.button = this.$el.querySelector(".menu__button");

    this.lines = this.$el.querySelectorAll(".menu__button > div");

    this.lines = [...this.lines];
  },
  methods: {
    showMenu() {
      let that = this;
      if (this.visible) {
        that.button.classList.remove("close");
        that.lines.forEach((element) => {
          element.classList.remove("close");
        });
        gsap.to(this.content, {
          duration: 1,
          x: "100%",
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
        gsap.to(this.content, {
          duration: 1,
          x: "0%",
          onComplete: function () {
            that.visible = true;
          },
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
    }
  },
};
</script>

<style lang="scss" scoped>
@import "./../assets/styles/setup";
.menu {
  .menu__content {
    @extend .menu-layout;
    @include transform(translateX(100%));

    .menu__line {
      width: 1px;
      height: 100vh;
      background-color: $dark;
      grid-area: line;
      place-self: start;
    }

    .menu__info {
      grid-area: info;
      display: grid;
      margin-right: 4rem;
      grid-template-rows: 1fr 1fr 1fr;
      grid-template-columns: auto;
      grid-template-areas:
        "sites"
        "."
        "dev";

      .menu__info-sites {
        grid-area: sites;
      }

      .menu__info-dev {
        grid-area: dev;
        display: flex;
        place-self: end;
      }
    }

    .menu__social {
      grid-area: social;
    }

    .menu__links {
      grid-area: links;
      place-self: end start;
      margin-left: 5rem;
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
  }
}
</style>