
const HtmlWebpackPlugin = require('html-webpack-plugin');

const amlLoader = {
  test: /\.aml$/,
  loaders: [ '@newsdev/archieml-loader' ]
}

module.exports = {
  reactHotLoader: true,
  debug: false,
  hasServer: false,
  modifyWebpackConfig: (config, options) => {
    if (options.type === 'client') {
      config.plugins.push(new HtmlWebpackPlugin({
        template: 'src/index.ejs',
      }));
      if (config.module.loaders) {
        config.module.loaders.push(amlLoader)
      } else {
        config.module.loaders = [amlLoader]
      }
    }

    return config;
  },
};
