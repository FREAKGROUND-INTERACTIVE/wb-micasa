<template>
  <div id="home3d" @mousemove="onMouseMove"></div>
</template>

<script>
import * as THREE from "three";
import Stats from "three/examples/jsm/libs/stats.module.js";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader.js";
import gsap from "gsap";
import fragmentShader from "raw-loader!glslify-loader!@/assets/glsl/fragmentShader.glsl";
import vertexShader from "raw-loader!glslify-loader!@/assets/glsl/vertexShader.glsl";

export default {
  data() {
    return {
      animReq: null, //* requestAnimationFrame variable for scene loop
      mouse: null,
    };
  },
  mounted() {
    //* INIT VARIABLES
    let container;
    let renderer;
    let transition;
    let stats;

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
      //* Init Container
      container = document.getElementById("home3d");

      //* Init Renderer
      renderer = new THREE.WebGLRenderer({ antialias: true });
      renderer.setPixelRatio(window.devicePixelRatio);
      renderer.setSize(window.innerWidth, window.innerHeight);
      container.appendChild(renderer.domElement);

      //* Init stats
      stats = new Stats();
      container.appendChild(stats.dom);

      //* Init Scenes
      const sceneA = new FXScene(12, 35, 0xdfdfdf, true);
      const sceneB = new FXScene(12, 35, 0xdfdfdf, false);

      //* Imported OBJ variable
      let obj, obj2;

      //* load a .OBJ resource from provided URL synchronously
      loader.load(
        "https://res.cloudinary.com/nancloud/raw/upload/v1612211681/mi-casa/models/micasa_marco_xz72ok.obj",
        function (object) {
          obj2 = object;
          sceneA.addObj(obj2, true);
          sceneB.addObj(obj2.clone(), true);
        }
      );

      //* load a .OBJ resource from provided URL synchronously
      loader.load(
        "https://res.cloudinary.com/nancloud/raw/upload/v1612210946/mi-casa/models/micasa_collage_qu6pwi.obj",
        function (object) {
          obj = object;
          sceneA.addObj(obj, false);
          sceneB.addObj(obj.clone(), false);
        }
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
      stats.update();
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
    function FXScene(cameraZ, fov, clearColor, sceneID) {
      this.clearColor = clearColor;

      //* Init scene Camera
      this.camera = new THREE.PerspectiveCamera(
        fov,
        window.innerWidth / window.innerHeight,
        0.1,
        10000
      );
      this.camera.position.z = cameraZ;

      //* Setup Scene
      this.scene = new THREE.Scene();

      //* Init AmbientLight
      // this.scene.add(new THREE.AmbientLight(0x3e3e3e));
      this.scene.add(new THREE.AmbientLight(0x3a3a3a));

      //* Init Light
      const light = new THREE.SpotLight(0x808080, 1.5);
      light.position.set(0, 500, 2000);
      this.scene.add(light);

      //* Init Box mesh
      const defaultMaterial = new THREE.MeshPhongMaterial({
        color: sceneID ? 0xff00ff : 0xcccccc,
        flatShading: true,
        vertexColors: true,
      });
      this.mesh = new THREE.Mesh(new THREE.TorusGeometry(), defaultMaterial);
      this.mesh2 = new THREE.Mesh(new THREE.TorusGeometry(), defaultMaterial);
      // this.scene.add(this.mesh);

      const renderTargetParameters = {
        minFilter: THREE.LinearFilter,
        magFilter: THREE.LinearFilter,
        format: THREE.RGBFormat,
      };
      this.fbo = new THREE.WebGLRenderTarget(
        window.innerWidth,
        window.innerHeight,
        renderTargetParameters
      );

      this.render = (delta, rtt) => {
        renderer.setClearColor(this.clearColor);
        // this.mesh.rotation.x = 45;
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
        if (marco == true) {
          obj.children[0].material = new THREE.MeshPhongMaterial({
            color: 0xffffff,
          });
          this.mesh2 = obj;
          this.scene.add(this.mesh2);
          this.mesh2.position.y = 0.05;
        } else {
          obj.children.forEach((mesh) => {
            mesh.material = sceneID
              ? new THREE.MeshNormalMaterial()
              : new THREE.MeshPhongMaterial({ color: 0xffffff });
          });
          this.mesh = obj;
          this.scene.add(this.mesh);
          this.mesh.position.y = 0.05;
        }
      };
    }

    function Transition(sceneA, sceneB) {
      this.scene = new THREE.Scene();
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
              x: 0.5,
              y: 0.5,
            },
          },
          u_res: {
            value: new THREE.Vector2(window.innerWidth, window.innerHeight),
          },
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
        this.quadmaterial.uniforms.u_mouse.value.x = that.mouse.x;
        this.quadmaterial.uniforms.u_mouse.value.y =
          ((that.mouse.y - 0) * (0 - 1)) / (1 - 0) + 1;
        this.quadmaterial.uniforms.u_time.value += 0.001;

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
  },
  beforeDestroy() {
    cancelAnimationFrame(this.animReq);
  },
  methods: {
    onMouseMove(event) {
      gsap.to(this.mouse, {
        duration: 0.5,
        x: (event.clientX / window.innerWidth) * 2 - 1,
        y: -(event.clientY / window.innerHeight) * -2,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
#home {
  position: fixed;
  width: 100%;
  height: 100%;
}
</style>