var HtmlWebpackPlugin=require('html-webpack-plugin');
const ExtractTextPlugin=require('extract-text-webpack-plugin');

module.exports={
    entry:'./src/webpack-page/cc.js',
    output:{
        path:__dirname+'/dist',
        filename:'app.bundle.js'
    },
    plugins:[new HtmlWebpackPlugin({
        template:'./src/webpack-page/index.html',
        filename:'index.html',
        minify:{
            collapseWhitespace:true
        },
        hash:true
    }),
    new ExtractTextPlugin('style.css')
],
    module:{
        rules:[
            {
                test:/\.scss$/,
                // use:['style-loader','css-loader','sass-loader']
                use:ExtractTextPlugin.extract({
                    fallback:'style-loader',
                    use:['css-loader','sass-loader']
                })
            }
        ]
    }
};