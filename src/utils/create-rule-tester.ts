import { createRuleTester as createRuleTesterRaw, RuleTesterInitOptions } from 'eslint-vitest-rule-tester';
import { parser } from 'typescript-eslint';

export function createRuleTester(options: Omit<RuleTesterInitOptions, 'config'>) {
  return createRuleTesterRaw({
    ...options,
    configs: {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      languageOptions: { parser: parser as any },
    },
  });
}
