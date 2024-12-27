import { ESLintUtils } from '@typescript-eslint/utils';

export const createRule = ESLintUtils.RuleCreator((name) => `https://github.com/vnva/eslint-plugin/blob/main/src/rules/${name}.md`);
