import type { TSESTree } from '@typescript-eslint/utils';

export function isOpenAngleBracketToken(token: TSESTree.Token): token is TSESTree.PunctuatorToken {
  return token.value === '<';
};

export function isCloseAngleBracketToken(token: TSESTree.Token): token is TSESTree.PunctuatorToken {
  return token.value === '>';
}
