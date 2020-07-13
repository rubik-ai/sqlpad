SQLPAD_VERSION := 3

image:
	docker build --build-arg VERSION=${SQLPAD_VERSION} -t rubiklabs/sqlpad:${SQLPAD_VERSION} .

push:
	docker push rubiklabs/sqlpad:${SQLPAD_VERSION}