'use strict'

require('colors')

function log (mode, options) {
  switch (mode) {
    case 'start':
      console.log(
        '\n\n',
        ' WEBPACK BUILD REPORT '.inverse,
        'Crafting your report...',
        '\n'
      )
      break
    case 'unauthorized-mode':
      console.log(
        ' WEBPACK BUILD REPORT '.inverse.red,
        `Unable to save report: unauthorized '${options.mode}' mode`
      )
      break
    case 'error':
      console.log(' WEBPACK BUILD REPORT '.inverse.red, options.err)
      break
    case 'success':
      console.log(
        '\n\n',
        ' WEBPACK BUILD REPORT '.inverse.green,
        '💾 ',
        'File',
        `${options.output}`.yellow.bold,
        'successfully saved !',
        '\n\n'
      )
      break
  }
}

module.exports = {
  log
}
