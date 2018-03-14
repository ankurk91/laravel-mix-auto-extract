let webpack = require('webpack');

class AutoExtract {

  register(params) {
    // todo allow some customization
  }

  webpackPlugins() {
    return [
      // https://webpack.js.org/plugins/commons-chunk-plugin/
      new webpack.optimize.CommonsChunkPlugin({
        name: 'js/vendor',
        minChunks: function (module) {
          // This prevents stylesheet resources with these extensions
          // from being moved from their original chunk to the vendor chunk
          if (module.resource && (/^.*\.(css|scss|less)$/).test(module.resource)) {
            return false;
          }
          return module.context && module.context.indexOf("node_modules") !== -1;
        }
      }),
      new webpack.optimize.CommonsChunkPlugin({
        name: 'js/manifest',
        minChunks: Infinity
      })]
  }
}

module.exports = AutoExtract;
