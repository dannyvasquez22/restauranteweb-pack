const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  	entry: './src/app/index.js',
  	output: {
    		path: path.join(__dirname,'dist'),
    		filename: 'bundle.js'
  	},
  	devServer: {
    		port: 3000
  	},
  	module: {
    		rules: [
			{
				test: /\.css$/,
        			use: ['style-loader', 'css-loader']
			},
			{
				test: /\.(jpe?g|jpg|png|gif|svg|mp4)$/i,
				use: 'file-loader'
			},
			{
			    	test: /\.(ogg|mp3|wav|webm|mpe?g)$/i,
			    	use: 'file-loader'
			},
			{
				test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
				use: [{
				    	loader: 'file-loader',
				    	options: {
					   	name: '[name].[ext]',
					   	outputPath: 'fonts/'
				    	}
				}]
			}
    		]
  	},
  	plugins: [
		new webpack.ProvidePlugin({
			$: 'jquery',
			jQuery: 'jquery'
		}),
    		new HtmlWebpackPlugin({
      		template: './src/index.html'
    		})
	],
};