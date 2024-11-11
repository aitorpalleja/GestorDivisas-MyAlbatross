const {getDefaultConfig} = require('@react-native/metro-config');

module.exports = {
  ...getDefaultConfig(__dirname),
  resolver: {
    blacklistRE: /node_modules\/.*\/node_modules\/.*/,
  },
  watchFolders: ['./src'], // Limitar observación a la carpeta src
};
