const plugins = [
  ["@babel/plugin-syntax-jsx"],
  ["@babel/plugin-transform-react-jsx", { pragma: "createElement" }],
]

const targets = {
  dev: "last 2 Chrome versions",
  prod: "> 0.5%, last 2 versions, Firefox ESR, not dead",
  test: "node 8",
}

const config = {
  plugins,
  env: {
    development: {
      presets: [["@babel/preset-env", { targets: targets.dev }]],
    },
    production: {
      presets: [["@babel/preset-env", { targets: targets.prod }]],
    },
    test: {
      presets: [["@babel/preset-env", { targets: targets.test }]],
    },
  },
}

module.exports = config
