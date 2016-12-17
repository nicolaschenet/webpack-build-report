# webpack-build-report

Webpack plugin that make it able to save your build reports in an `.md` file after each build.

## Example

**webpack.config.js**

```javascript

// Import the plugin
const BuildReportPlugin = require('webpack-build-report')

// Let's say you build a library of React components. you build them one by one
const components = fs.readdirSync(`${SRC_DIR}/components/`)
const entries = {}

components.forEach(component => {
  const name = component.split('.')[0]
  entries[name] = `${SRC_DIR}/components/${name}`
})

// Add the plugin to your webpack config
const config = {
  entry: entries,
  plugins: [
    // other plugins ...,
    new BuildReportPlugin({
      assets: true,
      output: `${SRC_DIR}/doc/build-report.md`,
      ...
    })
  ]
}

// ...

module.exports = config
```

## Configuration options
Option | Type | Default value | Description
---| --- | --- | ---
assets | bool | true | Adds the assets stats to the final report
output | string | 'build-report.md' | Tell the plugin where you want your report to be saved. Must be an `.md` file !
saveStats | bool | false | Saves the complete build stats in `.build-stats.json`, and allow your report to show comparisons to the last build

---
After your build has finished, you'll find a `build-report.md` file, containing:

# Build report
### Assets list
Asset name | Asset size | Size difference
--- | --- | ---
AlertIllustration.js | 17.41 kB | +6.45 kB
Button.js | 8.41 kB | -
Checkbox.js | 7.26 kB | -
Loader.js | 6.07 kB | -21.12 kB
Modal.js | 15.93 kB | -
PhoneLoader.js | 16.66 kB | -4.00 kB
