const path = require('path');
const nodeExternals = require('webpack-node-externals');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  mode: 'production',
  entry: './app.js',
  output: {
    path: path.join(__dirname, 'dist'),
    publicPath: '/',
    filename: 'app.js',
  },
  target: 'node',
  externals: [nodeExternals()],
  plugins: [
    new CopyPlugin({
      patterns: [
        { from: '.env' },
        { from: 'public', to: 'public' },
      ],
    }),
  ],
};
