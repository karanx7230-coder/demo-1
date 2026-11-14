import * as THREE from 'three';
import { createCar } from './car.js';
import {
  makeGlowTexture,
  makeStreakTexture,
  makeTextTexture,
  makeSignTexture,
  makeLabelTexture,
} from './textures.js';
import { services, destinations, testimonials, sceneTiming } from './data.js';

const clamp = THREE.MathUtils.clamp;
const lerp = THREE.MathUtils.lerp;
const smoothstep = THREE.MathUtils.smoothstep;

function rng(seed) {
  let s = seed;
  return () => {
    s = (s * 1664525 + 1013904223) % 4294967296;
    return s / 4294967296;
  };
}

const ROAD_POINTS = [
  [0, 0, 34], [0, 0, -20], [0.8, 0, -60], [-1.2, 0, -100], [0.5, 0, -140],
  [-0.6, 0, -180], [0, 0, -220], [0, 0, -270], [0, 0, -320], [2.5, 0, -370],
  [-2, 0, -420], [2.8, 0, -470], [-2.4, 0, -520], [1.2, 0, -570], [0, 0, -620],
  [-1, 0, -680], [0, 0, -730], [0, 0, -780], [-1, 0, -830], [0, 0, -880],
  [0, 0, -930], [0, 0, -985],
];

const CAMERA_POINTS = [
  [0, 2.5, 24], [0, 2.4, 10], [0.5, 2.4, -8], [-0.8, 2.8, -32], [1.2, 3.5, -56],
  [2, 5, -82], [-1.4, 5.4, -108], [0.7, 4.2, -136], [0.2, 3.3, -166], [-0.3, 3, -202],
  [-0.2, 3, -242], [0, 3.4, -282], [0, 3.8, -320], [1.6, 4.3, -356], [3.2, 4.9, -400],
  [-2.2, 5.6, -450], [2.6, 6.2, -500], [-2.4, 5.4, -550], [0.8, 4.4, -600], [0, 3.6, -650],
  [-1, 3.3, -700], [0.4, 3.2, -750], [0, 3.2, -800], [-0.8, 3.2, -850], [0, 3.3, -900],
  [0, 3.3, -950], [0, 3.2, -984],
];

const CAMERA_KEYS = [
  [0, 0], [0.13, 0.055], [0.33, 0.21], [0.5, 0.31], [0.67, 0.56],
  [0.8, 0.72], [0.89, 0.87], [1, 1],
];

const GRADES = [
  {
    p: 0, top: 0x06131d, horizon: 0x1a3d4c, bottom: 0x050a0b, fog: 0x122a32,
    density: 0.017, sun: 0x8db6d2, sunDir: [0.6, 0.1, 0.5], key: 0x93b9d9,
    keyIntensity: 1.35, ambientSky: 0x315d5c, ambientGround: 0x080d0e, ambientIntensity: 1.1,
    exposure: 0.95, tint: 0x9bc4c9, bloom: 0.7, grain: 0.09, ca: 0.0016,
  },
  {
    p: 0.22, top: 0x173c4a, horizon: 0x91aba6, bottom: 0x0a1415, fog: 0x7f9b98,
    density: 0.011, sun: 0xffd8a0, sunDir: [0.8, 0.35, 0.4], key: 0xffe1b5,
    keyIntensity: 2.1, ambientSky: 0x8fa8a1, ambientGround: 0x1a2222, ambientIntensity: 1.15,
    exposure: 1.05, tint: 0xc7d2c4, bloom: 0.5, grain: 0.07, ca: 0.0012,
  },
  {
    p: 0.33, top: 0x020708, horizon: 0x0b1a1b, bottom: 0x020404, fog: 0x071012,
    density: 0.038, sun: 0x5c8f9c, sunDir: [0.2, 0.5, 0.3], key: 0x7fb1bb,
    keyIntensity: 0.55, ambientSky: 0x203634, ambientGround: 0x020303, ambientIntensity: 0.7,
    exposure: 0.92, tint: 0x8fb9b6, bloom: 0.8, grain: 0.1, ca: 0.0024,
  },
  {
    p: 0.48, top: 0x020607, horizon: 0x071314, bottom: 0x010202, fog: 0x050b0c,
    density: 0.03, sun: 0x7ea5ad, sunDir: [0.2, 0.5, 0.3], key: 0x9cc5c6,
    keyIntensity: 0.7, ambientSky: 0x24413f, ambientGround: 0x020303, ambientIntensity: 0.75,
    exposure: 0.95, tint: 0xa9ceca, bloom: 0.85, grain: 0.1, ca: 0.002,
  },
  {
    p: 0.55, top: 0x58787d, horizon: 0xd3d0bd, bottom: 0x182322, fog: 0xb3b7ac,
    density: 0.014, sun: 0xffe8c4, sunDir: [0.4, 0.4, 0.4], key: 0xffefd2,
    keyIntensity: 2, ambientSky: 0xc6d3cb, ambientGround: 0x2b3430, ambientIntensity: 1.2,
    exposure: 1.06, tint: 0xd7ddcf, bloom: 0.45, grain: 0.06, ca: 0.001,
  },
  {
    p: 0.7, top: 0x04121b, horizon: 0x12343f, bottom: 0x040a0c, fog: 0x0b2530,
    density: 0.022, sun: 0x6fb6d2, sunDir: [-0.3, 0.3, 0.35], key: 0x78b7cf,
    keyIntensity: 0.85, ambientSky: 0x1d4a56, ambientGround: 0x03090b, ambientIntensity: 0.8,
    exposure: 0.92, tint: 0x8fc9d2, bloom: 0.9, grain: 0.11, ca: 0.003,
  },
  {
    p: 0.88, top: 0x021019, horizon: 0x0d3036, bottom: 0x020708, fog: 0x061c22,
    density: 0.026, sun: 0x5f9ca9, sunDir: [-0.2, 0.2, 0.4], key: 0x6fa7b5,
    keyIntensity: 0.7, ambientSky: 0x173f46, ambientGround: 0x020708, ambientIntensity: 0.65,
    exposure: 0.9, tint: 0x8ec3c8, bloom: 1, grain: 0.12, ca: 0.0032,
  },
  {
    p: 1, top: 0x2b3f47, horizon: 0xf0a75c, bottom: 0x23160e, fog: 0xda9b64,
    density: 0.016, sun: 0xffb35e, sunDir: [0.1, 0.05, 0.7], key: 0xffbd79,
    keyIntensity: 2.4, ambientSky: 0x7a7262, ambientGround: 0x2a1c13, ambientIntensity: 1,
    exposure: 1.12, tint: 0xe8c19a, bloom: 0.9, grain: 0.08, ca: 0.0014,
  },
];

function sampleGrade(p) {
  let a = GRADES[0];
  let b = GRADES[GRADES.length - 1];
  for (let i = 0; i < GRADES.length - 1; i += 1) {
    if (p >= GRADES[i].p && p <= GRADES[i + 1].p) {
      a = GRADES[i];
      b = GRADES[i + 1];
      break;
    }
  }
  const t = clamp((p - a.p) / Math.max(0.0001, b.p - a.p), 0, 1);
  const e = t * t * (3 - 2 * t);
  const color = (ka) => new THREE.Color(a[ka]).lerp(new THREE.Color(b[ka]), e);
  const num = (ka) => lerp(a[ka], b[ka], e);
  return {
    top: color('top'), horizon: color('horizon'), bottom: color('bottom'),
    fog: color('fog'), density: num('density'), sun: color('sun'),
    sunDir: new THREE.Vector3(
      lerp(a.sunDir[0], b.sunDir[0], e),
      lerp(a.sunDir[1], b.sunDir[1], e),
      lerp(a.sunDir[2], b.sunDir[2], e),
    ).normalize(),
    key: color('key'), keyIntensity: num('keyIntensity'),
    ambientSky: color('ambientSky'), ambientGround: color('ambientGround'),
    ambientIntensity: num('ambientIntensity'), exposure: num('exposure'),
    tint: color('tint'), bloom: num('bloom'), grain: num('grain'), ca: num('ca'),
  };
}

function mapProgressToT(p) {
  for (let i = 0; i < CAMERA_KEYS.length - 1; i += 1) {
    const [pa, ta] = CAMERA_KEYS[i];
    const [pb, tb] = CAMERA_KEYS[i + 1];
    if (p >= pa && p <= pb) {
      const t = (p - pa) / Math.max(0.0001, pb - pa);
      return lerp(ta, tb, t);
    }
  }
  return 1;
}

function makeSky() {
  const uniforms = {
    uTop: { value: new THREE.Color(0x06131d) },
    uHorizon: { value: new THREE.Color(0x1a3d4c) },
    uBottom: { value: new THREE.Color(0x050a0b) },
    uSun: { value: new THREE.Color(0x8db6d2) },
    uSunDir: { value: new THREE.Vector3(0.6, 0.1, 0.5).normalize() },
    uHaze: { value: 0.7 },
    uSunPower: { value: 220 },
  };
  const material = new THREE.ShaderMaterial({
    uniforms,
    side: THREE.BackSide,
    depthWrite: false,
    fog: false,
    vertexShader: `
      varying vec3 vPos;
      void main() {
        vPos = position;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      uniform vec3 uTop;
      uniform vec3 uHorizon;
      uniform vec3 uBottom;
      uniform vec3 uSun;
      uniform vec3 uSunDir;
      uniform float uHaze;
      uniform float uSunPower;
      varying vec3 vPos;
      void main() {
        vec3 dir = normalize(vPos);
        float h = dir.y;
        vec3 col = mix(uHorizon, uTop, smoothstep(0.0, 0.72, h));
        col = mix(uBottom, col, smoothstep(-0.28, 0.015, h));
        float sun = pow(max(dot(dir, normalize(uSunDir)), 0.0), uSunPower);
        float halo = pow(max(dot(dir, normalize(uSunDir)), 0.0), 7.0);
        col += uSun * sun * 1.8;
        col += uSun * halo * 0.18 * uHaze;
        float band = smoothstep(0.09, 0.0, abs(h - 0.015));
        col += uHorizon * band * 0.16;
        gl_FragColor = vec4(col, 1.0);
      }
    `,
  });
  const sky = new THREE.Mesh(new THREE.SphereGeometry(700, 40, 24), material);
  sky.frustumCulled = false;
  return sky;
}

function makeRoad(curve, quality) {
  const group = new THREE.Group();
  const segments = quality === 'low' ? 260 : 420;
  const positions = [];
  const uvs = [];
  const indices = [];
  const width = 6.1;
  const half = width / 2;
  for (let i = 0; i <= segments; i += 1) {
    const t = i / segments;
    const p = curve.getPointAt(t);
    const tangent = curve.getTangentAt(Math.min(t, 0.9999));
    const side = new THREE.Vector3(-tangent.z, 0, tangent.x).normalize();
    const left = p.clone().addScaledVector(side, half);
    const right = p.clone().addScaledVector(side, -half);
    positions.push(left.x, 0.01, left.z, right.x, 0.01, right.z);
    uvs.push(0, t * 90, 1, t * 90);
    if (i < segments) {
      const a = i * 2;
      indices.push(a, a + 1, a + 2, a + 1, a + 3, a + 2);
    }
  }
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  geometry.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2));
  geometry.setIndex(indices);
  geometry.computeVertexNormals();

  const roadMaterial = new THREE.MeshStandardMaterial({
    color: 0x1b2223,
    metalness: 0.28,
    roughness: 0.24,
    envMapIntensity: 0.9,
  });
  const road = new THREE.Mesh(geometry, roadMaterial);
  road.receiveShadow = false;
  group.add(road);

  // Shoulder lines
  [half - 0.35, -half + 0.35].forEach((offset) => {
    const linePositions = [];
    const lineIndices = [];
    for (let i = 0; i <= segments; i += 1) {
      const t = i / segments;
      const p = curve.getPointAt(t);
      const tangent = curve.getTangentAt(Math.min(t, 0.9999));
      const side = new THREE.Vector3(-tangent.z, 0, tangent.x).normalize();
      const a = p.clone().addScaledVector(side, offset + 0.06);
      const b = p.clone().addScaledVector(side, offset - 0.06);
      linePositions.push(a.x, 0.022, a.z, b.x, 0.022, b.z);
      if (i < segments) {
        const ai = i * 2;
        lineIndices.push(ai, ai + 1, ai + 2, ai + 1, ai + 3, ai + 2);
      }
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.Float32BufferAttribute(linePositions, 3));
    g.setIndex(lineIndices);
    g.computeVertexNormals();
    group.add(
      new THREE.Mesh(
        g,
        new THREE.MeshBasicMaterial({ color: 0xc9c4b5, transparent: true, opacity: 0.45, toneMapped: false }),
      ),
    );
  });

  // Centre dashes
  const dashCount = quality === 'low' ? 120 : 190;
  const dashGeometry = new THREE.BoxGeometry(0.16, 0.014, 2.1);
  const dashMaterial = new THREE.MeshBasicMaterial({ color: 0xf2a541, transparent: true, opacity: 0.75, toneMapped: false });
  const dashes = new THREE.InstancedMesh(dashGeometry, dashMaterial, dashCount);
  const dummy = new THREE.Object3D();
  for (let i = 0; i < dashCount; i += 1) {
    const t = (i + 0.5) / dashCount;
    const p = curve.getPointAt(t);
    const tangent = curve.getTangentAt(Math.min(t, 0.9999));
    dummy.position.set(p.x, 0.026, p.z);
    dummy.rotation.y = Math.atan2(tangent.x, tangent.z);
    dummy.updateMatrix();
    dashes.setMatrixAt(i, dummy.matrix);
  }
  dashes.instanceMatrix.needsUpdate = true;
  group.add(dashes);

  // Ground shoulders / verge
  const ground = new THREE.Mesh(
    new THREE.PlaneGeometry(700, 1300, 1, 1),
    new THREE.MeshStandardMaterial({ color: 0x12201f, roughness: 1, metalness: 0 }),
  );
  ground.rotation.x = -Math.PI / 2;
  ground.position.set(0, -0.06, -470);
  group.add(ground);

  return group;
}

function makeCity(quality) {
  const group = new THREE.Group();
  const rand = rng(7);
  const count = quality === 'low' ? 42 : 84;
  const geometry = new THREE.BoxGeometry(1, 1, 1);
  const material = new THREE.MeshStandardMaterial({
    color: 0x16302f,
    emissive: 0x0a1b1b,
    emissiveIntensity: 0.6,
    roughness: 0.82,
    metalness: 0.08,
  });
  const buildings = new THREE.InstancedMesh(geometry, material, count);
  const dummy = new THREE.Object3D();
  const color = new THREE.Color();
  for (let i = 0; i < count; i += 1) {
    const side = i % 2 === 0 ? 1 : -1;
    const z = 32 - rand() * 200;
    const x = side * (13 + rand() * 46);
    const h = 3 + rand() * 20;
    const w = 3 + rand() * 7;
    const d = 3 + rand() * 8;
    dummy.position.set(x, h / 2 - 0.2, z);
    dummy.scale.set(w, h, d);
    dummy.rotation.y = rand() * 0.4;
    dummy.updateMatrix();
    buildings.setMatrixAt(i, dummy.matrix);
    color.setHSL(0.49 + rand() * 0.03, 0.16, 0.055 + rand() * 0.05);
    buildings.setColorAt(i, color);
  }
  buildings.instanceMatrix.needsUpdate = true;
  if (buildings.instanceColor) buildings.instanceColor.needsUpdate = true;
  group.add(buildings);

  // Street lights along the opening road
  const glow = makeGlowTexture('rgba(255,205,130,0.95)', 'rgba(255,150,60,0)', 128);
  const poleMaterial = new THREE.MeshStandardMaterial({ color: 0x1a2424, roughness: 0.6, metalness: 0.4 });
  const poleGeometry = new THREE.CylinderGeometry(0.06, 0.09, 5.5, 6);
  for (let i = 0; i < 16; i += 1) {
    const side = i % 2 === 0 ? 1 : -1;
    const z = 18 - i * 14;
    const x = side * 8.2;
    const pole = new THREE.Mesh(poleGeometry, poleMaterial);
    pole.position.set(x, 2.75, z);
    group.add(pole);
    const sprite = new THREE.Sprite(
      new THREE.SpriteMaterial({
        map: glow,
        color: 0xffc77d,
        transparent: true,
        opacity: 0.8,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      }),
    );
    sprite.scale.set(2.1, 2.1, 1);
    sprite.position.set(x - side * 0.5, 5.5, z);
    group.add(sprite);
  }
  return group;
}

function makeGantry(service, index, t, curve) {
  const point = curve.getPointAt(t);
  const tangent = curve.getTangentAt(Math.min(t, 0.9999));
  const angle = Math.atan2(-tangent.x, -tangent.z);
  const group = new THREE.Group();
  group.position.set(point.x, 0, point.z);
  group.rotation.y = angle;
  group.userData.t = t;

  const metal = new THREE.MeshStandardMaterial({ color: 0x263837, roughness: 0.45, metalness: 0.65 });
  const glow = new THREE.MeshBasicMaterial({ color: 0xf2a541, toneMapped: false });
  const pillar = new THREE.BoxGeometry(0.34, 8.2, 0.34);
  [-6.6, 6.6].forEach((x) => {
    const p = new THREE.Mesh(pillar, metal);
    p.position.set(x, 4.1, 0);
    group.add(p);
  });
  const beam = new THREE.Mesh(new THREE.BoxGeometry(13.6, 0.3, 0.34), metal);
  beam.position.y = 8.05;
  group.add(beam);
  const underGlow = new THREE.Mesh(new THREE.BoxGeometry(10.6, 0.035, 0.08), glow);
  underGlow.position.set(0, 6.1, 0.25);
  group.add(underGlow);

  const signMaterial = new THREE.MeshBasicMaterial({
    map: makeSignTexture(service.short, service.meta, service.index),
    transparent: true,
    toneMapped: false,
    side: THREE.DoubleSide,
  });
  const board = new THREE.Mesh(new THREE.PlaneGeometry(10.8, 3.8), signMaterial);
  board.position.set(0, 6.65, 0.28);
  group.add(board);

  const frame = new THREE.Mesh(new THREE.BoxGeometry(11.1, 4.1, 0.18), metal);
  frame.position.set(0, 6.65, 0.16);
  group.add(frame);
  board.position.z = 0.28;

  // Shatter pieces, hidden until the camera crosses the gantry.
  const shards = [];
  const shardMaterial = new THREE.MeshBasicMaterial({
    color: index % 2 ? 0xf2a541 : 0x7fb3ad,
    transparent: true,
    opacity: 1,
    toneMapped: false,
  });
  for (let i = 0; i < 14; i += 1) {
    const w = 0.45 + Math.random() * 0.8;
    const h = 0.25 + Math.random() * 0.7;
    const shard = new THREE.Mesh(new THREE.BoxGeometry(w, h, 0.06), shardMaterial.clone());
    shard.userData.base = new THREE.Vector3(
      -5 + (i / 14) * 10 + (Math.random() - 0.5) * 0.5,
      6.65 + (Math.random() - 0.5) * 3,
      0.35,
    );
    shard.userData.velocity = new THREE.Vector3(
      (Math.random() - 0.5) * 7,
      (Math.random() - 0.3) * 8,
      (Math.random() - 0.5) * 4,
    );
    shard.position.copy(shard.userData.base);
    shard.visible = false;
    group.add(shard);
    shards.push(shard);
  }

  return { group, board, shards, t };
}

function makePineGeometry() {
  const trunk = new THREE.CylinderGeometry(0.055, 0.08, 0.55, 5);
  trunk.translate(0, 0.275, 0);
  const cone = new THREE.ConeGeometry(0.34, 1.9, 6);
  cone.translate(0, 1.25, 0);
  const top = new THREE.ConeGeometry(0.23, 1.3, 6);
  top.translate(0, 2.15, 0);
  const merged = new THREE.BufferGeometry();
  const positions = [];
  const normals = [];
  [trunk, cone, top].forEach((g) => {
    const p = g.toNonIndexed();
    positions.push(...p.attributes.position.array);
    normals.push(...p.attributes.normal.array);
  });
  merged.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  merged.setAttribute('normal', new THREE.Float32BufferAttribute(normals, 3));
  return merged;
}

function makeMountains(quality, mountainPath) {
  const group = new THREE.Group();
  const rand = rng(21);
  const treeCount = quality === 'low' ? 100 : 230;
  const pineGeo = makePineGeometry();
  const pineMat = new THREE.MeshStandardMaterial({ color: 0x17302c, roughness: 0.9, metalness: 0.03 });
  const trees = new THREE.InstancedMesh(pineGeo, pineMat, treeCount);
  const dummy = new THREE.Object3D();
  const treeColor = new THREE.Color();
  for (let i = 0; i < treeCount; i += 1) {
    const t = 0.32 + rand() * 0.68;
    const p = mountainPath.getPointAt(Math.min(t, 0.999));
    const tangent = mountainPath.getTangentAt(Math.min(t, 0.999));
    const side = new THREE.Vector3(-tangent.z, 0, tangent.x).normalize();
    const lateral = (i % 2 === 0 ? 1 : -1) * (7 + rand() * 36);
    const pos = p.clone().addScaledVector(side, lateral);
    const scale = 1.4 + rand() * 2.8;
    dummy.position.set(pos.x, 0, pos.z);
    dummy.scale.set(scale, scale, scale);
    dummy.rotation.y = rand() * Math.PI;
    dummy.updateMatrix();
    trees.setMatrixAt(i, dummy.matrix);
    treeColor.setHSL(0.43 + rand() * 0.05, 0.24, 0.07 + rand() * 0.05);
    trees.setColorAt(i, treeColor);
  }
  trees.instanceMatrix.needsUpdate = true;
  if (trees.instanceColor) trees.instanceColor.needsUpdate = true;
  group.add(trees);

  const peakCount = quality === 'low' ? 16 : 28;
  const peaks = new THREE.Group();
  for (let i = 0; i < peakCount; i += 1) {
    const t = 0.3 + rand() * 0.7;
    const p = mountainPath.getPointAt(Math.min(t, 0.999));
    const side = i % 2 === 0 ? 1 : -1;
    const radius = 20 + rand() * 44;
    const height = 26 + rand() * 62;
    const geometry = new THREE.ConeGeometry(radius, height, 5 + Math.floor(rand() * 3), 3);
    const pos = geometry.attributes.position;
    const colors = [];
    const low = new THREE.Color(0x1a3438);
    const high = new THREE.Color(0xdde2d8);
    const depthColor = new THREE.Color(0x2f5558);
    for (let v = 0; v < pos.count; v += 1) {
      const y = pos.getY(v) / height + 0.5;
      const color = low.clone().lerp(high, smoothstep(y, 0.48, 0.9)).lerp(depthColor, 0.16);
      colors.push(color.r, color.g, color.b);
    }
    geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
    geometry.computeVertexNormals();
    const material = new THREE.MeshStandardMaterial({
      vertexColors: true,
      flatShading: true,
      roughness: 0.92,
      metalness: 0.02,
    });
    const peak = new THREE.Mesh(geometry, material);
    const lateral = side * (38 + rand() * 115);
    peak.position.set(p.x + lateral, height / 2 - 2, p.z - rand() * 40);
    peak.rotation.y = rand() * Math.PI;
    peaks.add(peak);
  }
  group.add(peaks);

  // Mist
  const mistTexture = makeGlowTexture('rgba(230,241,238,0.55)', 'rgba(200,220,218,0)', 128);
  const mistCount = quality === 'low' ? 70 : 170;
  const mistPositions = new Float32Array(mistCount * 3);
  for (let i = 0; i < mistCount; i += 1) {
    const t = 0.3 + rand() * 0.7;
    const p = mountainPath.getPointAt(Math.min(t, 0.999));
    mistPositions[i * 3] = p.x + (rand() - 0.5) * 120;
    mistPositions[i * 3 + 1] = 1 + rand() * 22;
    mistPositions[i * 3 + 2] = p.z + (rand() - 0.5) * 80;
  }
  const mistGeometry = new THREE.BufferGeometry();
  mistGeometry.setAttribute('position', new THREE.BufferAttribute(mistPositions, 3));
  const mist = new THREE.Points(
    mistGeometry,
    new THREE.PointsMaterial({
      map: mistTexture,
      color: 0xd8e4dd,
      size: 12,
      transparent: true,
      opacity: 0.09,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      sizeAttenuation: true,
    }),
  );
  group.add(mist);

  // Volumetric light shafts
  const shaftMaterial = new THREE.MeshBasicMaterial({
    color: 0xe6e7cf,
    transparent: true,
    opacity: 0.028,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
    side: THREE.DoubleSide,
  });
  for (let i = 0; i < 4; i += 1) {
    const t = 0.38 + i * 0.14;
    const p = mountainPath.getPointAt(Math.min(t, 0.999));
    const shaft = new THREE.Mesh(new THREE.ConeGeometry(22 + i * 7, 120, 14, 1, true), shaftMaterial);
    shaft.position.set(p.x + (i % 2 ? 60 : -70), 45, p.z - 65);
    shaft.rotation.z = 0.2 + i * 0.09;
    group.add(shaft);
  }

  return { group, mist };
}

function makeDestinationPlanes(camera, quality) {
  const group = new THREE.Group();
  const loader = new THREE.TextureLoader();
  const planes = [];
  const strips = quality === 'low' ? 6 : 10;
  const w = 6.6;
  const h = 4.15;

  destinations.forEach((destination, index) => {
    const texture = loader.load(destination.image);
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.anisotropy = 4;
    const card = new THREE.Group();
    card.visible = false;
    const stripMeshes = [];
    for (let i = 0; i < strips; i += 1) {
      const geometry = new THREE.PlaneGeometry(w, h / strips);
      const uv = geometry.attributes.uv;
      for (let v = 0; v < uv.count; v += 1) {
        uv.setY(v, (i + uv.getY(v)) / strips);
      }
      uv.needsUpdate = true;
      const material = new THREE.MeshBasicMaterial({
        map: texture,
        transparent: true,
        opacity: 0.98,
        toneMapped: false,
        side: THREE.DoubleSide,
      });
      const strip = new THREE.Mesh(geometry, material);
      strip.position.y = -h / 2 + (i + 0.5) * (h / strips);
      strip.userData.baseY = strip.position.y;
      strip.userData.baseX = 0;
      card.add(strip);
      stripMeshes.push(strip);
    }
    const edge = new THREE.Mesh(
      new THREE.PlaneGeometry(w + 0.12, h + 0.12),
      new THREE.MeshBasicMaterial({
        color: 0xf2a541,
        transparent: true,
        opacity: 0.22,
        side: THREE.DoubleSide,
        toneMapped: false,
      }),
    );
    edge.position.z = -0.02;
    card.add(edge);
    group.add(card);
    planes.push({ card, strips: stripMeshes, edge, index, texture });
  });

  return { group, planes };
}

function makeNight(cameraPath, quality) {
  const group = new THREE.Group();
  const rand = rng(55);
  const glowTexture = makeGlowTexture('rgba(255,110,70,0.95)', 'rgba(255,60,20,0)', 128);
  const amberTexture = makeGlowTexture('rgba(255,204,120,0.95)', 'rgba(255,160,60,0)', 128);
  const count = quality === 'low' ? 26 : 56;
  const positions = [];
  const colors = [];
  const colorA = new THREE.Color(0xff4d32);
  const colorB = new THREE.Color(0xffb45b);
  for (let i = 0; i < count; i += 1) {
    const t = 0.68 + rand() * 0.24;
    const p = cameraPath.getPointAt(Math.min(t, 0.999));
    const tangent = cameraPath.getTangentAt(Math.min(t, 0.999));
    const side = new THREE.Vector3(-tangent.z, 0, tangent.x).normalize();
    const lateral = (i % 2 === 0 ? 1 : -1) * (3 + rand() * 9);
    const pos = p.clone().addScaledVector(side, lateral);
    positions.push(pos.x, 0.55 + rand() * 0.5, pos.z - rand() * 22);
    const c = colorA.clone().lerp(colorB, rand() * 0.35);
    colors.push(c.r, c.g, c.b);
  }
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
  const points = new THREE.Points(
    geometry,
    new THREE.PointsMaterial({
      map: glowTexture,
      size: 1.5,
      transparent: true,
      opacity: 0.9,
      vertexColors: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      sizeAttenuation: true,
    }),
  );
  group.add(points);

  const streakTexture = makeStreakTexture('rgba(255,100,60,0.75)');
  for (let i = 0; i < (quality === 'low' ? 8 : 18); i += 1) {
    const t = 0.69 + rand() * 0.21;
    const p = cameraPath.getPointAt(Math.min(t, 0.999));
    const tangent = cameraPath.getTangentAt(Math.min(t, 0.999));
    const streak = new THREE.Mesh(
      new THREE.PlaneGeometry(0.12 + rand() * 0.15, 2.4 + rand() * 4),
      new THREE.MeshBasicMaterial({
        map: streakTexture,
        transparent: true,
        opacity: 0.2 + rand() * 0.3,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        toneMapped: false,
      }),
    );
    streak.position.set(p.x + (rand() - 0.5) * 15, 0.07, p.z + (rand() - 0.5) * 12);
    streak.rotation.x = -Math.PI / 2;
    streak.rotation.z = Math.atan2(tangent.x, tangent.z);
    group.add(streak);
  }

  // Review text light planes
  const reviewPlanes = [];
  const reviews = [
    { quote: testimonials[0].quote, t: 0.735, side: -1 },
    { quote: testimonials[1].quote, t: 0.775, side: 1 },
    { quote: testimonials[2].quote, t: 0.815, side: -1 },
  ];
  reviews.forEach((review) => {
    const words = review.quote.split(' ');
    const rows = [];
    let line = '';
    words.forEach((word) => {
      if ((line + word).length > 30) {
        rows.push(line.trim());
        line = `${word} `;
      } else {
        line += `${word} `;
      }
    });
    if (line.trim()) rows.push(line.trim());
    const texture = makeTextTexture('', {
      width: 1400,
      height: 500,
      font: 'Manrope, Arial, sans-serif',
      fontSize: 64,
      color: '#f4efe6',
      lineHeight: 1.35,
      lines: rows.map((r) => `“${r}`),
      glow: 'rgba(242,165,65,0.25)',
      glowBlur: 18,
      weight: '600',
    });
    const material = new THREE.MeshBasicMaterial({
      map: texture,
      transparent: true,
      opacity: 0,
      toneMapped: false,
      depthWrite: false,
    });
    const plane = new THREE.Mesh(new THREE.PlaneGeometry(9.5, 3.4), material);
    const p = cameraPath.getPointAt(review.t);
    const tangent = cameraPath.getTangentAt(review.t);
    const side = new THREE.Vector3(-tangent.z, 0, tangent.x).normalize();
    plane.position.copy(p).addScaledVector(side, review.side * 3.1);
    plane.position.y = 2.4;
    plane.userData.t = review.t;
    group.add(plane);
    reviewPlanes.push(plane);
  });

  return { group, points, reviewPlanes, amberTexture };
}

function makeStudio(car, quality) {
  const group = new THREE.Group();
  group.position.set(0, 0, -300);

  const floor = new THREE.Mesh(
    new THREE.CircleGeometry(10.5, 64),
    new THREE.MeshStandardMaterial({
      color: 0x0b1313,
      metalness: 0.92,
      roughness: 0.12,
      envMapIntensity: 1.5,
    }),
  );
  floor.rotation.x = -Math.PI / 2;
  floor.position.y = 0.01;
  group.add(floor);

  const ring = new THREE.Mesh(
    new THREE.RingGeometry(9.4, 9.5, 96),
    new THREE.MeshBasicMaterial({ color: 0xf2a541, transparent: true, opacity: 0.8, toneMapped: false, side: THREE.DoubleSide }),
  );
  ring.rotation.x = -Math.PI / 2;
  ring.position.y = 0.03;
  group.add(ring);

  const haze = new THREE.Mesh(
    new THREE.CircleGeometry(14, 48),
    new THREE.MeshBasicMaterial({ color: 0x315d5c, transparent: true, opacity: 0.1, blending: THREE.AdditiveBlending, depthWrite: false }),
  );
  haze.rotation.x = -Math.PI / 2;
  haze.position.y = 0.035;
  group.add(haze);

  const lightBar = new THREE.Mesh(
    new THREE.BoxGeometry(10, 0.04, 0.1),
    new THREE.MeshBasicMaterial({ color: 0xf2a541, toneMapped: false }),
  );
  lightBar.position.set(0, 5.6, -8.5);
  group.add(lightBar);

  const rimLeft = new THREE.PointLight(0xf2a541, 150, 30, 2);
  rimLeft.position.set(-7, 3.2, 3);
  group.add(rimLeft);
  const rimRight = new THREE.PointLight(0x74b4b3, 110, 30, 2);
  rimRight.position.set(7, 2.2, -2);
  group.add(rimRight);
  const topLight = new THREE.PointLight(0xf4efe6, 90, 25, 2);
  topLight.position.set(0, 7.5, 1);
  group.add(topLight);

  const beam = new THREE.Mesh(
    new THREE.ConeGeometry(8, 14, 30, 1, true),
    new THREE.MeshBasicMaterial({
      color: 0xf4efe6,
      transparent: true,
      opacity: 0.022,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      side: THREE.DoubleSide,
    }),
  );
  beam.position.set(0, 8, 1);
  group.add(beam);

  return { group, floor, ring, lights: [rimLeft, rimRight, topLight] };
}

function makeGoldFinale(cameraPath) {
  const group = new THREE.Group();
  const glowTexture = makeGlowTexture('rgba(255,200,120,0.9)', 'rgba(255,120,40,0)', 256);
  const sun = new THREE.Sprite(
    new THREE.SpriteMaterial({
      map: glowTexture,
      color: 0xffb35e,
      transparent: true,
      opacity: 0.9,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    }),
  );
  sun.scale.set(110, 110, 1);

  const end = cameraPath.getPointAt(1);
  const tangent = cameraPath.getTangentAt(0.999);
  const forward = tangent.clone().setY(0).normalize();
  const carPos = end.clone().addScaledVector(forward, 8);
  sun.position.set(carPos.x - 12, 18, carPos.z - 90);
  group.add(sun);

  const flare = new THREE.Mesh(
    new THREE.PlaneGeometry(260, 16),
    new THREE.MeshBasicMaterial({
      map: makeStreakTexture('rgba(255,205,140,0.7)'),
      transparent: true,
      opacity: 0.42,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      toneMapped: false,
    }),
  );
  flare.position.copy(sun.position);
  flare.position.y -= 1;
  flare.lookAt(end.x, 1.4, end.z);
  group.add(flare);

  const ground = new THREE.Mesh(
    new THREE.CircleGeometry(240, 48),
    new THREE.MeshStandardMaterial({ color: 0x2a1c13, roughness: 0.9, metalness: 0.02 }),
  );
  ground.rotation.x = -Math.PI / 2;
  ground.position.set(carPos.x, -0.02, carPos.z - 40);
  group.add(ground);

  return { group, sun, flare, carPos, forward, end };
}

export class FilmWorld {
  constructor({ scene, camera, renderer, envMap, quality, mobile }) {
    this.scene = scene;
    this.camera = camera;
    this.renderer = renderer;
    this.envMap = envMap;
    this.quality = quality;
    this.mobile = mobile;
    this.time = 0;
    this.roadCurve = new THREE.CatmullRomCurve3(ROAD_POINTS.map((p) => new THREE.Vector3(...p)), false, 'catmullrom', 0.35);
    this.cameraPath = new THREE.CatmullRomCurve3(CAMERA_POINTS.map((p) => new THREE.Vector3(...p)), false, 'catmullrom', 0.3);
    this.sky = makeSky();
    this.scene.add(this.sky);

    this.hemi = new THREE.HemisphereLight(0x315d5c, 0x080d0e, 1.1);
    this.scene.add(this.hemi);
    this.key = new THREE.DirectionalLight(0x93b9d9, 1.5);
    this.scene.add(this.key);
    this.keyTarget = new THREE.Object3D();
    this.scene.add(this.keyTarget);
    this.key.target = this.keyTarget;
    this.fill = new THREE.DirectionalLight(0x7fb3ad, 0.5);
    this.scene.add(this.fill);

    this.scene.fog = new THREE.FogExp2(0x122a32, 0.017);
    this.scene.environment = envMap;
    this.scene.environmentIntensity = 0.65;

    this.road = makeRoad(this.roadCurve, quality);
    this.scene.add(this.road);
    this.city = makeCity(quality);
    this.scene.add(this.city);

    this.car = createCar({ envMap });
    this.scene.add(this.car.group);
    this.car.setHeadlights(true);
    this.car.group.position.set(0, 0.02, 8);
    this.car.group.rotation.y = Math.PI;

    this.gantries = services.map((service, index) => {
      const t = 0.07 + index * 0.026;
      const gantry = makeGantry(service, index, t, this.cameraPath);
      this.scene.add(gantry.group);
      return gantry;
    });

    this.mountains = makeMountains(quality, this.cameraPath);
    this.scene.add(this.mountains.group);
    this.mountains.group.visible = false;

    this.destinationPlanes = makeDestinationPlanes(camera, quality);
    this.scene.add(this.destinationPlanes.group);

    this.night = makeNight(this.cameraPath, quality);
    this.scene.add(this.night.group);
    this.night.group.visible = false;

    this.studio = makeStudio(this.car.group, quality);
    this.studio.group.visible = false;
    this.scene.add(this.studio.group);

    this.finale = makeGoldFinale(this.cameraPath);
    this.scene.add(this.finale.group);
    this.finale.group.visible = false;

    this.heroText = new THREE.Group();
    const brand = makeTextTexture('KARNAIL', {
      width: 2048,
      height: 560,
      fontSize: 430,
      color: '#f4efe6',
      glow: 'rgba(242,165,65,0.18)',
      glowBlur: 10,
    });
    const brandMesh = new THREE.Mesh(
      new THREE.PlaneGeometry(21, 5.75),
      new THREE.MeshBasicMaterial({ map: brand, transparent: true, toneMapped: false, depthWrite: false }),
    );
    brandMesh.position.set(0, 4.8, 0);
    this.heroText.add(brandMesh);
    const sub = makeTextTexture('TOUR & TRAVELS  /  MOHALI', {
      width: 1600,
      height: 180,
      fontSize: 72,
      color: '#f2a541',
      font: 'Manrope, Arial, sans-serif',
      weight: '700',
      glow: 'rgba(242,165,65,0.35)',
      glowBlur: 10,
    });
    const subMesh = new THREE.Mesh(
      new THREE.PlaneGeometry(12, 1.35),
      new THREE.MeshBasicMaterial({ map: sub, transparent: true, toneMapped: false, depthWrite: false }),
    );
    subMesh.position.set(0, 1.8, 0.02);
    this.heroText.add(subMesh);
    this.heroText.position.set(0, 0, -2);
    this.scene.add(this.heroText);

    // Hero brand letters sit slightly behind the car. Add a second line of depth.
    this.heroText.position.set(0, 0, -7);

    this.starsTexture = makeGlowTexture('rgba(255,255,255,0.9)', 'rgba(255,255,255,0)', 64);
    const starCount = quality === 'low' ? 240 : 520;
    const starPositions = new Float32Array(starCount * 3);
    const rand = rng(3);
    for (let i = 0; i < starCount; i += 1) {
      const theta = rand() * Math.PI * 2;
      const phi = rand() * 0.55 + 0.06;
      const r = 460;
      starPositions[i * 3] = Math.cos(theta) * Math.cos(phi) * r;
      starPositions[i * 3 + 1] = Math.sin(phi) * r;
      starPositions[i * 3 + 2] = Math.sin(theta) * Math.cos(phi) * r;
    }
    const starGeometry = new THREE.BufferGeometry();
    starGeometry.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
    this.stars = new THREE.Points(
      starGeometry,
      new THREE.PointsMaterial({
        map: this.starsTexture,
        size: 1.7,
        color: 0xdfe9e8,
        transparent: true,
        opacity: 0,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      }),
    );
    this.stars.frustumCulled = false;
    this.scene.add(this.stars);

    this.dust = this.makeDust(quality);
    this.scene.add(this.dust);

    this.activeDestination = -1;
    this.timing = sceneTiming;
    this.studioCenter = new THREE.Vector3(0, 0.75, -300);
    this.tempForward = new THREE.Vector3();
    this.tempLook = new THREE.Vector3();
    this.tempPos = new THREE.Vector3();
    this.grade = sampleGrade(0);
    this.updateLighting(0);
  }

  setTiming(timing) {
    if (!timing) return;
    this.timing = { ...sceneTiming, ...timing };
  }

  sceneWindow(id) {
    return (this.timing && this.timing[id]) || sceneTiming[id] || [0, 1];
  }

  makeDust(quality) {
    const count = quality === 'low' ? 90 : 220;
    const positions = new Float32Array(count * 3);
    const rand = rng(9);
    for (let i = 0; i < count; i += 1) {
      positions[i * 3] = (rand() - 0.5) * 30;
      positions[i * 3 + 1] = 0.3 + rand() * 5;
      positions[i * 3 + 2] = (rand() - 0.5) * 240;
    }
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const texture = makeGlowTexture('rgba(255,235,200,0.8)', 'rgba(255,200,140,0)', 64);
    return new THREE.Points(
      geometry,
      new THREE.PointsMaterial({
        map: texture,
        size: 0.22,
        color: 0xf4e4c5,
        transparent: true,
        opacity: 0.4,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        sizeAttenuation: true,
      }),
    );
  }

  updateLighting(p) {
    const g = sampleGrade(p);
    this.grade = g;
    this.scene.fog.color.copy(g.fog);
    this.scene.fog.density = g.density;
    this.hemi.color.copy(g.ambientSky);
    this.hemi.groundColor.copy(g.ambientGround);
    this.hemi.intensity = g.ambientIntensity;
    this.key.color.copy(g.key);
    this.key.intensity = g.keyIntensity;
    this.fill.color.copy(g.tint);
    this.fill.intensity = 0.38;
    this.sky.material.uniforms.uTop.value.copy(g.top);
    this.sky.material.uniforms.uHorizon.value.copy(g.horizon);
    this.sky.material.uniforms.uBottom.value.copy(g.bottom);
    this.sky.material.uniforms.uSun.value.copy(g.sun);
    this.sky.material.uniforms.uSunDir.value.copy(g.sunDir);
    const [fleetStart, fleetEnd] = this.sceneWindow('fleet');
    this.scene.environmentIntensity =
      p > fleetStart - 0.01 && p < fleetEnd + 0.01 ? 1.15 : 0.62;
  }

  getCameraPose(p) {
    const t = mapProgressToT(p);
    const pos = this.cameraPath.getPointAt(Math.min(t, 0.9999)).clone();
    const lookT = Math.min(t + 0.014, 1);
    const look = this.cameraPath.getPointAt(lookT).clone();
    let fov = 48;

    // Fleet turntable orbit overrides the world path, blended in/out.
    const [fleetStart, fleetEnd] = this.sceneWindow('fleet');
    const fleetQ = clamp((p - fleetStart) / Math.max(0.0001, fleetEnd - fleetStart), 0, 1);
    if (p > fleetStart - 0.01 && p < fleetEnd + 0.01) {
      const blend = Math.min(
        smoothstep(fleetQ, 0, 0.1),
        1 - smoothstep(fleetQ, 0.87, 1),
      );
      if (blend > 0.001) {
        const angle = -1.15 + fleetQ * 2.3;
        const radius = 8.8;
        const orbit = new THREE.Vector3(
          this.studioCenter.x + Math.sin(angle) * radius,
          2.3 + Math.sin(fleetQ * Math.PI) * 0.55,
          this.studioCenter.z + Math.cos(angle) * radius,
        );
        const orbitLook = new THREE.Vector3(this.studioCenter.x, 1.15, this.studioCenter.z);
        pos.lerp(orbit, blend);
        look.lerp(orbitLook, blend);
        fov = lerp(fov, 36, blend);
      }
    }

    // Finale: slower push toward the parked car / windscreen.
    const [bookStart] = this.sceneWindow('book');
    const finaleStart = Math.max(0, bookStart - 0.02);
    if (p > finaleStart) {
      const q = clamp((p - finaleStart) / Math.max(0.0001, 1 - finaleStart), 0, 1);
      const carPos = this.finale.carPos;
      const forward = this.finale.forward;
      const cam = carPos.clone().addScaledVector(forward, -(15 - q * 10));
      cam.y = 2.45 - q * 0.7;
      pos.lerp(cam, smoothstep(q, 0, 0.12));
      look.lerp(new THREE.Vector3(carPos.x, 1.1, carPos.z), smoothstep(q, 0, 0.2));
      fov = lerp(44, 34, q);
    }

    // Vertical framing for portrait phones: lift the eye line and open the lens
    // so the car, road and type still fit in a 9:16 frame.
    if (this.mobile) {
      pos.y += 0.5;
      fov += 8;
    }

    return { pos, look, fov, t };
  }

  update(progress, time, delta) {
    this.time = time;
    const p = clamp(progress, 0, 1);
    this.updateLighting(p);
    const pose = this.getCameraPose(p);
    const t = pose.t;

    // Handheld drift keeps the camera alive without fighting the scroll.
    const driftX = Math.sin(time * 0.55) * 0.035 + Math.sin(time * 1.7) * 0.012;
    const driftY = Math.sin(time * 0.73 + 1.2) * 0.025;
    this.camera.position.copy(pose.pos);
    this.camera.position.x += driftX;
    this.camera.position.y += driftY;
    const look = pose.look.clone();
    look.x += Math.sin(time * 0.31) * 0.28;
    look.y += Math.cos(time * 0.43) * 0.16;
    this.camera.lookAt(look);
    this.camera.rotation.z += Math.sin(time * 0.37) * 0.0016;
    // Pointer parallax: a quiet look-around, never enough to fight the scroll.
    if (this.pointer) {
      this.camera.rotateY(-this.pointer.x * 0.018);
      this.camera.rotateX(-this.pointer.y * 0.012);
    }
    const [servicesStartForFov, servicesEndForFov] = this.sceneWindow('services');
    this.camera.fov =
      pose.fov +
      (p > servicesStartForFov && p < servicesEndForFov ? Math.sin(time * 2.2) * 0.35 : 0);
    this.camera.updateProjectionMatrix();

    this.sky.position.copy(this.camera.position);
    this.stars.position.copy(this.camera.position);
    this.key.position.copy(this.camera.position).add(new THREE.Vector3(28, 38, 22));
    this.keyTarget.position.copy(this.camera.position).add(new THREE.Vector3(0, 0, -18));
    this.fill.position.copy(this.camera.position).add(new THREE.Vector3(-26, 12, -10));

    // Camera forward on the ground plane
    const forward = new THREE.Vector3();
    this.camera.getWorldDirection(forward);
    forward.y = 0;
    if (forward.lengthSq() < 0.001) forward.set(0, 0, -1);
    forward.normalize();

    const [fleetStart, fleetEnd] = this.sceneWindow('fleet');
    const [destStart, destEnd] = this.sceneWindow('destinations');
    const [whyStart, whyEnd] = this.sceneWindow('why');
    const [reviewStart, reviewEnd] = this.sceneWindow('reviews');
    const [bookStart] = this.sceneWindow('book');
    const [heroStart, heroEnd] = this.sceneWindow('hero');
    const [servicesStart, servicesEnd] = this.sceneWindow('services');
    const finaleStart = Math.max(0, bookStart - 0.02);

    const studioQ = clamp((p - fleetStart) / Math.max(0.0001, fleetEnd - fleetStart), 0, 1);
    const inStudio = p >= fleetStart && p <= fleetEnd;
    this.studio.group.visible = inStudio;
    this.road.visible = !(p > fleetStart - 0.005 && p < fleetEnd + 0.005);
    this.city.visible = p < fleetStart + 0.03;
    this.mountains.group.visible = p > destStart - 0.03;
    this.night.group.visible = p > whyStart - 0.02 && p < reviewEnd + 0.01;
    this.finale.group.visible = p > finaleStart - 0.055;
    this.night.points.visible = p > whyStart - 0.02 && p < reviewEnd + 0.01;

    this.stars.material.opacity =
      clamp((p - whyStart + 0.02) * 2.4, 0, 0.85) * (1 - smoothstep(p, finaleStart, 1));
    this.dust.material.opacity = p < fleetStart ? 0.35 : p < whyStart ? 0.16 : 0.08;
    this.heroText.visible = p < heroEnd + 0.01;
    const heroFade = 1 - smoothstep(p, Math.max(0, heroEnd - 0.035), heroEnd + 0.005);

    // Hero brand passes in front of the city, behind the car.
    if (this.heroText.visible) {
      this.heroText.children.forEach((child) => {
        if (child.material) child.material.opacity = heroFade;
      });
    }

    // Driving car
    const car = this.car.group;
    if (inStudio) {
      car.visible = true;
      car.position.set(0, 0.02, -300);
      car.rotation.y = Math.PI + studioQ * Math.PI * 2;
      car.rotation.x = 0;
      car.rotation.z = 0;
      this.car.setHeadlights(true);
      this.car.setBrake(0.2);
      this.studio.ring.material.opacity = 0.45 + Math.sin(time * 1.4) * 0.15;
      this.stars.material.opacity *= 0.3;
    } else if (p > finaleStart) {
      car.visible = true;
      car.position.copy(this.finale.carPos);
      car.position.y = 0.02;
      car.rotation.set(0, Math.atan2(this.finale.forward.x, this.finale.forward.z) + Math.PI, 0);
      this.car.setHeadlights(true);
      this.car.setBrake(0.35);
    } else {
      car.visible = true;
      const carPos = this.camera.position.clone().addScaledVector(forward, 9.2);
      carPos.y = 0.02;
      car.position.lerp(carPos, 0.26);
      const yaw = Math.atan2(forward.x, forward.z);
      const currentYaw = car.rotation.y;
      let targetYaw = yaw;
      // shortest angular path
      const diff = ((targetYaw - currentYaw + Math.PI * 3) % (Math.PI * 2)) - Math.PI;
      car.rotation.y = currentYaw + diff * 0.22;
      car.rotation.x = Math.sin(time * 0.8) * 0.006;
      car.rotation.z = Math.sin(time * 0.6 + 1) * 0.004;
      this.car.setHeadlights(p < servicesEnd || p > whyStart - 0.02);
      this.car.setBrake(p > reviewStart ? 0.6 : 0.1);
    }
    this.car.update(time, p > servicesStart && p < servicesEnd ? 10 : 4);

    // Headlight brand plane: place behind the car, lock to the road.
    if (this.heroText.visible) {
      this.heroText.position.set(car.position.x * 0.2, 0, car.position.z - 9);
    }

    // Gantries: rotate to edge-on and shatter after the camera crosses them.
    this.gantries.forEach((gantry) => {
      const q = clamp((t - gantry.t) / 0.012, -0.4, 1);
      const passed = q > 0;
      const shatter = clamp((t - gantry.t) / 0.018, 0, 1);
      gantry.board.rotation.y = passed ? Math.PI * 0.5 * smoothstep(shatter, 0, 0.55) : 0;
      gantry.board.material.opacity = 1 - smoothstep(shatter, 0.25, 0.9);
      gantry.group.visible = q > -0.55 && t < 0.3;
      gantry.shards.forEach((shard, i) => {
        shard.visible = shatter > 0 && shatter < 1;
        if (shard.visible) {
          const k = shatter;
          shard.position.copy(shard.userData.base).addScaledVector(shard.userData.velocity, k * 1.3);
          shard.rotation.x = k * (i + 1) * 0.8;
          shard.rotation.z = k * (i + 2) * 0.5;
          shard.material.opacity = 1 - smoothstep(k, 0.5, 1);
        }
      });
    });

    // Destination planes fly in, expand, then split into strips.
    const destQ = clamp((p - destStart) / Math.max(0.0001, destEnd - destStart), 0, 1);
    const destFloat = destQ * destinations.length;
    const active = clamp(Math.floor(destFloat), 0, destinations.length - 1);
    this.activeDestination = active;
    this.destinationPlanes.planes.forEach((plane, index) => {
      const local = destFloat - index;
      const q = clamp(local, -0.35, 1.4);
      const visible = local > -0.28 && local < 1.25;
      plane.card.visible = visible && p > destStart - 0.02 && p < destEnd + 0.02;
      if (!visible) return;
      const enter = smoothstep(local, 0, 0.55);
      const exit = 1 - smoothstep(local, 0.88, 1.22);
      const depth = lerp(30, 4.6, enter);
      plane.card.position.copy(this.camera.position).addScaledVector(forward, depth);
      plane.card.position.y = 0.6 + lerp(3.4, 0, enter);
      plane.card.lookAt(this.camera.position.x, plane.card.position.y, this.camera.position.z);
      plane.card.rotateZ(lerp(-0.26, 0, enter) * (index % 2 ? 1 : -1));
      const scale = lerp(0.75, 1.72, smoothstep(local, 0, 0.7));
      plane.card.scale.setScalar(scale);
      plane.card.scale.y *= lerp(1, 1.05, exit);
      plane.edge.material.opacity = 0.18 * exit * (1 - smoothstep(local, 0.8, 1));
      if (local > 0.86) {
        const split = smoothstep(local, 0.86, 1.18);
        plane.strips.forEach((strip, si) => {
          const dir = (si % 2 === 0 ? 1 : -1) * (0.8 + si * 0.11);
          strip.position.y = strip.userData.baseY + dir * split * 2.2;
          strip.position.x = strip.userData.baseX + (si % 2 ? 1 : -1) * split * 0.45;
          strip.rotation.z = split * 0.05 * (si % 2 ? 1 : -1);
          strip.material.opacity = 1 - smoothstep(split, 0.2, 1);
        });
      } else {
        plane.strips.forEach((strip) => {
          strip.position.y = strip.userData.baseY;
          strip.position.x = 0;
          strip.rotation.z = 0;
          strip.material.opacity = 0.98 * exit;
        });
      }
    });

    // Night review planes: face the camera, light up as they approach.
    this.night.reviewPlanes.forEach((plane, index) => {
      const q = clamp((t - plane.userData.t + 0.035) / 0.09, 0, 1);
      plane.lookAt(this.camera.position.x, plane.position.y, this.camera.position.z);
      plane.material.opacity = q * (1 - clamp((t - plane.userData.t) / 0.07, 0, 1)) * 0.9;
      plane.position.y = 2.4 + Math.sin(time * 0.8 + index) * 0.09;
    });

    // Mist drift
    const positions = this.mountains.mist.geometry.attributes.position;
    for (let i = 0; i < positions.count; i += 1) {
      const x = positions.getX(i);
      positions.setX(i, x + Math.sin(time * 0.06 + i) * 0.006);
    }
    positions.needsUpdate = true;

    this.finale.sun.position.set(
      this.finale.carPos.x - 12 + Math.sin(time * 0.05) * 0.4,
      18,
      this.finale.carPos.z - 90,
    );
    this.finale.flare.position.copy(this.finale.sun.position);

    return { grade: this.grade, activeDestination: this.activeDestination, studioQ, destQ };
  }
}
