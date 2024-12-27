import type { RuleContext } from '@typescript-eslint/utils/ts-eslint';
import type { TSESTree } from '@typescript-eslint/utils';
import { createRule } from '../utils/create-rule';
import { isCloseAngleBracketToken, isOpenAngleBracketToken } from '../utils/type-guards';

export const RULE_NAME = 'space-in-generics';

type MessageIds = 'missingOpeningSpace' | 'missingClosingSpace' | 'rejectedOpeningSpace' | 'rejectedClosingSpace';
type Options = ['always' | 'never' ];

export const spaceInGenerics = createRule<Options, MessageIds>({
  create: (context: RuleContext<MessageIds, Options>) => {
    const { sourceCode, options, report } = context;

    const shouldExistSpace = options[0] === 'always';

    function checkSpaceBetweenTokens(firstToken: TSESTree.Token, lastToken: TSESTree.Token, node: TSESTree.Node) {
      const isSpaceExists = sourceCode.isSpaceBetween(firstToken, lastToken);
      if (isSpaceExists === shouldExistSpace || firstToken.loc.end.line !== lastToken.loc.start.line) return;

      const bracketToken = ['>', '<'].includes(firstToken.value) ? firstToken : lastToken;
      const isOpeningBracket = bracketToken.value === '<';

      let messageId: MessageIds;
      let replacement: string;

      if (shouldExistSpace) {
        replacement = ' ';

        if (isOpeningBracket) {
          messageId = 'missingOpeningSpace';
        } else {
          messageId = 'missingClosingSpace';
        }
      } else {
        replacement = '';

        if (isOpeningBracket) {
          messageId = 'rejectedOpeningSpace';
        } else {
          messageId = 'rejectedClosingSpace';
        }
      }

      report({
        messageId,
        node,
        loc: bracketToken.loc,
        fix(fixer) {
          return fixer.replaceTextRange([firstToken.range[1], lastToken.range[0]], replacement);
        },
      });
    }

    return {
      TSTypeParameter(node) {
        const beforeNodeToken = sourceCode.getTokenBefore(node);
        const afterNodeToken = sourceCode.getTokenAfter(node);

        if (beforeNodeToken && isOpenAngleBracketToken(beforeNodeToken)) {
          const firstNodeToken = sourceCode.getFirstToken(node);
          if (firstNodeToken) checkSpaceBetweenTokens(beforeNodeToken, firstNodeToken, node);
        }

        if (afterNodeToken && isCloseAngleBracketToken(afterNodeToken)) {
          const lastNodeToken = sourceCode.getLastToken(node);
          if (lastNodeToken) checkSpaceBetweenTokens(lastNodeToken, afterNodeToken, node);
        }
      },
      TSTypeReference(node) {
        const beforeTypeReferenceToken = sourceCode.getTokenBefore(node);

        if (beforeTypeReferenceToken && isOpenAngleBracketToken(beforeTypeReferenceToken)) {
          const typeReferenceIdentifierToken = sourceCode.getFirstToken(node);

          if (typeReferenceIdentifierToken) {
            const afterTypeReferenceIdentifierToken = sourceCode.getTokenAfter(typeReferenceIdentifierToken);
            if (afterTypeReferenceIdentifierToken) {
              checkSpaceBetweenTokens(typeReferenceIdentifierToken, afterTypeReferenceIdentifierToken, node);
            }
          }
        }

        const typeReferenceTokens = sourceCode.getTokens(node);

        for (const token of typeReferenceTokens) {
          const isTokenOpeningBracket = isOpenAngleBracketToken(token);
          const isTokenClosingBracket = isCloseAngleBracketToken(token);

          if (!isTokenOpeningBracket && !isTokenClosingBracket) continue;

          if (isTokenOpeningBracket) {
            const nextToken = sourceCode.getTokenAfter(token);
            if (nextToken) checkSpaceBetweenTokens(token, nextToken, node);

            const prevToken = sourceCode.getTokenBefore(token);
            if (prevToken) checkSpaceBetweenTokens(prevToken, token, node);

            continue;
          }

          if (isTokenClosingBracket) {
            const prevToken = sourceCode.getTokenBefore(token);
            if (!prevToken) continue;

            checkSpaceBetweenTokens(prevToken, token, node);
          }
        }
      },
    };
  },
  name: RULE_NAME,
  meta: {
    fixable: 'code',
    docs: {
      description: 'Enforce consistent spacing inside generics',
    },
    messages: {
      missingOpeningSpace: 'There must be a space after this angle bracket.',
      missingClosingSpace: 'There must be a space before this angle bracket.',
      rejectedOpeningSpace: 'There should be no space after this angle bracket.',
      rejectedClosingSpace: 'There should be no space before this angle bracket.',
    },
    type: 'problem',
    schema: [{
      type: 'string',
      enum: ['always', 'never'],
    }],
  },
  defaultOptions: ['never'],
});
