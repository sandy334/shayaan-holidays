#!/usr/bin/env bash
# Builds a static export and publishes it to the gh-pages branch (GitHub Pages).
# Usage: npm run deploy:pages
set -euo pipefail

cd "$(dirname "$0")/.."

REMOTE_URL="$(git remote get-url origin)"
REPO_NAME="$(basename -s .git "$REMOTE_URL")"
OWNER="$(basename "$(dirname "$REMOTE_URL")" | sed 's/.*://')"

export GITHUB_PAGES=true
# Custom domain: CUSTOM_DOMAIN=www.example.in npm run deploy:pages
if [[ -n "${CUSTOM_DOMAIN:-}" ]]; then
  export PAGES_BASE_PATH=""
  export NEXT_PUBLIC_SITE_URL="https://${CUSTOM_DOMAIN}"
else
  export PAGES_BASE_PATH="/${REPO_NAME}"
  export NEXT_PUBLIC_SITE_URL="https://${OWNER}.github.io/${REPO_NAME}"
fi

rm -rf .next out
npx next build

# Let GitHub Pages serve the _next/ folder (Jekyll would hide it).
touch out/.nojekyll
if [[ -n "${CUSTOM_DOMAIN:-}" ]]; then echo "$CUSTOM_DOMAIN" > out/CNAME; fi

cd out
git init -q -b gh-pages
git add -A
git -c user.name="$(git -C .. config user.name || echo deploy)" \
    -c user.email="$(git -C .. config user.email || echo deploy@localhost)" \
    commit -q -m "Deploy $(git -C .. rev-parse --short HEAD)"
git push -q -f "$REMOTE_URL" gh-pages
cd ..
rm -rf out/.git

echo "Deployed to ${NEXT_PUBLIC_SITE_URL}/"
