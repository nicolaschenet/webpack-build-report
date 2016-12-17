"use strict"

const fs = require('fs');
const colors = require('colors')

module.exports = class BuildReportPlugin {

  constructor (options) {
    this.options = Object.assign({}, {
      assets: true,
      output: 'build-report.md',
      saveStats: false
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

      if (this.options.saveStats) {
        fs.writeFileSync('.build-stats.json', JSON.stringify(stats, null, 2))
      }

      // Report header
      let report = '# Build report\n'

      if (this.options.assets) {
        report += this.buildAssetsList(stats.assets)
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
      })

    })
  }

  buildAssetsList (assets) {
    let assetsList = '### Assets list\n'
    assetsList += 'Asset name | Asset size\n--- | ---\n'
    assets.forEach(asset => {
      assetsList += `${asset.name} | ${(asset.size / 1000).toFixed(2)} kB\n`
    })
    return assetsList
  }
}
