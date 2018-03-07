const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'development',

    // 'cheap-module-source-map' is very fast and is a pretty good debugging experience
    // 'eval' is faster, but sources will be shown as es5
    devtool: 'cheap-module-source-map',

    // Defining only 1 application called 'app', and in it, only one entry point -> ./src/index.js
    entry: {
        app: ['./src/index.js'],
    },

    // Making the bundle available in the server as '/bundle.js'
    output: {
        filename: 'bundle.js',
        publicPath: '/',
        path: path.resolve(__dirname),
    },

    // What are loaders? https://webpack.js.org/concepts/#loaders
    module: {
        rules: [
            // Babel transpilation - reference: https://github.com/babel/babel-loader
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules.*/,
                use: [
                    {
                        loader: require.resolve('babel-loader'),
                        options: {
                            // Ignore any .babelrc files, use what is defined below instead
                            babelrc: false,
                            // Babel preset for ES6+ and React
                            presets: [require.resolve('@babel/preset-env'), require.resolve('@babel/preset-react')],
                            plugins: [
                                // Essential for 'react-hot-loader'
                                require.resolve('react-hot-loader/babel'),
                            ],
                            // use node_modules/.cache/babel-loader to cache the results of the loader
                            cacheDirectory: true,
                        },
                    },
                ],
                // For a real project you should use Babel with something like https://github.com/amireh/happypack
            },

            // This loader is adding the react-hot-loader's HOC wrapper to every file that match the '/App.js' RegExp
            // This must appear *after* Babel - to make sure this loader will happen *before* its transpilation
            {
                test: /\/App\.js$/,
                loader: require.resolve('react-hot-loader-loader'),
            },

            // You can add unrelated loaders (non-js) here
            // For example: css pre-processing, images, sprites, etc.
            // Everything added here will happen to the files before react-hot-loader-loader loader
        ],
    },

    // What are plugins? https://webpack.js.org/concepts/#plugins
    plugins: [
        // This will generate a virtual '/index.html' that includes the '/bundle.js' script
        new HtmlWebpackPlugin(),

        // HMR (Hot Module Replacement) activated
        new webpack.HotModuleReplacementPlugin(),

        // Make the logs readable for humans (uses file path instead of numbers)
        new webpack.NamedModulesPlugin(),

        // This is super important - it will make sure that you will not get a full refresh after every error
        // so react-hot-loader can be used instead to recover after errors
        new webpack.NoEmitOnErrorsPlugin(),
    ],
};
