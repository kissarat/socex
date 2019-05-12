const webpack = require("webpack");
const path = require('path');

module.exports = {
  mode: "development",
  entry: __dirname + "/index.js",
  devtool: "eval-source-map",
  output: {
    filename: "app.js",
    path: __dirname + "/../public"
  },

  plugins: [
    new webpack.SourceMapDevToolPlugin({
    })
  ],

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      }
    ]
  },

  devServer: {
    contentBase: path.join(__dirname, '..', 'public'),
    compress: false,
    port: 9000
  }
};
