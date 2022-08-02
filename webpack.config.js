const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { fileURLToPath } = require('url');
module.exports={
    entry:"./src/index.js",//cual es el punto de entrada de la app
    output:{
        path:path.resolve(__dirname,'dist'), // saber la carpeta donde se encuentra el proyecto
        filename:"main.js",
    },//a donde se envia lo que hace webpack
    resolve:{
        extensions:['.js']
    },
    module:{
        rules:[
            {
                test: /\.m?.js$/,
                exclude:/node_modules/,
                use:{
                    loader:'babel-loader'
                }
            },
            {
                test:/\.css|.styl$/i,
                use:[MiniCssExtractPlugin.loader,'css-loader','stylus-loader',]
            }
        ]
        
    },
    plugins:[
        new HtmlWebpackPlugin({inject: true,template:'./public/index.html',filename:'./index.html'}),new MiniCssExtractPlugin(),
    ]
}