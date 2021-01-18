## BUILD STAGE ONE

FROM node:14-alpine as midtrans-client
WORKDIR /app
COPY package*.json \
  .coveralls.yml \
  .editorconfig \
  .gitignore \
  .npmignore \
  .prettierrc \
  .travis.yml \
  config.ts \
  jest.config.ts \
  Makefile ./
COPY ./ /app
RUN apk add make \
  && make install

## BUILD STAGE TWO

FROM midtrans-client
WORKDIR /app
COPY --from=midtrans-client ./ /app
RUN make build