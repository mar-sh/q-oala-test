const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { VueLoaderPlugin } = require('vue-loader');
const { HotModuleReplacementPlugin } = require('webpack');

const htmlWebpack = new HtmlWebpackPlugin({
  showErrors: true,
  cache: true,
  template: path.join(__dirname, './public/index.html'),
  favicon: './public/favicon.ico',
});
const vueLoader = new VueLoaderPlugin();
const hotModuleReplacement = new HotModuleReplacementPlugin();

module.exports = env => {
  const isDev = env.NODE_ENV === 'development';

  return {
    mode: isDev ? 'development' : 'production',
    entry: path.join(__dirname, './src/index.js'),
    output: {
      path: path.join(__dirname, 'build'),
      filename: 'app.bundled.js',
      publicPath: '/',
    },
    devServer: {
      port: 8080,
      hot: true,
      open: true,
      historyApiFallback: true,
    },
    resolve: {
      extensions: ['.js', '.vue'],
      alias: {
        vue$: isDev ? 'vue/dist/vue.runtime.js' : 'vue/dist/vue.runtime.min.js',
        '@': path.resolve(__dirname, './src'),
      },
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
        {
          test: /\.vue$/,
          loader: 'vue-loader',
        },
        {
          test: /\.css$/,
          use: ['vue-style-loader', 'css-loader'],
        },
      ],
    },
    plugins: [htmlWebpack, vueLoader, isDev && hotModuleReplacement],
  };
};
