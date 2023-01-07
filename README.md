# @vnva/eslint-plugin

My eslint rules

## Installation

You'll first need to install [ESLint](https://eslint.org/):

```sh
npm i eslint --save-dev
```

Next, install `@vnva/eslint-plugin`:

```sh
npm install @vnva/eslint-plugin --save-dev
```

## Usage

Add `@vnva/eslint-plugin` to the plugins section of your `.eslintrc` configuration file. You can omit the `eslint-plugin-` prefix:

```json
{
  "plugins": ["@vnva/eslint-plugin"]
}
```

Then configure the rules you want to use under the rules section.

```json
{
  "rules": {
    "@vnva/rule-name": 2
  }
}
```

## Rules

<!-- begin auto-generated rules list -->

🔧 Automatically fixable by the [`--fix` CLI option](https://eslint.org/docs/user-guide/command-line-interface#--fix).

| Name                                                                 | Description                          | 🔧  |
| :------------------------------------------------------------------- | :----------------------------------- | :-- |
| [no-snake-case-identifiers](docs/rules/no-snake-case-identifiers.md) | Do not use snake_case, use camelCase | 🔧  |

<!-- end auto-generated rules list -->
