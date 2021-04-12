const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('css-minimizer-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const TerserPlugin = require("terser-webpack-plugin");

module.exports = {

    mode: 'production',
    optimization: {
        minimize: true,
        minimizer: [new TerserPlugin(), new OptimizeCssAssetsPlugin()],
    },

    output: {
        filename: 'main.[contenthash].js',
        clean: true
    },
    module: {
        rules: [{
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }


            },





            {
                test: /\.css$/,
                exclude: /style\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                test: /styles\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader'
                ]
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [{
                        loader: 'file-loader',
                        options: {
                            esModule: false
                        }
                    }

                ]
            },


            {

                test: /\.html$/i,
                loader: 'html-loader',
                options: {
                    minimize: false,
                    sources: false,


                },


            },
        ]
    },

    plugins: [
        new HtmlWebPackPlugin({
            template: './src/index.html',
            filename: './index.html',
            inject: 'body'
        }),
        new MiniCssExtractPlugin({
            filename: '[name].[contenthash].css',
            ignoreOrder: false
        }),

        new CopyPlugin({

            patterns: [
                { from: 'src/assets', to: 'assets/' },
            ],


        })
    ]



}