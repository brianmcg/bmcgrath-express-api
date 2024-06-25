const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const nodeExternals = require('webpack-node-externals');
const { _moduleAliases: aliases } = require('./package.json');

module.exports = env => ({
  mode: 'production',
  entry: './src/app.js',
  output: {
    path: path.join(__dirname, env.release ? `../releases/${env.release}` : 'dist'),
    publicPath: '/',
    filename: 'app.min.js',
  },
  resolve: {
    alias: Object.keys(aliases).reduce((memo, key) => ({
      ...memo, [key]: path.resolve(__dirname, aliases[key]),
    }), {}),
  },
  externalsPresets: { node: true },
  externals: [nodeExternals()],
  plugins: [
    new CopyPlugin({
      patterns: [
        { from: '.env.*' },
        { from: 'public', to: 'public' },
        { from: 'templates', to: 'templates' },
      ],
    }),
  ],
});

