const path = require('path');
const webpack = require("webpack");
const MiniCssExtractPlugin =  require('mini-css-extract-plugin');

module.exports = (env) => {
    const isProduction = env === 'production';
    return {
        mode: isProduction ? 'production' : 'development',
        entry: './src/app.js',
        output: {
            path: path.join(__dirname, 'public'),
            filename: "bundle.js"
        },
        module: {
            rules: [{
                loader: 'babel-loader',
                test: /\.js$/,
                exclude: /node_modules/
            }, {
                test: /\.s?css$/,
                use: [
                    isProduction ? MiniCssExtractPlugin.loader : 'style-loader',
                    {
                        loader: 'css-loader',
                        options: {sourceMap: true}
                    },
                    {
                        loader: 'sass-loader',
                        options: {sourceMap: true}
                    }
                  ]
            },{
                loader: 'file-loader',
                test: /\.(png|jpg|gif|svg)$/
            }]
        },
        plugins: [
            new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
            new MiniCssExtractPlugin({
                filename: '[name].css'
              })
        ],
        devtool: isProduction ? 'source-map' : 'inline-source-map',
        devServer: {
            contentBase: path.join(__dirname, 'public'),
            historyApiFallback: true,
            proxy: {
                '/api': 'http://localhost:8081'
              }
        }
    }
}