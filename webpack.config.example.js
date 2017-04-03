const HTMLWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './example/example.jsx',
  module: {
    loaders: [
      {
        test: /\.js$|\.jsx$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
				options: {
					presets: ['react', 'es2015']
				}
      },
      {
        test: /\.scss$/,
        loader: 'style!css!sass'
      }
    ],
  },
  output: {
    filename: 'bundle.js',
    path: __dirname + "/example"
  },
	plugins: [
		new HTMLWebpackPlugin()
	]
}
