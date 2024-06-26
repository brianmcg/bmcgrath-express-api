const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const nodeExternals = require('webpack-node-externals');
const { _moduleAliases: aliases } = require('./package.json');

const resolve = p => path.resolve(__dirname, p);

module.exports = env => ({
  mode: 'production',
  entry: './src/app.js',
  output: {
    path: resolve(env.path ? env.path : 'dist'),
    publicPath: '/',
    filename: 'app.min.js',
  },
  resolve: {
    alias: Object.keys(aliases).reduce(
      (memo, key) => ({ ...memo, [key]: resolve(aliases[key]) }),
      {},
    ),
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
