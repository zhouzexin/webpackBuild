const webpack = require('webpack')
const path = require('path')
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
	entry: () => {
		return {
			index: './src/index.js',
			vendor: './src/vendor.js'
		}
	},
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: '[name][chunkhash].bundle.js'
	},
	plugins: [
		new CleanWebpackPlugin(['dist']),
		new webpack.HashedModuleIdsPlugin(),
    	new HtmlWebpackPlugin({
      		title: 'app',
			template: './src/index.html'
      	}),
	  	new ExtractTextPlugin("index.css")
	],
	resolve: {
		alias: {
			components: path.resolve(__dirname, 'src/components'),
			actions: path.resolve(__dirname, 'src/actions'),
			constants: path.resolve(__dirname, 'src/constants'),
			containers: path.resolve(__dirname, 'src/containers'),
			styles: path.resolve(__dirname, 'src/styles'),
			routers: path.resolve(__dirname, 'src/routers'),
			utils: path.resolve(__dirname, 'src/utils'),
			configs: path.resolve(__dirname, 'src/configs')
		},
		extensions: ['.jsx', '.js', '.json', '.ts', '.less', '.scss', '.css']
	},
	module: {
		rules:[
			{
				enforce: "pre",
				test: /\.(js|jsx)$/,
        		exclude: /node_modules/,
				use: [
					'eslint-loader'
				]
			},
			{
			    test: /\.(js|jsx)$/,
			    exclude: /(node_modules|bower_components)/,
			    use: [
					'babel-loader'
				]
		    },
			{
				test: /\.(png|jpg|gif|jpeg|woff|svg|eot|ttf)$/,
				use: [
					{
						loader: 'url-loader',
						options: {
							limit: 10000
						}
					}
				]
			},
			{
				test: /\.(jpg|png|gif|jpeg)$/,
				use: [
					'file-loader'
				]
			},
			{
				test: /\.scss$/,
				use: [
					'style-loader',
					'css-loader',
					'postcss-loader',
					'sass-loader'
				]
			},
			{
				test: /\.css$/,
				use: [
				  'style-loader',
				  'css-loader',
				  'postcss-loader'
				]
			}
		]
	}
}
