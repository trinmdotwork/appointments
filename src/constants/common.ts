import {Dimensions} from 'react-native';

const SCREEN_WIDTH = Dimensions.get('screen').width;
const MESSAGE_KEYS = {
  ERROR: {
    UNKNOWN: 'unknown',
    NETWORK: 'network',
    TIMEOUT: 'timeout',
    CUSTOM: 'custom',
  },
  SUCCESS: {
    SAVED: 'saved',
    UPDATED: 'updated',
    DELETED: 'deleted',
    CUSTOM: 'custom',
  },
  FAILED: {
    AUTH: 'auth',
    VALIDATION: 'validation',
    CUSTOM: 'custom',
  },
} as const;
const HEADER_HEIGHT = 44;
export {MESSAGE_KEYS, SCREEN_WIDTH, HEADER_HEIGHT};
