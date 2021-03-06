const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");

module.exports = {
  entry: {
    index: "./src/ts/index.ts",
    calculator: "./src/ts/calculator.ts",
  },
  devtool: "source-map",
  optimization: {
    usedExports: true,
  },
  resolve: {
    extensions: [".ts", ".js"],
  },
  plugins: [new ForkTsCheckerWebpackPlugin()],
  module: {
    rules: [
      {
        test: /\.html$/,
        use: ["html-loader"],
      },
      {
        test: /\.tsx?$/,
        loader: "ts-loader",
        exclude: /node_modules/,
        options: {
          transpileOnly: true,
        },
      },
    ],
  },
};
