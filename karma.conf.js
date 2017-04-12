module.exports = function(config) {
	config.set({
		basePath: '',
		frameworks: ['jasmine'],
		files: [
			'test/*.test.jsx'
		],

		preprocessors: {
			// add webpack as preprocessor
			'src/**/*.jsx': ['webpack'],
			'test/*.jsx': ['webpack']
		},

		webpack: { //kind of a copy of your webpack config
			devtool: 'inline-source-map', //just do inline source maps instead of the default
			module: {
				loaders: [
					{
						test: /\.jsx$/,
						loader: 'babel-loader',
						exclude: /node_modules/,
						query: {
							presets: ['react', 'es2015'],
							plugins: ['transform-object-rest-spread']
						}
					}
				]
			},
			externals: {
				'react/addons': 'react',
				'react/lib/ExecutionEnvironment': 'react',
				'react/lib/ReactContext': 'react'
			},
			resolve: {
				extensions: [
					'.js',
					'.jsx'
				]
			}
		},

		webpackServer: {
			noInfo: true //please don't spam the console when running in karma!
		},

		plugins: [
			'karma-webpack',
			'karma-jasmine',
			'karma-phantomjs-launcher'
		],
		reporters: ['dots'],
		port: 9876,
		colors: true,
		logLevel: config.LOG_INFO,
		browserConsoleLogOptions: {
			terminal: false
		},
		browsers: ['PhantomJS']
	});
};
