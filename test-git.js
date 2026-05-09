const {
  getCommitsSince,
} = require("./src/core/git");

const {
  buildContext,
  buildEntry,
} = require("./src/core/context");

const {
  summarizeContext,
} = require("./src/core/ai");

async function test() {
  const commits =
    await getCommitsSince(null);

  if (commits.length === 0) {
    console.log("No commits found.");
    return;
  }

  const context = await buildContext(
    commits[0],
    "testing AI integration"
  );

  const aiSummary =
    await summarizeContext(context);

  const entry =
    buildEntry(context, aiSummary);

  console.log(
    JSON.stringify(entry, null, 2)
  );
}

test();