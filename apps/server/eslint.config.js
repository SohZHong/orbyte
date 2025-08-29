import base from '../../eslint.config.js';

export default [
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    settings: {
      react: { version: 'detect' },
    },
  },
  ...base,
];
