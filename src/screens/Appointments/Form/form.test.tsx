import {it, jest} from '@jest/globals';
import React from 'react';
import 'react-native';
import renderer from 'react-test-renderer';

import Home from '.';

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (str: string) => str,
    i18n: {
      changeLanguage: () =>
        new Promise(() => {
          console.log('');
        }),
    },
  }),
}));

it('renders correctly', () => {
  renderer.create(<Home />);
});
