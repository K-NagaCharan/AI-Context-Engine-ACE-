const path = require("path");
const readline = require("readline");
const {
  getProjectRoot,
  exists,
  createDir,
  writeJSON,
} = require("../utils/file");

function askQuestion(query) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise((resolve) =>
    rl.question(query, (ans) => {
      rl.close();
      resolve(ans);
    })
  );
}

module.exports = async function init(options) {
  const root = getProjectRoot();

  const gitPath = path.join(root, ".git");
  const acePath = path.join(root, ".ace");

  // Validate Git repo
  if (!exists(gitPath)) {
    console.log("Error: Not a Git repository.");
    console.log("Run `git init` first.");
    return;
  }

  // Already initialized
  if (exists(acePath)) {
    console.log("Warning: ACE already initialized.");
    return;
  }

  let description = "";
  let techStack = [];

  //  Interactive mode (default)
  if (!options.y) {
    description = await askQuestion("Project description: ");
    const tech = await askQuestion(
      "Tech stack (comma separated): "
    );
    techStack = tech.split(",").map((t) => t.trim());
  }

  // Create .ace
  createDir(acePath);

  // project.ai.json
  writeJSON(path.join(acePath, "project.ai.json"), {
    version: "1.0",
    project: {
      name: path.basename(root),
      description,
      tech_stack: techStack,
      created_at: new Date().toISOString(),
    },
    entries: [],
  });

  // config.json
  writeJSON(path.join(acePath, "config.json"), {
    last_processed_commit: null,
    max_commits_per_update: 5,
  });

  console.log(" ACE initialized successfully!");
};