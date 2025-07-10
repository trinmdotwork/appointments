import React from 'react';
import {View} from 'react-native';

import {SPACING} from '@/constants/theme';

type TSeparator = {
  type?: 'horizontal' | 'vertical';
  size?: number;
  color?: string;
};

const Separator = (props: TSeparator) => {
  const {size = SPACING.L, type = 'vertical', color = 'transparent'} = props;

  if (type === 'vertical') {
    return <View style={{height: size || SPACING.L, backgroundColor: color}} />;
  }

  return <View style={{width: size || SPACING.L, backgroundColor: color}} />;
};

export default Separator;
