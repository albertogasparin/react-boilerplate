var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var isProduction = process.env.NODE_ENV == "production";


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
    app: ['./app/main.jsx'],
    vendors: ['react', 'react-router', 'reflux']
  },
  output: {
    filename: '[name].js',
    path: __dirname+'/assets',
    publicPath: '/assets/'
  },
  
  module: {
    noParse: [],
    loaders: [
      { test: /\.scss$/, loader: ExtractTextPlugin.extract('style','css?sourceMap!sass?outputStyle=expanded&sourceMapEmbed=true') },
      { test: /\.jsx$/, loaders: ['react-hot', 'jsx?harmony'], exclude: /node_modules/ },
    ]
  },

  plugins: [
    // new ExtractTextPlugin("css/[name].css", { allChunks: true }),
    new webpack.optimize.CommonsChunkPlugin('vendors', 'vendors.js'),
  ],
};

// For bower vendors
// config.addVendor('reflux', '/reflux/dist/reflux'+ (isProduction?'.min':'') +'.js');


if (!isProduction) {
  // allow hot reload
  config.entry.app.unshift('webpack-dev-server/client?http://0.0.0.0:3000', 'webpack/hot/dev-server');
  config.plugins.unshift( new webpack.HotModuleReplacementPlugin() );
  // add sourcemaps
  config.devtool = 'eval-source-map';
}


module.exports = config;