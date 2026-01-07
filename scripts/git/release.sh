#!/bin/bash
set -e

VERSION=$1

if [ -z "$VERSION" ]; then
  echo "Uso: ./release.sh vX.Y.Z"
  exit 1
fi

git checkout develop
git pull origin develop

git checkout -b release/"$VERSION"
git push origin release/"$VERSION"

echo "Release $VERSION criada e enviada com sucesso"
