<template>
  <transition @leave="leave" :css="false">
    <div class="slider"></div>
  </transition>
</template>

<script>
import * as THREE from "three";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader.js";
import gsap from "gsap";
// import { gsap } from "gsap";
export default {
  props: {
    mountedAnim: {
      type: Boolean,
      default: false,
    },
    mountedDelay: {
      type: Number,
      default: 0,
    },
  },
  mounted() {
    this.initScene(this);
    //* initAnim function in mounted
    if (this.mountedAnim) {
      this.initAnim(this.mountedDelay);
    }
  },
  methods: {
    initAnim(delay) {
      gsap.to(this.$el, {
        duration: 3,
        opacity: 1,
        delay: delay,
      });
    },
    initScene() {
      const container = this.$el;
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(
        35, //* fov
        window.innerWidth / window.innerHeight, //* aspect ratio
        0.1, //* near
        1000 //* far
      );

      const renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
      });
      // renderer.setClearColor(0xff0000);
      renderer.setSize(window.innerWidth, window.innerHeight);
      container.appendChild(renderer.domElement);

      //* Init AmbientLight
      // this.scene.add(new THREE.AmbientLight(0x3e3e3e));
      scene.add(new THREE.AmbientLight(0x3a3a3a));

      //* Init Light
      const light = new THREE.SpotLight(0x808080, 1.5);
      light.position.set(0, 500, 2000);
      scene.add(light);

      //* Instantiate the loader
      const loader = new OBJLoader();

      //* Imported OBJ variable
      let obj;
      // let dummy;

      //* load a .OBJ resource from provided URL synchronously
      loader.load(
        "https://res.cloudinary.com/nancloud/raw/upload/v1614127382/mi-casa/models/slider_02_r66dvd.obj",
        function (object) {
          obj = object;
          // camera, flower, mic, claqueta, dj, light
          const urls = [
            "https://res.cloudinary.com/nancloud/image/upload/v1613749660/mi-casa/models/TEXTURES/1b375f92ac43d1e79ff6e41092664ad6_zo2ufp.jpg", // camera
            "https://res.cloudinary.com/nancloud/image/upload/v1613749660/mi-casa/models/TEXTURES/0004_yst7ez.jpg", // planta
            "https://res.cloudinary.com/nancloud/image/upload/v1613749660/mi-casa/models/TEXTURES/0ddf2c1ccf9d361cc2dc89c579a9080d_iq3z8v.jpg", // mic
            "https://res.cloudinary.com/nancloud/image/upload/v1613749660/mi-casa/models/TEXTURES/0004_yst7ez.jpg", // claqueta
            "https://res.cloudinary.com/nancloud/image/upload/v1613749659/mi-casa/models/TEXTURES/f33d5febcf432cdead3a28141a466109_khvcux.jpg", // dj
            "https://res.cloudinary.com/nancloud/image/upload/v1613749660/mi-casa/models/TEXTURES/a44f197958fb1fcc2de6d04d33e2828b_q4molc.jpg", // light
          ];
          obj.children.forEach((mesh, index) => {
            mesh.geometry.computeBoundingBox();
            if (index == 0) {
              const texture = new THREE.TextureLoader().load(urls[index]);
              mesh.material = new THREE.MeshStandardMaterial({ map: texture });
              mesh.position.y = 10;
              
            } else {
              const texture = new THREE.TextureLoader().load(urls[index]);
              mesh.material = new THREE.MeshStandardMaterial({ map: texture });
            }
          });
          console.log(obj);
          scene.add(obj);
          // const geometry = new THREE.TorusGeometry();
          // const material = new THREE.MeshBasicMaterial({ color: 0x000000 });
          // dummy = new THREE.Mesh(geometry, material);
          // dummy.position.x = obj.children[0].position.x;
          // dummy.position.z = obj.children[0].position.z;
          // camera.lookAt(dummy.position);
          // console.log("obj: ", obj);
        }
        // function (xhr) {
        //   // console.log((xhr.loaded/1803683)*100 + "% loaded", xhr);
        //   mutations.loadingCharge((xhr.loaded / 1803683) * 100);
        // }
      );

      // const colors = [0x00ff00, 0xff0000, 0x0000ff, 0x00aa00, 0xaa0000, 0x0000aa];
      // const objs = [];

      // for (let index = 0; index < 6; index++) {
      //   const geometry = new THREE.BoxGeometry();
      //   const material = new THREE.MeshBasicMaterial({ color: colors[index] });
      //   objs[index] = new THREE.Mesh(geometry, material);
      //   objs[index].position.z = Math.sin(index) * 5;
      //   objs[index].position.x = Math.cos(index) * 5;
      //   scene.add(objs[index]);
      // }

      // scene.add(dummy);

      // camera.position.y = 50;
      // camera.lookAt(dummy.position);

      // const timeAnim = 5;
      // let objIndex = 0;
      // var clock = new THREE.Clock();

      window.addEventListener("resize", onWindowResize, false);

      function onWindowResize() {
        var aspect = window.innerWidth / window.innerHeight;

        camera.aspect = aspect;
        camera.updateProjectionMatrix();

        renderer.setSize(window.innerWidth, window.innerHeight);
      }

      let initSlider = false;
      setTimeout(() => {
        initSlider = true;
      }, 3000);

      function animate() {
        requestAnimationFrame(animate);
        // if (clock.getElapsedTime() > timeAnim) {
        //   clock.stop();
        //   clock.start();
        //   if (objIndex == 5) {
        //     objIndex = 0;
        //   } else {
        //     objIndex++;
        //   }
        //   // gsap.to(camera.rotation, {
        //   //   duration: 2,
        //   //   y: camera.rotation.y + 1.0472,
        //   // });
        //   gsap.to(dummy.position, {
        //     duration: 2,
        //     // x: objs[objIndex].position.x,
        //     // z: objs[objIndex].position.z,
        //     x: obj.children[objIndex].position.x,
        //     z: obj.children[objIndex].position.z,
        //     onUpdate: function () {
        //       camera.lookAt(dummy.position);
        //     },
        //   });
        // }

        if (obj && !gsap.isTweening(obj.rotation) && initSlider) {
          // obj.children.forEach((element) => {
          //   element.rotation.y += 0.01;
          // });
          // obj.children[0].geometry.center();
          // obj.children[0].rotation.y += 0.1;
          gsap.to(obj.rotation, {
            duration: 2,
            y: obj.rotation.y + (60 * Math.PI) / 180,
            delay: 1,
            onComplete: function () {
              obj.children[0].position.y = 0;
            },
          });
        }
        renderer.render(scene, camera);
      }
      animate();
    },
    leave(done) {
      gsap.to(this.$el, {
        duration: 0.5,
        opacity: 0,
        onComplete: done,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.slider {
  opacity: 0;
}
</style>