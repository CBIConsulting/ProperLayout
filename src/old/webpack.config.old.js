var webpack = require('webpack');

module.exports = {
  context: __dirname + '/src',
  entry: "./layout.js",
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loaders: ["babel-loader"],
      },
      {
        test: /\.scss$/,
        loader: 'style!css!sass'
      },
      { test: /\.css$/, exclude: /\.useable\.css$/, loader: "style!css" },
      { test: /\.useable\.css$/, loader: "style/useable!css" }
    ],
  },
  output: {
    libraryTarget: "var",
    library: "ProperLayout",
    filename: "ProperLayout.js",
    path: __dirname + "/dist",
  },
  externals: {
    'react/addons': 'React',
    'jquery': '$',
    'underscore': '_'
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin(),
    new webpack.optimize.DedupePlugin()
  ]
}