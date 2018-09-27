var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: './src/index.tsx',
  output: {
    filename: '[name].js',
    publicPath: '/public/dist',
    path: path.resolve(__dirname, '../public/dist')
  },
  resolve: {
    modules: [
      "node_modules",
      path.resolve(__dirname, "../src")
    ],
    extensions: ['.js', '.ts', '.tsx', '.css', 'scss', '.json']
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          { loader: "style-loader" },
          { loader: "css-loader" }
        ]
      },
      {
        test: /\.(png|jpe?g|gif|ttf|otf|eot|svg|woff(2)?)$/,
        loader: 'file-loader',
        options: {
          name: "assets/[name].[hash].[ext]",
          publicPath: "/"
        }
      },
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              transpileOnly: true
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new webpack.LoaderOptionsPlugin({
      options: {
        context: process.cwd() // or the same value as `context`
      }
    })]
}
