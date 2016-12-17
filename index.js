"use strict"

const fs = require('fs');
const colors = require('colors')

module.exports = class BuildReportPlugin {

  constructor (options) {
    this.options = Object.assign({}, {
      output: 'build-report.md',
      assets: true
    }, options)
  }

  apply (compiler) {
    compiler.plugin('done', stats => {

      // Convert stats to something more readable
      stats = stats.toJson();

      // Report header
      let report = '# Build report\n'

      if (this.options.assets) {
        report += this.buildAssetsList(stats.assets)
      }

      // Output the report
      fs.writeFile(this.options.output, report, err => {

        if (err) {
          return console.log(' BUILD REPORT '.inverse.red, err)
        }

        console.log(
          '\n\n',
          ' BUILD REPORT '.inverse.green,
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
