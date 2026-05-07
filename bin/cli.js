#!/usr/bin/env node

const { Command } = require("commander");

const init = require("../src/commands/init");
const update = require("../src/commands/update");
const status = require("../src/commands/status");
const exportCmd = require("../src/commands/export");

const program = new Command();

program
  .name("ace-track")
  .description("ACE Track CLI")
  .version("1.0.0");

// init
program
  .command("init")
  .option("-y", "Skip prompts")
  .action(init);

// update
program
  .command("update")
  .description("Update project context")
  .option("--note <note>", "Add a note")
  .action(update);

// status
program
  .command("status")
  .description("Show current context")
  .action(status);

// export
program
  .command("export")
  .description("Export project context")
  .action(exportCmd);

program.parse(process.argv);