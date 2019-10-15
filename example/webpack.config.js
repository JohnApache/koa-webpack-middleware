const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
module.exports = {
    mode: 'development',
    entry: ['webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000&reload=true', path.resolve(__dirname, './src/index.js')],
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, './dist')
    },
    module: {
        rules: [
            {
                test: /\.css/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, './index.html'),
            hash: true
        }),
        new webpack.HotModuleReplacementPlugin()
    ]
}