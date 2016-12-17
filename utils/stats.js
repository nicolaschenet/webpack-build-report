"use strict"

const fs = require('fs')

const STATS_FILE = '.build-stats.json'

function getSaved () {
  let savedStats
  try {
    savedStats = JSON.parse(fs.readFileSync(STATS_FILE))
  } catch (err) {
    savedStats = {}
  }
  return savedStats
}

function save (stats) {
  fs.writeFileSync(STATS_FILE, JSON.stringify(stats, null, 2))
}

module.exports = {
  getSaved,
  save
}
