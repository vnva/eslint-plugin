import { TSESTree } from '@typescript-eslint/utils';

export function isOpenAngleBracketToken(token: TSESTree.Token | null): token is TSESTree.PunctuatorToken {
  if (!token) return false;

  return token.value === '<' && token.type === TSESTree.AST_TOKEN_TYPES.Punctuator;
};

export function isCloseAngleBracketToken(token: TSESTree.Token | null): token is TSESTree.PunctuatorToken {
  if (!token) return false;

  return token.value === '>' && token.type === TSESTree.AST_TOKEN_TYPES.Punctuator;
}
