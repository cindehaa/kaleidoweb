// Experience bootstrap. v0: routes known benchmark demos; otherwise reports
// that the live pipeline is not wired yet. The full progressive pipeline
// (extract -> content model -> art direction -> streamed render) lands here.
const params = new URLSearchParams(location.search);
const src = params.get('src') || '';
const status = document.getElementById('status');

// Bundled demo experiences, keyed by Wikipedia article title.
const DEMOS = {
  Apollo_11: 'demos/apollo-11.html',
};

const m = src.match(/\/wiki\/([^?#]+)/);
const article = m ? decodeURIComponent(m[1]) : null;

if (article && DEMOS[article]) {
  location.replace(DEMOS[article]);
} else {
  status.textContent = article
    ? `no bundled experience for “${article.replace(/_/g, ' ')}” yet — live pipeline coming`
    : 'this page type is not supported yet';
}
