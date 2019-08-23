let autoprefixer = require('autoprefixer')
let lost_grid = require('lost')

module.exports = {
  plugins: [autoprefixer(), lost_grid],
}
