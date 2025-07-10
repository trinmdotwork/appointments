import i18n from '@/i18n';
import {getCurrentYear} from './moment';

const removeEmoji = (text: string): string =>
  text
    ?.toString()
    ?.replace(
      /(\u00a9|\u00ae|[\u2000-\u3300]|\ud83c[\ud000-\udfff]|\ud83d[\ud000-\udfff]|\ud83e[\ud000-\udfff])/g,
      '',
    );

const removeAscent = (str: string): string => {
  let subStr = str;
  if (!subStr) {
    return subStr;
  }
  subStr = subStr.toLowerCase();
  subStr = subStr.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, 'a');
  subStr = subStr.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, 'e');
  subStr = subStr.replace(/ì|í|ị|ỉ|ĩ/g, 'i');
  subStr = subStr.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, 'o');
  subStr = subStr.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, 'u');
  subStr = subStr.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, 'y');
  subStr = subStr.replace(/đ/g, 'd');
  return subStr;
};

const truncateStringLimit = (text: string, limit: number): string => {
  const stringContentLength = text?.length;
  return stringContentLength > limit
    ? text.slice(0, limit).concat('...')
    : text;
};

function isValidOperator(char: string): boolean {
  // Regular expression to match valid operators and parentheses
  const operatorRegex = /^[+\-*x/()]$/;
  return operatorRegex.test(char);
}

function formatNumberToVND(number: number): string {
  // Use Intl.NumberFormat to format the number with VND currency
  const formatted = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(number);

  // Remove the currency symbol
  return formatted.replace(/\s?₫/g, '');
}
const LIST_YEARS_DEFAULT = 5;

const getYearsList = (numberYears: number = LIST_YEARS_DEFAULT): string[] => {
  const currentYear = getCurrentYear();
  const years = [];

  for (let i = 0; i <= numberYears; i += 1) {
    years.push((currentYear - i).toString());
  }

  return years;
};

const pascalToCamel = (pascalCaseStr: string) => {
  if (typeof pascalCaseStr !== 'string' || !pascalCaseStr) {
    throw new Error('Input must be a non-empty string');
  }

  // Convert the first character to lowercase and concatenate with the rest of the string
  return pascalCaseStr.charAt(0).toLowerCase() + pascalCaseStr.slice(1);
};

const removeDomain = (email: string): string => {
  const atIndex = email.indexOf('@');
  return email.substring(0, atIndex);
};

function normalizeVietnamese(text: string): string {
  return text.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

function removeUnicode(str = '') {
  let result = '';
  result = str;
  result = result.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, 'A');
  result = result.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, 'a');
  result = result.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, 'E');
  result = result.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, 'e');
  result = result.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, 'I');
  result = result.replace(/ì|í|ị|ỉ|ĩ/g, 'i');
  result = result.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, 'O');
  result = result.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, 'o');
  result = result.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, 'U');
  result = result.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, 'u');
  result = result.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, 'Y');
  result = result.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, 'y');
  result = result.replace(/Đ/g, 'D');
  result = result.replace(/đ/g, 'd');
  return result;
}

const getCompanyDescription = ({
  branch_code = '',
  departmentName = '',
  titleName,
}: {
  branch_code: string;
  departmentName: string;
  titleName?: string;
}): string => {
  if (titleName) {
    return titleName;
  }
  let description = '';
  if (branch_code) {
    description += `${branch_code}`;
  }
  if (departmentName) {
    description += `${description.length ? '-' : ''}${departmentName}`;
  }
  return description.replace(/ /g, '-');
};

/**
 * Giải mã chuỗi Base64 thành văn bản gốc
 * @param {string} base64String - Chuỗi Base64 cần giải mã
 * @returns {string} - Chuỗi văn bản gốc đã giải mã
 */
const decodeBase64 = (base64String: string) => {
  try {
    return atob(base64String);
  } catch (error) {
    return null;
  }
};

const parseSafe = (jsonString: string, fallback: any = null): any => {
  try {
    return JSON.parse(jsonString);
  } catch (error) {
    console.warn('JSON parse error:', error);
    return fallback;
  }
};

export const errorHandler = (message: string) => {
  switch (message) {
    case 'Network request failed':
      return i18n.t('error.network');
    default:
      return message;
  }
};

const getFileNameFromURL = (url: string, isIncludeExtend?: boolean): string => {
  if (!url) {
    return url;
  }
  const result: string = url;

  const listCut = result.split('/');
  const fileName = listCut[listCut.length - 1];
  return isIncludeExtend ? fileName : fileName.split('.')[0];
};

const capitalizeFirstLetter = (str: string): string => {
  if (!str) {
    return '';
  }
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export {
  capitalizeFirstLetter,
  decodeBase64,
  formatNumberToVND,
  getCompanyDescription,
  getFileNameFromURL,
  getYearsList,
  isValidOperator,
  normalizeVietnamese,
  parseSafe,
  pascalToCamel,
  removeAscent,
  removeDomain,
  removeEmoji,
  removeUnicode,
  truncateStringLimit,
};
