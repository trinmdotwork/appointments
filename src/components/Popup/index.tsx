import Typo from '@/components/Typo';
import {SCREEN_WIDTH} from '@/constants/common';
import {COLOR_ALIAS, SIZING, SPACING} from '@/constants/theme';
import {scaleSize} from '@/utils/common';
import {errorHandler} from '@/utils/string';
import React, {useMemo} from 'react';
import {Trans} from 'react-i18next';
import {Image, Modal, ScrollView, StyleSheet, View} from 'react-native';
import Button from '../Button';
import Separator from '../Separator';

export interface IPopupProps {
  imageSource?: string;
  visible: boolean;
  onClose: () => void;
  onActionPress?: () => void;
  message?: string;
  description?: string;
  showActionButtons?: boolean;
  actionButtonText?: string;
  secondaryActionText?: string;
  secondaryActionPress?: () => void;
  renderMoreDetail?: React.ReactElement;
  type?: 'success' | 'warning' | 'failure';
  scrollable?: boolean;
  isAutoClose?: boolean;
}

const Popup: React.FC<IPopupProps> = ({
  imageSource,
  visible,
  onClose,
  onActionPress,
  message,
  description,
  showActionButtons = true,
  actionButtonText,
  secondaryActionText,
  secondaryActionPress,
  renderMoreDetail,
  type,
  scrollable = false,
  isAutoClose = false,
}) => {
  const IMGSource = useMemo(() => {
    if (imageSource) {
      return {
        uri: 'https://e7.pngegg.com/pngimages/36/445/png-clipart-success-illustration-success-free-blue-text.png',
      };
    }
    switch (type) {
      case 'success':
        return {
          uri: 'https://e7.pngegg.com/pngimages/36/445/png-clipart-success-illustration-success-free-blue-text.png',
        };
      case 'warning':
        return {
          uri: 'https://img.freepik.com/premium-psd/warning-lettering-with-warning-symbol-yellow-black-design-element-transparent-background_609989-2441.jpg',
        };
      case 'failure':
        return {
          uri: 'https://www.shutterstock.com/image-vector/error-message-red-vector-icon-260nw-1184478349.jpg',
        };
      default:
        return {
          uri: 'https://e7.pngegg.com/pngimages/36/445/png-clipart-success-illustration-success-free-blue-text.png',
        };
    }
  }, [type, imageSource]);

  const ViewContainer = scrollable ? ScrollView : View;

  if (!visible) {
    return null;
  }

  const backDropStyle = [styles.backDrop];

  const containerStyle = [styles.container];

  const textColorCategory = 'textOnWhite';
  const textColorAlias = 'secondary';

  return (
    <Modal
      animationType="fade"
      transparent
      visible={visible}
      onRequestClose={onClose}>
      <View style={backDropStyle}>
        <View style={containerStyle}>
          <Image source={IMGSource} style={styles.image} />

          <View
            style={[styles.contentContainer, isAutoClose && styles.autoClose]}>
            {message && (
              <Typo
                typography="body1"
                fontWeight="semibold"
                colorCategory={textColorCategory}
                colorAlias="primary"
                style={styles.message}>
                <Trans
                  i18nKey={message}
                  components={{
                    b: <Typo typography="body3" fontWeight="bold" />,
                  }}
                />
              </Typo>
            )}

            {description && (
              <Typo
                typography="body2"
                fontWeight="regular"
                colorCategory={textColorCategory}
                colorAlias={textColorAlias}
                style={styles.description}>
                <Trans
                  i18nKey={errorHandler(description)}
                  components={{
                    b: <Typo typography="body3" fontWeight="bold" />,
                  }}
                />
              </Typo>
            )}

            {!!renderMoreDetail && (
              <ViewContainer
                style={{maxHeight: scaleSize(196)}}
                showsVerticalScrollIndicator={false}>
                {renderMoreDetail}
              </ViewContainer>
            )}

            {showActionButtons && !isAutoClose && (
              <View style={styles.buttonsContainer}>
                {secondaryActionPress && (
                  <>
                    <Button
                      title={secondaryActionText || ''}
                      variant="secondary"
                      style={styles.button}
                      onPress={secondaryActionPress}
                      textStyle={{fontSize: SPACING.L}}
                    />
                    {onActionPress && <Separator type="horizontal" />}
                  </>
                )}

                {onActionPress && (
                  <Button
                    title={actionButtonText || ''}
                    variant="primary"
                    style={styles.button}
                    onPress={onActionPress || onClose}
                    textStyle={{fontSize: SPACING.L}}
                  />
                )}
              </View>
            )}
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  backDrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: SPACING.XXL,
  },
  container: {
    backgroundColor: COLOR_ALIAS.Surface.Lowest,
    borderRadius: SPACING.S,
    overflow: 'hidden',
    width: SCREEN_WIDTH - SPACING.L * 2,
  },
  contentContainer: {
    padding: SPACING.L,
  },
  iconContainer: {},
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },

  animation: {
    width: '100%',
    height: 136,
  },
  message: {
    textAlign: 'center',
    lineHeight: SIZING.XXL,
  },
  description: {
    marginTop: SPACING.XXS,
    textAlign: 'center',
    lineHeight: SIZING.XL,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: SPACING.XXL,
    backgroundColor: COLOR_ALIAS.Background.White,
  },
  autoClose: {
    paddingTop: 0,
  },
  button: {
    flex: 1,
  },
});

export default Popup;
