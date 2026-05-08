const {
  isGitRepo,
  hasCommits,
  getLatestCommit,
  getCommitsSince,
} = require("./src/core/git");

async function test() {
  console.log("Is Repo:", await isGitRepo());

  console.log("Has Commits:", await hasCommits());

  console.log("Latest Commit:", await getLatestCommit());

  console.log(
    "Commits:",
    await getCommitsSince(null)
  );
}

test();