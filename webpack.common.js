const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserPlugin = require('terser-webpack-plugin');
const devMode = process.env.NODE_ENV !== "production";

module.exports = {
  entry: './src/index.js',
  module: {
    rules: [
      {
        test: /\.(scss)$/,
        use: [
          devMode ?
            {
              // Adds CSS to the DOM by injecting a `<style>` tag
              loader: 'style-loader'
            } :
            {
              // Create CSS file and add link to HTML
              loader: MiniCssExtractPlugin.loader,
            },
          {
            // Interprets `@import` and `url()` like `import/require()` and will resolve them
            loader: 'css-loader'
          },
          {
            // Loader for webpack to process CSS with PostCSS
            loader: 'postcss-loader',
            options: {
              // `postcssOptions` is needed for postcss 8.x;
              // if you use postcss 7.x skip the key
              postcssOptions: {
                plugins: function () {
                  return [
                    require('autoprefixer')
                  ];
                }
              }
            }
          },
          {
            // Loads a SASS/SCSS file and compiles it to CSS
            loader: 'sass-loader'
          }
        ]
      }
    ]
  },
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
    new HtmlWebpackPlugin({
      filename: 'theming-kit.html',
      template: 'src/theming-kit.html',
    }),
  ]
  .concat(
    devMode ?
      [] :
      [
        new MiniCssExtractPlugin({
          filename: 'bundle.css',
        })
      ]
  ),
};
