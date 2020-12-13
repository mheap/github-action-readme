> Generated with `github-action-readme action.yml --event push`

# actions-s3-cache

This action installs dependencies or builds, and caches them in S3.

## Usage

```yaml
name: actions-s3-cache
on: push
jobs:
  actions-s3-cache:
    name: actions-s3-cache
    runs-on: ubuntu-latest
    steps:
      - name: actions-s3-cache
        uses: shonansurvivors/actions-s3-cache@master

        with:
          s3-bucket: ...
          cache-key: ...
          paths: ...
          command: ...
          zip-option: ...
          unzip-option: ...
          working-directory: ...
```

## Available Configuration

### Environment Variables

Name|Description
---|---
...|...


### Inputs

Name|Description|Required|Default
---|---|---|---
`s3-bucket`||true|
`cache-key`||true|
`paths`||true|
`command`||true|
`zip-option`||false|-ryq
`unzip-option`||false|-n
`working-directory`||false|./