/* eslint camelcase:0 */
require('dotenv').config({ silent: true });

process.env.BROWSERSLIST_CONFIG = 'browserslist';

const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const cssnext = require('postcss-cssnext');
const StyleLintPlugin = require('stylelint-webpack-plugin');
const postcssImporter = require('postcss-import');
const postcssSimpleVars = require('postcss-simple-vars');
const postcssNested = require('postcss-nested');
const postcssHexRgba = require('postcss-hexrgba');

const rootPath = process.cwd();

const webpackConfig = {

  entry: [
    path.join(rootPath, 'app/main.jsx')
  ],

  output: {
    path: path.join(rootPath, 'dist/'),
    filename: '[name]-[hash].js',
    publicPath: '/'
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: 'app/index.html',
      inject: 'body',
      filename: 'index.html'
    }),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
      config: {
        apiHost: JSON.stringify(process.env.API_HOST),
        googleAnalytics: JSON.stringify(process.env.GOOGLE_ANALYTICS)
      }
    }),
    new StyleLintPlugin({
      configFile: path.join(rootPath, '.stylelintrc'),
      files: 'app/styles/**/*.pcss'
    })
  ],

  module: {
    loaders: [
      { test: /\.jsx?$/, exclude: /node_modules/, loader: 'babel' },
      {
        test: /\.pcss$/,
        exclude: /node_modules/,
        loader: 'style!css!postcss'
      },
      { test: /\.css$/, loader: 'style-loader!css-loader' }
    ]
  },
  resolve: {
    root: [
      rootPath
    ],
    alias: {
      actions: 'app/actions',
      reducers: 'app/reducers',
      components: 'app/components',
      containers: 'app/containers',
      constants: 'app/constants',
      locales: 'app/locales'
    },
    extensions: ['', '.js', '.jsx']
  },

  postcss: (webpackPCss) => [
    postcssImporter({ addDependencyTo: webpackPCss }),
    cssnext,
    postcssSimpleVars,
    postcssNested,
    postcssHexRgba
  ]

};

// Environment configuration
if (process.env.NODE_ENV === 'production') {
  webpackConfig.plugins.push(new webpack.optimize.UglifyJsPlugin({
    compress: {
      warnings: false,
      dead_code: true,
      drop_debugger: true,
      drop_console: true
    },
    comments: false
  }));
} else {
  webpackConfig.devtool = 'eval-source-map';
}

module.exports = webpackConfig;
