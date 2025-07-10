import React from 'react';
import {TLanguage} from '@/types/app';

type TPopup = {
  visible: boolean;
  noImage?: boolean;
  onActionPress?: () => void;
  message?: string;
  description?: string;
  showActionButtons?: boolean;
  actionButtonText?: string;
  secondaryActionText?: string;
  secondaryActionPress?: () => void;
  onClose?: () => void;
  type?: 'success' | 'warning' | 'failure';
  imageSource?: string;
  allowHideWhenBackAndroid?: boolean;
  renderMoreDetail?: React.ReactElement;
  scrollable?: boolean;
  isAutoClose?: boolean;
};

type TLoading = {
  visible: boolean;
};

type TAppState = {
  popup: TPopup;
  loading: TLoading;
  loadingComponent: {[key: string]: boolean};
  language: TLanguage;
};

export type {TAppState, TLoading, TPopup};
