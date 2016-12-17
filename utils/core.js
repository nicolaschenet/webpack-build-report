"use strict"

function formatSize (size) {
  return `${(size / 1000).toFixed(2)} kB`
}

module.exports = {
  formatSize
}
