import HtmlWebpackPlugin from 'html-webpack-plugin';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import path from 'path';
import { fileURLToPath } from 'url';
import webpack from 'webpack';

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

export default (env) => {
  const plugins = [];
  /* "--env analyze=true" part of "analyze" script ("analyze": "webpack --env analyze=true")
  tells Webpack to pass an object { analyze: true } as the env parameter 
  to the configuration function. */
  if (env && env.analyze) {
    plugins.push(new BundleAnalyzerPlugin());
  }

  return {
    /* 
        DEVELOPMENT:                            PRODUCTION:
    unoptimized, readable                   minified, optimized
    source maps enabled                     source maps disabled
    faster build speed                      slower build speed (due to optimizations)
    module names human-readable             module names shortened or hashed
    tree shaking disabled                   tree shaking enabled
    process.env.NODE_ENV = 'development'    process.env.NODE_ENV = 'production' */
    mode: 'development',
    /* automatically update the dist folder when source files change.
    in DevServer, watch mode is enabled by default */
    // 🚩 watch: true, 🚩
    /* keys: chosen names of files after bundling values: 
     values: file paths of files to bundle

    point or points where to start the application bundling process. if an array is 
    passed then all items will be processed (into a single output file) */
    entry: {
      index: path.resolve(__dirname, 'client/src/index.jsx'),
    },

    // output filename for the entry chunk is extracted from output.filename
    output: {
      path: path.resolve(__dirname, 'dist'),
      // always serve assets starting from the specified root
      publicPath: '/',
      /* '[name]' will reflect specified entry names
    '[contenthash]' is used for cache busting, ensuring that browsers load the 
    latest version of assets when their contents change */
      filename: '[name]-bundle[contenthash].js',
      // clean the output directory before emit (delete files in 'dist' folder)
      clean: true,
      /* the same as output.filename, but for Asset Modules AKA non-JavaScript 
    resources (fonts, icons, etc) */
      assetModuleFilename: '[name][ext]',
    },
    // determines how the different types of modules within a project will be treated
    module: {
      rules: [
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader', 'postcss-loader'],
        },

        {
          test: /.(js|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env', '@babel/preset-react'],
            },
          },
        },
        {
          test: /\.(png|svg|jpg|jpeg|gif)$/i,
          type: 'asset/resource',
        },
      ],
    },
    // plugins serve the purpose of doing anything else that a loader cannot do
    plugins: [
      ...plugins,
      /* tells webpack to automatically load the react module and assign it to the global 
      variable React- can now use React in modules without explicitly importing it */
      new webpack.ProvidePlugin({
        React: 'react',
      }),
      new HtmlWebpackPlugin({
        // the title to use for the generated HTML document
        title: 'Warboat!',
        // 	adds the given favicon path to the output HTML
        favicon: 'favicon.ico',
        // the file to write the HTML to (defaults to 'index.html')
        filename: 'index.html',
        // relative or absolute path to the template (defaults to src/index.ejs if it exists)
        template: 'client/src/index.html',
        // 'chunks' specifies which js bundle to inject into the generated HTML file
        chunks: ['index'],
      }),
      //   new HtmlWebpackPlugin({
      //     title: "The other HTML file's title",
      //     filename: 'notes.html',
      //     template: 'views/notes.ejs',
      //     chunks: ['notes'],
      // 🚩 }),
    ],
    devServer: {
      /* useful when you have a separate API backend development server and you want to 
    send API requests on the same domain */
      // 🚩 proxy: [
      //     // A request to '/search' will now proxy the request to http://localhost:3000/search
      //     {
      //       context: ['/search'],
      //       target: 'http://localhost:3000/',
      //     },
      // 🚩 ],
      static: {
        // serve files from this location
        directory: path.resolve(__dirname, 'dist'),
      },
      // which port to serve from
      port: 8080,
      // open a new tab (and open a specified page) automatically
      open: ['/'],
      // use hot module reloading
      hot: true,
      /* enable gzip compression- compression algo that compresses 
    both static and dynamic files transmitted to client by DevServer (only if
    'Accept-Encoding' header is present on client's HTTP request) */
      compress: true,
      // redirects all 404 responses to index.html file
      historyApiFallback: true,
      // 🚩 historyApiFallback: {
      //     // serve different files at different endpoints
      //     rewrites: [
      //       { from: /^\/$/, to: 'index.html' },
      //       { from: /^\/notes/, to: '/notes.html' },
      //     ],
      // 🚩  },
      // watch for changes to index.html
      watchFiles: ['src/**/*.html'],
    },
  };
};
