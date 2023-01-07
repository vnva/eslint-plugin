# eslint-plugin-vnva

My eslint rules

## Installation

You'll first need to install [ESLint](https://eslint.org/):

```sh
npm i eslint --save-dev
```

Next, install `eslint-plugin-vnva`:

```sh
npm install eslint-plugin-vnva --save-dev
```

## Usage

Add `vnva` to the plugins section of your `.eslintrc` configuration file. You can omit the `eslint-plugin-` prefix:

```json
{
    "plugins": [
        "vnva"
    ]
}
```


Then configure the rules you want to use under the rules section.

```json
{
    "rules": {
        "vnva/rule-name": 2
    }
}
```

## Rules

<!-- begin auto-generated rules list -->

🔧 Automatically fixable by the [`--fix` CLI option](https://eslint.org/docs/user-guide/command-line-interface#--fix).

| Name                                                                 | Description                          | 🔧 |
| :------------------------------------------------------------------- | :----------------------------------- | :- |
| [no-snake-case-identifiers](docs/rules/no-snake-case-identifiers.md) | Do not use snake_case, use camelCase | 🔧 |

<!-- end auto-generated rules list -->


