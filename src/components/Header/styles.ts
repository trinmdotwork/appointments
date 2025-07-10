import {StyleSheet} from 'react-native';
import {HEADER_HEIGHT} from '@/constants/common';
import {SIZING, SPACING} from '@/constants/theme';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    height: HEADER_HEIGHT,
    width: '100%',
    paddingHorizontal: SPACING.L,
    flexDirection: 'row',
    position: 'relative',
  },
  text: {
    fontSize: SIZING.M,
  },
  left: {},
  right: {},
  title: {
    flex: 1,
  },
  center: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 32,
  },
  back: {
    width: 24,
    height: 24,
    ...StyleSheet.absoluteFillObject,
    top: 10,
    left: 16,
    zIndex: 1,
  },
  iconBack: {
    width: 24,
    height: 24,
  },
});

export default styles;
