import { createRuleTester } from '../utils/create-rule-tester';
import { RULE_NAME, spaceInGenerics } from './space-in-generics';

const ruleTester = createRuleTester({ name: RULE_NAME, rule: spaceInGenerics });

describe(RULE_NAME, () => {
  it('Valid cases', () => {
    ruleTester.valid('interface Foo<T> {}');
    ruleTester.valid('interface Foo<\nT> {}');
    ruleTester.valid('interface Foo<T, U> {}');
    ruleTester.valid('type Bar<T> = T;');
    ruleTester.valid('type Bar<T, U> = T & U;');
    ruleTester.valid('function foo<T>(arg: T): T { return arg; }');
    ruleTester.valid('const foo = <T>(arg: T): T => arg;');
    ruleTester.valid('const x: Array<string> = [];');
    ruleTester.valid('const x: Map<string, number> = new Map();');
    ruleTester.valid('const x: Promise<void> = Promise.resolve();');
    ruleTester.valid('const x: Array<Array<string>> = [];');
    ruleTester.valid('type Nested<T> = Promise<Array<T>>;');
  });

  it('Invalid cases', () => {
    ruleTester.invalid({ code: 'interface Foo< T> {}', output: (o) => expect(o).toMatchInlineSnapshot('"interface Foo<T> {}"') });
    ruleTester.invalid({ code: 'interface Foo<T > {}', output: (o) => expect(o).toMatchInlineSnapshot('"interface Foo<T> {}"') });
    ruleTester.invalid({ code: 'interface Foo< T > {}', output: (o) => expect(o).toMatchInlineSnapshot('"interface Foo<T> {}"') });

    ruleTester.invalid({ code: 'interface Foo< T, U> {}', output: (o) => expect(o).toMatchInlineSnapshot('"interface Foo<T, U> {}"') });
    ruleTester.invalid({ code: 'interface Foo<T, U > {}', output: (o) => expect(o).toMatchInlineSnapshot('"interface Foo<T, U> {}"') });
    ruleTester.invalid({ code: 'interface Foo< T, U > {}', output: (o) => expect(o).toMatchInlineSnapshot('"interface Foo<T, U> {}"') });

    ruleTester.invalid({ code: 'type Bar< T> = T;', output: (o) => expect(o).toMatchInlineSnapshot('"type Bar<T> = T;"') });
    ruleTester.invalid({ code: 'type Bar<T > = T;', output: (o) => expect(o).toMatchInlineSnapshot('"type Bar<T> = T;"') });
    ruleTester.invalid({ code: 'type Bar< T > = T;', output: (o) => expect(o).toMatchInlineSnapshot('"type Bar<T> = T;"') });

    ruleTester.invalid({ code: 'type Bar< T, U> = T & U;', output: (o) => expect(o).toMatchInlineSnapshot('"type Bar<T, U> = T & U;"') });
    ruleTester.invalid({ code: 'type Bar<T, U > = T & U;', output: (o) => expect(o).toMatchInlineSnapshot('"type Bar<T, U> = T & U;"') });
    ruleTester.invalid({ code: 'type Bar< T, U > = T & U;', output: (o) => expect(o).toMatchInlineSnapshot('"type Bar<T, U> = T & U;"') });

    ruleTester.invalid({ code: 'function foo< T>(arg: T): T { return arg; }', output: (o) => expect(o).toMatchInlineSnapshot('"function foo<T>(arg: T): T { return arg; }"') });
    ruleTester.invalid({ code: 'function foo<T >(arg: T): T { return arg; }', output: (o) => expect(o).toMatchInlineSnapshot('"function foo<T>(arg: T): T { return arg; }"') });
    ruleTester.invalid({ code: 'function foo< T >(arg: T): T { return arg; }', output: (o) => expect(o).toMatchInlineSnapshot('"function foo<T>(arg: T): T { return arg; }"') });

    ruleTester.invalid({ code: 'const foo = < T>(arg: T): T => arg;', output: (o) => expect(o).toMatchInlineSnapshot('"const foo = <T>(arg: T): T => arg;"') });
    ruleTester.invalid({ code: 'const foo = <T >(arg: T): T => arg;', output: (o) => expect(o).toMatchInlineSnapshot('"const foo = <T>(arg: T): T => arg;"') });
    ruleTester.invalid({ code: 'const foo = < T >(arg: T): T => arg;', output: (o) => expect(o).toMatchInlineSnapshot('"const foo = <T>(arg: T): T => arg;"') });

    ruleTester.invalid({ code: 'const x: Array< string> = [];', output: (o) => expect(o).toMatchInlineSnapshot('"const x: Array<string> = [];"') });
    ruleTester.invalid({ code: 'const x: Array<string > = [];', output: (o) => expect(o).toMatchInlineSnapshot('"const x: Array<string> = [];"') });
    ruleTester.invalid({ code: 'const x: Array< string > = [];', output: (o) => expect(o).toMatchInlineSnapshot('"const x: Array<string> = [];"') });

    ruleTester.invalid({ code: 'const x: Array< string | number> = [];', output: (o) => expect(o).toMatchInlineSnapshot('"const x: Array<string | number> = [];"') });
    ruleTester.invalid({ code: 'const x: Array<string | number > = [];', output: (o) => expect(o).toMatchInlineSnapshot('"const x: Array<string | number> = [];"') });
    ruleTester.invalid({ code: 'const x: Array< string | number > = [];', output: (o) => expect(o).toMatchInlineSnapshot('"const x: Array<string | number> = [];"') });

    ruleTester.invalid({ code: 'type X = Array<{ a: string} & { b: number } >;', output: (o) => expect(o).toMatchInlineSnapshot('"type X = Array<{ a: string} & { b: number }>;"') });
    ruleTester.invalid({ code: 'type X = Array< { a: string} & { b: number }>;', output: (o) => expect(o).toMatchInlineSnapshot('"type X = Array<{ a: string} & { b: number }>;"') });
    ruleTester.invalid({ code: 'type X = Array< { a: string} & { b: number } >;', output: (o) => expect(o).toMatchInlineSnapshot('"type X = Array<{ a: string} & { b: number }>;"') });

    ruleTester.invalid({ code: 'const x: Map< string, number> = new Map();', output: (o) => expect(o).toMatchInlineSnapshot('"const x: Map<string, number> = new Map();"') });
    ruleTester.invalid({ code: 'const x: Map<string, number > = new Map();', output: (o) => expect(o).toMatchInlineSnapshot('"const x: Map<string, number> = new Map();"') });
    ruleTester.invalid({ code: 'const x: Map< string, number > = new Map();', output: (o) => expect(o).toMatchInlineSnapshot('"const x: Map<string, number> = new Map();"') });

    ruleTester.invalid({ code: 'const x: Promise< void> = Promise.resolve();', output: (o) => expect(o).toMatchInlineSnapshot('"const x: Promise<void> = Promise.resolve();"') });
    ruleTester.invalid({ code: 'const x: Promise<void > = Promise.resolve();', output: (o) => expect(o).toMatchInlineSnapshot('"const x: Promise<void> = Promise.resolve();"') });
    ruleTester.invalid({ code: 'const x: Promise< void > = Promise.resolve();', output: (o) => expect(o).toMatchInlineSnapshot('"const x: Promise<void> = Promise.resolve();"') });

    ruleTester.invalid({ code: 'const x: Array< Array< string>> = [];', output: (o) => expect(o).toMatchInlineSnapshot('"const x: Array<Array<string>> = [];"') });
    ruleTester.invalid({ code: 'const x: Array<Array< string>> = [];', output: (o) => expect(o).toMatchInlineSnapshot('"const x: Array<Array<string>> = [];"') });
    ruleTester.invalid({ code: 'const x: Array< Array< string>> = [];', output: (o) => expect(o).toMatchInlineSnapshot('"const x: Array<Array<string>> = [];"') });
    ruleTester.invalid({ code: 'const x: Array < Array < string > > = [];', output: (o) => expect(o).toMatchInlineSnapshot('"const x: Array<Array<string>> = [];"') });

    ruleTester.invalid({ code: 'type Nested< T> = Promise< Array< T >>;', output: (o) => expect(o).toMatchInlineSnapshot('"type Nested<T> = Promise<Array<T>>;"') });
    ruleTester.invalid({ code: 'type Nested<T > = Promise< Array< T >>;', output: (o) => expect(o).toMatchInlineSnapshot('"type Nested<T> = Promise<Array<T>>;"') });
    ruleTester.invalid({ code: 'type Nested< T > = Promise< Array< T >>;', output: (o) => expect(o).toMatchInlineSnapshot('"type Nested<T> = Promise<Array<T>>;"') });
    ruleTester.invalid({ code: 'type Nested< T > = Promise < Array < T >>;', output: (o) => expect(o).toMatchInlineSnapshot('"type Nested<T> = Promise<Array<T>>;"') });

    ruleTester.invalid({ code: 'type X = Y< []>;', output: (o) => expect(o).toMatchInlineSnapshot('"type X = Y<[]>;"') });
    ruleTester.invalid({ code: 'type X = Y<[] >;', output: (o) => expect(o).toMatchInlineSnapshot('"type X = Y<[]>;"') });
    ruleTester.invalid({ code: 'type X = Y< [] >;', output: (o) => expect(o).toMatchInlineSnapshot('"type X = Y<[]>;"') });
  });

  it('Valid cases for similar problems, but solved with other rules', () => {
    // Solved by @stylistic/type-generic-spacing
    ruleTester.valid({ code: 'type Nested <T> = Promise<Array<T>> ;' });

    // Solved by @stylistic/space-infix-ops
    ruleTester.valid({ code: 'type X = Array< | string | number>;' });
    ruleTester.valid({ code: 'type X = Array< & { a: string} & { b: number }>;' });
  });
});
