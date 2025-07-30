export default {
  '*.scss': ['stylelint --fix', 'prettier --write'],
  '*.{js,ts,tsx}': ['eslint --fix', 'prettier --write'],
};
