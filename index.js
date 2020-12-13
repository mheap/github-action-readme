const fs = require("fs");
const yaml = require("js-yaml");
const origin = require("remote-origin-url");
const GitUrlParse = require("git-url-parse");

const chooseEvent = require("./choose-event");

module.exports = async (argv) => {
  const branchName = require("current-git-branch");
  const url = await origin();
  if (!url) {
    throw new Error(
      `Unable to fetch repo name. Make sure you've got a git remote configured`
    );
  }

  const repo = GitUrlParse(url);

  const r = await chooseEvent(argv.event, argv.actions);
  let readme = "";

  // Read the filename
  const action = yaml.safeLoad(fs.readFileSync(argv.file));

  // Description
  readme += `# ${action.name}\n\n${action.description}\n\n`;

  // Usage
  readme += `## Usage\n\n`;
  const envUsage = {};
  if (argv.token === "github") {
    envUsage.GITHUB_TOKEN = "${{ secrets.GITHUB_TOKEN }}";
  }
  if (argv.token === "pat") {
    envUsage.GITHUB_TOKEN = "${{ secrets.PAT }}";
  }

  readme += createUsage(
    action.name,
    repo.full_name,
    branchName() || `main`,
    r.event,
    r.actions,
    envUsage,
    action.inputs
  );

  //function createUsage(name, repo, version, event, actions, env, inputs) {

  // Configuration
  readme += `## Available Configuration\n\n`;

  // Environment variables
  const envRows = [];

  if (argv.token === "pat") {
    envRows.push([
      "GITHUB_TOKEN",
      "The GitHub auth token, used to authenticate API requests. A [Personal Access Token](https://github.com/settings/tokens/new) with the `repo` scope is required as the default `GITHUB_TOKEN` does not have enough permissions.",
    ]);
  }

  if (argv.token === "github") {
    envRows.push([
      "GITHUB_TOKEN",
      "The GitHub auth token, used to authenticate API requests. Use the value provided in `${{ secrets.GITHUB_TOKEN }}`",
    ]);
  }

  envRows.push(["...", "..."]);
  readme += createTable(
    "Environment Variables",
    ["Name", "Description"],
    envRows
  );

  // Config from inputs
  readme += inputsTable(action.inputs);

  // Outputs
  readme += outputsTable(action.outputs);

  // Output
  console.log(readme);
};

function inputsTable(inputs) {
  inputs = inputs || [];
  if (!Object.keys(inputs).length) {
    return "";
  }
  const rows = [];
  for (let name in inputs) {
    const input = inputs[name];

    rows.push([
      `\`${name}\``,
      input.description,
      input.required,
      input.default,
    ]);
  }
  return createTable(
    "Inputs",
    ["Name", "Description", "Required", "Default"],
    rows
  );
}

function createUsage(name, repo, version, event, actions, env, inputs) {
  const nameSlug = slugify(name);

  let eventString = event;
  if (actions.length) {
    eventString = `
  ${event}:
    types: [${actions.join(", ")}]
`;
  }

  let envString = "";
  for (let k in env) {
    envString += `\n          ${k}: ${env[k]}`;
  }
  if (envString) {
    envString = `env:${envString}`;
  }

  let inputsString = "";
  for (let k in inputs) {
    inputsString += `\n          ${k}: ...`;
  }
  if (inputsString) {
    inputsString = `with:${inputsString}`;
  }

  return `\`\`\`yaml
name: ${name}
on: ${eventString}
jobs:
  ${nameSlug}:
    name: ${name}
    runs-on: ubuntu-latest
    steps:
      - name: ${name}
        uses: ${repo}@${version}
        ${envString}
        ${inputsString} 
\`\`\`\n\n`;
}

function slugify(text) {
  return text
    .toString()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "")
    .replace(/--+/g, "-");
}

function outputsTable(outputs) {
  outputs = outputs || [];
  if (!Object.keys(outputs).length) {
    return "";
  }
  const rows = [];
  for (let name in outputs) {
    const output = outputs[name];

    rows.push([`\`${name}\``, output.description]);
  }
  return createTable("Outputs", ["Name", "Description"], rows);
}

function createTable(heading, headerRow, rows, prefix) {
  prefix = prefix || "###";
  let table = `${prefix} ${heading}\n\n`;

  table += `${headerRow.join("|")}\n`;
  table += `${headerRow.map((i) => "---").join("|")}\n`;

  for (let r of rows) {
    table += `${r.join("|")}\n`;
  }

  return `${table}\n\n`;
}
