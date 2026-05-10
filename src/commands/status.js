const fs = require("fs");

const {
  readJSON,
  getACEPaths,
} = require("../utils/storage");

module.exports = function status() {

  // Validate ACE
  if (!fs.existsSync(".ace")) {
    console.log("Error: ACE not initialized.");

    return;
  }

  const {
    projectFile,
    configFile,
  } = getACEPaths();

  const projectData =
    readJSON(projectFile);

  const config =
    readJSON(configFile);

  const entries =
    projectData.entries;

  console.log(`
==================================
ACE Project Status
==================================

Project:
${projectData.project.name}

Description:
${projectData.project.description}

Tech Stack:
${projectData.project.tech_stack.join(", ")}

----------------------------------

Total Entries:
${entries.length}

Last Processed Commit:
${
  config.last_processed_commit
    ? config.last_processed_commit.slice(0, 7)
    : "None"
}

==================================
Recent Entries
==================================
`);

  const recent =
    entries.slice(-3).reverse();

  if (recent.length === 0) {

    console.log(
      "No entries available yet."
    );

    return;
  }

  for (const entry of recent) {

    console.log(`
----------------------------------

Commit:
${entry.commit}

Summary:
${entry.summary}

Files:
${entry.files.join(", ")}

Note:
${entry.note || "None"}
`);
  }
};