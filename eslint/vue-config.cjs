/* eslint-env node */

module.exports = {
    extends: [
        'plugin:vue/vue3-recommended',
        '@vue/eslint-config-typescript',
        'plugin:vue/vue3-strongly-recommended',
    ],
    rules: {
        'vue/no-template-shadow': [
            'off'
        ],
        'vue/component-tags-order': [
            'error',
            {
                order: ['template', 'script', 'style'],
            },
        ],
        'vue/component-api-style': ['error', ['script-setup']],
        'vue/block-lang': [
            'error',
            {
                script: {
                    lang: 'ts',
                },
                style: {
                    lang: 'scss',
                },
            },
        ],
        'vue/block-tag-newline': [
            'error',
            {
                singleline: 'ignore',
                multiline: 'always',
                maxEmptyLines: 1,
            },
        ],
        'vue/component-name-in-template-casing': [
            'error',
            'PascalCase',
            {
                registeredComponentsOnly: true,
                ignores: [],
            },
        ],
        'vue/custom-event-name-casing': [
            'error',
            'kebab-case',
            {
                ignores: [],
            },
        ],
        'vue/define-emits-declaration': ['error', 'type-based'],
        'vue/define-macros-order': [
            'error',
            {
                order: ['defineProps', 'defineEmits'],
            },
        ],
        'vue/define-props-declaration': ['error', 'type-based'],
        'vue/html-indent': ['off'],
        'vue/html-self-closing': ['off'],
        'vue/multi-word-component-names': ['error'],
        'vue/max-attributes-per-line': ['off'],
        'vue/no-empty-component-block': ['off'],
        'vue/no-lone-template': [
            'error',
            {
                ignoreAccessible: false,
            },
        ],
        'vue/no-multiple-objects-in-class': ['error'],
        'vue/no-multiple-template-root': ['off'],
        'vue/no-mutating-props': [
            'error',
            {
                shallowOnly: true,
            },
        ],
        'vue/no-required-prop-with-default': ['error'],
        'vue/no-root-v-if': ['error'],
        'vue/no-useless-v-bind': ['error'],
        'vue/no-v-model-argument': ['off'],
        'vue/no-static-inline-styles': ['off'],
        'vue/padding-line-between-blocks': ['error', 'always'],
        'vue/prefer-define-options': ['error'],
        'vue/prefer-true-attribute-shorthand': ['error', 'always'],
        'vue/singleline-html-element-content-newline': ['off'],
        'vue/v-for-delimiter-style': ['error', 'in'],
        'vue/no-v-for-template-key': ['off']
    },
};
