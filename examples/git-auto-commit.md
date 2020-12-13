> Generated with `github-action-readme action.yml --event pull_request`

# Git Auto Commit

Automatically commits files which have been changed during the workflow run and push changes back to remote repository.

## Usage

```yaml
name: Git Auto Commit
on: pull_request
jobs:
  git-auto-commit:
    name: Git Auto Commit
    runs-on: ubuntu-latest
    steps:
      - name: Git Auto Commit
        uses: stefanzweifel/git-auto-commit-action@master

        with:
          commit_message: ...
          branch: ...
          commit_options: ...
          file_pattern: ...
          repository: ...
          commit_user_name: ...
          commit_user_email: ...
          commit_author: ...
          tagging_message: ...
          push_options: ...
          skip_dirty_check: ...
```

## Available Configuration

### Environment Variables

| Name | Description |
| ---- | ----------- |
| ...  | ...         |

### Inputs

| Name                | Description                                                                                                 | Required | Default                                                            |
| ------------------- | ----------------------------------------------------------------------------------------------------------- | -------- | ------------------------------------------------------------------ |
| `commit_message`    | Commit message                                                                                              | false    | Apply automatic changes                                            |
| `branch`            | Git branch name, where changes should be pushed too. Required if Action is used on the `pull_request` event | false    | ${{ github.head_ref }}                                             |
| `commit_options`    | Commit options (eg. --no-verify)                                                                            | false    |
| `file_pattern`      | File pattern used for `git add`. For example `src/\*.js`                                                    | false    | .                                                                  |
| `repository`        | Local file path to the git repository. Defaults to the current directory (`.`)                              | false    | .                                                                  |
| `commit_user_name`  | Name used for the commit user                                                                               | false    | GitHub Actions                                                     |
| `commit_user_email` | Email address used for the commit user                                                                      | false    | actions@github.com                                                 |
| `commit_author`     | Value used for the commit author. Defaults to the username of whoever triggered this workflow run.          | false    | ${{ github.actor }} <${{ github.actor }}@users.noreply.github.com> |
| `tagging_message`   | Message used to create a new git tag with the commit. Keep this empty, if no tag should be created.         | false    |
| `push_options`      | Push options (eg. --force)                                                                                  | false    |
| `skip_dirty_check`  | Skip the check if the git repository is dirty and always try to create a commit.                            | false    | false                                                              |

### Outputs

| Name               | Description                                                                                                                           |
| ------------------ | ------------------------------------------------------------------------------------------------------------------------------------- |
| `changes_detected` | Value is "true", if the repository was dirty and file changes have been detected. Value is "false", if no changes have been detected. |
