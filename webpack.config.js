var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var isProduction = process.env.NODE_ENV == "production";

var cssLoader = 'css'
              + '!autoprefixer?{browsers:["last 3 version", "IE 9"]}'
              + '!sass?outputStyle=compressed';

if(!isProduction) {
  cssLoader = cssLoader.replace('css!', 'css?sourceMap!');
  cssLoader = cssLoader.replace('=compressed', '=expanded&sourceMapEmbed=true');
}


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
    alias: { app: __dirname + '/app' },
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
      { test: /\.jsx$/, loaders: ['react-hot', 'jsx?harmony'], exclude: /node_modules/ },
      { test: /\.scss$/, loaders: ['style', cssLoader] },
      { test: /\.(png|jpg|jpeg|gif|svg)/, loaders: ["url?limit=10000"] },
      { test: /\.woff/, loaders: ['url?limit=50000'] },
      { test: /\.(ttf|eot)/, loaders: ['file'] },
      { test: /\.html/, loaders: ['html'] },
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