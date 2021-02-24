<template>
  <transition :leave="leave" :css="false">
    <div class="altering3d"></div>
  </transition>
</template>

<script>
import * as THREE from "three";
import { gsap } from "gsap";

export default {
  props: {
    mask: Boolean,
    pos: Event,
    mountedAnim: {
      type: Boolean,
      default: false,
    },
    mountedDelay: {
      type: Number,
      default: 0,
    },
  },
  watch: {
    pos: function (val) {
      this.mouseEvent = val;
    },
  },
  data() {
    return {
      mouseEvent: this.pos,
      animReq: null,
    };
  },
  mounted() {
    let that = this;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      100
    );

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    if (!this.mask) {
      renderer.setClearColor(0xdfdfdf);
    }
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    this.$el.appendChild(renderer.domElement);

    //* Init AmbientLight
    // this.scene.add(new THREE.AmbientLight(0x3e3e3e));
    scene.add(new THREE.AmbientLight(0x3a3a3a));

    //* Init Light
    const light = new THREE.SpotLight(0x808080, 1.5);
    light.position.set(0, 500, 2000);
    scene.add(light);

    const geometry = new THREE.BoxGeometry();
    const material = this.mask
      ? new THREE.MeshPhongMaterial()
      : new THREE.MeshNormalMaterial();
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    camera.position.z = 2;

    window.addEventListener("resize", onWindowResize, false);

    function onWindowResize() {
      var aspect = window.innerWidth / window.innerHeight;

      camera.aspect = aspect;
      camera.updateProjectionMatrix();

      renderer.setSize(window.innerWidth, window.innerHeight);
    }

    function animate() {
      that.animReq = requestAnimationFrame(animate);
      if (that.mouseEvent) {
        cube.rotation.x = that.mouseEvent.clientY / 720;
        cube.rotation.y = that.mouseEvent.clientX / 720;
      }
      renderer.render(scene, camera);
    }
    animate();

    //* initAnim function in mounted
    if (this.mountedAnim) {
      this.initAnim(this.mountedDelay);
    }
  },
  beforeDestroy() {
    cancelAnimationFrame(this.animReq);
  },
  methods: {
    initAnim(delay) {
      gsap.to(this.$el, {
        duration: 1,
        opacity: "1",
        delay: delay,
      });
    },
    leave(done) {
      gsap.to(this.$el, {
        duration: 0.5,
        opacity: "0",
        onComplete: done,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.altering3d {
  position: fixed;
  width: 100%;
  height: 100%;
  opacity: 0;
}
</style>