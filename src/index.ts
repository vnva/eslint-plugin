import { version } from '../package.json';
import { RULES } from './rules';

const plugin = {
  meta: { name: 'vnva', version },
  rules: RULES,
};

const configs = {
  recommended: {
    plugins: { vnva: plugin },
    rules: {
      'vnva/space-in-generics': 'error',
    },
  },
};

export default { plugin, configs };
