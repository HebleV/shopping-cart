const path = require('path')
const nodeExternals = require('webpack-node-externals');

module.exports = (env, argv) => {
  const SERVER_PATH = './server/server.js';

return ({
  entry: {
    server: SERVER_PATH,
  },
  output: {
    path: path.join(__dirname, 'build'),
    publicPath: '/',
    filename: '[name].js'
  },
  target: 'node',
  node: {
    __dirname: false,
    __filename: false, 
  },
  externals: [nodeExternals()],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      }
    ]
  }
});
}
