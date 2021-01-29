## BUILD STAGE ONE

FROM node:14-alpine as midtrans-client
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
COPY . ./
RUN apk add make \
  && make install

## BUILD STAGE TWO

FROM midtrans-client
COPY --from=midtrans-client ./ /app
WORKDIR /app
RUN make build