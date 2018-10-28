const Path = require('path');
const UglifyPlugin = require('uglifyjs-webpack-plugin');
const Merge = require('webpack-merge');
const Webpack = require('webpack');

module.exports = {
  mode: 'production',
  plugins: [],
  entry: [
    Path.join(__dirname, 'src', 'index.js')
  ],
  target: 'web',
  output: {
    libraryTarget: 'umd',
    library: 'Event',
    filename: 'index.js'
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
