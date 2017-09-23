const webpack = require('webpack')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
const common = require('./webpack.common.js')
const merge = require('webpack-merge')
const config = merge(common, {
	plugins: [
		new webpack.DefinePlugin({
		  'process.env.NODE_ENV': JSON.stringify('production')
	  	}),
	  	new UglifyJSPlugin(),
		new webpack.optimize.CommonsChunkPlugin({
	    	name: "vendor",
	    	minChunks: function(module){
	      		return module.context && module.context.indexOf("node_modules") !== -1;
	    	}
	  	}),
	  	new webpack.optimize.CommonsChunkPlugin({
	    	name: "manifest",
	    	minChunks: Infinity
	  	})
	]
})
module.exports = config
