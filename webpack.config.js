const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');
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
                test: /\.m?.js$/, //acepta los que terminan en .js
                exclude:/node_modules/, //excepto los que estan en esa carpeta
                use:{
                    loader:'babel-loader'
                }
            },
            {
                test:/\.css|.styl$/i, //acepta .css y .styl
                use:[MiniCssExtractPlugin.loader,'css-loader','stylus-loader',]
            },
            {
                test:/\.png/,
                type:'asset/resource'
            }
        ]
        
    },
    plugins:[ //carga los plugins
        new HtmlWebpackPlugin({inject: true,template:'./public/index.html',filename:'./index.html'}),new MiniCssExtractPlugin(),
        new CopyPlugin(
            {
                patterns:[{
                    from: path.resolve(__dirname,'src','assets/images'),
                    to:"assets/images"
                }
                ]
            }
        )
    ]
}