import { ClientModule } from '@docusaurus/types';

export default {
  onRouteDidUpdate({ location, previousLocation }) {
    if (location.pathname === '/admin') {
      console.log('boop');
    }
  },
} satisfies ClientModule;
