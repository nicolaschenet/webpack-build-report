'use strict'

const coreUtils = require('./core')
const statsUtils = require('./stats')

function buildAssetsList (assets) {
  const savedAssets = statsUtils.getSaved().assets || {}
  const hasSavedAssets = !!Object.keys(savedAssets).length
  let assetsList = '### Assets list\n'
  assetsList += 'Asset name | Asset size'
  assetsList += hasSavedAssets ? ' | Size diff' : ''
  assetsList += '\n--- | ---'
  assetsList += hasSavedAssets ? ' | ---\n' : '\n'
  assets.forEach(asset => {
    const sizeDiff = hasSavedAssets && getAssetSizeDiff(asset, savedAssets)
    assetsList += `${asset.name} | ${coreUtils.formatSize(asset.size)}`
    assetsList += sizeDiff ? ` | ${sizeDiff}` : ''
    assetsList += '\n'
  })
  return assetsList
}

function getAssetSizeDiff (asset, savedAssets) {
  const savedAsset = savedAssets.find(_asset => _asset.name === asset.name)
  const diff = savedAsset ? asset.size - savedAsset.size : 0
  let formattedDiff = diff ? coreUtils.formatSize(diff) : '-'
  formattedDiff = diff > 0 ? `+${formattedDiff}` : formattedDiff
  return formattedDiff
}

module.exports = {
  buildAssetsList,
  getAssetSizeDiff
}
