#!/bin/bash

cd `dirname $0`

exit_code=0

execute_files=("openapi.yaml")

for file in $execute_files; do
	echo "Converting ../lambda/docs/openapi.yaml to json"
	pnpm dlx swagger-cli -r -t json -o ./${file%.*}.json bundle ../../../../lambda/docs/$file
	if [ $? -ne 0 ]; then
		exit_code=1
	fi
done

exit $exit_code
