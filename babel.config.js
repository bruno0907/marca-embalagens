module.exports = {
  presets: ['next/babel'],
  "env": {
    "test": {
      "plugins": ["transform-dynamic-import"]
    }
  }
}