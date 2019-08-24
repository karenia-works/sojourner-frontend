var path = require('path')
var app_root = require('app-root-path')

module.exports = {
  css: {
    loaderOptions: {
      stylus: {
        import: [app_root.resolve('/src/styles/global.styl')],
      },
      postcss: {},
    },
  },
}
