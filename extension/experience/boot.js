// Experience bootstrap.
// Stage 0: boot shell (instant). Stage 1: typographic takeover from the
// in-page content model (arrives via postMessage within ~100ms). Bundled
// demo experiences take over the frame entirely when available.
// Later stages (art direction, bespoke visuals) stream on top of stage 1.
const params = new URLSearchParams(location.search);
const src = params.get('src') || '';
const status = document.getElementById('status');

// Bundled demo experiences, keyed by Wikipedia article title.
const DEMOS = {
  Apollo_11: 'demos/apollo-11.html',
};

const m = src.match(/\/wiki\/([^?#]+)/);
const article = m ? decodeURIComponent(m[1]) : null;
let routedToDemo = false;

if (article && DEMOS[article]) {
  routedToDemo = true;
  fetch(DEMOS[article], { method: 'HEAD' })
    .then((r) => {
      if (r.ok) location.replace(DEMOS[article]);
      else routedToDemo = false;
    })
    .catch(() => (routedToDemo = false));
}

window.addEventListener('message', (e) => {
  if (e.data?.type !== 'kw:model' || routedToDemo) return;
  const model = e.data.model;
  if (!model || !model.sections?.length) {
    status.textContent = 'could not read this page yet';
    return;
  }
  renderInstantStage(model);
});

// Stage 1: a calm, well-set reading layer. This is the *loading state* of the
// real experience, never the destination — but it must already feel considered.
function renderInstantStage(model) {
  const lead = model.sections.find((s) => s.title === '__lead__');
  const rest = model.sections.filter((s) => s !== lead);
  const leadImage = model.images?.[0];

  document.body.innerHTML = '';
  document.body.style.cssText = 'display:block;overflow-y:auto;';
  const el = document.createElement('div');
  el.className = 'stage1';
  el.innerHTML = `
    <style>
      .stage1 { max-width: 1100px; margin: 0 auto; padding: 8vh 24px 20vh;
        font-family: Georgia, 'Times New Roman', serif; }
      .stage1 header { min-height: 44vh; display: flex; flex-direction: column; justify-content: flex-end;
        border-bottom: 1px solid #2a2a2e; padding-bottom: 40px; margin-bottom: 8px; }
      .stage1 .kicker { font-family: system-ui; font-size: 12px; letter-spacing: .28em;
        text-transform: uppercase; color: #77746c; margin: 0 0 18px; }
      .stage1 h1 { font-size: clamp(44px, 7vw, 92px); line-height: .98; font-weight: 400;
        letter-spacing: -.015em; margin: 0; color: #f2f0ea; }
      .stage1 .cols { display: grid; grid-template-columns: minmax(0,62ch) 1fr; gap: 56px; padding-top: 48px; }
      .stage1 .lead p { font-size: 20px; line-height: 1.62; color: #cfccc3; margin: 0 0 1.4em; }
      .stage1 .lead p:first-child::first-letter { font-size: 3.2em; float: left; line-height: .82;
        padding: .08em .12em 0 0; color: #f2f0ea; }
      .stage1 figure { margin: 0; }
      .stage1 img { width: 100%; height: auto; display: block; filter: saturate(.92); }
      .stage1 figcaption { font-family: system-ui; font-size: 12.5px; line-height: 1.5; color: #77746c; padding-top: 10px; }
      .stage1 section { border-top: 1px solid #222226; padding: 34px 0 10px; }
      .stage1 h2 { font-family: system-ui; font-size: 13px; letter-spacing: .22em;
        text-transform: uppercase; font-weight: 500; color: #a5a29a; margin: 0 0 18px; }
      .stage1 section p { max-width: 68ch; font-size: 17px; line-height: 1.66; color: #b9b6ae; margin: 0 0 1.3em; }
      .stage1 .pulse { font-family: system-ui; font-size: 12px; color: #55524c; letter-spacing: .2em;
        text-transform: uppercase; padding: 60px 0 0; text-align: center; animation: kwPulse 2.2s ease-in-out infinite; }
      @keyframes kwPulse { 50% { opacity: .35; } }
      @media (max-width: 900px) { .stage1 .cols { grid-template-columns: 1fr; } }
    </style>
    <header>
      <p class="kicker">Kaleidoweb · reading</p>
      <h1></h1>
    </header>
    <div class="cols">
      <div class="lead"></div>
      ${leadImage ? '<figure><img><figcaption></figcaption></figure>' : ''}
    </div>
    <div class="sections"></div>
    <p class="pulse">composing the experience</p>
  `;
  el.querySelector('h1').textContent = model.title;
  const leadEl = el.querySelector('.lead');
  (lead?.paragraphs || []).slice(0, 4).forEach(({ text }) => {
    const p = document.createElement('p');
    p.textContent = text;
    leadEl.appendChild(p);
  });
  if (leadImage) {
    el.querySelector('img').src = leadImage.src;
    el.querySelector('figcaption').textContent = leadImage.caption || '';
  }
  const sectionsEl = el.querySelector('.sections');
  rest.forEach((s) => {
    if (!s.paragraphs.length) return;
    const sec = document.createElement('section');
    const h = document.createElement('h2');
    h.textContent = s.title;
    sec.appendChild(h);
    s.paragraphs.forEach(({ text }) => {
      const p = document.createElement('p');
      p.textContent = text;
      sec.appendChild(p);
    });
    sectionsEl.appendChild(sec);
  });
  document.body.appendChild(el);
}
