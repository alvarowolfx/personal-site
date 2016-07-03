/**
 * Created by alvaroviebrantz on 20/03/16.
 */
var webpack = require('webpack');
var baseConfig = require('./webpack.config');

baseConfig.entry = [
  './src/index.js'
];

baseConfig.plugins = [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    })
];

module.exports = baseConfig;
