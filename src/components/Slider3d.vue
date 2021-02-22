<template>
  <div class="slider"></div>
</template>

<script>
import * as THREE from "three";
import { gsap } from "gsap";
export default {
  mounted() {
    const container = this.$el;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      35, //* fov
      window.innerWidth / window.innerHeight, //* aspect ratio
      0.1, //* near
      1000 //* far
    );

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setClearColor(0xffffff);
    renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(renderer.domElement);

    const colors = [0x00ff00, 0xff0000, 0x0000ff, 0x00aa00, 0xaa0000, 0x0000aa];
    const objs = [];

    for (let index = 0; index < 6; index++) {
      const geometry = new THREE.BoxGeometry();
      const material = new THREE.MeshBasicMaterial({ color: colors[index] });
      objs[index] = new THREE.Mesh(geometry, material);
      objs[index].position.z = Math.sin(index) * 5;
      objs[index].position.x = Math.cos(index) * 5;
      scene.add(objs[index]);
    }

    const geometry = new THREE.TorusGeometry();
    const material = new THREE.MeshBasicMaterial({ color: 0x000000 });
    const dummy = new THREE.Mesh(geometry, material);
    dummy.position.x = objs[0].position.x;
    dummy.position.z = objs[0].position.z;
    camera.lookAt(dummy.position);
    // scene.add(dummy);

    // camera.position.y = 50;
    // camera.lookAt(dummy.position);

    const timeAnim = 5;
    let objIndex = 0;
    var clock = new THREE.Clock();

    window.addEventListener("resize", onWindowResize, false);

    function onWindowResize() {
      var aspect = window.innerWidth / window.innerHeight;

      camera.aspect = aspect;
      camera.updateProjectionMatrix();

      renderer.setSize(window.innerWidth, window.innerHeight);
    }

    function animate() {
      requestAnimationFrame(animate);
      if (clock.getElapsedTime() > timeAnim) {
        clock.stop();
        clock.start();
        if (objIndex == 5) {
          objIndex = 0;
        } else {
          objIndex++;
        }
        // gsap.to(camera.rotation, {
        //   duration: 2,
        //   y: camera.rotation.y + 1.0472,
        // });
        gsap.to(dummy.position, {
          duration: 2,
          x: objs[objIndex].position.x,
          z: objs[objIndex].position.z,
          onUpdate: function () {
            camera.lookAt(dummy.position);
          },
        });
      }
      renderer.render(scene, camera);
    }
    animate();
  },
};
</script>

<style lang="scss" scoped>
</style>