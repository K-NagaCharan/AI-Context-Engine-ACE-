const simpleGit = require("simple-git");

const git = simpleGit();

// Check if current directory is a git repo
async function isGitRepo() {
  return await git.checkIsRepo();
}

// Check if repo has commits
async function hasCommits() {
  try {
    await git.revparse(["HEAD"]);
    return true;
  } catch {
    return false;
  }
}

// Get latest commit hash
async function getLatestCommit() {
  const log = await git.log({ maxCount: 1 });

  if (log.total === 0) {
    return null;
  }

  return log.latest.hash;
}

// Get commits since last processed commit
async function getCommitsSince(lastCommit, limit = 5) {
  let log;

  // First run
  if (!lastCommit) {
    log = await git.log({ maxCount: 1 });
  } else {
    log = await git.log({
      from: lastCommit,
      to: "HEAD",
    });
  }

  let commits = log.all;

  // Remove merge commits
  commits = commits.filter((commit) => {
    return commit.refs.indexOf("Merge") === -1;
  });

  // Limit commit count
  if (commits.length > limit) {
    console.log(
      `Warning: ${commits.length} commits found, processing only latest ${limit}`
    );

    commits = commits.slice(0, limit);
  }

  return commits;
}

// Get names of the files to which changes are done
async function getCommitFiles(commitHash) {
  const result = await git.show([
    "--name-only",
    "--pretty=",
    commitHash,
  ]);

  return result
    .split("\n")
    .map((f) => f.trim())
    .filter(Boolean);
}

// The actual code diff
async function getCommitDiff(commitHash) {
  const rawDiff = await git.show([
    "--format=",
    "--unified=2",
    commitHash,
  ]);

  // Remove noisy metadata
  const cleaned = rawDiff
    .split("\n")
    .filter((line) => {
      return (
        !line.startsWith("diff --git") &&
        !line.startsWith("index ") &&
        !line.startsWith("--- ") &&
        !line.startsWith("+++ ") &&
        !line.startsWith("new file mode")
      );
    })
    .join("\n");

  // Limit size
  return cleaned.slice(0, 3000);
}

module.exports = {
  isGitRepo,
  hasCommits,
  getLatestCommit,
  getCommitsSince,
  getCommitFiles,
  getCommitDiff,
};