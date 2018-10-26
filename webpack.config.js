const Path               = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const UglifyPlugin       = require('uglifyjs-webpack-plugin');

module.exports = {
  mode: 'production',
  target: 'web',
  plugins: [
    new CleanWebpackPlugin(Path.join(__dirname, '/dist')),
    new UglifyPlugin()
  ],
  entry: [
    Path.join(__dirname, 'src', 'index.js')
  ],
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
