const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const Dotenv = require('dotenv-webpack');
module.exports={
    entry:"./src/index.js",//cual es el punto de entrada de la app
    output:{
        path:path.resolve(__dirname,'dist'), // saber la carpeta donde se encuentra el proyecto
        filename:"[name].[contenthash].js",
        assetModuleFilename: "assets/images/[hash][ext][query]"
    },
    mode:'development',
    watch:true,
    //a donde se envia lo que hace webpack
    resolve:{
        extensions:['.js'],
        alias:{
            '@utils':path.resolve(__dirname,'src/utils/'),
            '@templates':path.resolve(__dirname,'src/templates/'),
            '@styles':path.resolve(__dirname,'src/styles/'),
            '@images':path.resolve(__dirname,'src/assets/images/')

        }
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
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/i,
                type: "asset/resource",
                generator: {
                  filename: "assets/fonts/[hash][ext]",
                },
              }
        ]
        
    },
    plugins:[ //carga los plugins
        new HtmlWebpackPlugin({inject: true,template:'./public/index.html',filename:'./index.html'}),
        new MiniCssExtractPlugin({
            filename:'assets/[name].[contenthash].css'
        }),
        new CopyPlugin(
            {
                patterns:[{
                    from: path.resolve(__dirname,'src','assets/images'),
                    to:"assets/images"
                }
                ]
            }
        ),
        new Dotenv()
    ],
}