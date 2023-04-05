module.exports = {
  extends: ["@nuxtjs/eslint-config-typescript", "plugin:vue/vue3-recommended", "plugin:vue/base"],
  rules: {
    "comma-dangle": ["off", "always-multiline"],
    "vue/no-unused-vars": "error",
    "vue/valid-v-model": 0,
    "vue/require-component-is": 0,
    "vue/component-definition-name-casing": ["off", "kebab-case" | "PascalCase"],
    "vue/singleline-html-element-content-newline": [
      "off",
      {
        ignoreWhenNoAttributes: true,
        ignoreWhenEmpty: true,
        ignores: ["pre", "textarea"],
      },
    ],
    "vue/html-indent": [
      "off",
      "4",
      {
        attribute: 2,
        baseIndent: 2,
        closeBracket: 0,
        alignAttributesVertically: true,
        ignores: [],
      },
    ],
    "vue/html-closing-bracket-newline": "off",
    "vue/max-attributes-per-line": [
      "off",
      {
        singleline: {
          max: 7,
        },
        multiline: {
          max: 7,
        },
      },
    ],
    "vue/multi-word-component-names": [
      "off",
      {
        ignores: [],
      },
    ],
    "no-tabs": ["off", "always"],
    "arrow-parens": ["off", "always"],
    "space-before-function-paren": ["off", "always"],
    "vue/html-self-closing": [
      "off",
      {
        html: {
          void: "never",
          normal: "always",
          component: "always",
        },
        svg: "always",
        math: "always",
      },
    ],
    "vue/attributes-order": [
      "off",
      {
        order: ["DEFINITION", "LIST_RENDERING", "CONDITIONALS", "RENDER_MODIFIERS", "GLOBAL", ["UNIQUE", "SLOT"], "TWO_WAY_BINDING", "OTHER_DIRECTIVES", "OTHER_ATTR", "EVENTS", "CONTENT"],
        alphabetical: false,
      },
    ],
    quotes: ["off", "single", "double"],
    "vue/script-indent": [
      "off",
      2,
      {
        baseIndent: 4,
        switchCase: 1,
        ignores: [],
      },
    ],
  },
}
