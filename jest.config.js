const junitOptions = {
  ancestorSeparator: ": ",
  classNameTemplate: "{classname}",
  outputDirectory: "dist",
  outputName: "./junit.xml",
  suiteName: "Jest Tests",
  suiteNameTemplate: "{filename}",
  titleTemplate: "{classname} {title}",
}

const config = {
  clearMocks: true,
  coverageReporters: ["cobertura", "json", "text"],
  reporters: ["default", ["jest-junit", junitOptions]],
}

module.exports = config
