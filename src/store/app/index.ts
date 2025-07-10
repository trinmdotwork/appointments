import {PayloadAction, createSlice} from '@reduxjs/toolkit';

import {TAppState, TLoading, TPopup} from './types';

const initialPopup: TPopup = {
  visible: false,
  message: '',
  description: '',
  actionButtonText: '',
  onActionPress: () => {},
  noImage: false,
  secondaryActionPress: () => {},
  secondaryActionText: '',
  showActionButtons: false,
  scrollable: false,
  isAutoClose: false,
};
const initialLoading: TLoading = {
  visible: false,
};

const initialState: TAppState = {
  popup: initialPopup,
  loading: initialLoading,
  loadingComponent: {},
  language: 'vi',
};

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    showPopup: (state, action: PayloadAction<Omit<TPopup, 'visible'>>) => {
      state.popup = {...action.payload, visible: true};
    },
    hidePopup: state => {
      state.popup = initialPopup;
    },
    showLoading: state => {
      state.loading.visible = true;
    },
    hideLoading: state => {
      state.loading.visible = false;
    },

    clearStateByKey<K extends keyof TAppState>(
      state: any,
      action: PayloadAction<K>,
    ) {
      state[action.payload] = initialState[action.payload];
    },
  },
  selectors: {
    popupSelector: state => state.popup,
    loadingSelector: state => state.loading,
    languageSelector: state => state.language,
  },
  extraReducers: builder => {
    builder
      .addMatcher(
        action => action.type.endsWith('/pending'),
        (state, action) => {
          const actionName = action.type.replace('/pending', '');
          state.loadingComponent[actionName] = true;
        },
      )
      .addMatcher(
        action =>
          action.type.endsWith('/rejected') ||
          action.type.endsWith('/fulfilled'),
        (state, action) => {
          const actionName = action.type.replace(/\/(fulfilled|rejected)$/, '');
          state.loadingComponent[actionName] = false;
        },
      );
  },
});

export const {popupSelector, loadingSelector, languageSelector} =
  appSlice.selectors;

export const {showPopup, hidePopup, hideLoading, showLoading, clearStateByKey} =
  appSlice.actions;
export default appSlice.reducer;
