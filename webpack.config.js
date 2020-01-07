const path = require('path');
const webpack = require('webpack');

const env = process.env.NODE_ENV;

const config = {
  entry: path.join(__dirname, 'src/index.js'),
  output: {
    filename: 'dist.js',
    path: path.resolve(__dirname, 'dist')
  },
  mode: env,
  target: 'node',
  devtool: "source-map",
  resolve: {
    extensions: [".ts", ".js"],
  },
  module: {
    rules: [
      { test: /\.ts$/, use: 'ts-loader' },
      { test: /\.js$/, use: 'babel-loader', exclude: /node_modules/ }
    ]
  },
  externals: [
    (function () {
      var IGNORES = [
        'electron'
      ];
      return function (context, request, callback) {
        if (IGNORES.indexOf(request) >= 0) {
          return callback(null, "require('" + request + "')");
        }
        return callback();
      };
    })()
  ]
};

module.exports = config;


