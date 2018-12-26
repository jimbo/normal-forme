const junitOptions = {
  ancestorSeparator: ": ",
  classNameTemplate: "{classname}",
  outputDirectory: "dist",
  outputName: "./junit.xml",
  suiteName: "Jest Tests",
  suiteNameTemplate: "{filename}",
  titleTemplate: "{title}",
}

const config = {
  clearMocks: true,
  reporters: [["default", {}], ["jest-junit", junitOptions]],
}

module.exports = config
