var webpack = require('webpack');
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
    path: __dirname+'/build/',
    filename: 'bundle.js',
    publicPath: '/public/'
  },
  plugins: [
    new webpack.ProvidePlugin({
      'window.React': 'react', // needed by react-router
      // 'window.jQuery': 'jquery'
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.optimize.CommonsChunkPlugin('vendors', 'vendors.js'),
    definePlugin
  ],
  module: {
    noParse: [],
    loaders: [
      { test: /\.jsx$/, loaders: ['jsx?harmony'], exclude: /node_modules/ }, // 'react-hot'
      { test: /\.scss$/, loader: 'style!css!sass?outputStyle=expanded' },
    ]
  }
};

// Use bower instead of node require
config.addVendor('react', '/react/react-with-addons'+ (isProduction?'.min':'') +'.js');
config.addVendor('react-router', '/react-router/dist/react-router'+ (isProduction?'.min':'') +'.js');
config.addVendor('reflux', '/reflux/dist/reflux'+ (isProduction?'.min':'') +'.js');


if (!isProduction) {
  // config.devtool = '#eval'; // This is not as dirty as it looks. It just generates source maps without being crazy slow.
}


module.exports = config;