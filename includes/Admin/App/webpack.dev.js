const defaultConfig = require("@wordpress/scripts/config/webpack.config");
const { TanStackRouterWebpack } = require("@tanstack/router-plugin/webpack");
const path = require("path");

module.exports = {
  ...defaultConfig,
  output: {
    ...defaultConfig.output,
    filename: "[name].js",
    chunkFilename: "[name].js",
  },
  resolve: {
    ...defaultConfig.resolve,
    extensions: [".ts", ".tsx", ".js", ".jsx"], // Add .ts and .tsx extensions
  },
  module: {
    ...defaultConfig.module,
    rules: [
      // Exclude the default CSS rule to prevent conflicts
      ...defaultConfig.module.rules.filter(
        (rule) => !String(rule.test).includes("\\.css$"),
      ),
      // Add TypeScript loader
      {
        test: /\.tsx?$/, // Match .ts and .tsx files
        exclude: /node_modules/,
        use: "ts-loader", // Use ts-loader to compile TypeScript files
      },
      // Add rule for processing CSS with PostCSS loader (for Tailwind)
      {
        test: /\.css$/,
        include: path.resolve(__dirname, "src"), // Adjust path as needed
        use: [
          "style-loader", // Injects styles into DOM
          {
            loader: "css-loader",
            options: {
              importLoaders: 1, // Number of loaders applied before css-loader
            },
          },
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                // Use your custom postcss.config.js
                config: path.resolve(__dirname, "postcss.config.js"),
              },
            },
          },
        ],
      },
    ],
  },
  plugins: [
    ...defaultConfig.plugins,
    TanStackRouterWebpack(), // Add TanStackRouterWebpack plugin
  ],
};
