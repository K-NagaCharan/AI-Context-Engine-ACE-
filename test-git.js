const {
  getCommitsSince,
} = require("./src/core/git");

const {
  buildContext,
} = require("./src/core/context");

async function test() {
  const commits = await getCommitsSince(null);

  if (commits.length === 0) {
    console.log("No commits found.");
    return;
  }

  const context = await buildContext(
    commits[0],
    "testing context engine"
  );

  console.log(JSON.stringify(context, null, 2));
}

test();