module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        alias: {
          '@/assets': './src/assets',
          '@/components': './src/components',
          '@/config': './src/config',
          '@/constants': './src/constants',
          '@/features': './src/features',
          '@/hooks': './src/hooks',
          '@/i18n': './src/i18n',
          '@/navigation': './src/navigation',
          '@/screens': './src/screens',
          '@/services': './src/services',
          '@/store': './src/store',
          '@/types': './src/types',
          '@/utils': './src/utils',
        },
      },
    ],
  ],
};
