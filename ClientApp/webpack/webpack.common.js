var path = require('path');

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
        test: /.(ttf|otf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
        loader: 'url-loader?limit=100000'
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
  }
}
