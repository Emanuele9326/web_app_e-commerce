require("@rushstack/eslint-patch/modern-module-resolution");

module.exports = {
    root: true,

    env: {
        node: true,
    },
    extends: ["eslint:recommended", "plugin:vue/vue3-essential", "prettier"],
    rules: {
        "no-console": "off",
    },
    parserOptions: {
        ecmaVersion: "latest",
    },
};