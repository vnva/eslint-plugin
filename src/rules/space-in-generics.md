# @vnva/space-in-generics

Enforce consistent spacing inside generic type parameters.

## Rule Details

This rule enforces consistent spacing inside generic type parameters.

### Examples with "**never**" (default)

Examples of **incorrect** code:

```ts
interface Foo< T > {
  prop: T;
}

type Bar< T > = T;

class Example< T > implements Interface< T > {}

function example< T >(param: T): Array< T > {}

const map = new Map< string, number >();

type Nested< T > = Promise< Array< T > >;
```

Examples of **correct** code:


```ts
interface Foo<T> {
  prop: T;
}

type Bar<T> = T;

class Example<T> implements Interface<T> {}

function example<T>(param: T): Array<T> {}

const map = new Map<string, number>();

type Nested<T> = Promise<Array<T>>;
```

### Examples with "**always**"

Examples of **incorrect** code:

```ts
interface Foo<T> {
  prop: T;
}

type Bar<T, U> = T;

function example<T>(param: T): Array<T> {}

const map = new Map<string,number>();
```

Examples of **correct** code:


```ts
interface Foo< T > {
  prop: T;
}

type Bar< T, U > = T;

function example< T >(param: T): Array< T > {}

const map = new Map< string, number >();
```

### Options

This rule has one option:

- "never" (default) - disallows spaces inside generic type parameters
- "always" - requires spaces inside generic type parameters

### When Not To Use It
You can turn this rule off if you:

Don't want to enforce consistent spacing in generic type parameters
