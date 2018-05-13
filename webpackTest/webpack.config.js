// 执行webpack时会自动读取这个文件以运行webpack
var HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const CleanWebpackPlugin=require('clean-webpack-plugin')
module.exports = {
    entry: {
        app: './src/app.js',
        contact: './src/contact.js'
      },
    output: {
        filename: './[name].bundle.js',
        path: __dirname + '/dist'
    },
    plugins: [new HtmlWebpackPlugin({
                template: './src/index.html',
                filename: 'index.html',
                // 这行是新增的。
                chunks: ['app'],
                
                minify: {
                    collapseWhitespace: true
                },
                hash: true,
            }),
            new HtmlWebpackPlugin({
                template: './src/contact.html',
                filename: 'contact.html',
                chunks:['contact'],
                minify: {
                    collapseWhitespace: true
                },
                hash: true,
            }),
        new ExtractTextPlugin('style.css'),
        new CleanWebpackPlugin(__dirname+'/dist'),
        ],
    module: {
        rules: [{
            test: /\.css/,
            use: ['style-loader', 'css-loader']
        },
        {
            test: /\.scss/,
            use: ExtractTextPlugin.extract({
                fallback:'style-loader',
                use:['css-loader', 'sass-loader'],
            })
        },
        {test:/\.js$/,loader:'babel-loader',exclude:/node_module/},
        {test:/\.jsx$/,loader:'babel-loader',exclude:/node_module/}

        ]
    },
    devServer:{
        port:9000,
        open:true
    }
}
