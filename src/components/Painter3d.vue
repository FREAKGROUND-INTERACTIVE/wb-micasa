<template>
  <transition @leave="leave" :css="false">
    <div id="painter"></div>
  </transition>
</template>

<script>
import * as THREE from "three";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader.js";
import { gsap } from "gsap";
import "@/assets/utils/TexturePainterO";

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
      var width = window.innerWidth;
      var height = window.innerHeight;

      // var  controls;
      var renderer, camera, scene;
      var painter;

      //* Instantiate the loader
      const loader = new OBJLoader();

      function init() {
        var container = document.getElementById("painter");

        renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(width, height);
        container.appendChild(renderer.domElement);

        scene = new THREE.Scene();

        camera = new THREE.PerspectiveCamera(45, width / height, 1, 1000);
        camera.position.z = 0;
        camera.lookAt(scene.position);

        //   controls = new THREE.OrbitControls(camera);
        //   controls.enableZoom = false;
        //   controls.enablePan = false;
        //   controls.mouseButtons.LEFT = THREE.MOUSE.RIGHT;
        //   controls.mouseButtons.RIGHT = THREE.MOUSE.LEFT;
        //   controls.update();

        //* Init AmbientLight
        // this.scene.add(new THREE.AmbientLight(0x3e3e3e));
        scene.add(new THREE.AmbientLight(0x3a3a3a));

        //* Init Light
        const light = new THREE.SpotLight(0xff0000, 1.5);
        light.position.set(0, 500, 2000);
        scene.add(light);

        // Plane model.
        var planeTexture = new THREE.Texture(
          undefined,
          THREE.UVMapping,
          THREE.MirroredRepeatWrapping,
          THREE.MirroredRepeatWrapping
        );
        planeTexture.anisotropy = renderer.capabilities.getMaxAnisotropy();
        var planeMaterial = new THREE.MeshBasicMaterial({
          map: planeTexture,
        });
        // var planeGeometry = new THREE.PlaneGeometry( 100, 100, 1, 1 );
        //   var planeGeometry = new THREE.TorusGeometry(20, 7, 32, 128);

        //   var mesh = new THREE.Mesh(planeGeometry, planeMaterial);
        //   mesh.position.z = -5;
        //   mesh.updateMatrix();
        //   scene.add(mesh);
        var mesh;

        loader.load(
          "https://res.cloudinary.com/nancloud/raw/upload/v1615570551/mi-casa/models/house_iewzzm.obj",
          function (object) {
            console.log("obj: ", object.children[0].geometry);
            var geo = new THREE.Geometry().fromBufferGeometry(
              object.children[0].geometry
            );
            mesh = new THREE.Mesh(geo, planeMaterial);
            mesh.position.z = window.innerWidth > 768 ? -6.5:-8.5;
            // mesh.rotation.y = -35*(Math.PI/180);
            // mesh.rotation.x = 25*(Math.PI/180);
            // mesh.rotation.x = 180 * Math.PI / 180;
            // mesh.rotation.y = -10 * Math.PI / 180;
            // mesh.updateMatrix();
            scene.add(mesh);
            painter = new THREE.TexturePainter(renderer, camera, mesh);
          }
        );

        window.addEventListener("resize", onWindowResize, false);
        window.addEventListener("click", changeColor, false);
      }

      function onWindowResize() {
        var aspect = window.innerWidth / window.innerHeight;

        camera.aspect = aspect;
        camera.updateProjectionMatrix();

        renderer.setSize(window.innerWidth, window.innerHeight);

        painter.resize();
      }

      function changeColor(event) {
        console.log("event: ", event.target.classList);
        if (painter) {
          let color = event.target.classList[1];
          console.log("color: ", color);

          switch (color) {
            case "red":
              // painter.changeColor("rgba(253, 123, 116, 1)");
              painter.changeColor("rgba(253, 107, 99, 1)");
              break;
            case "yellow":
              painter.changeColor("rgba(249, 178, 0, 1)");
              break;
            case "green":
              painter.changeColor("rgba(148, 234, 47, 1)");
              break;
            case "cyan":
              painter.changeColor("rgba(47, 234, 198, 1)");
              break;
            case "blue":
              painter.changeColor("rgba(77, 115, 239, 1)");
              break;
            case "pink":
              painter.changeColor("rgba(234, 131, 204, 1)");
              break;

            default:
              break;
          }

          // painter.changeColor(
          //   "rgba(" +
          //     Math.floor(Math.random() * 255) +
          //     "," +
          //     Math.floor(Math.random() * 255) +
          //     "," +
          //     Math.floor(Math.random() * 255) +
          //     ")"
          // );
        }
      }

      function render() {
        requestAnimationFrame(render);

        //   controls.update();

        renderer.autoClear = true;

        renderer.render(scene, camera);

        // needs to be after scene is rendered.
        //   painter.update();
      }

      init();
      render();
    },
    leave(done) {
      gsap.killTweensOf(this.$el);
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
#painter {
  opacity: 0;
}
</style>