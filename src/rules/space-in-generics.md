# vnva/space-in-generics

Enforce consistent spacing inside generics.

## Rule Details

This rule aims to enforce consistent spacing inside generics.

Examples of **incorrect** code for this rule:

```ts
type Foo< T > = {
  foo: T;
};
```

Examples of **correct** code for this rule:

```ts
type Foo<T> = {
  foo: T;
};
```

### Options

This rule has a string option.

- `"never"` (default) disallows spacing inside generics.
- `"always"` enforces spacing inside generics.

## When Not To Use It

If you don't want to enforce consistent spacing inside generics.
