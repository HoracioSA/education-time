const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
module.exports={
    mode: 'production',
    // devServer:{
    //     historyApiFallback:true,
    // },
    resolve: {
        extensions: ['.ts', '.tsx', '.js']
    },
    entry:path.resolve(__dirname, './src/index.tsx' ),
    module:{
        rules:[
            {
                test: /\.tsx?$/,
                use:"awesome-typescript-loader",
                exclude: /node_modules/,
            },
            {
                test: /\.css$/i,
                use: [MiniCssExtractPlugin.loader, 'css-loader',]
            },
            {
                test: /\.js$/,
                use: ["source-map-loader"],
              },
            {
                test: /\.svg$/,
                use: [
                  {
                    loader: 'svg-url-loader',
                    options: {
                      limit: 10000,
                    },
                  },
                ]
            },
            {
                test: /\.html$/i,
                use: [{
                    loader:"html-loader",
                }]
            },
            {
                test: /\.(png|jpg|gif)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options:{
                            name: "[name].[ext]",
                            outputPath:"public",
                            publicPath:"images"
                        }
                }
                ]
            },
            
            ]
    },
    output:{
        filename: 'bundle.js',
        path: path.resolve(__dirname,'build'),
        publicPath:"/"
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "public/index.html",}),
        new MiniCssExtractPlugin(),
    ]
}