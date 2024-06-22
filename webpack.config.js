const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const fs = require('fs');


const nodeModules = {};

fs.readdirSync(path.resolve(__dirname, 'node_modules'))
    .filter(x => ['.bin'].indexOf(x) === -1)
    .forEach(mod => { nodeModules[mod] = `commonjs ${mod}`; });

module.exports = {
  mode: 'production',
  entry: './app.js',
  output: {
    path: path.join(__dirname, 'dist'),
    publicPath: '/',
    filename: 'app.js',
  },
  target: 'node',
  externals: nodeModules,
  plugins: [
    new CopyPlugin({
      patterns: [
        { from: '.env' },
        { from: 'public', to: 'public' },
        { from: 'templates', to: 'templates' },
      ],
    }),
  ],
  ignoreWarnings: [
    {
      module: /node_modules\/express\/lib\/view\.js/,
      message: /the request of a dependency is an expression/,
    },
  ],
};
