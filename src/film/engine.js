import * as THREE from 'three';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';
import { OutputPass } from 'three/addons/postprocessing/OutputPass.js';
import { ShaderPass } from 'three/addons/postprocessing/ShaderPass.js';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import { FilmWorld } from './world.js';

const CinematicShader = {
  uniforms: {
    tDiffuse: { value: null },
    uTime: { value: 0 },
    uGrain: { value: 0.08 },
    uVignette: { value: 0.9 },
    uCA: { value: 0.0015 },
    uTint: { value: new THREE.Color(0x9bc4c9) },
    uExposure: { value: 1 },
  },
  vertexShader: `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: `
    uniform sampler2D tDiffuse;
    uniform float uTime;
    uniform float uGrain;
    uniform float uVignette;
    uniform float uCA;
    uniform vec3 uTint;
    uniform float uExposure;
    varying vec2 vUv;

    float random(vec2 p) {
      return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453123);
    }

    void main() {
      vec2 uv = vUv;
      vec2 dir = uv - 0.5;
      float dist = length(dir);
      float ca = uCA * (0.4 + dist * 2.4);
      vec3 col;
      col.r = texture2D(tDiffuse, uv + dir * ca).r;
      col.g = texture2D(tDiffuse, uv).g;
      col.b = texture2D(tDiffuse, uv - dir * ca).b;

      col = mix(col, col * uTint * 1.24, 0.16);
      col *= uExposure;

      float grain = random(uv * vec2(1920.0, 1080.0) + fract(uTime) * 91.7) - 0.5;
      col += grain * uGrain;

      float vig = smoothstep(1.02, 0.18, dist * 1.32);
      col *= mix(vec3(1.0), vec3(vig), uVignette * 0.62);

      gl_FragColor = vec4(col, 1.0);
    }
  `,
};

function buildEnvironment(renderer) {
  const pmrem = new THREE.PMREMGenerator(renderer);
  const room = new RoomEnvironment();
  const env = pmrem.fromScene(room, 0.04).texture;
  room.dispose?.();
  pmrem.dispose();
  return env;
}

export class FilmEngine {
  constructor(canvas, { mobile = false, quality = 'high' } = {}) {
    this.canvas = canvas;
    this.mobile = mobile;
    this.quality = quality;
    this.progress = 0;
    this.target = 0;
    this.pointer = new THREE.Vector2();
    this.smoothPointer = new THREE.Vector2();
    this.running = false;
    this.frame = 0;
    this.fpsTime = 0;
    this.fpsFrames = 0;
    this.qualityLevel = quality === 'low' ? 0 : 2;
    this.activeScene = 'hero';
  }

  async init() {
    const renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      antialias: false,
      alpha: false,
      powerPreference: 'high-performance',
      stencil: false,
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, this.mobile ? 1.5 : 1.8));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1;
    renderer.setClearColor(0x050a0b, 1);
    this.renderer = renderer;

    const scene = new THREE.Scene();
    this.scene = scene;
    const camera = new THREE.PerspectiveCamera(48, window.innerWidth / window.innerHeight, 0.08, 900);
    camera.position.set(0, 2.5, 24);
    this.camera = camera;

    await document.fonts?.ready?.catch?.(() => {});

    const envMap = buildEnvironment(renderer);
    const world = new FilmWorld({
      scene,
      camera,
      renderer,
      envMap,
      quality: this.quality,
      mobile: this.mobile,
    });
    world.pointer = this.smoothPointer;
    this.world = world;

    const composer = new EffectComposer(renderer);
    composer.setSize(window.innerWidth, window.innerHeight);
    const renderPass = new RenderPass(scene, camera);
    composer.addPass(renderPass);
    const bloom = new UnrealBloomPass(
      new THREE.Vector2(window.innerWidth, window.innerHeight),
      this.mobile ? 0.5 : 0.68,
      0.72,
      0.82,
    );
    this.bloom = bloom;
    composer.addPass(bloom);
    composer.addPass(new OutputPass());
    const cinematic = new ShaderPass(CinematicShader);
    this.cinematic = cinematic;
    composer.addPass(cinematic);
    this.composer = composer;

    this.handleResize = this.handleResize.bind(this);
    window.addEventListener('resize', this.handleResize);
    this.running = true;
    this.world.update(0, 0, 0.016);
    composer.render();
  }

  handleResize() {
    if (!this.renderer) return;
    const width = window.innerWidth;
    const height = window.innerHeight;
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setPixelRatio(
      Math.min(window.devicePixelRatio || 1, this.mobile ? 1.5 : this.qualityLevel < 2 ? 1.3 : 1.8),
    );
    this.renderer.setSize(width, height);
    this.composer?.setSize(width, height);
    this.world?.update(this.progress, performance.now() / 1000, 0.016);
  }

  setProgress(value) {
    this.target = THREE.MathUtils.clamp(value, 0, 1);
  }

  setPointer(x, y) {
    this.pointer.set(THREE.MathUtils.clamp(x, -1, 1), THREE.MathUtils.clamp(y, -1, 1));
  }

  setScene(id) {
    this.activeScene = id;
  }

  setTiming(timing) {
    this.world?.setTiming(timing);
  }

  downgrade() {
    if (this.qualityLevel <= 0) return;
    this.qualityLevel -= 1;
    if (this.qualityLevel === 1) {
      this.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.4));
      this.renderer.setSize(window.innerWidth, window.innerHeight);
      this.composer.setSize(window.innerWidth, window.innerHeight);
      if (this.bloom) this.bloom.strength *= 0.55;
      this.cinematic.uniforms.uGrain.value = 0.06;
    } else if (this.qualityLevel === 0) {
      this.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.15));
      this.renderer.setSize(window.innerWidth, window.innerHeight);
      this.composer.setSize(window.innerWidth, window.innerHeight);
      if (this.bloom) this.bloom.enabled = false;
      this.cinematic.uniforms.uGrain.value = 0.035;
    }
  }

  tick(time, deltaMs) {
    if (!this.running || !this.renderer || document.hidden) return;
    const delta = Math.min(deltaMs || 16.7, 80);
    this.progress += (this.target - this.progress) * (1 - Math.exp(-delta / 105));
    this.smoothPointer.lerp(this.pointer, 1 - Math.exp(-delta / 160));

    const state = this.world.update(
      this.progress,
      time,
      delta / 1000,
    );
    const grade = state.grade;
    this.renderer.toneMappingExposure += (grade.exposure - this.renderer.toneMappingExposure) * 0.06;
    this.cinematic.uniforms.uTime.value = time;
    this.cinematic.uniforms.uGrain.value = grade.grain * (this.qualityLevel === 0 ? 0.45 : 1);
    this.cinematic.uniforms.uCA.value = grade.ca;
    this.cinematic.uniforms.uTint.value.copy(grade.tint);
    this.cinematic.uniforms.uExposure.value = 1;
    if (this.bloom && this.bloom.enabled) {
      this.bloom.strength += (grade.bloom - this.bloom.strength) * 0.05;
    }
    this.composer.render();

    this.fpsFrames += 1;
    this.fpsTime += delta;
    if (this.fpsTime > 2400) {
      const fps = (this.fpsFrames * 1000) / this.fpsTime;
      if (fps < 43) this.downgrade();
      this.fpsFrames = 0;
      this.fpsTime = 0;
    }
  }

  destroy() {
    this.running = false;
    window.removeEventListener('resize', this.handleResize);
    this.composer?.dispose?.();
    this.renderer?.dispose?.();
  }
}
