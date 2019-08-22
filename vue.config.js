var path = require('path')
var stylusLoader = require('stylus-loader')
var stylus_plugin = require('stylus')

module.exports = {
  css: {
    loaderOptions: {
      stylus: {
        // import: [path.resolve(process.execPath, '/src/global.styl')]
      }
    }
  }
}
