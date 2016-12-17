"use strict"

const assetsUtils = require('./utils/assets')
const cliUtils = require('./utils/cli')
const coreUtils = require('./utils/core')
const reportUtils = require('./utils/report')
const statsUtils = require('./utils/stats')

module.exports = class BuildReportPlugin {

  constructor (options) {
    this.options = Object.assign({}, {
      append: false,
      assets: true,
      output: 'build-report.md',
      saveStats: true
    }, options)
  }

  apply (compiler) {
    compiler.plugin('done', stats => {

      cliUtils.log('start')

      // Convert stats to something more readable
      stats = stats.toJson();

      // Report header
      let report = '# Build report\n'

      // Report generic info
      report += reportUtils.buildGenericInfo(stats)

      // Report assets
      if (this.options.assets) {
        report += assetsUtils.buildAssetsList(stats.assets)
      }

      // Save the report
      reportUtils.save(
        report,
        this.options.append ? 'append' : 'write',
        this.options.output,
        _ => {
          if (this.options.saveStats) {
            statsUtils.save(stats)
          }
        }
      )
    })
  }
}
