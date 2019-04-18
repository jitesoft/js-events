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
    library: 'Event',
    filename: 'index.js',
    globalObject: "typeof self !== 'undefined' ? self : this"
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
