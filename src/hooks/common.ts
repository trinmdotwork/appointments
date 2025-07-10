import {useEffect, useRef, useState} from 'react';
import {debounce} from '@/utils/common';

function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

function useDebounceCallback(
  callback: (...args: any[]) => void,
  delay: number,
) {
  const callbackRef = useRef(callback);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  return useRef(
    debounce((...args: any[]) => callbackRef.current(...args), delay),
  ).current;
}

function useDebounceSearchCallback(
  callback: (...args: any[]) => void,
  delay: number,
) {
  const callbackRef = useRef(callback);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  return useRef(
    debounce((...args: any[]) => {
      if (args.length && (args[0]?.length >= 3 || args[0]?.length === 0)) {
        callbackRef.current(...args);
      }
    }, delay),
  ).current;
}

const DEFAULT_TIMER = 1000;

const useTimer = (initial = 0): number => {
  const [seconds, setSeconds] = useState<number>(initial);

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((prevSeconds: number) => prevSeconds + 1);
    }, DEFAULT_TIMER);

    return () => clearInterval(interval);
  }, []);

  return seconds;
};

// Custom hook
function useTextInput(initialValue = '') {
  const [value, setValue] = useState<string>(initialValue);

  const handleChange = (text: string) => {
    setValue(text);
  };

  return {
    value,
    onChange: handleChange,
  };
}

export const stringNormalize = (value: string): string => {
  const cleanedText = value
    .trimStart() // Removes leading whitespace
    .replace(/\t+/g, ' ') // Replaces multiple tabs with a single space
    .replace(/ {2,}/g, ' ') // Replaces multiple spaces with a single space
    .replace(/\n{2,}/g, '\n'); // Replaces multiple newlines with a single newline
  return cleanedText;
};

function useInput<T>(initialValue: T | string) {
  const [value, setValue] = useState<T | string>(initialValue);

  const handleChange = (text: T) => {
    if (typeof text === 'string') {
      setValue(stringNormalize(text));
    } else {
      setValue(text);
    }
  };

  return {
    value,
    onChange: handleChange,
  };
}

export {
  useDebounce,
  useTimer,
  useDebounceCallback,
  useTextInput,
  useInput,
  useDebounceSearchCallback,
};
