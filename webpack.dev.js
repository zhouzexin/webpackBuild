const webpack = require('webpack')
const common = require('./webpack.common.js')
const merge = require('webpack-merge')
const path = require('path')
const config = merge({ }, common, {
	devServer: {
		contentBase: path.join(__dirname, "dist"),
		port: 8010,
		historyApiFallback: true,
		hot: true,
		compress: true,
		proxy: {
			"/api": {
			    target: '',
			    secure: false,
				pathRewrite: {'^/api' : ''}
			}
		}
	},
	plugins: [
		new webpack.DefinePlugin({
		  'process.env.NODE_ENV': JSON.stringify('dev')
	  	}),
	]
})
module.exports = config
