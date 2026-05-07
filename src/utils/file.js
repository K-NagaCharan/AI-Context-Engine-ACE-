const fs = require("fs");
const path = require("path");

// Get project root (current working dir)
function getProjectRoot() {
  return process.cwd();
}

// Check if directory exists
function exists(p) {
  return fs.existsSync(p);
}

// Create directory
function createDir(p) {
  fs.mkdirSync(p, { recursive: true });
}

// Write JSON file
function writeJSON(filePath, data) {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}

module.exports = {
  getProjectRoot,
  exists,
  createDir,
  writeJSON,
};