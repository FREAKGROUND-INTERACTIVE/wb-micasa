<template>
  <div id="painter"></div>
</template>

<script>
import * as THREE from "three";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader.js";
import "@/assets/utils/TexturePainterO";

export default {
  mounted() {
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
        "https://res.cloudinary.com/nancloud/raw/upload/v1613955545/mi-casa/models/camera-testPainter_si6c4b.obj",
        function (object) {
          console.log("obj: ", object.children[0].geometry);
          var geo = new THREE.Geometry().fromBufferGeometry(
            object.children[0].geometry
          );
          mesh = new THREE.Mesh(geo, planeMaterial);
          mesh.position.z = -7;
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

    function changeColor() {
      if (painter) {
        painter.changeColor(
          "rgba(" +
            Math.floor(Math.random() * 255) +
            "," +
            Math.floor(Math.random() * 255) +
            "," +
            Math.floor(Math.random() * 255) +
            ")"
        );
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
};
</script>

<style lang="scss" scoped>
</style>