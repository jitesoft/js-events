const Path = require('path');
const UglifyPlugin = require('uglifyjs-webpack-plugin');
const Merge = require('webpack-merge');
const Webpack = require('webpack');

const base = {
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

module.exports = [
  Merge.smart(base, {
    optimization: {
      minimize: false
    }
  }),
  Merge.smart(base, {
    optimization: {
      minimize: true,
      minimizer: [new UglifyPlugin({
        uglifyOptions: {
          comments: false,
          mangle: true,
          keep_fnames: false

        }
      })]
    }
  })
];
