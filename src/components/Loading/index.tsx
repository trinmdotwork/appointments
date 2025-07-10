import React from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';
import {COLOR_ALIAS} from '@/constants/theme';
import {TLoading} from '@/store/app/types';

const Loading = ({visible}: TLoading) => {
  if (!visible) {
    return null;
  }

  return (
    <View style={styles.container}>
      <ActivityIndicator
        animating
        size="large"
        color={COLOR_ALIAS.Background.Brand}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    top: 0,
    left: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    zIndex: 1000,
  },
});

export default Loading;
