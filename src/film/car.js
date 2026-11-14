import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js';
import { makeGlowTexture } from './textures.js';

/**
 * Procedural, stylised touring sedan.
 *
 * This is an original low-poly / sculpted placeholder built from beveled
 * primitives — not a licensed glTF asset. It is intentionally cinematic rather
 * than photoreal: strong rim light, clear-coat paint, glass, warm headlights and
 * emissive tail lamps.
 */
export function createCar({ envMap } = {}) {
  const group = new THREE.Group();
  group.name = 'Karnail procedural sedan';

  const paint = new THREE.MeshPhysicalMaterial({
    color: 0x244745,
    metalness: 0.6,
    roughness: 0.24,
    clearcoat: 1,
    clearcoatRoughness: 0.14,
    envMap: envMap || null,
    envMapIntensity: 1.7,
  });
  const paintDark = new THREE.MeshPhysicalMaterial({
    color: 0x16302f,
    metalness: 0.5,
    roughness: 0.3,
    clearcoat: 0.8,
    clearcoatRoughness: 0.2,
    envMap: envMap || null,
    envMapIntensity: 1.3,
  });
  const trim = new THREE.MeshStandardMaterial({
    color: 0x080c0d,
    metalness: 0.45,
    roughness: 0.55,
    envMap: envMap || null,
    envMapIntensity: 0.8,
  });
  const glass = new THREE.MeshPhysicalMaterial({
    color: 0x071113,
    metalness: 0.25,
    roughness: 0.045,
    transparent: true,
    opacity: 0.86,
    envMap: envMap || null,
    envMapIntensity: 2.2,
    side: THREE.DoubleSide,
  });
  const chrome = new THREE.MeshStandardMaterial({
    color: 0xe4d7b9,
    metalness: 0.95,
    roughness: 0.18,
    envMap: envMap || null,
    envMapIntensity: 1.8,
  });
  const tire = new THREE.MeshStandardMaterial({ color: 0x050708, roughness: 0.92, metalness: 0.05 });
  const rim = new THREE.MeshStandardMaterial({
    color: 0xcdbd9a,
    metalness: 0.92,
    roughness: 0.22,
    envMap: envMap || null,
    envMapIntensity: 1.6,
  });
  const headlightLens = new THREE.MeshStandardMaterial({
    color: 0xfff0cc,
    emissive: 0xffd39a,
    emissiveIntensity: 0.2,
    metalness: 0.1,
    roughness: 0.12,
  });
  const tailLens = new THREE.MeshStandardMaterial({
    color: 0x5d0b06,
    emissive: 0xff3a18,
    emissiveIntensity: 0.4,
    metalness: 0.2,
    roughness: 0.2,
  });

  const wheelDummy = new THREE.Group();
  group.add(wheelDummy);

  function part(geometry, material, x, y, z, rx = 0, ry = 0, rz = 0) {
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y, z);
    mesh.rotation.set(rx, ry, rz);
    group.add(mesh);
    return mesh;
  }

  // Lower body and skirts
  part(new RoundedBoxGeometry(1.86, 0.44, 4.36, 4, 0.14), paint, 0, 0.62, 0);
  part(new RoundedBoxGeometry(1.92, 0.18, 3.98, 3, 0.08), paintDark, 0, 0.4, 0);
  part(new RoundedBoxGeometry(1.94, 0.16, 0.32, 3, 0.07), paintDark, 0, 0.53, 2.12);
  part(new RoundedBoxGeometry(1.94, 0.16, 0.32, 3, 0.07), paintDark, 0, 0.53, -2.12);

  // Bonnet and boot
  const bonnet = part(new RoundedBoxGeometry(1.7, 0.2, 1.42, 4, 0.11), paint, 0, 0.86, 1.4);
  bonnet.rotation.x = -0.035;
  const boot = part(new RoundedBoxGeometry(1.72, 0.22, 1.02, 4, 0.11), paint, 0, 0.88, -1.58);
  boot.rotation.x = 0.03;

  // Cabin, roof and glass
  part(new RoundedBoxGeometry(1.66, 0.5, 2.28, 4, 0.2), paint, 0, 1.11, -0.18);
  part(new RoundedBoxGeometry(1.5, 0.16, 1.5, 4, 0.08), paintDark, 0, 1.41, -0.2);

  part(new THREE.PlaneGeometry(2.02, 0.44), glass, 0.842, 1.16, -0.18, 0, Math.PI / 2, 0);
  part(new THREE.PlaneGeometry(2.02, 0.44), glass, -0.842, 1.16, -0.18, 0, -Math.PI / 2, 0);
  part(new THREE.PlaneGeometry(1.5, 0.62), glass, 0, 1.17, 0.86, -0.56, 0, 0);
  part(new THREE.PlaneGeometry(1.48, 0.54), glass, 0, 1.18, -1.2, 0.58, 0, 0);

  // Window surrounds
  part(new THREE.BoxGeometry(0.03, 0.48, 2.08), chrome, 0.85, 1.16, -0.18);
  part(new THREE.BoxGeometry(0.03, 0.48, 2.08), chrome, -0.85, 1.16, -0.18);

  // Mirrors
  part(new RoundedBoxGeometry(0.18, 0.12, 0.28, 2, 0.05), paint, 0.96, 1.13, 0.62);
  part(new RoundedBoxGeometry(0.18, 0.12, 0.28, 2, 0.05), paint, -0.96, 1.13, 0.62);

  // Front grille and bumper detail
  part(new RoundedBoxGeometry(0.92, 0.2, 0.06, 2, 0.03), trim, 0, 0.64, 2.2);
  for (let i = 0; i < 4; i += 1) {
    part(new THREE.BoxGeometry(0.8, 0.018, 0.02), chrome, 0, 0.57 + i * 0.05, 2.24);
  }
  part(new RoundedBoxGeometry(1.2, 0.16, 0.08, 2, 0.04), trim, 0, 0.46, 2.2);
  part(new RoundedBoxGeometry(0.52, 0.12, 0.03, 2, 0.02), chrome, 0, 0.47, 2.26);
  part(new RoundedBoxGeometry(1.1, 0.12, 0.06, 2, 0.03), trim, 0, 0.46, -2.2);

  // Headlight lenses + DRLs
  const headlights = [];
  [-0.6, 0.6].forEach((x) => {
    const lens = part(new RoundedBoxGeometry(0.46, 0.16, 0.08, 2, 0.05), headlightLens, x, 0.82, 2.2);
    headlights.push(lens);
    part(new THREE.BoxGeometry(0.36, 0.025, 0.03), new THREE.MeshBasicMaterial({ color: 0xffe0a8, toneMapped: false }), x, 0.89, 2.25);
  });

  // Tail lamps
  const tailLights = [];
  [-0.66, 0.66].forEach((x) => {
    const lens = part(new RoundedBoxGeometry(0.44, 0.16, 0.07, 2, 0.04), tailLens, x, 0.84, -2.21);
    tailLights.push(lens);
  });
  part(new THREE.BoxGeometry(0.72, 0.035, 0.03), new THREE.MeshBasicMaterial({ color: 0xff4a24, toneMapped: false }), 0, 0.94, -2.23);

  // Glow sprites
  const warmGlow = makeGlowTexture('rgba(255,222,170,0.95)', 'rgba(255,160,60,0)', 128);
  const redGlow = makeGlowTexture('rgba(255,80,40,0.9)', 'rgba(255,30,0,0)', 128);
  const headSprites = [];
  [-0.6, 0.6].forEach((x) => {
    const sprite = new THREE.Sprite(new THREE.SpriteMaterial({
      map: warmGlow,
      color: 0xffd49a,
      transparent: true,
      opacity: 0,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    }));
    sprite.scale.set(1.2, 1.2, 1);
    sprite.position.set(x, 0.82, 2.3);
    group.add(sprite);
    headSprites.push(sprite);
  });
  const tailSprites = [];
  [-0.66, 0.66].forEach((x) => {
    const sprite = new THREE.Sprite(new THREE.SpriteMaterial({
      map: redGlow,
      color: 0xff4a28,
      transparent: true,
      opacity: 0.2,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    }));
    sprite.scale.set(0.75, 0.75, 1);
    sprite.position.set(x, 0.84, -2.3);
    group.add(sprite);
    tailSprites.push(sprite);
  });

  // Headlight beams
  const beamMaterial = new THREE.MeshBasicMaterial({
    color: 0xffcb84,
    transparent: true,
    opacity: 0,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
    side: THREE.DoubleSide,
  });
  const beams = [];
  [-0.6, 0.6].forEach((x) => {
    const beam = new THREE.Mesh(new THREE.ConeGeometry(1.25, 10, 14, 1, true), beamMaterial);
    beam.rotation.x = Math.PI / 2;
    beam.position.set(x, 0.52, 7.2);
    beam.visible = false;
    group.add(beam);
    beams.push(beam);
  });

  // One soft spot for road response (kept cheap for mobile).
  const spot = new THREE.SpotLight(0xffd3a0, 0, 34, 0.5, 0.7, 1.4);
  spot.position.set(0, 0.9, 2.3);
  spot.target.position.set(0, 0.05, 16);
  group.add(spot, spot.target);

  // Underglow pool
  const underglow = new THREE.Mesh(
    new THREE.PlaneGeometry(3.4, 5.6),
    new THREE.MeshBasicMaterial({
      map: makeGlowTexture('rgba(242,165,65,0.5)', 'rgba(242,165,65,0)', 128),
      color: 0xf2a541,
      transparent: true,
      opacity: 0.24,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    }),
  );
  underglow.rotation.x = -Math.PI / 2;
  underglow.position.y = 0.015;
  group.add(underglow);

  // Wheels
  const wheels = [];
  const wheelPositions = [
    [0.92, 1.38],
    [-0.92, 1.38],
    [0.92, -1.4],
    [-0.92, -1.4],
  ];
  wheelPositions.forEach(([x, z]) => {
    const wheel = new THREE.Group();
    wheel.position.set(x, 0.4, z);
    const tyreMesh = new THREE.Mesh(new THREE.TorusGeometry(0.33, 0.11, 12, 30), tire);
    tyreMesh.rotation.y = Math.PI / 2;
    wheel.add(tyreMesh);
    const rimMesh = new THREE.Mesh(new THREE.CylinderGeometry(0.215, 0.215, 0.15, 24), rim);
    rimMesh.rotation.z = Math.PI / 2;
    wheel.add(rimMesh);
    for (let i = 0; i < 5; i += 1) {
      const spoke = new THREE.Mesh(new THREE.BoxGeometry(0.05, 0.32, 0.06), chrome);
      spoke.rotation.x = (i / 5) * Math.PI;
      wheel.add(spoke);
    }
    const hub = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.06, 0.17, 12), trim);
    hub.rotation.z = Math.PI / 2;
    wheel.add(hub);
    group.add(wheel);
    wheels.push(wheel);
  });

  let headlightTarget = 1;
  let headlight = 1;
  let brakeTarget = 0.2;
  let brake = 0.2;
  let roll = 0;
  let lastTime = 0;

  function setHeadlights(on) {
    headlightTarget = on ? 1 : 0;
  }

  function setBrake(value) {
    brakeTarget = THREE.MathUtils.clamp(value, 0, 1);
  }

  function update(time, speed = 0) {
    const dt = lastTime ? Math.min(time - lastTime, 0.08) : 0.016;
    lastTime = time;
    headlight += (headlightTarget - headlight) * Math.min(1, dt * 8);
    brake += (brakeTarget - brake) * Math.min(1, dt * 7);
    roll += speed * dt * 2.2;

    wheels.forEach((wheel) => {
      wheel.rotation.x = roll;
    });

    headlightLens.emissiveIntensity = 0.2 + headlight * 3.2;
    headSprites.forEach((sprite) => {
      sprite.material.opacity = headlight * 0.85;
    });
    beams.forEach((beam) => {
      beam.visible = headlight > 0.03;
      beam.material.opacity = headlight * 0.05;
    });
    spot.intensity = headlight * 65;
    tailLens.emissiveIntensity = 0.4 + brake * 4.6;
    tailSprites.forEach((sprite) => {
      sprite.material.opacity = 0.2 + brake * 0.72;
    });
    underglow.material.opacity = 0.12 + headlight * 0.13;

    // Suspension / body breathing
    group.position.y += Math.sin(time * 2.4) * 0.0015;
    group.rotation.z += Math.sin(time * 1.6) * 0.0004;
  }

  return {
    group,
    setHeadlights,
    setBrake,
    update,
    materials: { paint, glass, rim },
  };
}
