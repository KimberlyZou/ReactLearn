var HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const bootstrapEntryPoints = require('./webpack.bootstrap.config')
var isProd = (process.env.NODE_ENV === 'production');

var bootstrapConfig = isProd ? bootstrapEntryPoints.prod : bootstrapEntryPoints.dev;
let pathsToClean = [
    'dist',
];

module.exports = {
    entry: {
        "app.bundle": './src/index.js',
        // 这行是新增的。
        // "content": './src/webpack-page/content.js'
        "bootstrap": bootstrapConfig
    },
    devServer: {
        port: 8081,
        // open: true
    },
    output: {
        path: __dirname + '/dist',
        // filename: 'app.bundle.js'
    },
    resolve: {
        extensions: ['.js', '.json', '.jsx']
    },

    plugins: [new HtmlWebpackPlugin({
        template: './public/index.html',
        filename: 'index.html',
        minify: {
            collapseWhitespace: true
        },
        hash: true,
        // excludeChunks: ['content']
    }),
    // new HtmlWebpackPlugin({
    //     template: './src/webpack-page/content.html',
    //     filename: 'content.html',
    //     minify: {
    //         collapseWhitespace: true
    //     },
    //     hash: true,
    //     chunks: ['content']
    // }),
    new ExtractTextPlugin('style.css'),
    new CleanWebpackPlugin(pathsToClean),
    new ExtractTextPlugin({
        filename: '[name].css',
        disable: !isProd,
        publicPath: 'css/'
    }),
    ],
    module: {
        rules: [
            {
                test: /\.scss$/,
                // use:['style-loader','css-loader','sass-loader']
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader', 'sass-loader']
                })
            },
            { test: /\.jsx$/, loader: 'babel-loader', exclude: /node_modules/ },
            { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ },
            {
                test: /\.(gif|png|jpe?g|svg)$/i,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]',
                        outputPath: 'images/'
                    }
                }]
            },
            {
                test: /\.html$/,
                use: [{
                    loader: 'html-loader',
                    options: {
                        minimize: true
                    }
                }],
            },
            { test: /\.(woff2?|svg)$/, loader: 'url-loader?limit=10000&name=[name].[ext]&outputPath=fonts/' },
            { test: /\.(ttf|eot)$/, loader: 'file-loader?name=[name].[ext]&outputPath=fonts/' },
            { test: /bootstrap-sass[\/\\]assets[\/\\]javascripts[\/\\]/, loader: 'imports-loader?jQuery=jquery' },
        ],


    }
};