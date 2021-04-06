<template>
  <div id="home3d" @mousemove="onMouseMove"></div>
</template>

<script>
import * as THREE from "three";
// import Stats from "three/examples/jsm/libs/stats.module.js";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader.js";
// import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader.js";
import gsap from "gsap";
import fragmentShader from "raw-loader!glslify-loader!@/assets/glsl/fragmentShader.glsl";

import { state, lang, mutations } from "@/state";
import vertexShader from "raw-loader!glslify-loader!@/assets/glsl/vertexShader.glsl";

export default {
  data() {
    return {
      animReq: null, //* requestAnimationFrame variable for scene loop
      mouse: null,
    };
  },
  mounted() {
    this.initAnim();
  },
  beforeDestroy() {
    cancelAnimationFrame(this.animReq);
    window.removeEventListener("mousemove", this.onMouseMove, false);
  },
  methods: {
    initAnim() {
      //* INIT VARIABLES
      let container;
      let renderer;
      let transition;
      let show = true;
      // let stats;

      //* THREEJS Mouse variable
      this.mouse = new THREE.Vector2(0, 0);

      //* Init THREE Clock
      const clock = new THREE.Clock();

      //* Instantiate the loader
      const loader = new OBJLoader();

      let that = this;

      /**
       ** INIT FUNCTION
       *? init function for initialize THREE basics
       */
      const init = () => {
        let that = this;
        //* Init Container
        container = document.getElementById("home3d");

        //* Init Renderer
        renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setClearColor(0xffffff, 0);
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(window.innerWidth, window.innerHeight);
        container.appendChild(renderer.domElement);

        //* Init stats
        // stats = new Stats();
        // container.appendChild(stats.dom);

        //* Init Scenes
        const sceneA = new FXScene(8, 35, 0xdfdfdf, true, that);
        const sceneB = new FXScene(8, 35, 0xdfdfdf, false, that);

        // const loaderFBX = new FBXLoader();
        // loaderFBX.load(
        //   "https://res.cloudinary.com/nancloud/raw/upload/v1613609196/mi-casa/models/animations/claqueta_Anim_sxtqd5.fbx",
        //   function (object) {
        //     console.log("fbx: ", object);
        //     // sceneA.addObj(object.clone(), false);
        //     // sceneB.addObj(object, false);
        //   }
        // );

        //* Imported OBJ variable
        let obj;
        let obj2;

        //* load a .OBJ resource from provided URL synchronously
        loader.load(
          "https://res.cloudinary.com/micasastudios/raw/upload/v1616971544/WEBPAGE/HOME/MODEL/marco_egh4p8.obj",
          function (object) {
            obj2 = object;
            sceneA.addObj(obj2, true);
            sceneB.addObj(obj2.clone(), true);
          }
        );

        //* load a .OBJ resource from provided URL synchronously
        loader.load(
          "https://res.cloudinary.com/micasastudios/raw/upload/v1616971434/WEBPAGE/HOME/MODEL/micasalanding_12_mv91k5.obj",
          function (object) {
            obj = object;
            sceneA.addObj(obj, false);
            sceneB.addObj(obj.clone(), false);
            // console.log("obj loaded");
            mutations.loadingCharge(100);
          },
          // function (xhr) {
          //   // console.log((xhr.loaded/1803683)*100 + "% loaded", xhr);
          //   mutations.loadingCharge((xhr.loaded / 1803683) * 100);
          // }
        );

        //* init Transition
        transition = new Transition(sceneA, sceneB);

        window.addEventListener("resize", transition.onWindowResize, false);
      };

      /**
       ** animate
       *? animate function for render loop
       */
      const animate = () => {
        this.animReq = requestAnimationFrame(animate);
        render();
        // stats.update();
        if (show) {
          show = false;
          gsap.to(this.$el, {
            duration: 0.5,
            opacity: 1,
          });
        }
      };

      /**
       ** render
       *? ---------------
       */
      const render = () => {
        transition.render(clock.getDelta());
      };

      /**
       ** FXScene
       *? create scene with camera and box mesh popo pipi juan
       * @param cameraZ camera position in Z axis
       * @param fov camera field of view
       * @param clearColor color for setClearColor renderer
       * @param sceneID Id for diferent scene
       */
      function FXScene(cameraZ, fov, clearColor, sceneID, scope) {
        this.clearColor = clearColor;

        //* Init scene Camera
        this.camera = new THREE.PerspectiveCamera(
          fov,
          window.innerWidth / window.innerHeight,
          0.1,
          100
        );
        this.camera.position.z = cameraZ;
        this.camera.position.y = 0.1;

        //* Setup Scene
        this.scene = new THREE.Scene();
        this.scene.background = null; //new THREE.Color(0xff0000);

        //* Init AmbientLight
        // this.scene.add(new THREE.AmbientLight(0x3e3e3e));
        this.scene.add(new THREE.AmbientLight(0x3a3a3a));

        //* Init Light
        const light = new THREE.PointLight(0x808080, 1.5);
        light.position.set(0, 500, 2000);
        this.scene.add(light);

        //* create meshes
        this.mesh;
        this.mesh2;

        //* Create mixers
        // this.mixers = [];

        //* RAYCASTING

        const raycaster = new THREE.Raycaster(); // create once

        let goTo = "";
        const goToPage = function () {
          document.body.style.cursor = "default";
          window.removeEventListener("mousedown", goToPage, false);
          if (sceneID && goTo != "") {
            scope.$router.push({ name: goTo });
            document.body.style.cursor = "default";
          }
        };

        const renderTargetParameters = {
          minFilter: THREE.LinearFilter,
          magFilter: THREE.LinearFilter,
          format: THREE.RGBAFormat,
        };
        this.fbo = new THREE.WebGLMultisampleRenderTarget(
          window.innerWidth,
          window.innerHeight,
          renderTargetParameters
        );

        this.render = (delta, rtt) => {
          // renderer.setClearColor(this.clearColor);
          // this.mesh.rotation.x = 45;

          // if (this.mixers[0]) {
          //   this.mixers[0].update(clock.getDelta());
          // }
          if (this.mesh && state.inHome) {
            raycaster.setFromCamera(that.mouse, this.camera);
            const intersects = raycaster.intersectObjects(this.mesh.children);
            // console.log("intersects: ", intersects);

            if (intersects.length == 0) {
              window.addEventListener("mousedown", goToPage, false);
              goTo = "";
              document.body.style.cursor = "default";
              mutations.setTitle("micasa");
              gsap.to(this.mesh.children[0].scale, {
                duration: 1,
                x: 1,
                y: 1,
              });
              gsap.to(this.mesh.children[1].scale, {
                duration: 1,
                x: 1,
                y: 1,
              });
              gsap.to(this.mesh.children[3].scale, {
                duration: 1,
                x: 1,
                y: 1,
              });
            }
            for (let i = 0; i < intersects.length; i++) {
              if (intersects[i].object.name == "Claqueta_Mesh") {
                goTo = "Agency";
                gsap.to(this.mesh.children[0].scale, {
                  duration: 1,
                  x: 1.1,
                  y: 1.1,
                });
                // document.body.style.cursor = "pointer";
                if (state.title != "Agency" && state.title != "Agency" ) {
                  mutations.setTitle(lang.data.titles[0]);
                  
                }
              } else {
                // document.body.style.cursor = "default";
                gsap.to(this.mesh.children[0].scale, {
                  duration: 1,
                  x: 1,
                  y: 1,
                });
              }

              if (intersects[i].object.name == "Camera_Mesh.001") {
                goTo = "Studio";
                gsap.to(intersects[i].object.scale, {
                  duration: 1,
                  x: 1.1,
                  y: 1.1,
                });
                // document.body.style.cursor = "pointer";
                if (state.title != "Studio" && state.title != "Estudio") {
                  mutations.setTitle(lang.data.titles[1]);
                }
              } else {
                // document.body.style.cursor = "default";
                gsap.to(this.mesh.children[1].scale, {
                  duration: 1,
                  x: 1,
                  y: 1,
                });
              }

              if (intersects[i].object.name == "Light_Mesh.002") {
                goTo = "Powered";
                gsap.to(intersects[i].object.scale, {
                  duration: 1,
                  x: 1.1,
                  y: 1.1,
                });
                // document.body.style.cursor = "pointer";
                if (state.title != "Powered") {
                  mutations.setTitle(lang.data.titles[2]);
                }
              } else {
                // document.body.style.cursor = "default";
                gsap.to(this.mesh.children[3].scale, {
                  duration: 1,
                  x: 1,
                  y: 1,
                });
              }

              if (
                intersects[i].object.name == "Claqueta_Mesh" ||
                intersects[i].object.name == "Camera_Mesh.001" ||
                intersects[i].object.name == "Light_Mesh.002"
              ) {
                document.body.style.cursor = "pointer";
              } else {
                document.body.style.cursor = "default";
                goTo = "";
                mutations.setTitle("micasa");
              }
            }
          }

          // console.log("inter: ",sceneID, intersects[0], that.mouse.y);

          if (rtt) {
            renderer.setRenderTarget(this.fbo);
            renderer.clear();
            renderer.render(this.scene, this.camera);
          } else {
            renderer.setRenderTarget(null);
            renderer.render(this.scene, this.camera);
          }
        };

        this.onWindowResize = () => {
          var aspect = window.innerWidth / window.innerHeight;

          this.camera.aspect = aspect;
          this.camera.updateProjectionMatrix();

          renderer.setSize(window.innerWidth, window.innerHeight);
        };

        this.addObj = (obj, marco) => {
          // claqueta, camara, DJ, light, plant, mic
          const urls = [
            "https://res.cloudinary.com/micasastudios/image/upload/v1616971721/WEBPAGE/HOME/MODEL/TEXTURES/01SALMON_qsrow2.jpg",
            "https://res.cloudinary.com/micasastudios/image/upload/v1616971721/WEBPAGE/HOME/MODEL/TEXTURES/02AQUA_ln8dxe.jpg",
            "https://res.cloudinary.com/micasastudios/image/upload/v1616971721/WEBPAGE/HOME/MODEL/TEXTURES/04_ra5nwe.jpg",
            "https://res.cloudinary.com/micasastudios/image/upload/v1616971721/WEBPAGE/HOME/MODEL/TEXTURES/03LAVENDER_hlk8yn.jpg",
            "https://res.cloudinary.com/micasastudios/image/upload/v1616971721/WEBPAGE/HOME/MODEL/TEXTURES/06_njcvov.jpg",
            "https://res.cloudinary.com/micasastudios/image/upload/v1617734110/WEBPAGE/HOME/MODEL/TEXTURES/05_mlx9jw.jpg",
          ];
          if (marco == true) {
            obj.children[0].material = new THREE.MeshPhongMaterial({
              color: 0xffffff,
            });
            this.mesh2 = obj;
            this.scene.add(this.mesh2);
            this.mesh2.position.y = 0.05;
          } else {
            obj.children.forEach((mesh, index) => {
              const texture = new THREE.TextureLoader().load(urls[index]);
              mesh.material = sceneID
                ? new THREE.MeshStandardMaterial({ map: texture })
                : new THREE.MeshPhongMaterial({ color: 0xffffff });
              
              if (mesh.name == "Claqueta_Mesh") {
                mesh.rotation.y = 0.1;
              }
            });

            this.mesh = obj;
            this.mesh.position.y = 0.05;
            this.scene.add(this.mesh);

            if (window.innerWidth <= 768) {
              this.mesh.position.z = -5;
              this.mesh2.position.z = -5;
            }

            // if (!sceneID) {
            //   setTimeout(() => {
            //     console.log("mesh anim: ", this.mesh);
            //     const mixer = new THREE.AnimationMixer(this.mesh);
            //     // this.mesh.animations.forEach((animation) => {
            //     //   const action = mixer.clipAction(animation);
            //     //   console.log(".getEffectiveTimeScale: ", action.getEffectiveTimeScale() );
            //     //   action.setDuration(0.05);
            //     //   action.play();
            //     // });
            //     const action = mixer.clipAction(this.mesh.animations[0]);
            //     const action2 = mixer.clipAction(this.mesh.animations[1]);
            //     action2.setDuration(0.02);
            //     action2.play();
            //     action.setDuration(0.02);
            //     action.play();
            //     this.mixers.push(mixer);
            //   }, 2000);
            // }
          }
        };
      }

      function Transition(sceneA, sceneB) {
        this.scene = new THREE.Scene();
        this.scene.background = null;
        this.cameraOrtho = new THREE.OrthographicCamera(
          window.innerWidth / -2,
          window.innerWidth / 2,
          window.innerHeight / 2,
          window.innerHeight / -2,
          -10,
          10
        );

        this.quadmaterial = new THREE.ShaderMaterial({
          uniforms: {
            u_image: { type: "t", value: null },
            u_imagehover: { type: "t", value: null },
            u_time: { value: 0 },
            u_mouse: {
              value: {
                x: 0,
                y: 0,
              },
            },
            u_res: {
              value: new THREE.Vector2(window.innerWidth, window.innerHeight),
            },
            u_radio: { value: 0 },
          },
          vertexShader: vertexShader,
          fragmentShader: fragmentShader,
          defines: {
            PR: window.devicePixelRatio.toFixed(1),
          },
        });

        const quadgeometry = new THREE.PlaneBufferGeometry(
          window.innerWidth,
          window.innerHeight
        );
        this.quad = new THREE.Mesh(quadgeometry, this.quadmaterial);
        this.scene.add(this.quad);

        //* Link both scenes and their FBOs
        this.sceneA = sceneA;
        this.sceneB = sceneB;
        //   this.quadmaterial.uniforms.tDiffuse1.value = this.sceneA.fbo.texture;
        //   this.quadmaterial.uniforms.tDiffuse2.value = this.sceneB.fbo.texture;
        this.quadmaterial.uniforms.u_imagehover.value = this.sceneA.fbo.texture;
        this.quadmaterial.uniforms.u_image.value = this.sceneB.fbo.texture;

        this.needChange = false;

        this.render = (delta) => {
          // this.quadmaterial.uniforms.mixRatio.value = 0.5;
          this.quadmaterial.uniforms.u_mouse.value.x = window.innerWidth > 768? that.mouse.x:0;
          this.quadmaterial.uniforms.u_mouse.value.y = window.innerWidth > 768? that.mouse.y:0; //((that.mouse.y - 0) * (0 - 1)) / (1 - 0) + 1;
          this.quadmaterial.uniforms.u_time.value += 0.001;
          if( state.inHome && this.quadmaterial.uniforms.u_radio.value != 0.06) {
            gsap.to(this.quadmaterial.uniforms.u_radio, {
              duration: 3,
              value: window.innerWidth > 768 ? 0.06: 0.4,
            });
          }

          this.sceneA.render(delta, true);
          this.sceneB.render(delta, true);
          renderer.setRenderTarget(null);
          renderer.clear();
          renderer.render(this.scene, this.cameraOrtho);
        };

        this.onWindowResize = () => {
          var aspect = window.innerWidth / window.innerHeight;

          this.cameraOrtho.aspect = aspect;
          this.cameraOrtho.updateProjectionMatrix();

          renderer.setSize(window.innerWidth, window.innerHeight);

          this.sceneA.onWindowResize();
          this.sceneB.onWindowResize();
        };
      }

      //* call main functions for THREE behavior
      init();
      animate();
      window.addEventListener("mousemove", that.onMouseMove, false);
    },
    onMouseMove(event) {
      this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
      // gsap.to(this.mouse, {
      //   duration: 0.5,
      //   x: (event.clientX / window.innerWidth) * 2 - 1,
      //   y: -(event.clientY / window.innerHeight) * 2 + 1,
      // });
    },
    leave() {
      document.body.style.cursor = "default";
      gsap.to(this.$el, {
        duration: 0.5,
        opacity: "0",
      });
    },
  },
};
</script>

<style lang="scss" scoped>
#home3d {
  position: fixed;
  width: 100%;
  height: 100%;
}
</style>