import React, {useCallback, useMemo} from 'react';
import {
  Image,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import styles from './styles';
import Typo from '../Typo';
import {ICLeftArrow} from '@/assets';

export interface IHeader {
  title?: string;
  isArrowLeft?: boolean;
  left?: React.ReactNode;
  right?: React.ReactNode; // Optional right element
  useSafeArea?: boolean;
  style?: ViewStyle;
  onBack?: () => void;
  titleStyle?: TextStyle;
  backgroundColor?: string;
  tintColor?: string;
  dismissMiniApp?: () => void;
  isDismissingMiniApp?: boolean;
}

const Header: React.FC<IHeader> = ({
  left,
  title,
  right,
  useSafeArea = true,
  style,
  isArrowLeft = true,
  onBack,
  titleStyle,
  backgroundColor,
  tintColor,
  dismissMiniApp = () => {},
  isDismissingMiniApp = false,
}) => {
  const inset = useSafeAreaInsets();

  const onBackHandle = useCallback(() => {
    if (isDismissingMiniApp) {
      dismissMiniApp?.();
      return;
    }
    onBack?.();
  }, [dismissMiniApp, isDismissingMiniApp, onBack]);

  const LeftBox = useMemo(() => {
    if (isArrowLeft) {
      return (
        <TouchableOpacity
          style={styles.back}
          onPress={onBackHandle}
          hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}>
          <Image source={ICLeftArrow} style={[styles.iconBack, {tintColor}]} />
        </TouchableOpacity>
      );
    }
    return left && <View style={styles.left}>{left}</View>;
  }, [isArrowLeft, left, onBackHandle, tintColor]);

  const RightBox = useMemo(
    () => right && <View style={styles.right}>{right}</View>,
    [right],
  );

  return (
    <View
      style={{
        ...styles.container,
        ...(useSafeArea ? {marginTop: inset.top} : {}),
        ...style,
        ...(backgroundColor ? {backgroundColor} : {}),
      }}>
      {LeftBox}
      <View style={styles.center}>
        {!!title && (
          <Typo
            typography="body1"
            fontWeight="semibold"
            colorCategory="textOnWhite"
            colorAlias="primary"
            style={[styles.title, titleStyle, tintColor && {color: tintColor}]}>
            {title}
          </Typo>
        )}
      </View>
      {RightBox}
    </View>
  );
};

export default Header;
