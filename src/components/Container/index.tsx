import {useNavigationState, useRoute} from '@react-navigation/native';
import React, {useCallback, useEffect, useMemo} from 'react';
import {useTranslation} from 'react-i18next';
import {
  BackHandler,
  ImageBackground,
  Keyboard,
  ScrollView,
  ScrollViewProps,
  StyleSheet,
  TouchableWithoutFeedback,
  type StyleProp,
  type ViewStyle,
} from 'react-native';
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';
import {pascalToCamel} from '@/utils/string';
import {useHeader} from '@/hooks/UICustomization';
import {COLOR_ALIAS} from '@/constants/theme';
import {IHeader} from '../Header';
import {navigationServices} from '@/utils/navigationServices';

interface IContainerOptions {
  shownTitle: boolean;
  tintColor?: string;
}

interface IContainerProps {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  backgroundImage?: any;
  imageStyle?: StyleProp<ViewStyle> | object;
  headerRight?: React.ReactNode;
  options?: IContainerOptions;
  scrollViewProps?: ScrollViewProps;
  HeaderComponents?: React.ReactNode;
  FooterComponents?: React.ReactNode;
  scrollable?: boolean;
  extraHeight?: number;
  avoidOffset?: number;
  heightBottom?: number;
  canResetRoute?: boolean;
  contentContainerStyle?: StyleProp<ScrollView> | object;
  headerProps?: IHeader;
  fulled?: boolean;
  onBack?: () => void;
}

const Container: React.FC<IContainerProps> = ({
  children,
  style,
  backgroundImage,
  imageStyle = {},
  headerRight,
  options = {shownTitle: true},
  scrollViewProps,
  HeaderComponents,
  FooterComponents,
  scrollable = true,
  canResetRoute = false,
  contentContainerStyle = {},
  headerProps = {},
  fulled = false,
  onBack,
}) => {
  const {t} = useTranslation();
  const route = useRoute();
  const {
    components: {Header},
  } = useHeader();
  const routes = useNavigationState(state => state.routes);

  const inset = useSafeAreaInsets();

  const backAction = useCallback(() => {
    if (onBack) {
      onBack?.();
      return true;
    }
    if (routes?.length === 1) {
    } else {
      canResetRoute
        ? navigationServices.navigate('HomeAppointment')
        : navigationServices.goBack();
    }
    return true;
  }, [canResetRoute, onBack, routes?.length]);

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, [routes.length, canResetRoute, backAction]);

  const ContentView = useMemo(() => {
    if (scrollable) {
      return (
        <ScrollView
          contentContainerStyle={[{paddingBottom: 80}, contentContainerStyle]}
          nestedScrollEnabled
          showsVerticalScrollIndicator={false}
          {...scrollViewProps}>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <>{children}</>
          </TouchableWithoutFeedback>
        </ScrollView>
      );
    }

    return children;
  }, [scrollable, children, contentContainerStyle, scrollViewProps]);

  return (
    <SafeAreaView style={[styles.container, style]} edges={['left', 'right']}>
      {fulled ? (
        <ImageBackground
          source={backgroundImage}
          resizeMode="stretch"
          style={[{height: '100%', width: '100%'}, imageStyle]}>
          <Header
            title={options?.shownTitle ? t(pascalToCamel(route.name)) : ''}
            onBack={onBack ?? navigationServices.goBack}
            useSafeArea
            backgroundColor="transparent"
            right={headerRight || undefined}
            tintColor={options?.tintColor}
            {...headerProps}
          />
          {HeaderComponents}
          {ContentView}
          {FooterComponents}
        </ImageBackground>
      ) : (
        <>
          <ImageBackground
            source={backgroundImage}
            style={[
              styles.backgroundImage,
              !!backgroundImage && {
                height: 152 + inset.top,
              },
              imageStyle,
            ]}>
            <Header
              title={options?.shownTitle ? t(pascalToCamel(route.name)) : ''}
              onBack={onBack ?? navigationServices.goBack}
              useSafeArea
              backgroundColor="transparent"
              right={headerRight || undefined}
              tintColor={options?.tintColor}
              {...headerProps}
            />
            {HeaderComponents}
          </ImageBackground>
          {ContentView}
          {FooterComponents}
        </>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR_ALIAS.Background.Gray,
  },
  content: {
    flexGrow: 1,
    width: '100%',
  },
  backgroundImage: {
    width: '100%',
    resizeMode: 'cover',
  },
});

export default Container;
