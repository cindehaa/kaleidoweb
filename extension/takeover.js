// Kaleidoweb takeover content script.
// Creates a full-viewport overlay hosting the experience in an extension-page
// iframe (sidesteps page CSP entirely; original DOM untouched underneath).
// Stage 1 of the latency budget: this shell must appear instantly (<200ms).
(() => {
  if (window.__kaleidoweb_active) return;
  window.__kaleidoweb_active = true;

  const host = document.createElement('div');
  host.id = '__kaleidoweb_host';
  host.style.cssText =
    'position:fixed;inset:0;z-index:2147483646;background:#0b0b0c;opacity:0;transition:opacity 240ms ease;';
  const shadow = host.attachShadow({ mode: 'closed' });

  const iframe = document.createElement('iframe');
  iframe.style.cssText = 'width:100%;height:100%;border:0;display:block;';
  // The experience page decides what to render for this URL.
  iframe.src =
    chrome.runtime.getURL('experience/index.html') +
    '?src=' +
    encodeURIComponent(location.href);
  // Stage 1: extract the page's content model and stream it into the
  // experience as soon as the iframe is ready.
  iframe.addEventListener('load', () => {
    try {
      const model = window.__kaleidoweb_extract?.();
      iframe.contentWindow.postMessage({ type: 'kw:model', model }, '*');
    } catch (e) {
      console.error('kaleidoweb extract failed', e);
    }
  });
  shadow.appendChild(iframe);

  // Unobtrusive escape hatch: small pill, bottom-right, inside the shadow root.
  const pill = document.createElement('button');
  pill.textContent = '↩ original';
  pill.style.cssText =
    'position:absolute;right:16px;bottom:16px;z-index:2;font:500 12px/1 system-ui;' +
    'padding:8px 12px;border-radius:999px;border:1px solid rgba(255,255,255,.25);' +
    'background:rgba(20,20,22,.7);color:#eee;cursor:pointer;backdrop-filter:blur(8px);';
  pill.addEventListener('click', restore);
  shadow.appendChild(pill);

  const prevOverflow = document.documentElement.style.overflow;
  document.documentElement.style.overflow = 'hidden';
  document.documentElement.appendChild(host);
  requestAnimationFrame(() => (host.style.opacity = '1'));

  function restore() {
    host.style.opacity = '0';
    setTimeout(() => {
      host.remove();
      document.documentElement.style.overflow = prevOverflow;
      window.__kaleidoweb_active = false;
    }, 260);
  }

  document.addEventListener('keydown', function onKey(e) {
    if (e.key === 'Escape' && window.__kaleidoweb_active) restore();
  });

  chrome.runtime.onMessage.addListener((msg) => {
    if (msg?.type === 'kw:toggle') restore();
  });
})();
