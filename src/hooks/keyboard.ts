import {useEffect, useState} from 'react';
import {Keyboard, KeyboardEvent, Platform} from 'react-native';

const isAndroid = Platform.OS === 'android';

export const useKeyboard = () => {
  const [keyboardHeight, setKeyboardHeight] = useState(0);

  useEffect(() => {
    const showSubscription = Keyboard.addListener(
      isAndroid ? 'keyboardDidShow' : 'keyboardWillShow',
      onKeyboardDidShow,
    );
    const hideSubscription = Keyboard.addListener(
      isAndroid ? 'keyboardDidHide' : 'keyboardWillHide',
      onKeyboardDidHide,
    );
    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  const onKeyboardDidShow = (e: KeyboardEvent) => {
    setKeyboardHeight(e.endCoordinates.height);
  };

  const onKeyboardDidHide = () => {
    setKeyboardHeight(0);
  };

  return keyboardHeight;
};
