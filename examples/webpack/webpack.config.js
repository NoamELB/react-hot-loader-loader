const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    // This is quite fast and gives a really good debugging experience (original es6 in sources and when debugging)
    // Change to 'eval' for faster processing, but es5 in sources
    devtool: 'cheap-module-source-map',

    // Defining only 1 application called 'app', and in it, only one entry point -> ./src/index.js
    entry: {
        app: ['./src/index.js']
    },

    // Setting the output in __dirname/bundle.js (path), and make it available in the server on /bundle.js (publicPath)
    // if using Webpack Dev Server the file will be virtual
    output: {
        filename: 'bundle.js',
        publicPath: '/',
        path: path.resolve(__dirname),
    },
    module: {
        rules: [
            // Babel transpilation
            // Having the generic env, react and additionally 'react-hot-loader/babel'
            // for having its functionality in addition to HMR
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules.*/,
                use: [{
                    loader: require.resolve('babel-loader'),
                    options: {
                        babelrc: false,
                        presets: [
                            require.resolve('babel-preset-env'),
                            require.resolve('babel-preset-react')
                        ],
                        plugins: [
                            // You need to add this for react-hot-loader to work
                            require.resolve('react-hot-loader/babel')
                        ],
                        cacheDirectory: true
                    }
                }]
            },

            // This loader is adding the react-hot-loader's HOC wrapper to every '/App.js' file
            // Change the regex to put it on any other component
            // It must be after Babel - to make sure this loader will happen *before* its transpilation
            {
                test: /\/App\.js$/,
                loader: require.resolve('react-hot-loader-loader'),
            }

            // You can add unrelated loaders (non-js) here
            // For example: css pre-processing, images, sprites, etc.
            // Everything added here will happen to the files before the react-hot-loader-loader loader
        ]
    },
    plugins: [
        // This plugin is needed because we don't have any html file, so it will generate a virtual /index.html
        new HtmlWebpackPlugin(),

        // This plugin is HMR (Hot Module Replacement)
        new webpack.HotModuleReplacementPlugin(),

        // This plugin make the logs to be understandable for humans
        new webpack.NamedModulesPlugin(),

        // This plugin is super important - it make sure that you will not get a full refresh after errors
        // that are under App.js (where we are adding the react-hot-loader code)
        new webpack.NoEmitOnErrorsPlugin()
    ]
};