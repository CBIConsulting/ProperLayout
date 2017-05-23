const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const extractSass = new ExtractTextPlugin({
	filename: 'propertable.min.css',
	disable: process.env.NODE_ENV === "development"
});

module.exports = {
	entry: './src/ProperLayout.jsx',
	resolve: {
		extensions: ['.js', '.jsx', '.scss']
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
		filename: 'properlayout.js',
		path: __dirname + "/dist"
	},
	externals: {
		'cheerio': 'window',
		'react/addons': 'react',
		'react/lib/ExecutionEnvironment': 'react',
		'react/lib/ReactContext': 'react'
	},
	plugins: [
		extractSass,
		new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: JSON.stringify('production'),
				APP_ENV: JSON.stringify('browser')
			}
		})
	]
};
