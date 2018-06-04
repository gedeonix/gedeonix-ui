const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const HtmlWebpackPlugin = require('html-webpack-plugin')
const HtmlWebpackExcludeAssetsPlugin = require('html-webpack-exclude-assets-plugin');

const devMode = process.env.NODE_ENV !== 'production';

module.exports = {
    // mode: 'development',
    devtool: 'source-map',
    entry: './src/ui.scss',
    /*
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'index.js',
        publicPath: '/dist'
    },
    */
    cache: false,
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: [MiniCssExtractPlugin.loader,
                    {
                        loader: "css-loader", options: {
                            sourceMap: true
                        }
                    }, {
                        loader: "sass-loader", options: {
                            sourceMap: true
                        }
                    }]
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

