const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const extractSass = new ExtractTextPlugin({
	filename: 'properlayout.css',
	disable: process.env.NODE_ENV === "development"
});

module.exports = {
	entry: './src/ProperLayout.jsx',
	target: 'node',

	resolve: {
		extensions: ['.js', '.jsx', '.scss']
	},

	node: {
		__dirname: false,
		__filename: false
	},

	module: {
		rules: [
			{
				test: /\.js$|\.jsx$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader'
				}
			}, {
				test: /\.scss$/,
				use: extractSass.extract({
					use: [{
						loader: "css-loader"
					}, {
						loader: "sass-loader"
					}]
				})
			}
		]
	},
	output: {
		filename: 'ProperLayout.js',
		path: __dirname + "/lib",
		library: 'ProperLayout',
		libraryTarget: 'umd2'
	},
	externals: [/^\w.*$/i],
	plugins: [
		extractSass,
		new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: JSON.stringify('production'),
				APP_ENV: JSON.stringify('node')
			}
		})
	]
};
