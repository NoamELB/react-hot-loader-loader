const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const webpackConfig = require('./webpack.config');

// Defining the Dev Server variables
const [protocol, host, port] = ['http', 'localhost', 1234];
const publicPath = `${protocol}://${host}:${port}`;

const devServerConfig = {
    host,
    hot: true, // allows HMR
    overlay: true, // allows an overlay for errors in the client
    noInfo: true, // make sure there are no useless logs in the terminal (will still show errors)
    clientLogLevel: 'info', // change to warning if there are too many messages in the browser console
    https: protocol === 'https', // true will generate a localhost https certificate that you should white-list by using this guide (works for all browser beside firefox, which you can whitelist manually in browser) https://www.accuweaver.com/2014/09/19/make-chrome-accept-a-self-signed-certificate-on-osx/
    disableHostCheck: true, // no host check for localhost
};

// Adding dev-server client too all the applications (we only have one in this example - 'app')
Object.keys(webpackConfig.entry).forEach(app => {
    webpackConfig.entry[app].push(`webpack-dev-server/client?${publicPath}`, 'webpack/hot/dev-server');
});

// Start Webpack Dev Server
const server = new WebpackDevServer(webpack(webpackConfig), devServerConfig);
server.listen(port, host, () => console.log(`+*+*+ Dev Server up on ${publicPath} +*+*+`));
