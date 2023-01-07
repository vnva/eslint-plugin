/**
 * @fileoverview Do not use snake_case, use camelCase
 * @author Vyacheslav Ananev
 */
"use strict";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

/** @type {import('eslint').Rule.RuleModule} */
module.exports = {
  meta: {
    type: "suggestion", // `problem`, `suggestion`, or `layout`
    docs: {
      description: "Do not use snake_case, use camelCase",
      recommended: true,
      url: "", // URL to the documentation page for this rule
    },
    fixable: "code", // Or `code` or `whitespace`
    schema: [], // Add a schema if the rule has options
    messages: {
      "no-snake-case-identifiers": "Do not use snake_case, use camelCase."
    }
  },

  create(context) {
    // variables should be defined here

    //----------------------------------------------------------------------
    // Helpers
    //----------------------------------------------------------------------

    const snakeCaseToCamelCase = (string) => {
      return string.toLowerCase()
      .replace(/([-_][a-z])/g, (group) =>
        group.toUpperCase().replace("-", "").replace("_", "")
      );

    }

    // any helper functions should go here or else delete this section

    //----------------------------------------------------------------------
    // Public
    //----------------------------------------------------------------------

    return {
      Identifier(node) {
        if (node.name.slice(1, node.name.length - 1).includes("_")) {
          context.report({
            node,
            messageId: "no-snake-case-identifiers",
            fix(fixer) {
              return fixer.replaceText(node, snakeCaseToCamelCase(node.name));
            }
          });
        }
      }
    };
  },
};
