const HTMLWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	entry: './example/example.jsx',
	resolve: {
		extensions: ['.js', '.jsx', '.scss']
	},
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
	],
	externals: {
		'cheerio': 'window',
		'react/addons': 'react',
		'react/lib/ExecutionEnvironment': 'react',
		'react/lib/ReactContext': 'react'
	}
};
