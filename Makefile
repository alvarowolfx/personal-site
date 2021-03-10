
sync:
	pushd $(shell pwd)/scripts && go run main.go && popd

build:
	hugo

deploy-preview: build
	firebase hosting:channel:deploy v2_preview

deploy: build
	firebase deploy --only hosting
