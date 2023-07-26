const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

module.exports = {
  webpack: function (config, env) {
    // tsconfig-paths-webpack-plugin 설정 추가
    config.resolve.plugins = [
      new TsconfigPathsPlugin({
        configFile: './tsconfig.json',
      }),
    ];

    return config;
  },
};
