const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
  devServer: {
    static: './dist',
  },
  devtool: 'inline-source-map',
  entry: './src/index.js',
  mode: 'development',
  optimization: {
    // webpack 5: do not create dist/main.js.LICENSE.txt file
    minimizer: [
      new TerserPlugin({
        extractComments: false,
      }),
    ],
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
  plugins: [
    new HtmlWebpackPlugin(),
  ],
};
