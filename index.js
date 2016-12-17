"use strict"

const fs = require('fs');
const colors = require('colors')

const assetsUtils = require('./utils/assets')
const coreUtils = require('./utils/core')
const statsUtils = require('./utils/stats')

module.exports = class BuildReportPlugin {

  constructor (options) {
    this.options = Object.assign({}, {
      assets: true,
      output: 'build-report.md',
      saveStats: true
    }, options)
  }

  apply (compiler) {
    compiler.plugin('done', stats => {

      console.log(
        '\n\n',
        ' WEBPACK BUILD REPORT '.inverse,
        'Crafting your report...',
        '\n'
      )

      // Convert stats to something more readable
      stats = stats.toJson();

      // Report header
      let report = '# Build report\n'

      if (this.options.assets) {
        report += assetsUtils.buildAssetsList(stats.assets)
      }

      // Output the report
      fs.writeFile(this.options.output, report, err => {

        if (err) {
          return console.log(' WEBPACK BUILD REPORT '.inverse.red, err)
        }

        console.log(
          '\n\n',
          ' WEBPACK BUILD REPORT '.inverse.green,
          '💾 ',
          'File',
          `${this.options.output}`.yellow.bold,
          'successfully saved !',
          '\n\n'
        )

        if (this.options.saveStats) {
          statsUtils.save(stats)
        }
      })
    })
  }
}
