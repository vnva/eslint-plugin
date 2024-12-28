import { RuleContext } from '@typescript-eslint/utils/ts-eslint';
import { createRule } from '../utils/create-rule';
import { TSESTree } from '@typescript-eslint/utils';
import { isCloseAngleBracketToken, isOpenAngleBracketToken } from '../utils/type-guards';

type MessageIds = 'missingOpeningSpace' | 'missingClosingSpace' | 'rejectedOpeningSpace' | 'rejectedClosingSpace';
type Options = ['always' | 'never'];

export const RULE_NAME = 'space-in-generics';

export const spaceInGenerics = createRule<Options, MessageIds>({
  create: (context: RuleContext<MessageIds, Options>) => {
    const { sourceCode, options, report } = context;

    function checkSpace(node: TSESTree.Node, angleBracketToken: TSESTree.Token, neighborToken: TSESTree.Token | null, neighborPosition: 'after' | 'before') {
      if (!neighborToken) return;

      // Ignore multiline cases
      if (angleBracketToken.loc.end.line !== neighborToken.loc.start.line) return;

      const directedTokens: [TSESTree.Token, TSESTree.Token] = neighborPosition === 'after'
        ? [angleBracketToken, neighborToken]
        : [neighborToken, angleBracketToken];

      const isSpaceExists = sourceCode.isSpaceBetween(...directedTokens);
      const shouldSpaceExists = options[0] === 'always';

      // Ignore right cases
      if (isSpaceExists === shouldSpaceExists) return;

      if (
        // With other punctuators this solved by @stylistic/space-infix-ops
        neighborToken.type === TSESTree.AST_TOKEN_TYPES.Punctuator
        //                  ↓ ↓
        // For handle Array< [] > similar cases
        && !'[]{}()'.includes(neighborToken.value)
        //                              ↓
        // For handle Array<Array<string> > case
        && !(neighborToken.value === '>' && neighborPosition === 'after')
      ) return;

      //                                                       ↓           ↓
      // Solved by @stylistic/type-generic-spacing (type Nested <T, X> = any ;)
      if (node.type === TSESTree.AST_NODE_TYPES.TSTypeParameterDeclaration) {
        if (neighborPosition === 'before' && angleBracketToken.value === '<') return;
        if (neighborPosition === 'after' && angleBracketToken.value === '>') return;
      }

      const replacement = shouldSpaceExists ? ' ' : '';
      const messageId = shouldSpaceExists
        ? neighborPosition === 'after' ? 'missingOpeningSpace' : 'missingClosingSpace'
        : neighborPosition === 'after' ? 'rejectedOpeningSpace' : 'rejectedClosingSpace';

      report({
        messageId,
        node,
        loc: angleBracketToken.loc,
        fix: (f) => f.replaceTextRange([directedTokens[0].range[1], directedTokens[1].range[0]], replacement),
      });
    }

    function handleTSTypeParameterNode(node: TSESTree.Node) {
      const startToken = sourceCode.getFirstToken(node);
      const endToken = sourceCode.getLastToken(node);

      const angleBracketTokens = [startToken, endToken];
      if (!isOpenAngleBracketToken(startToken) || !isCloseAngleBracketToken(endToken)) return;

      for (const angleBracketToken of angleBracketTokens) {
        if (!angleBracketToken) continue;

        const afterToken = sourceCode.getTokenAfter(angleBracketToken);
        const beforeToken = sourceCode.getTokenBefore(angleBracketToken);

        checkSpace(node, angleBracketToken, afterToken, 'after');
        checkSpace(node, angleBracketToken, beforeToken, 'before');
      }
    }

    return {
      TSTypeParameterInstantiation: handleTSTypeParameterNode,
      TSTypeParameterDeclaration: handleTSTypeParameterNode,
    };
  },
  name: RULE_NAME,
  meta: {
    fixable: 'code',
    docs: { description: 'Enforce consistent spacing inside generics' },
    messages: {
      missingOpeningSpace: 'There must be a space after this angle bracket.',
      missingClosingSpace: 'There must be a space before this angle bracket.',
      rejectedOpeningSpace: 'There should be no space after this angle bracket.',
      rejectedClosingSpace: 'There should be no space before this angle bracket.',
    },
    type: 'problem',
    schema: [{ type: 'string', enum: ['always', 'never'] }],
  },
  defaultOptions: ['never'],
});
