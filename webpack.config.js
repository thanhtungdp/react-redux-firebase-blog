var webpack = require('webpack');

var config = {
    entry: __dirname + '/app/App.js',
    output: {
        path: __dirname + '/public',
        filename: "bundle.js"
    },
    module: {
        loaders: [{
            test: /\.jsx?$/,
            loader: 'babel',
            exclude: /(node_modules|bower_components)/,
            query: {
                presets: ['es2015', 'react', 'stage-0']
            }
        }]
    },
    devServer: {
        contentBase: "./public",
        colors: true,
        historyApiFallback: true,
        inline: true
    },
}

/*
 * If bundling for production, optimize output
 */
if (process.env.NODE_ENV === 'production') {
    config.devtool = false;
    config.plugins = [
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.optimize.UglifyJsPlugin({comments: false}),
        new webpack.DefinePlugin({
            'process.env': {NODE_ENV: JSON.stringify('production')}
        })
    ];
}
;

module.exports = config;