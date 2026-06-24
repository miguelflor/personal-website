import { tresLintConfig } from '@tresjs/eslint-config'

export default tresLintConfig({

}, {
  rules: {
    'style/max-statements-per-line': 'off',
    'style/member-delimiter-style': 'off',
    'style/quotes': 'off',
    'style/semi': 'off',
  },
})