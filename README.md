# github-action-readme

Bootstrap a README for your GitHub Actions by reading `action.yml` and providing events that the action responds to.

## Usage

```bash
npx github-action-readme ./action.yml --event pull_request --actions opened,reopened,synchronize,labeled,closed --token=github > README.md
```

You can pass `--token=github` to use `secrets.GITHUB_TOKEN` or `--token=pat` to add information on how to generate a Personal Access token.

## Examples

See the [examples](examples) folder for a set of READMEs generated with this tool
