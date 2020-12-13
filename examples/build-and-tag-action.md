> Generated with `github-action-readme action.yml --event release --actions published --token=pat`

# Build and Tag

Properly tags your GitHub Action

## Usage

```yaml
name: Build and Tag
on:
  release:
    types: [published]

jobs:
  build-and-tag:
    name: Build and Tag
    runs-on: ubuntu-latest
    steps:
      - name: Build and Tag
        uses: JasonEtco/build-and-tag-action@master
        env:
          GITHUB_TOKEN: ${{ secrets.PAT }}
        with:
          setup: ...
          tag_name: ...
```

## Available Configuration

### Environment Variables

| Name         | Description                                                                                                                                                                                                                   |
| ------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| GITHUB_TOKEN | The GitHub auth token, used to authenticate API requests. A [Personal Access Token](https://github.com/settings/tokens/new) with the `repo` scope is required as the default `GITHUB_TOKEN` does not have enough permissions. |
| ...          | ...                                                                                                                                                                                                                           |

### Inputs

| Name       | Description                                                                                               | Required | Default                              |
| ---------- | --------------------------------------------------------------------------------------------------------- | -------- | ------------------------------------ |
| `setup`    | A command that runs before publishing the action to the release's tag.                                    |          | npm ci && npm run build --if-present |
| `tag_name` | The tag to update. If the workflow event is `release`, it will use the `tag_name` from the event payload. |          |
