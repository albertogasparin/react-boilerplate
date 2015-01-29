var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var isProduction = process.env.NODE_ENV == "production";

var definePlugin = new webpack.DefinePlugin({
  IS_CLIENT: "true"
});

var config = {
  addVendor: function (name, path) {
    path = __dirname + '/bower_components' + path;
    var pathRegexp = new RegExp('^'+path+'$');
    this.resolve.alias[name] = path;
    this.entry.vendors.push(name);
    // this.module.noParse.push(pathRegexp);
    this.module.loaders.push({ test: pathRegexp, loader: "imports?require=>__webpack_require__" });
  },
  cache: true,
  resolve: {
    alias: {},
    extensions: ['', '.js', '.jsx']
  },
  entry: {
    app: ['webpack-dev-server/client?http://0.0.0.0:3000', 'webpack/hot/dev-server', './app/main.jsx'],
    vendors: []
  },
  output: {
    filename: '[name].js',
    path: __dirname+'/assets',
    publicPath: '/assets/'
  },
  
  module: {
    noParse: [],
    loaders: [
      { test: /\.jsx$/, loaders: ['jsx?harmony'], exclude: /node_modules/ }, // 'react-hot'
      { test: /\.scss$/, loader: ExtractTextPlugin.extract('style','css?sourceMap!sass?outputStyle=expanded&sourceMapEmbed=true') },
    ]
  },

  plugins: [
    new webpack.ProvidePlugin({
      'window.React': 'react', // needed by react-router
      // 'window.jQuery': 'jquery'
    }),
    new webpack.HotModuleReplacementPlugin(),
    new ExtractTextPlugin("css/[name].css", {
      disable: false,
      allChunks: true
    }),
    new webpack.optimize.CommonsChunkPlugin('vendors', 'vendors.js'),
    definePlugin
  ],
};

// Use bower instead of node require
config.addVendor('react', '/react/react-with-addons'+ (isProduction?'.min':'') +'.js');
config.addVendor('react-router', '/react-router/dist/react-router'+ (isProduction?'.min':'') +'.js');
config.addVendor('reflux', '/reflux/dist/reflux'+ (isProduction?'.min':'') +'.js');


if (!isProduction) {
  config.devtool = 'sourcemap';
}


module.exports = config;