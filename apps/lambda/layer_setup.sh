#!/bin/bash
cd `dirname $0`
exit_code=0

rm -r layers

# lambda layerの作成
pnpm --filter=@dekita/lambda \
 --frozen-lockfile --prod install

# node_modulesとutils以外を削除
mkdir -p layers/nodejs
mv dist/utils layers/nodejs/utils
cp -r node_modules layers/nodejs

exit $exit_code
