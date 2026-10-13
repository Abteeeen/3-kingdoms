// 3 Kingdoms mock: real-time 3D mao cai bowl.
// One engine, two looks: 'gloss' (physical, ACES, studio env) and 'ink' (toon shading with ink outlines).
// The page drives it with bowl.set({ sx, sy, scale, drop, spice, steam }); every value is lerped (awwwards-3d: "lerp everything").
import * as THREE from 'https://unpkg.com/three@0.170.0/build/three.module.js';

export function initBowl(canvas, opt) {
  const ink = opt.style === 'ink';
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: 'high-performance' });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.75));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = ink ? THREE.NoToneMapping : THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.05;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(30, 1, 0.1, 100);
  const camTarget = new THREE.Vector3(0, 0.75, 0);
  camera.position.set(0, 4.4, 8.6);
  camera.lookAt(camTarget);

  // ---------- lighting ----------
  if (!ink) {
    // Small studio built in code (no addons import): warm key, cool fill, soft top box. metalness/clearcoat need an env map.
    const pmrem = new THREE.PMREMGenerator(renderer);
    const env = new THREE.Scene();
    env.add(new THREE.Mesh(new THREE.BoxGeometry(20, 20, 20), new THREE.MeshBasicMaterial({ color: 0x8a8580, side: THREE.BackSide })));
    const panel = (c, i, w, h, p, l) => { const m = new THREE.Mesh(new THREE.PlaneGeometry(w, h), new THREE.MeshBasicMaterial({ color: new THREE.Color(c).multiplyScalar(i), side: THREE.DoubleSide })); m.position.copy(p); m.lookAt(l); env.add(m); };
    panel(0xfff1e0, 9, 6, 4, new THREE.Vector3(-6, 6, 5), new THREE.Vector3(0, 0, 0));
    panel(0xdfe8ff, 3, 5, 5, new THREE.Vector3(7, 3, -2), new THREE.Vector3(0, 0, 0));
    panel(0xffffff, 6, 8, 8, new THREE.Vector3(0, 9.5, 0), new THREE.Vector3(0, 0, 0));
    scene.environment = pmrem.fromScene(env, 0.035).texture;
    const key = new THREE.DirectionalLight(0xfff0e0, 1.6); key.position.set(-4, 7, 5); scene.add(key);
  } else {
    scene.add(new THREE.AmbientLight(0xffffff, 0.9));
    const key = new THREE.DirectionalLight(0xffffff, 2.2); key.position.set(-3, 6, 4); scene.add(key);
  }

  // Toon ramp: three flat ink tones, nearest filtered so bands stay crisp.
  const ramp = new THREE.DataTexture(new Uint8Array([90, 90, 90, 255, 175, 175, 175, 255, 255, 255, 255, 255]), 3, 1, THREE.RGBAFormat);
  ramp.minFilter = ramp.magFilter = THREE.NearestFilter; ramp.needsUpdate = true;

  const mat = (color, o = {}) => ink
    ? new THREE.MeshToonMaterial({ color, gradientMap: ramp })
    : new THREE.MeshPhysicalMaterial({ color, roughness: o.r ?? 0.5, metalness: 0, clearcoat: o.cc ?? 0, clearcoatRoughness: 0.15, sheen: o.sheen ?? 0 });
  const outlineMat = new THREE.MeshBasicMaterial({ color: opt.inkColor || 0x1c1a17, side: THREE.BackSide });
  const addOutline = (mesh, s = 1.045) => { if (!ink) return; const o = new THREE.Mesh(mesh.geometry, outlineMat); o.scale.setScalar(s); mesh.add(o); };

  const root = new THREE.Group(); scene.add(root);
  const bowl = new THREE.Group(); root.add(bowl);

  // ---------- bowl: lathe profile, outer wall then inner wall ----------
  const prof = [[0, 0.1], [0.56, 0.1], [0.6, 0], [0.76, 0], [0.82, 0.12], [1.22, 0.46], [1.52, 0.96], [1.64, 1.3], [1.66, 1.37], [1.59, 1.39], [1.47, 1.29], [1.12, 0.82], [0.62, 0.44], [0, 0.38]]
    .map(([x, y]) => new THREE.Vector2(x, y));
  const bowlGeo = new THREE.LatheGeometry(prof, 96);
  const glaze = ink ? new THREE.MeshToonMaterial({ color: opt.bowlColor, gradientMap: ramp, side: THREE.DoubleSide })
    : new THREE.MeshPhysicalMaterial({ color: opt.bowlColor, roughness: 0.22, clearcoat: 1, clearcoatRoughness: 0.08, side: THREE.DoubleSide });
  const bowlMesh = new THREE.Mesh(bowlGeo, glaze); bowl.add(bowlMesh);
  if (ink) { const o = new THREE.Mesh(bowlGeo, outlineMat); o.scale.set(1.035, 1.03, 1.035); o.position.y = -0.015; bowl.add(o); }
  const rim = new THREE.Mesh(new THREE.TorusGeometry(1.625, 0.045, 12, 120), mat(opt.rimColor, { r: 0.3, cc: 1 }));
  rim.rotation.x = Math.PI / 2; rim.position.y = 1.36; bowl.add(rim);

  // ---------- broth: chilli-oil shader ----------
  const brothU = { uTime: { value: 0 }, uSpice: { value: 0.35 }, uInk: { value: ink ? 1 : 0 }, uRes: { value: new THREE.Vector2(1, 1) } };
  const broth = new THREE.Mesh(new THREE.CircleGeometry(1.4, 128), new THREE.ShaderMaterial({
    uniforms: brothU,
    vertexShader: `
      uniform float uTime; varying vec2 vUv; varying vec3 vPos;
      void main(){ vUv = uv; vec3 p = position;
        float r = length(p.xy);
        p.z += 0.018 * sin(r * 9.0 - uTime * 1.6) * (1.0 - r / 1.4);
        vPos = p; gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0); }`,
    fragmentShader: `
      precision highp float;
      uniform float uTime, uSpice, uInk; uniform vec2 uRes; varying vec2 vUv; varying vec3 vPos;
      float h(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
      float n(vec2 p){ vec2 i = floor(p), f = fract(p); f = f*f*(3.0-2.0*f);
        return mix(mix(h(i), h(i+vec2(1,0)), f.x), mix(h(i+vec2(0,1)), h(i+vec2(1,1)), f.x), f.y); }
      float fbm(vec2 p){ float v = 0.0, a = 0.5; for (int i = 0; i < 5; i++){ v += a * n(p); p *= 2.03; a *= 0.5; } return v; }
      void main(){
        vec2 p = vPos.xy; float r = length(p) / 1.4; float t = uTime * 0.12;
        float ang = atan(p.y, p.x) + t * 1.5 + r * 2.0;
        vec2 q = vec2(cos(ang), sin(ang)) * r * 3.0;
        float f = fbm(q + fbm(q * 1.7 + t) * 1.6);
        vec3 deep = mix(vec3(0.62, 0.13, 0.07), vec3(0.42, 0.04, 0.02), uSpice);
        vec3 mid  = mix(vec3(0.86, 0.32, 0.10), vec3(0.78, 0.10, 0.05), uSpice);
        vec3 oil  = vec3(0.98, 0.62, 0.20);
        vec3 col = mix(deep, mid, smoothstep(0.35, 0.75, f));
        // oil droplets: cellular rings drifting on the surface
        vec2 g = p * 6.0 + vec2(t * 2.0, -t);
        vec2 id = floor(g); vec2 fr = fract(g) - 0.5; float rnd = h(id);
        float d = length(fr + (vec2(h(id + 3.1), h(id + 7.7)) - 0.5) * 0.5);
        float drop = smoothstep(0.17 * rnd + 0.04, 0.0, d) * step(0.55, rnd);
        col = mix(col, oil, drop * 0.75 + smoothstep(0.62, 0.9, f) * 0.35);
        col *= mix(1.0, 0.55, smoothstep(0.75, 1.0, r));           // shade towards the bowl wall
        float spec = smoothstep(0.985, 1.0, sin(f * 9.0 + t * 4.0)) * (1.0 - r);
        col += spec * 0.5;
        if (uInk > 0.5) {                                          // print look: posterise and halftone
          col = floor(col * 4.0 + 0.5) / 4.0;
          vec2 sc = gl_FragCoord.xy / 5.0; vec2 c = fract(sc) - 0.5;
          float lum = dot(col, vec3(0.3, 0.59, 0.11));
          float dotR = (1.0 - lum) * 0.55;
          col = mix(col, col * 0.55, step(length(c), dotR) * 0.6);
        }
        gl_FragColor = vec4(col, 1.0);
        #include <colorspace_fragment>
      }`
  }));
  broth.rotation.x = -Math.PI / 2; broth.position.y = 1.18; bowl.add(broth);

  // ---------- ingredients ----------
  const rand = (() => { let s = 7; return () => (s = (s * 16807) % 2147483647) / 2147483647; })();
  const items = [];
  const SURF = 1.2;
  const addItem = (mesh, kind, outline = 1.06) => {
    addOutline(mesh, outline);
    const a = rand() * Math.PI * 2, rr = Math.sqrt(rand()) * 1.02;
    const rest = new THREE.Vector3(Math.cos(a) * rr, SURF + 0.02 + rand() * 0.05, Math.sin(a) * rr);
    const sa = rand() * Math.PI * 2, sr = 2.0 + rand() * 1.3;
    const start = new THREE.Vector3(Math.cos(sa) * sr, 1.6 + rand() * 1.5, Math.sin(sa) * sr * 0.6);
    const restRot = new THREE.Euler(mesh.rotation.x, rand() * Math.PI * 2, mesh.rotation.z);
    const startRot = new THREE.Euler(rand() * 6, rand() * 6, rand() * 6);
    mesh.position.copy(start); bowl.add(mesh);
    items.push({ mesh, kind, rest, start, restRot, startRot, delay: rand() * 0.55, phase: rand() * 6.28 });
  };
  const C = opt.food;
  for (let i = 0; i < 6; i++) { const m = new THREE.Mesh(new THREE.BoxGeometry(0.62, 0.04, 0.36, 6, 1, 4), mat(C.beef, { r: 0.65 })); bendGeo(m.geometry, 0.35); m.rotation.x = 0.08; addItem(m, 'beef', 1.12); }
  for (let i = 0; i < 4; i++) { const m = new THREE.Mesh(new RoundedBox(0.3), mat(C.tofu, { r: 0.8, sheen: 0.4 })); addItem(m, 'tofu'); }
  for (let i = 0; i < 4; i++) { const m = new THREE.Mesh(new THREE.SphereGeometry(0.3, 20, 12), mat(i % 2 ? C.greenLight : C.green, { r: 0.45 })); m.scale.set(1.25, 0.16, 0.62); addItem(m, 'greens', 1.08); }
  for (let i = 0; i < 6; i++) {
    const m = new THREE.Mesh(new THREE.CapsuleGeometry(0.07, 0.42, 6, 14), mat(C.chilli, { r: 0.18, cc: 1 }));
    const stem = new THREE.Mesh(new THREE.CylinderGeometry(0.025, 0.035, 0.12, 8), mat(C.green, { r: 0.5 })); stem.position.y = 0.3; m.add(stem);
    m.rotation.z = Math.PI / 2; addItem(m, 'chilli', 1.18);
  }
  for (let i = 0; i < 14; i++) { const m = new THREE.Mesh(new THREE.IcosahedronGeometry(0.05, 1), mat(C.pepper, { r: 0.9 })); addItem(m, 'pepper', 1.2); }
  for (let i = 0; i < 5; i++) {
    const pts = []; const a0 = rand() * 6.28, rr = 0.25 + rand() * 0.55;
    for (let k = 0; k < 7; k++) { const a = a0 + k * 0.5; pts.push(new THREE.Vector3(Math.cos(a) * (rr + Math.sin(k) * 0.12), 0.02 * Math.sin(k * 2.0), Math.sin(a) * (rr + Math.cos(k) * 0.12))); }
    const m = new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts), 60, 0.035, 8), mat(C.noodle, { r: 0.4, cc: 0.4 }));
    addItem(m, 'noodle', 1.25);
  }
  for (let i = 0; i < 6; i++) { const m = new THREE.Mesh(new THREE.CircleGeometry(0.09, 10), mat(C.herb, { r: 0.6 })); m.material.side = THREE.DoubleSide; m.rotation.x = -Math.PI / 2; addItem(m, 'herb', 1.0); }
  items.filter(i => i.kind === 'noodle').forEach(i => { i.rest.set(0, SURF - 0.02, 0); i.restRot.set(0, i.restRot.y, 0); });

  // ---------- steam ----------
  const sc = document.createElement('canvas'); sc.width = sc.height = 64; const sx = sc.getContext('2d');
  const gr = sx.createRadialGradient(32, 32, 0, 32, 32, 32); gr.addColorStop(0, 'rgba(255,255,255,1)'); gr.addColorStop(1, 'rgba(255,255,255,0)');
  sx.fillStyle = gr; sx.fillRect(0, 0, 64, 64);
  const SN = window.innerWidth < 700 ? 34 : 60;
  const sPos = new Float32Array(SN * 3), sSeed = new Float32Array(SN);
  for (let i = 0; i < SN; i++) { sSeed[i] = Math.random(); }
  const sGeo = new THREE.BufferGeometry(); sGeo.setAttribute('position', new THREE.BufferAttribute(sPos, 3));
  const sMat = new THREE.PointsMaterial({ map: new THREE.CanvasTexture(sc), color: opt.steamColor, size: 0.9, transparent: true, opacity: 0.32, depthWrite: false, sizeAttenuation: true });
  const steam = new THREE.Points(sGeo, sMat); bowl.add(steam);

  // ---------- state ----------
  const tgt = { sx: 0, sy: 0, scale: 1, drop: 0, spice: 0.35, steam: 1 };
  const cur = { ...tgt, scale: reduce ? 1 : 0 };   // the bowl grows in on load
  const ptr = { x: 0, y: 0, cx: 0, cy: 0 };
  window.addEventListener('pointermove', e => { ptr.x = e.clientX / innerWidth * 2 - 1; ptr.y = e.clientY / innerHeight * 2 - 1; }, { passive: true });

  function resize() {
    const w = innerWidth, h = innerHeight;
    renderer.setSize(w, h, false); camera.aspect = w / h; camera.updateProjectionMatrix();
  }
  resize(); addEventListener('resize', resize);

  const right = new THREE.Vector3(), up = new THREE.Vector3(), fwd = new THREE.Vector3();
  function place() {
    // screen-space target (-1..1) to world, on the plane through camTarget facing the camera
    const d = camera.position.distanceTo(camTarget);
    const hh = Math.tan(THREE.MathUtils.degToRad(camera.fov / 2)) * d, ww = hh * camera.aspect;
    camera.getWorldDirection(fwd); right.crossVectors(fwd, camera.up).normalize(); up.crossVectors(right, fwd).normalize();
    root.position.copy(camTarget).addScaledVector(right, cur.sx * ww).addScaledVector(up, cur.sy * hh).addScaledVector(up, -0.75 * cur.scale);
    const fit = Math.min(1, camera.aspect / 1.1) * 0.62 + 0.38;
    root.scale.setScalar(Math.max(0.0001, cur.scale * fit));
  }

  const clock = new THREE.Clock(); let t = 0, running = true;
  document.addEventListener('visibilitychange', () => { running = !document.hidden; if (running) { clock.getDelta(); loop(); } });
  const ease = x => 1 - Math.pow(1 - x, 3);
  const k = (a, b, f) => a + (b - a) * f;

  function frame(dt) {
    const f = reduce ? 1 : 1 - Math.pow(0.0012, dt);   // frame-rate independent damping
    const fp = Math.min(1, f * 1.8);   // position follows faster than look changes, so an anchored bowl keeps up with scrolling
    for (const key in tgt) cur[key] = k(cur[key], tgt[key], key === 'sx' || key === 'sy' ? fp : f);
    ptr.cx = k(ptr.cx, ptr.x, f * 0.6); ptr.cy = k(ptr.cy, ptr.y, f * 0.6);
    if (!reduce) t += dt;
    brothU.uTime.value = t; brothU.uSpice.value = cur.spice;
    place();
    root.rotation.y = t * 0.12 + ptr.cx * 0.35;
    root.rotation.x = 0.06 + ptr.cy * 0.08;
    const chilliShow = Math.round(2 + cur.spice * 4);
    let ci = 0;
    for (const it of items) {
      const lt = Math.min(1, Math.max(0, (cur.drop - it.delay * 0.6) / 0.42));
      const e = ease(lt);
      it.mesh.position.lerpVectors(it.start, it.rest, e);
      if (lt < 1) it.mesh.position.y += Math.sin(t * 1.2 + it.phase) * 0.12 * (1 - e) + Math.sin(lt * Math.PI) * 0.6;
      else it.mesh.position.y += Math.sin(t * 1.6 + it.phase) * 0.01;
      it.mesh.rotation.set(k(it.startRot.x + t * 0.4 * (1 - e), it.restRot.x, e), k(it.startRot.y, it.restRot.y, e), k(it.startRot.z, it.restRot.z, e));
      if (it.kind === 'chilli') { const on = ci++ < chilliShow; it.mesh.scale.setScalar(k(it.mesh.scale.x, on ? 1 : 0.001, f)); }
    }
    const sp = sGeo.attributes.position.array;
    for (let i = 0; i < SN; i++) {
      const life = (sSeed[i] + t * 0.08) % 1; const a = sSeed[i] * 40 + t * 0.2;
      sp[i * 3] = Math.cos(a) * (0.3 + sSeed[i] * 0.9) * (1 - life * 0.3);
      sp[i * 3 + 1] = SURF + life * 2.6;
      sp[i * 3 + 2] = Math.sin(a) * (0.3 + sSeed[i] * 0.6);
    }
    sGeo.attributes.position.needsUpdate = true;
    sMat.opacity = 0.32 * cur.steam;
    renderer.render(scene, camera);
  }
  function loop() { if (!running) return; frame(Math.min(clock.getDelta(), 0.05)); requestAnimationFrame(loop); }
  frame(0.016); if (!reduce) loop();

  return {
    set(s) { Object.assign(tgt, s); if (reduce) { Object.assign(cur, tgt); frame(0); } },
    get state() { return { ...tgt }; }
  };
}

// Bend a flat box along X so beef slices curl like real thin-cut slices.
function bendGeo(g, amt) { const p = g.attributes.position; for (let i = 0; i < p.count; i++) { const x = p.getX(i); p.setY(i, p.getY(i) + x * x * amt); } g.computeVertexNormals(); }

// Soft-edged tofu cube without addons.
class RoundedBox extends THREE.BoxGeometry {
  constructor(s) { super(s, s, s, 4, 4, 4); const p = this.attributes.position, v = new THREE.Vector3();
    for (let i = 0; i < p.count; i++) { v.fromBufferAttribute(p, i); const n = v.clone().normalize().multiplyScalar(s * 0.62); v.lerp(n, 0.28); p.setXYZ(i, v.x, v.y, v.z); }
    this.computeVertexNormals(); }
}
