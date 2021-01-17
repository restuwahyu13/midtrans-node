## BUILD STAGE ONE

FROM nodejs:14-alpine as node
WORKDIR /app
COPY package*.json \
  .coveralls.yml \
  .editorconfig \
  .gitignore \
  .npmignore \
  .prettierrc \
  .travis.yml \
  config.ts \
  jest.config.js \
  Makefile ./
RUN apk make

## BUILD STAGE TWO

WORKDIR /app
COPY --from=node . /app
RUN npm install
CMD ["make", "build"]