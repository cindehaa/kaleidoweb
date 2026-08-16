/* Bundles the environment layer + its vendored shader runtime into one
   classic script, so the experience runs from file:// (ES-module imports
   are blocked at a file:// origin, and the shoot harness loads file URLs).
   Run: node experiences/hokusai/build-environment.mjs */
import { build } from 'esbuild';

const dir = new URL('.', import.meta.url).pathname;

await build({
  entryPoints: [dir + 'environment.src.mjs'],
  outfile: dir + 'environment.js',
  bundle: true,
  format: 'iife',
  target: ['chrome100', 'safari16', 'firefox110'],
  minify: true,
  legalComments: 'none',
  banner: { js: '/* Nothing Before Seventy — environment layer. Built from environment.src.mjs + vendor/paper-shaders.js (@paper-design/shaders 0.0.80). */' },
});

console.log('environment.js built');
