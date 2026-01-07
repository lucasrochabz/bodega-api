#!/bin/bash
set -e

VERSION=$1

if [ -z "$VERSION" ]; then
  echo "Uso: ./tag.sh vX.Y.Z"
  exit 1
fi

git checkout main
git pull origin main

git tag -a "$VERSION" -m "Release $VERSION"
git push origin "$VERSION"

echo "Tag $VERSION criada e enviada com sucesso"
