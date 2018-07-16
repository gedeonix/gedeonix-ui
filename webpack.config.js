const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
    entry: './src/ui.scss',
    cache: false,
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader",
                    "sass-loader"
                ]
            }
        ]
    },
    optimization: {
        minimizer: [
            new UglifyJsPlugin({
                cache: true,
                parallel: true,
                sourceMap: true // set to true if you want JS source maps
            }),
            new OptimizeCSSAssetsPlugin({
                cssProcessorOptions: {
                    map: {
                        inline: false
                    }
                }
            })
        ]
    },
    plugins: [
        new CleanWebpackPlugin(['dist'], { verbose: true }),
        new MiniCssExtractPlugin({
            filename: 'gedeonix-ui.css'
        }),
        new HtmlWebpackPlugin({
            template: './src/index.html',
            filename: './index.html',
            /*
            minify: {
                "collapseWhitespace": true,
                "minifyCSS": true,
                "removeComments": true
            }
            */
        })
    ],
    devServer: {
        contentBase: path.join(__dirname, 'src'),
        compress: true,
        hot: false,
        historyApiFallback: true,
        progress: true,
        watchContentBase: true
    },
    devtool: '#source-map'
};

