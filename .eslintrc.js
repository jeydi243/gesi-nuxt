module.exports = {
  extends: [
    // add more generic rulesets here, such as:
    // 'eslint:recommended',
    "plugin:vue/vue3-recommended",
    "plugin:vue/base",
    // 'plugin:vue/recommended' // Use this if you are using Vue.js 2.x.
  ],
  rules: {
    // override/add rules settings here, such as:
    // 'vue/no-unused-vars': 'error'
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
