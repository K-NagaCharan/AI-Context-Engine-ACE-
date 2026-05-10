const fs = require("fs");
const path = require("path");

/**
 * Read JSON file
 */
function readJSON(filePath) {
  return JSON.parse(
    fs.readFileSync(filePath, "utf-8")
  );
}

/**
 * Write JSON file
 */
function writeJSON(filePath, data) {
  fs.writeFileSync(
    filePath,
    JSON.stringify(data, null, 2)
  );
}

/**
 * Get ACE paths
 */
function getACEPaths() {
  const root = process.cwd();

  return {
    aceDir: path.join(root, ".ace"),

    projectFile: path.join(
      root,
      ".ace",
      "project.ai.json"
    ),

    configFile: path.join(
      root,
      ".ace",
      "config.json"
    ),
  };
}

module.exports = {
  readJSON,
  writeJSON,
  getACEPaths,
};