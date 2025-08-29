// eslint.config.js
import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import reactHooksPlugin from 'eslint-plugin-react-hooks';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import nextPlugin from '@next/eslint-plugin-next';
import prettier from 'eslint-config-prettier';
import { fixupConfigRules, fixupPluginRules } from '@eslint/compat';
import react from 'eslint-plugin-react';

// react
react.configs.recommended.plugins = { react };
react.configs.recommended.languageOptions = {
  parserOptions: react.configs.recommended.parserOptions,
};
delete react.configs.recommended.parserOptions;

// react-hooks
reactHooksPlugin.configs.recommended.plugins = {
  'react-hooks': reactHooksPlugin,
};
if (reactHooksPlugin.configs.recommended.parserOptions) {
  reactHooksPlugin.configs.recommended.languageOptions = {
    parserOptions: reactHooksPlugin.configs.recommended.parserOptions,
  };
  delete reactHooksPlugin.configs.recommended.parserOptions;
}

// jsx-a11y
jsxA11y.configs.recommended.plugins = { 'jsx-a11y': jsxA11y };
if (jsxA11y.configs.recommended.parserOptions) {
  jsxA11y.configs.recommended.languageOptions = {
    parserOptions: jsxA11y.configs.recommended.parserOptions,
  };
  delete jsxA11y.configs.recommended.parserOptions;
}

// next
nextPlugin.configs.recommended.plugins = { '@next/next': nextPlugin };
if (nextPlugin.configs.recommended.parserOptions) {
  nextPlugin.configs.recommended.languageOptions = {
    parserOptions: nextPlugin.configs.recommended.parserOptions,
  };
  delete nextPlugin.configs.recommended.parserOptions;
}

export default [
  {
    ignores: ['**/node_modules/**', '**/.next/**', '**/dist/**', '**/build/**'],
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,

  ...fixupConfigRules(react.configs.recommended),
  ...fixupConfigRules(reactHooksPlugin.configs.recommended),
  ...fixupConfigRules(jsxA11y.configs.recommended),
  ...fixupConfigRules(nextPlugin.configs.recommended),

  ...(Array.isArray(prettier) ? prettier : [prettier]),

  {
    plugins: {
      react: fixupPluginRules(react),
      'react-hooks': fixupPluginRules(reactHooksPlugin),
      'jsx-a11y': fixupPluginRules(jsxA11y),
      '@next/next': fixupPluginRules(nextPlugin),
    },
    rules: {
      'react/react-in-jsx-scope': 'off',
      '@typescript-eslint/no-unused-vars': [
        'warn',
        { argsIgnorePattern: '^_' },
      ],
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
      '@next/next/no-html-link-for-pages': 'off',
    },
  },
];
