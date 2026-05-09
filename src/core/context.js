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


function buildEntry(context, aiSummary) {
  return {
    // Short commit hash
    commit: context.commit.slice(0, 7),

    message: context.message,
    
    // Current timestamp
    timestamp: new Date().toISOString(),

    // Metadata from context
    files: context.files,
    note: context.note,

    // AI-generated fields
    summary: aiSummary.summary,
    key_changes: aiSummary.key_changes,
    impact: aiSummary.impact,
  };
}

module.exports = {
  buildContext,
  buildEntry,
};