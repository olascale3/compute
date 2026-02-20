#!/bin/bash
set -e

cd apps/web
npx --yes next build
cd ../..
cp -r apps/web/public apps/web/.next/standalone/apps/web/public
cp -r apps/web/.next/static apps/web/.next/standalone/apps/web/.next/static
