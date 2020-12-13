#!/usr/bin/env node

const yargs = require("yargs/yargs");
const { hideBin } = require("yargs/helpers");

const argv = yargs(hideBin(process.argv))
  .option("event", {
    type: "string",
    description: "EVENT DESCRIPTION",
  })
  .option("actions", {
    type: "string",
    description: "ACTIONS DESCRIPTION",
  })
  .option("token", {
    type: "string",
    description: "Auth token type to use. (One of: github/pat)",
  })
  .command(
    "$0 <file>",
    "Generate a README file for your GitHub Actions",
    (yargs) => {
      yargs.positional("file", {
        describe: "The path to action.yml",
      });
    },
    async (argv) => {
      await require(".")(argv);
    }
  )
  .demandOption(["file"]).argv;
