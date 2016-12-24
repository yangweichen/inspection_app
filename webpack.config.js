/* eslint-disable no-unused-vars, no-fallthrough*/
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const merge = require('webpack-merge');
const validate = require('webpack-validator');
const tools = require('./libs/webpack.tools');

// Init common paths used by config
const path = require('path');
const PATHS = {
  app: path.join(__dirname, 'app/components'),
  build: path.join(__dirname, 'app/build'),
  // favicon: path.join(__dirname, 'app/src/favicon.ico'),
  stylesheets: path.join(__dirname, 'app/src/stylesheets', 'style.scss'),
  // logo: path.join(__dirname, 'app/src/images/logo.png'),
  html_template: path.join(__dirname, 'app/src/index.html')
};

// Vendor dependencies, isolated for chunking
const vendorDependencies = [
  'axios',
  'react', 'react-dom', 'react-helmet', 'react-router',
  'redux', 'react-redux', 'redux-logger', 'redux-thunk'
]

// index.html template
let htmlTemplate = {
  title: 'Inspect.ion',
  meta: {
    description: 'Safety inspection logging and reporting',
    author: 'Jake Peyser',
    keywords: 'trucking,inspections'
  },
  template: PATHS.html_template
}

// Standard build artifacts for all envs
const common = {
  entry: {
    app: PATHS.app,
    style: PATHS.stylesheets
  },
  output: {
    path: PATHS.build,
    sourceMapFilename: '[file].map',
    filename: '[name].js'
  },
  plugins: [
    new ExtractTextPlugin('[name].[chunkhash].css'),
    new HtmlWebpackPlugin(htmlTemplate),
    new CleanWebpackPlugin( // remove old build before each bundling
      [ PATHS.build ],
      { root: process.cwd() }
    )
  ],
  module: {
    loaders: [
      { // Convert React code into vanilla ES5
        test: /jsx?$/,
        exclude: /node_modules/,
        loader: 'babel'
      },
      { // Transpile SASS and load CSS
        test: /\.scss$/,
        loader: process.env.NODE_ENV !== 'production' ?
          'style!css!sass' : ExtractTextPlugin.extract('style', 'css!sass'),
        include: PATHS.stylesheets
      },
      { // Transfer static files to build
        test: /\.(pdf|gif|png|jpe?g|svg)$/,
        loader: 'file?name=[path][name].[ext]',
        include: PATHS.images
      }
    ]
  }
}

// Detect how npm is run and switch based on this
let config, devServer;
switch (process.env.npm_lifecycle_event) {
  case 'build':
    config = merge(
      common,
      {
        devtool: 'source-map',
        output: Object.assign(common.output, {
          filename: '[name].[chunkhash].js',
          chunkFilename: '[chunkhash].js'
        }),
        plugins: [
          ...common.plugins,
          new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production')
          })
        ]
      },
      tools.extractBundle({
        name: 'vendor',
        entries: vendorDependencies
      }),
      tools.minify()
    );
    break;
  case 'hmr': // Establish a HMR dev server
    devServer = tools.devServer({ port: 3000 });
  case 'stats': // Used to generate build stats
  case 'build-watch':
    config = merge(
      common,
      devServer,
      {
        devtool: 'eval-source-map',
        plugins: [
          ...common.plugins,
          new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('development')
          })
        ]
      }
    );
    break;
  default:
    console.log('No Webpack config specified')
    config = merge(common)
}

module.exports = validate(config, { quiet: true });
