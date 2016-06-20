var webpack = require('webpack');
var path = require('path');
var production = process.env.NODE_ENV === 'production';
var CleanPlugin = require('clean-webpack-plugin');
var ExtractPlugin = require('extract-text-webpack-plugin');
var host = (process.env.HOST || 'localhost');
var port = (+process.env.PORT) || 3000;

var plugins = [
    new webpack.optimize.CommonsChunkPlugin({
        name:'cityVendors', 
        children:  true,
        minChunks: 2, 
    }),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new ExtractPlugin('[name].css',{allChunks: true}), 
    // This plugins defines various variables that we can set to false
    // in production to avoid code related to them from being compiled
    // in our final bundle
    new webpack.DefinePlugin({
        __SERVER__:      !production,
        __DEVELOPMENT__: !production,
        __DEVTOOLS__:    !production,
        __DEBUG__:       !production,
        'process.env':   {
            BABEL_ENV: JSON.stringify(process.env.NODE_ENV),
        },
    }),
];

if (production) {
    plugins = plugins.concat([
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.MinChunkSizePlugin({
            minChunkSize: 51200, 
        }),
        new webpack.optimize.UglifyJsPlugin({
            mangle:   true,
            compress: {
                unused: true,
                dead_code: true,
                warnings: false, // Suppress uglification warnings
            },
        }),
        new CleanPlugin('assets'),
    ]);
}

var entery = ['./src/client/index.js']
!production && entery.push('webpack-hot-middleware/client?path=http://' + host + ':' + port + '/__webpack_hmr')
!production && entery.push('webpack/hot/only-dev-server')

module.exports = {
	debug:   !production,
    devtool: production ? false : 'source-map',
    entry: {
        incity:entery,
        vendor:[
            'react',
            'react-redux',
            'react-router',
            'react-router-redux',
            'redux'
        ]

    },
    resolve: {
    	extensions: ["", ".js", ".jsx"]
  	},
    output: {
        path: path.resolve(__dirname, 'src'),
        filename:  production ? '[name].min.js' : '[name].js',
        chunkFilename: '[name]-[chunkhash].js',
        publicPath: '/assets/',
    },
    plugins: plugins,
    devServer: {
	    hot: true,
	},
	stats:{
		color: true,
		reason: true
	},
    module: {
    	// preLoaders: [
	    //   {
	    //     test: /\.(js|jsx)$/,
	    //     loader: 'eslint-loader',
	    //     exclude: /node_modules/
	    //   },
	    // ],
        loaders: [
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				loaders: ["react-hot","babel"]
			},
			{
                test:   /\.scss/,
                loader: ExtractPlugin.extract('style', 'css!autoprefixer?{browsers:["last 2 version","safari 5", "ie 8", "ie 9", "opera 12.1", "ios 6", "android 4"]}!sass'),
            },
            {
                test:   /\.css/,
                loader: ExtractPlugin.extract('style', 'css!autoprefixer?{browsers:["last 2 version","safari 5", "ie 8", "ie 9", "opera 12.1", "ios 6", "android 4"]}'),
            },
			{
			    test:   /\.html/,
			    loader: 'html',
			},
			{
			    test:   /\.(png|gif|jpe?g|svg|woff|woff2|eot|ttf)$/i,
			    loader: 'url?limit=5000&name=[hash].[ext]',
			},
			{
			    test:   /\.json$/,
			    loader: 'json-loader',
			}
        ],
    }
};