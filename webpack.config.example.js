const HTMLWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './example/example.jsx',
  module: {
    rules: [
      {
        test: /\.js$|\.jsx$/,
        exclude: /node_modules/,
        use: {
					loader: 'babel-loader',
					options: {
						presets: ['react', 'es2015'],
						plugins: ['transform-object-rest-spread']
					}
				}
      },
      {
        test: /\.scss$/,
        loader: 'style-loader!css-loader!sass-loader'
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
