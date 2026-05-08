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

module.exports = {
  isGitRepo,
  hasCommits,
  getLatestCommit,
  getCommitsSince,
};