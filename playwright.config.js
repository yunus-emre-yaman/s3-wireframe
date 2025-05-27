export default {
  reporter: [
    ["list"],
    ["./reporter.js", {
      outputFile: "playwright-report.json",
    }],
  ],
  outputDir: "./.test-results",
};
