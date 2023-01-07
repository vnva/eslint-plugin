/**
 * @fileoverview Do not use snake_case, use camelCase
 * @author Vyacheslav Ananev
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const rule = require("../../../lib/rules/no-snake-case-identifiers"),
  RuleTester = require("eslint").RuleTester;


//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const ruleTester = new RuleTester();
ruleTester.run("no-snake-case-identifiers", rule, {
  valid: [
    // give me some code that won't trigger a warning
  ],

  invalid: [
    {
      code: "var snake_case = \"example\"",
      errors: [{ message: "Do not use snake_case, use camelCase.", type: "Identifier" }],
      output: "var snakeCase = \"example\""
    },
  ],
});
