"use strict"

const fs = require('fs');
const colors = require('colors')

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

        if (this.options.saveStats) {
          fs.writeFileSync('.build-stats.json', JSON.stringify(stats, null, 2))
        }
      })

    })
  }

  getSavedStats () {
    let savedStats
    try {
      savedStats = JSON.parse(fs.readFileSync('.build-stats.json'))
    } catch (err) {
      savedStats = {}
    }
    return savedStats
  }

  getAssetSizeDiff (asset, savedAssets) {
    const savedAsset = savedAssets.find(_asset => _asset.name === asset.name)
    const diff = asset.size - savedAsset.size
    let formattedDiff = diff ? this.formatSize(diff) : '-'
    formattedDiff = diff > 0 ? `+${formattedDiff}` : formattedDiff
    return formattedDiff
  }

  formatSize (size) {
    return `${(size / 1000).toFixed(2)} kB`
  }

  buildAssetsList (assets) {
    const savedAssets = this.getSavedStats().assets || {}
    const hasSavedAssets = !!Object.keys(savedAssets).length
    let assetsList = '### Assets list\n'
    assetsList += 'Asset name | Asset size'
    assetsList += hasSavedAssets ? ' | Size diff' : ''
    assetsList += '\n--- | ---'
    assetsList += hasSavedAssets ? ' | ---\n' : '\n'

    assets.forEach(asset => {
      const sizeDiff = hasSavedAssets && this.getAssetSizeDiff(asset, savedAssets)
      assetsList += `${asset.name} | ${this.formatSize(asset.size)}`
      assetsList += sizeDiff ? ` | ${sizeDiff}` : ''
      assetsList += '\n'
    })
    return assetsList
  }
}
