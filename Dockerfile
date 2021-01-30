## BUILD STAGE ONE

FROM node:12-alpine as midtrans-node
COPY package*.json \
	.coveralls.yml \
	.editorconfig \
	.gitignore \
	.npmignore \
	.prettierignore \
	.prettierrc \
	.eslintignore \
	.eslintrc \
	.travis.yml \
	config.ts \
	jest.config.ts \
	Makefile ./
COPY . ./
RUN apk add make \
	&& make install

## BUILD STAGE TWO

FROM midtrans-node
WORKDIR /app
COPY --from=midtrans-node ./ /app
RUN make build
CMD docker images