/* ══════════════════════════════════════════════════════════════════
   THE ENVIRONMENT LAYER — two moments, never more than one alive.
   (DESIGN_PRINCIPLES §5.8; budget 2–4, spent on 2.)

   0 · THE VERDICT.  A woodblock has no continuous tone: at every
       point on the sheet the ink is either laid or it is not. That
       is a dither, not a gradient — so the ground behind his
       sentence is a dithered wave in two inks, the sheet and the
       pale indigo block measured off 06-fine-wind-clear-morning.jpg,
       moving at the speed of a swell rather than a UI.

   4 · THE TAIL.  The plate turns to sumi at eighty-eight. Grain in
       two blacks (08-thunderstorm, 14-lantern-ghost-oiwa), drifting
       so slowly it reads as night rather than as an empty div. The
       portrait stays the only figure; nothing else is drawn.

   Rules honoured: one live WebGL context at a time; reduced motion
   and the page's own pause both freeze it to a still frame; no
   WebGL means no canvas and the flat printed ground stands; every
   asset is local, so it runs from file://.
   ══════════════════════════════════════════════════════════════════ */
import {
  ShaderMount,
  ditheringFragmentShader, DitheringShapes, DitheringTypes,
  grainGradientFragmentShader, GrainGradientShapes,
  getShaderColorFromString, getShaderNoiseTexture,
} from './vendor/paper-shaders.js';

const C = (s) => getShaderColorFromString(s);

/* the same hexes the stylesheet uses, and the same provenance */
const SHEET = '#DDD4C5';   // 15-still-life.jpg, sheet margin
const PALE = '#9FB1C1';   // 06-fine-wind, pale blue band (one step down for contrast)
const SUMI = '#0D0B06';   // 08-thunderstorm, solid key-block field
const SUMI_2 = '#1C2739';   // 14-lantern-ghost-oiwa, the blue-black of a night block
const SUMI_3 = '#0A1017';

const MOMENTS = {
  m0: {
    host: '#env0',
    shader: ditheringFragmentShader,
    speed: 0.055,              // a swell, not an interface
    uniforms: {
      u_colorBack: C(SHEET),
      u_colorFront: C(PALE),
      u_shape: DitheringShapes.wave,
      u_type: DitheringTypes['4x4'],
      u_pxSize: 4.4,
      u_scale: 1.15,
      u_offsetY: 0,
      u_rotation: 0,
      u_offsetX: 0,
      u_originX: 0.5,
      u_originY: 0.5,
      u_worldWidth: 0,
      u_worldHeight: 0,
      u_fit: 0,
    },
  },
  m4: {
    host: '#env4',
    shader: grainGradientFragmentShader,
    speed: 0.035,              // slower still: this is the part of the axis he never reached
    uniforms: {
      u_colorBack: C(SUMI),
      u_colors: [C(SUMI_2), C(SUMI_3), C(SUMI)],
      u_colorsCount: 3,
      u_shape: GrainGradientShapes.wave,
      u_softness: 0.8,
      u_intensity: 0.5,
      u_noise: 0.55,
      u_scale: 1.1,
      u_rotation: 0,
      u_offsetX: 0,
      u_offsetY: 0,
      u_originX: 0.5,
      u_originY: 0.5,
      u_worldWidth: 0,
      u_worldHeight: 0,
      u_fit: 0,
    },
  },
};

let live = null;        // { key, mount }
let paused = false;
let supported = true;
const broken = {};      // a moment that failed for its own reasons, not WebGL's

/* the grain shader wants a loaded noise bitmap; the library refuses a
   half-loaded one. It ships as a data: URI, so this resolves offline. */
let noiseTex = null, noiseReady = false;
function ensureNoise(then) {
  if (noiseReady) return true;   // ready: the caller carries on, no callback, no recursion
  if (!noiseTex) {
    noiseTex = getShaderNoiseTexture();
    if (!noiseTex) return false;
    if (noiseTex.complete && noiseTex.naturalWidth) { noiseReady = true; then(); return true; }
    noiseTex.addEventListener('load', () => { noiseReady = true; then(); }, { once: true });
    noiseTex.addEventListener('error', () => { broken.m4 = true; }, { once: true });
  }
  return false;
}

function reduced() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

function speedFor(m) {
  return (paused || reduced()) ? 0 : m.speed;
}

let wanted = null;

function mount(key) {
  if (live && live.key === key) return;
  if (!supported || broken[key]) return;
  const m = MOMENTS[key];
  const host = document.querySelector(m.host);
  if (!host) return;
  const uniforms = Object.assign({}, m.uniforms);
  if (m.shader === grainGradientFragmentShader) {
    if (!ensureNoise(() => { if (wanted === key) mount(key); })) return;
    uniforms.u_noiseTexture = noiseTex;
  }
  unmount();
  try {
    const mnt = new ShaderMount(host, m.shader, uniforms, undefined, speedFor(m), 0, 1);
    live = { key, mount: mnt };
    host.dataset.on = '1';
  } catch (e) {
    // No WebGL2, or the context was refused: the flat printed ground stands.
    const msg = (e && e.message) || '';
    if (/WebGL/i.test(msg)) supported = false; else broken[key] = true;
    host.dataset.on = '0';
    const c = host.querySelector('canvas');
    if (c) c.remove();
  }
}

function unmount() {
  if (!live) return;
  try { live.mount.dispose(); } catch (e) { /* already gone */ }
  const host = document.querySelector(MOMENTS[live.key].host);
  if (host) {
    host.dataset.on = '0';
    const c = host.querySelector('canvas');
    if (c) c.remove();
  }
  live = null;
}

/* ── who is on screen, and what state is the plate in ── */
let plateState = 1;
let m0Visible = true;
let graphVisible = false;

function decide() {
  if (!supported) return;
  wanted = (graphVisible && plateState === 4) ? 'm4'
    : (m0Visible && !graphVisible) ? 'm0'
      : null;
  if (wanted) mount(wanted); else unmount();
}

function refreshSpeed() {
  if (!live) return;
  try { live.mount.setSpeed(speedFor(MOMENTS[live.key])); } catch (e) { /* disposed */ }
}

function boot() {
  const m0 = document.getElementById('m0');
  const graph = document.getElementById('plate');
  if (!m0 || !graph) return;
  if (!('IntersectionObserver' in window)) return;

  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.target === m0) m0Visible = e.isIntersecting;
      if (e.target === graph) graphVisible = e.isIntersecting && e.intersectionRatio > 0.5;
    });
    decide();
  }, { threshold: [0, 0.35, 0.7] });
  io.observe(m0);
  io.observe(graph);

  window.matchMedia('(prefers-reduced-motion: reduce)').addEventListener('change', refreshSpeed);
  ensureNoise(() => { if (wanted === 'm4') mount('m4'); });   // warm the bitmap before the tail arrives

  window.__hokusaiEnv = {
    setPlateState(n) { if (n === plateState) return; plateState = n; decide(); },
    setPaused(p) { paused = !!p; refreshSpeed(); },
  };
  decide();
}

if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
else boot();
