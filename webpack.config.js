const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const HtmlWebpackPlugin = require('html-webpack-plugin')
const HtmlWebpackExcludeAssetsPlugin = require('html-webpack-exclude-assets-plugin');

const devMode = process.env.NODE_ENV !== 'production';

module.exports = {
    mode: 'development',
    entry: './src/index.scss',
    /*
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'index.js',
        publicPath: '/dist'
    },
    */
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'sass-loader'
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
            /*
                assetNameRegExp: /\.optimize\.css$/g,
                cssProcessor: require('cssnano'),
                cssProcessorOptions: {
                    discardComments: {
                        removeAll: true
                    }
                },
                canPrint: true
            */
            })
            /*
            ,
            new HtmlWebpackPlugin({
                template: './src/index.html',
                filename: './index.html'
                //excludeAssets: [/index.js/]
            }),
            new HtmlWebpackExcludeAssetsPlugin()
            */
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'gedeonix-ui.css'
        })
    ],
    devServer: {
        //contentBase: path.join(__dirname, 'docs'),
        //compress: true,
        watchContentBase: true,
        port: 9000
    }
};

