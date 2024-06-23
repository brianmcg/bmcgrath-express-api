const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const nodeExternals = require('webpack-node-externals');

module.exports = {
  mode: 'production',
  entry: './app.js',
  output: {
    path: path.join(__dirname, 'dist'),
    publicPath: '/',
    filename: 'app.min.js',
  },
  externalsPresets: { node: true }, // in order to ignore built-in modules like path, fs, etc.
  externals: [nodeExternals()],
  plugins: [
    new CopyPlugin({
      patterns: [
        { from: '.env' },
        { from: 'public', to: 'public' },
        { from: 'templates', to: 'templates' },
      ],
    }),
  ],
};
