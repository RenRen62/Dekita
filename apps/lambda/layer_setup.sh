#!/bin/bash
cd `dirname $0`
exit_code=0

rm -r layers

# lambda layerの作成
pnpm --filter=@dekita/lambda \
 --frozen-lockfile --prod install
rm -rf node_modules/.pnpm
rm -rf node_modules/.prisma/client/libquery_engine-darwin-*
rm -rf node_modules/prisma/libquery_engine-*
rm -rf node_modules/@prisma/engines

# node_modulesとutils以外を削除
mkdir -p layers/nodejs
mv dist/utils layers/nodejs/utils
cp -r node_modules layers/nodejs

pnpm --filter=@dekita/lambda prisma generate

exit $exit_code
