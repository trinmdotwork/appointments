import {MESSAGE_KEYS} from '@/constants/common';
import i18n from '@/i18n';
import {MessageKey, MessageType} from '@/types/app';

export const getMessage = <T extends MessageType, K extends MessageKey<T>>(
  type: T,
  key: (typeof MESSAGE_KEYS)[T][K],
  options?: Record<string, any>,
) => {
  return i18n.t(`${type.toLowerCase()}.${key}`, options);
};
