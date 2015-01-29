var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./webpack.config');

new WebpackDevServer(webpack(config), {
  publicPath: config.output.publicPath,
  hot: true,
  // webpack-dev-middleware options
  quiet: false,
  noInfo: true,
  // lazy: true, // compiles on every request to the entry point
  // watchDelay: 300,
  // headers: { "X-Custom-Header": "yes" },
  stats: { colors: true }
}).listen(3000, '0.0.0.0', function (err, result) {
  if (err) {
    console.log(err);
  }

  console.log('Listening at 0.0.0.0:3000');
});
