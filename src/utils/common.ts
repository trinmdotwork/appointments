import {Linking, Dimensions, Platform, PixelRatio} from 'react-native';

const callPhone = (phone: string) => {
  let phoneNumber = phone;
  if (!(Platform.OS === 'android')) {
    phoneNumber = `telprompt:${phone}`;
  } else {
    phoneNumber = `tel:${phone}`;
  }
  Linking.canOpenURL(phoneNumber)
    .then(supported => {
      if (!supported) {
        return Linking.openURL(phoneNumber);
      }
      return Linking.openURL(phoneNumber);
    })
    .catch(err => {
      throw new Error(err);
    });
};

function debounce(func: (...args: any[]) => void, delay: number) {
  let timeoutId: any;

  return (...args: any[]) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    timeoutId = setTimeout(() => {
      func(...args);
    }, delay);
  };
}

// throttle.ts

/**
 * Throttle function to limit the number of times a function can be called over time.
 * @param func - The function to throttle
 * @param limit - The time interval in milliseconds to limit the function calls
 * @returns A throttled version of the function
 */
function throttle<T extends (...args: any[]) => void>(
  func: T,
  limit: number,
): T {
  let lastFunc: ReturnType<typeof setTimeout>;
  let lastRan: number;

  return function (this: any, ...args: Parameters<T>) {
    const now = Date.now();

    if (!lastRan) {
      func.apply(this.context, args);
      lastRan = now;
    } else {
      clearTimeout(lastFunc);
      lastFunc = setTimeout(() => {
        if (now - lastRan >= limit) {
          func.apply(this.context, args);
          lastRan = now;
        }
      }, limit - (now - lastRan));
    }
  } as T;
}

export default throttle;

const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;

const DEFAULT_SCREEN_SIZE = 375;
const DEFAULT_SCREEN_SIZE_HEIGHT = 808;

const scaleHeight = (size: number) => {
  const scaleRate = deviceHeight / DEFAULT_SCREEN_SIZE_HEIGHT;

  return Math.min(Math.round(size * scaleRate), size + 3);
};
const scaleRate = deviceWidth / DEFAULT_SCREEN_SIZE;

const scaleSize = (size: number) =>
  // if (scaleRate > 1) {
  Math.min(Math.round(size * scaleRate), size + 3);
// }

// return size;
const normalize = (size: number): number => {
  const newSize = size * scaleRate;
  if (Platform.OS === 'ios') {
    return Math.round(PixelRatio.roundToNearestPixel(newSize));
  }
  return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2;
};

function isEmpty(value: any): boolean {
  if (value === null || value === undefined) {
    return true;
  }

  if (typeof value === 'string' || Array.isArray(value)) {
    return value.length === 0;
  }

  if (typeof value === 'object') {
    return Object.keys(value).length === 0;
  }

  if (typeof value === 'number') {
    return value === 0;
  }

  if (typeof value === 'boolean') {
    return !value;
  }

  return false; // Default case for unsupported types
}

function groupBy<T extends Record<string, any>>(
  array: T[],
  key: keyof T,
): {title: string; data: T[]}[] {
  const grouped = array?.reduce((acc, currentItem) => {
    const groupKey = String(currentItem[key]);

    if (!acc[groupKey]) {
      acc[groupKey] = [];
    }

    acc[groupKey].push(currentItem);
    return acc;
  }, {} as Record<string, T[]>);

  // Transform the grouped object into an array of objects with title and data
  return Object.keys(grouped).map(groupKey => ({
    title: groupKey,
    data: grouped[groupKey],
  }));
}

type TValue = string | number | boolean | object | any[];

function deepEqual(value1: TValue, value2: TValue): boolean {
  // Check if both values are the same primitive value
  if (value1 === value2) {
    return true;
  }

  // Check if either value is null or undefined
  if (value1 == null || value2 == null) {
    return false;
  }

  // Check if both values are arrays
  if (Array.isArray(value1) && Array.isArray(value2)) {
    if (value1.length !== value2.length) {
      return false;
    }
    for (let i = 0; i < value1.length; i++) {
      if (!deepEqual(value1[i], value2[i])) {
        return false;
      }
    }
    return true;
  }

  // Check if both values are objects (excluding arrays)
  if (typeof value1 === 'object' && typeof value2 === 'object') {
    const keys1 = Object.keys(value1);
    const keys2 = Object.keys(value2);

    if (keys1.length !== keys2.length) {
      return false;
    }

    for (const key of keys1) {
      if (
        !keys2.includes(key) ||
        !deepEqual((value1 as any)[key], (value2 as any)[key])
      ) {
        return false;
      }
    }

    return true;
  }

  // For all other cases, use strict equality
  return false;
}

const summary = <T extends Record<string, any>>(
  data: T[],
  key: keyof T,
): number => (data || []).reduce((acc, b) => acc + Number(b[key]), 0);

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export {
  callPhone,
  debounce,
  isEmpty,
  scaleSize,
  scaleHeight,
  groupBy,
  deepEqual,
  throttle,
  summary,
  normalize,
  delay,
};
