const webpack = require('webpack');

module.exports = {
  entry: './index.js',

  externals: {
    'object.assign': 'Object.assign',
    'object-assign': 'Object.assign',
  },

  mode: 'development',

  plugins: [
    new webpack.HashedModuleIdsPlugin(),
  ],
};
