let webpack = require('webpack');

class AutoExtract {

  /**
   * Create a new component instance.
   */
  constructor() {
    this.options = {
      vendorPath: 'js/vendor',
      manifestPath: 'js/manifest',
      excludeRegExp: /^.*\.(css|scss|sass|less|styl)$/,
      generateManifest: true,
    };
  }

  /**
   * Register the component.
   *
   * @param params Object
   */
  register(params = {}) {
    this.options = Object.assign({}, this.options, params);
  }

  /**
   * webpack plugins to be appended to the master config.
   */
  webpackPlugins() {
    let self = this;

    let plugins = [
      // https://webpack.js.org/plugins/commons-chunk-plugin/
      new webpack.optimize.CommonsChunkPlugin({
        name: this.options.vendorPath,
        minChunks: function (module) {
          // This prevents stylesheet resources with these extensions
          // from being moved from their original chunk to the vendor chunk
          if (module.resource && (self.options.excludeRegExp).test(module.resource)) {
            return false;
          }
          return module.context && module.context.indexOf("node_modules") !== -1;
        }
      }),
    ];

    if (this.options.generateManifest) {
      plugins.push(
        new webpack.optimize.CommonsChunkPlugin({
          name: this.options.manifestPath,
          minChunks: Infinity
        }))
    }

    return plugins;
  }
}

module.exports = AutoExtract;
