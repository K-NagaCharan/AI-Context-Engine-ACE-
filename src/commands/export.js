const fs = require("fs");

const clipboardy =
  require("clipboardy").default;

const {
  readJSON,
  getACEPaths,
} = require("../utils/storage");

const {
  generateMarkdown,
} = require("../core/exporter");

module.exports = async function exportCommand(options) {

  // Validate ACE
  if (!fs.existsSync(".ace")) {
    console.log("Error: ACE not initialized.");

    return;
  }

  const { projectFile } =
    getACEPaths();

  const projectData =
    readJSON(projectFile);

  // Generate export
  const markdown =
    generateMarkdown(projectData);

  // Clipboard mode
  if (options.toClipboard) {

    await clipboardy.write(markdown);

    console.log("Export copied to clipboard.");

    return;
  }

  // Markdown file mode
  if (options.format === "md") {

    fs.writeFileSync(
      "ace-export.md",
      markdown
    );

    console.log("Export written to ace-export.md");

    return;
  }

  // Default terminal output
  console.log(markdown);
};