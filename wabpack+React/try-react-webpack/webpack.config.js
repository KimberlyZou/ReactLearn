var HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const fs = require('fs');

function getBootstraprcCustomLocation() {
  return process.env.BOOTSTRAPRC_LOCATION;
}

const bootstraprcCustomLocation = getBootstraprcCustomLocation();

let defaultBootstraprcFileExists;

try {
  fs.statSync('./.bootstraprc');
  defaultBootstraprcFileExists = true;
} catch (e) {
  defaultBootstraprcFileExists = false;
}

if (!bootstraprcCustomLocation && !defaultBootstraprcFileExists) {
  /* eslint no-console: 0 */
  console.log('You did not specify a \'bootstraprc-location\' ' +
    'arg or a ./.bootstraprc file in the root.');
  console.log('Using the bootstrap-loader default configuration.');
}

// DEV and PROD have slightly different configurations
let bootstrapDevEntryPoint;
if (bootstraprcCustomLocation) {
  bootstrapDevEntryPoint = 'bootstrap-loader/lib/bootstrap.loader?' +
    `configFilePath=${__dirname}/${bootstraprcCustomLocation}` +
    '!bootstrap-loader/no-op.js';
} else {
  bootstrapDevEntryPoint = 'bootstrap-loader';
}

let bootstrapProdEntryPoint;
if (bootstraprcCustomLocation) {
  bootstrapProdEntryPoint = 'bootstrap-loader/lib/bootstrap.loader?extractStyles' +
    `&configFilePath=${__dirname}/${bootstraprcCustomLocation}` +
    '!bootstrap-loader/no-op.js';
} else {
  bootstrapProdEntryPoint = 'bootstrap-loader/extractStyles';
}


let pathsToClean = [
    'dist',
]

module.exports = {
    dev: bootstrapDevEntryPoint,
    prod: bootstrapProdEntryPoint,
    entry: {
        "app.bundle": './src/index.js',
        // 这行是新增的。
        // "content": './src/webpack-page/content.js'
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
            { test:/bootstrap-sass[\/\\]assets[\/\\]javascripts[\/\\]/, loader: 'imports-loader?jQuery=jquery' },
        ],


    }
};