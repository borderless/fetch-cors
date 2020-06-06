# Fetch CORS

[![NPM version][npm-image]][npm-url]
[![NPM downloads][downloads-image]][downloads-url]
[![Build status][travis-image]][travis-url]
[![Test coverage][coveralls-image]][coveralls-url]

> CORS middleware for [fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)-based router.

## Installation

```sh
npm install @borderless/fetch-cors --save
```

## Usage

```js
import { compose } from "throwback";
import { cors } from "@borderless/fetch-cors";
import { get } from "@borderless/fetch-router";

const app = compose([cors(), get("/test", () => new Response("hello world"))]);
```

## TypeScript

This project is written using [TypeScript](https://github.com/Microsoft/TypeScript) and publishes the definitions directly to NPM.

## License

MIT

[npm-image]: https://img.shields.io/npm/v/@borderless/fetch-cors.svg?style=flat
[npm-url]: https://npmjs.org/package/@borderless/fetch-cors
[downloads-image]: https://img.shields.io/npm/dm/@borderless/fetch-cors.svg?style=flat
[downloads-url]: https://npmjs.org/package/@borderless/fetch-cors
[travis-image]: https://img.shields.io/travis/BorderlessLabs/fetch-cors.svg?style=flat
[travis-url]: https://travis-ci.org/BorderlessLabs/fetch-cors
[coveralls-image]: https://img.shields.io/coveralls/BorderlessLabs/fetch-cors.svg?style=flat
[coveralls-url]: https://coveralls.io/r/BorderlessLabs/fetch-cors?branch=master
