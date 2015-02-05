// Karma configuration

var webpack = require('webpack'),
    RewirePlugin = require("rewire-webpack");

module.exports = function(config) {
  config.set({

    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-sourcemap-loader'),
      require('karma-nested-reporter'),
      require('karma-webpack'),
    ],

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],


    // list of files / patterns to load in the browser
    files: [
      'app/**/*-spec.js'
    ],


    // list of files to exclude
    exclude: [
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      'app/**/*-spec.js': ['webpack', 'sourcemap'],
    },

    // karma watches the test entry points
    // (you don't need to specify the entry option)
    // webpack watches dependencies

    // webpack configuration
    webpack: {
      cache: true,
      resolve: {
        alias: { app: __dirname + '/app' },
        extensions: ['', '.js', '.jsx']
      },
      module: {
        loaders: [
          { test: /\.jsx?$/, loaders: ['jsx?harmony'], exclude: /node_modules/ },
          { test: /\.scss$/, loaders: ['style', 'css?sourceMap!autoprefixer?{browsers:["last 3 version", "IE 9"]}!sass?outputStyle=expanded&sourceMapEmbed=true'] },
          { test: /\.(png|jpg|jpeg|gif|svg)/, loaders: ["url?limit=10000"] },
          { test: /\.woff/, loaders: ['url?limit=50000'] },
          { test: /\.(ttf|eot)/, loaders: ['file'] },
          { test: /\.html/, loaders: ['html'] },
        ]
      },
      plugins: [
        new RewirePlugin(),
        new webpack.NoErrorsPlugin()
      ],
    },


    // webpack-dev-middleware configuration
    webpackMiddleware: {
      noInfo: true,
      stats: {
        colors: true
      }
    },


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['nested'],


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    // autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['Chrome'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,

    
  });
};