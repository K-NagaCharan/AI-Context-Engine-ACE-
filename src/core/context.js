const {
  getCommitFiles,
  getCommitDiff,
} = require("./git");

// Build structured context object
async function buildContext(commit, note = "") {
  const files = await getCommitFiles(commit.hash);

  const diff = await getCommitDiff(commit.hash);

  return {
    commit: commit.hash,
    message: commit.message,
    files,
    diff,
    note,
  };
}

module.exports = {
  buildContext,
};