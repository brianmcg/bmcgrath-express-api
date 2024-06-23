const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const nodeExternals = require('webpack-node-externals');

module.exports = env => {
  return {
    mode: 'production',
    entry: './app.js',
    output: {
      path: path.join(__dirname, env.release ? `../releases/${env.release}` : 'dist'),
      publicPath: '/',
      filename: 'app.min.js',
    },
    externalsPresets: { node: true },
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

}

