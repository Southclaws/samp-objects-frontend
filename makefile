VERSION := $(shell cat VERSION)

build:
	docker build -t southclaws/samp-objects-frontend:$(VERSION) \
		--build-arg app_env=production \
		.

push:
	docker push southclaws/samp-objects-frontend:$(VERSION) 

run:
	-docker kill samp-objects-frontend
	-docker rm samp-objects-frontend
	docker run \
		--name samp-objects-frontend \
		-p 3000:3000 \
		-d \
		southclaws/samp-objects-frontend:$(VERSION)
