/* eslint-disable */
const Path = require('path');

module.exports = {
  mode: 'production',
  optimization: {
    minimize: true
  },
  entry: [
    Path.join(__dirname, 'src', 'index.js')
  ],
  output: {
    libraryTarget: 'umd',
    library: '@jitesoft/events',
    filename: 'index.js',
    globalObject: 'this'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: [/node_modules/],
        loader: 'babel-loader'
      }
    ]
  }
};
