const defaultConfig = require('@wordpress/scripts/config/webpack.config');
const { TanStackRouterWebpack } = require('@tanstack/router-plugin/webpack'); // Use require instead of import

module.exports = {
  ...defaultConfig,
  output: {
    ...defaultConfig.output,
    filename: '[name].[contenthash].js',
    chunkFilename: '[name].[contenthash].js', // Use contenthash for cache busting in production
  },
  resolve: {
    ...defaultConfig.resolve,
    extensions: ['.ts', '.tsx', '.js', '.jsx'], // Add .ts and .tsx extensions
  },
  module: {
    ...defaultConfig.module,
    rules: [
      ...defaultConfig.module.rules,
      {
        test: /\.tsx?$/, // Match .ts and .tsx files
        exclude: /node_modules/,
        use: 'ts-loader', // Use ts-loader to compile TypeScript files
      },
    ],
  },
  plugins: [
    ...defaultConfig.plugins,
    TanStackRouterWebpack(), // Add TanStackRouterWebpack plugin
  ],
  optimization: {
    ...defaultConfig.optimization,
    minimize: true, // Enable minification for production
  },
};
