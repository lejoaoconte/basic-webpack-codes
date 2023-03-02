const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const webpack = require("webpack");
const DotEnvPlugin = require("dotenv-webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "[name][contenthash].js",
    path: path.resolve(__dirname, "dist"),
  },
  mode: "development",
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: "[name][contenthash].css",
    }),
    new webpack.DefinePlugin({
      PORT: JSON.stringify("8080"),
    }),
    new DotEnvPlugin(),
    new HtmlWebpackPlugin(),
  ],
};
