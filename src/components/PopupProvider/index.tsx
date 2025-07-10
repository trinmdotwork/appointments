import React from 'react';
import {useAppDispatch, useAppSelector} from '@/hooks/redux';
import Popup from '../Popup';
import {hidePopup, popupSelector} from '@/store/app';

const PopupProvider = () => {
  const popup = useAppSelector(popupSelector);
  const dispatch = useAppDispatch();

  const handleClosePopup = () => {
    popup?.onClose?.();
    if (popup?.allowHideWhenBackAndroid) {
      dispatch(hidePopup());
    }
  };

  return <Popup {...popup} onClose={handleClosePopup} />;
};

export default PopupProvider;
