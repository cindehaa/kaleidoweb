#!/usr/bin/env bash
# Sync built benchmark experiences into the extension as bundled demos.
set -euo pipefail
cd "$(dirname "$0")/.."
mkdir -p extension/experience/demos
rm -rf extension/experience/demos/apollo-11
cp -r experiences/apollo-11 extension/experience/demos/apollo-11
rm -f extension/experience/demos/apollo-11/CONCEPTS.md extension/experience/demos/apollo-11/CRITIQUE-*.md
echo "bundled: $(du -sh extension/experience/demos/apollo-11 | cut -f1)"
