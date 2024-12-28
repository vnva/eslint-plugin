# @vnva/eslint-plugin

[![npm version][npm-version-src]][npm-version-href]

vnva's extended ESLint rules.

## Installation

```sh
npm i -D @vnva/eslint-plugin
```

## Usage

[Rules list](./src/rules)

```js
// eslint.config.mjs

import tsEslint from 'typescript-eslint';
import vnvaPlugin from '@vnva/eslint-plugin';

const CONFIG = [
  ...tsEslint.configs.strict,
  vnvaPlugin.configs.recommended,
]

export default CONFIG
```

## TODO
- [x] `space-in-generics`
  - `type X = Array< string | number >;`
- [ ] `no-array-type-space` 
  - `const x: string [] = [];`

## License

[MIT](./LICENSE) License © 2024-PRESENT [Vyacheslav Ananev](https://github.com/vnva)

[npm-version-src]: https://img.shields.io/npm/v/@vnva/eslint-plugin?style=flat&colorA=080f12&colorB=1fa669
[npm-version-href]: https://npmjs.com/package/@vnva/eslint-plugin
