import {MESSAGE_KEYS} from '@/constants/common';

export interface IPaginationInfo {
  currentPage: number;
  totalPage: number;
  totalItem: number;
  total: number;
}

export interface IPaginationData<T> {
  data: T[];
  pagination: IPaginationInfo;
}

export type TLanguage = 'vi' | 'en';

export type MessageType = keyof typeof MESSAGE_KEYS;
export type MessageKey<T extends MessageType> = keyof (typeof MESSAGE_KEYS)[T];
export interface ValidationRule {
  field: string;
  validate: (value: any) => boolean;
  errorMessage: string;
}

export interface Rules<Form extends Record<string, any>> {
  field: keyof Form;
  validate: (value: any) => boolean;
  errorMessage: string;
}

export interface ValidateValueOptions {
  form: Record<string, any>;
  rules: ValidationRule[];
}
