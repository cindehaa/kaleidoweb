/* ══════════════════════════════════════════════════════════════════
   CHASSIS · env
     C8  environment moments: IntersectionObserver-mounted, ONE live at
         a time, three fallbacks
     C15 reduced-motion and no-WebGL are two SEPARATE paths, never
         conflated, and the reader's pause is a third

   §5.8 ceremonial placement: env is legal only on plate / overture /
   coda / plot-state scenes, and never more than four.
   ══════════════════════════════════════════════════════════════════ */
(function (root) {
  'use strict';
  const KW = root.KW;

  const CEREMONIAL = { plate: 1, overture: 1, coda: 1, 'plot-state': 1 };
  const TREATMENTS = ['dither', 'grain-gradient', 'god-rays', 'stars', 'still-image', 'data-field', 'none'];

  function Env(ctx) {
    const S = root.KW_SHADERS || null;
    const moments = [];
    let live = null, paused = false, supported = !!S, sceneOn = {}, stateOf = {}, noise = null, noiseReady = false;
    const broken = {};

    if (!S) ctx.notes.push('no shader runtime present — every environment moment collapses to its flat printed ground');

    const reduced = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const speedFor = (m) => (paused || reduced() ? 0 : m.speed);

    function register(rec) {
      if (moments.length >= 4) { ctx.notes.push('env ' + rec.id + ' dropped — the §5.8 budget is four moments'); return false; }
      const scene = ctx.scenes[rec.scene];
      const kind = scene ? scene.kind : null;
      if (!CEREMONIAL[kind]) { ctx.notes.push('env ' + rec.id + ' dropped — ' + (kind || 'unknown') + ' is not a ceremonial placement (§5.8)'); return false; }
      let treatment = rec.treatment;
      if (TREATMENTS.indexOf(treatment) < 0) { ctx.notes.push('env ' + rec.id + ': unknown treatment "' + treatment + '" → none'); treatment = 'none'; }
      if (treatment === 'none') return false;
      moments.push({ ...rec, treatment, kind });
      return true;
    }

    /* a kit may fold several scenes onto one surface (a sticky plate is
       not five scenes); it registers the host and the state to gate on. */
    function aliasFor(m) { return (ctx.envAlias && ctx.envAlias[m.scene]) || null; }
    function hostFor(m) {
      const a = aliasFor(m);
      if (a) return a.host;
      const n = ctx.sequence.node(m.scene);
      if (!n) return null;
      return n.querySelector('.kw-env[data-scene="' + m.scene + '"]') || n.querySelector('.kw-env');
    }

    /* the grain shader wants a decoded noise bitmap and the library
       refuses a half-loaded one. It ships as a data: URI, so this
       resolves offline. */
    function ensureNoise(then) {
      if (noiseReady) return true;
      if (!noise) {
        noise = S.getShaderNoiseTexture ? S.getShaderNoiseTexture() : null;
        if (!noise) return false;
        if (noise.complete && noise.naturalWidth) { noiseReady = true; return true; }
        noise.addEventListener('load', () => { noiseReady = true; then(); }, { once: true });
        noise.addEventListener('error', () => { broken.grain = true; }, { once: true });
      }
      return false;
    }

    function uniformsFor(m) {
      const C = S.getShaderColorFromString;
      const p = m.params || {}, pal = m.palette || [];
      const base = {
        u_offsetX: 0, u_offsetY: 0, u_originX: 0.5, u_originY: 0.5,
        u_worldWidth: 0, u_worldHeight: 0, u_fit: 0, u_rotation: 0,
        u_scale: p.scale != null ? p.scale : 1,
      };
      if (m.treatment === 'dither') {
        return [S.ditheringFragmentShader, Object.assign(base, {
          u_colorBack: C(pal[0] || '#ffffff'),
          u_colorFront: C(pal[1] || pal[0] || '#000000'),
          u_shape: (S.DitheringShapes || {})[p.shape] != null ? S.DitheringShapes[p.shape] : 1,
          u_type: (S.DitheringTypes || {})[p.type] != null ? S.DitheringTypes[p.type] : 1,
          u_pxSize: p.px != null ? p.px : 4,
        })];
      }
      if (m.treatment === 'grain-gradient') {
        if (!ensureNoise(() => decide())) { ctx.notes.push('env ' + m.id + ': noise bitmap not ready yet'); return null; }
        return [S.grainGradientFragmentShader, Object.assign(base, {
          u_colorBack: C(pal[0] || '#000000'),
          u_colors: (pal.slice(1).length ? pal.slice(1) : pal).map(C),
          u_colorsCount: Math.max(1, pal.slice(1).length || pal.length),
          u_shape: (S.GrainGradientShapes || {})[p.shape] != null ? S.GrainGradientShapes[p.shape] : 1,
          u_softness: p.softness != null ? p.softness : 0.5,
          u_intensity: p.intensity != null ? p.intensity : 0.5,
          u_noise: p.noise != null ? p.noise : 0.5,
          u_noiseTexture: noise,
        })];
      }
      return null;
    }

    function mount(m) {
      if (live && live.id === m.id) return;
      if (!supported || broken[m.id]) return;
      const host = hostFor(m);
      if (!host) return;
      const u = uniformsFor(m);
      if (!u) return;
      unmount();
      try {
        const mnt = new S.ShaderMount(host, u[0], u[1], undefined, speedFor(m), 0, 1);
        live = { id: m.id, m, mount: mnt };
        host.dataset.on = '1';
      } catch (e) {
        /* no WebGL2, or the context was refused: the flat printed ground
           stands and the orphan canvas is removed. */
        const msg = (e && e.message) || '';
        if (/webgl/i.test(msg)) { supported = false; ctx.notes.push('no WebGL — every environment moment fell back to its flat ground'); }
        else { broken[m.id] = true; ctx.notes.push('env ' + m.id + ' (' + m.treatment + ') refused to mount: ' + msg + ' — its flat ground stands'); }
        host.dataset.on = '0';
        const c = host.querySelector('canvas');
        if (c) c.remove();
      }
    }

    function unmount() {
      if (!live) return;
      try { live.mount.dispose(); } catch (e) { /* already gone */ }
      const host = hostFor(live.m);
      if (host) { host.dataset.on = '0'; const c = host.querySelector('canvas'); if (c) c.remove(); }
      live = null;
    }

    /* one live at a time: the moment whose scene is on screen AND whose
       declared state (if any) is the state that scene is in. */
    function decide() {
      if (!supported) return;
      let want = null;
      for (const m of moments) {
        const a = aliasFor(m);
        const watch = a ? a.owner : m.scene;
        if (!sceneOn[watch]) continue;
        if (a && stateOf[watch] !== a.state) continue;
        if (!a && m.state != null && stateOf[m.scene] !== m.state) continue;
        want = m; break;
      }
      if (want) mount(want); else unmount();
    }

    function observe() {
      if (!('IntersectionObserver' in window)) return;
      /* measure the share of the VIEWPORT the moment occupies, not the
         share of the element: a five-viewport scene is never 35% visible
         by its own measure and would never arm. */
      const io = new IntersectionObserver((entries) => {
        entries.forEach((e) => {
          const rootH = (e.rootBounds && e.rootBounds.height) || window.innerHeight;
          const denom = Math.max(1, Math.min(rootH, e.boundingClientRect.height));
          const share = e.intersectionRect.height / denom;
          sceneOn[e.target.dataset.envScene] = e.isIntersecting && share > 0.35;
        });
        decide();
      }, { threshold: [0, 0.2, 0.35, 0.7, 1] });
      moments.forEach((m) => {
        const a = aliasFor(m);
        const n = a ? a.node : ctx.sequence.node(m.scene);
        if (!n) return;
        n.dataset.envScene = a ? a.owner : m.scene;
        io.observe(n);
      });
      window.matchMedia('(prefers-reduced-motion: reduce)').addEventListener('change', refresh);
      decide();
    }

    function refresh() {
      if (!live) return;
      try { live.mount.setSpeed(speedFor(live.m)); } catch (e) { /* disposed */ }
    }

    return {
      register, decide,
      start: observe,
      setPaused(p) { paused = !!p; refresh(); },
      setState(sceneId, s) { if (stateOf[sceneId] === s) return; stateOf[sceneId] = s; decide(); },
      count: () => moments.length,
      supported: () => supported,
    };
  }
  KW.Env = Env;
})(window);
