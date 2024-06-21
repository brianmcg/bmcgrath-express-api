import globals from 'globals';
import pluginJs from '@eslint/js';

export default [{
  files: ['**/*.js'],
  languageOptions: {
    sourceType: 'commonjs'
  }
}, {
  languageOptions: {
    globals: {
      ...globals.browser,
      process: 'readonly',
      Buffer: 'readonly',
    }
  }
},
  pluginJs.configs.recommended,
];
