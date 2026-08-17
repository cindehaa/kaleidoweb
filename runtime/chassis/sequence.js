/* ══════════════════════════════════════════════════════════════════
   CHASSIS · sequence + prose
     C1  persistent chrome with a position instrument (instrument:none
         is a first-class value)
     C2  scene sequencing with declared identity
     C3  claim-headings
     C4  hidden="until-found" subordination, one level, beforematch
     C9  pause affordance in a consistent position
     C13 scroll → state, never scroll → camera
     C14 escape from the guided path
   ══════════════════════════════════════════════════════════════════ */
(function (root) {
  'use strict';
  const KW = root.KW, U = KW.util, el = U.el;

  /* ═══════════════════════════ prose ═══════════════════════════ */
  const Prose = {
    /* C3 — the heading asserts something disputable, §2.12 */
    claim(text, tag) {
      const h = el(tag || 'h2', 'kw-claim');
      h.innerHTML = KW.Prose.inline(text);
      return h;
    },
    inline(s) {
      return String(s == null ? '' : s)
        .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
        .replace(/&lt;(\/?)(em|i|b)&gt;/g, '<$1$2>')
        .replace(/\bc\.\s/g, 'c. ');
    },
    lede(text) { const p = el('p', 'kw-lede'); p.innerHTML = KW.Prose.inline(text); return p; },

    /* the apparatus register keeps its stamp: one marker per block (§2.6) */
    note(text) {
      const p = el('p', 'kw-note kw-cat kw-stamped');
      p.innerHTML = '<span class="kw-seal" aria-hidden="true"></span><span class="kw-dtx">' + KW.Prose.inline(text) + '</span>';
      return p;
    },

    /* C4 — never display:none, so find-in-page reaches every word and
       beforematch opens the block that holds it. Truth is preserved by
       reachability, not by surface parity (§1.6). */
    fold(label, buildBody) {
      const wrap = el('div', 'kw-fold');
      const id = 'kwf' + (Prose._n = (Prose._n || 0) + 1);
      const tg = el('button', 'kw-fold-tg');
      tg.type = 'button';
      tg.setAttribute('aria-expanded', 'false');
      tg.setAttribute('aria-controls', id);
      tg.innerHTML = '<span class="kw-ex">+</span><span></span>';
      tg.lastChild.textContent = label;
      const body = el('div', 'kw-fold-body');
      body.id = id;
      buildBody(body);
      const paint = (open) => {
        tg.setAttribute('aria-expanded', String(open));
        if (open) body.removeAttribute('hidden'); else body.setAttribute('hidden', 'until-found');
        tg.querySelector('.kw-ex').textContent = open ? '–' : '+';
      };
      paint(false);
      tg.addEventListener('click', () => paint(tg.getAttribute('aria-expanded') !== 'true'));
      body.addEventListener('beforematch', () => paint(true));
      wrap.append(tg, body);
      return wrap;
    },

    paragraphs(items, host, opts) {
      (items || []).forEach((p) => {
        const n = el('p', 'kw-p');
        n.id = 'kw-' + p.id;
        n.dataset.pid = p.id;
        n.textContent = p.text;
        host.appendChild(n);
        if (opts && opts.figuresFor) opts.figuresFor(p, host);
      });
    },
  };
  KW.Prose = Prose;

  /* ═══════════════════════════ sequence ═══════════════════════════ */
  function Sequence(ctx) {
    const state = { list: [], nodes: {}, current: null, groups: [], paused: false };

    /* phase 3 — the scene list reserves scroll space per vh so nothing
       below jumps as bodies arrive. This is what makes streaming feel
       like loading rather than jumping. */
    function reserve(list) {
      state.list = list.map(([id, kind, name, vh]) => ({ id, kind, name, vh }));
      KW.Stage.drop(ctx);
      const host = ctx.sceneHost;
      host.innerHTML = '';
      state.list.forEach((s) => {
        const n = el('section', 'kw-scene kw-reserved');
        n.id = 'kw-' + s.id;
        n.dataset.id = s.id;
        n.dataset.kind = s.kind;
        n.dataset.name = s.name;
        if (s.vh) n.style.minHeight = s.vh + 'svh';
        host.appendChild(n);
        state.nodes[s.id] = n;
      });
      index();
      instrument();
    }

    /* C1 — the position instrument. `instrument:none` is legal: a build
       with nothing to measure prints no readout rather than "——:——". */
    function index() {
      const nav = ctx.chrome.querySelector('.kw-index');
      nav.innerHTML = '';
      state.list.forEach((s, i) => {
        const b = el('button');
        b.type = 'button';
        b.dataset.go = s.id;
        b.setAttribute('aria-current', String(i === 0));
        b.innerHTML = '<span>' + String(i).padStart(2, '0') + '</span><span class="kw-lbl"> ' + s.name + '</span>';
        b.addEventListener('click', () => goTo(s.id));
        nav.appendChild(b);
      });
    }

    function goTo(id) {
      for (const g of state.groups) if (g.has(id)) return g.goTo(id);
      const n = state.nodes[id];
      if (!n) return;
      if (state.list[0] && state.list[0].id === id) window.scrollTo({ top: 0, behavior: 'smooth' });
      else n.scrollIntoView({ behavior: 'smooth' });
    }

    /* the index tracks whichever scene owns the middle of the viewport */
    function instrument() {
      let raf = 0;
      const tick = () => {
        raf = 0;
        const mid = window.innerHeight / 2;
        let id = null;
        for (const s of state.list) {
          const n = state.nodes[s.id];
          if (!n) continue;
          const r = n.getBoundingClientRect();
          if (r.top <= mid && r.bottom >= mid) { id = s.id; break; }
        }
        for (const g of state.groups) { const sub = g.resolve(id); if (sub) id = sub; }
        if (!id) return;
        if (id !== state.current) {
          state.current = id;
          ctx.root.dataset.scene = id;
          ctx.chrome.querySelectorAll('.kw-index button').forEach((b) =>
            b.setAttribute('aria-current', String(b.dataset.go === id)));
        }
        ctx.root.dataset.dark = String(!!(state.darkScene && state.darkScene === id));
      };
      const on = () => { if (!raf) raf = requestAnimationFrame(tick); };
      window.addEventListener('scroll', on, { passive: true });
      window.addEventListener('resize', on, { passive: true });
      requestAnimationFrame(tick);
      state.poke = on;
    }

    /* C9 — motion never happens *to* the reader. One control, one
       position, every animated element obeys; C15 keeps it separate
       from prefers-reduced-motion, which is a different path. */
    function pause() {
      const b = ctx.chrome.querySelector('.kw-pause');
      b.addEventListener('click', () => {
        state.paused = !state.paused;
        b.setAttribute('aria-pressed', String(state.paused));
        b.querySelector('.kw-lbl').textContent = state.paused ? ' — paused' : ' — running';
        ctx.root.classList.toggle('kw-nomotion', state.paused);
        if (ctx.env) ctx.env.setPaused(state.paused);
      });
    }

    return {
      state, reserve, goTo,
      node: (id) => state.nodes[id],
      registerGroup: (g) => state.groups.push(g),
      markDark: (id) => { state.darkScene = id; if (state.poke) state.poke(); },
      poke: () => state.poke && state.poke(),
      wirePause: pause,
      /* C14 — the guided path must have an exit from the first screen */
      escapeTarget: () => {
        const rr = state.list.find((s) => s.kind === 'reading-room');
        return rr ? rr.id : null;
      },
    };
  }
  KW.Sequence = Sequence;
})(window);
