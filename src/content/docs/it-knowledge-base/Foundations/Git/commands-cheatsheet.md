---
title: Commands cheatsheet
description: Git Commands Cheatsheet.
---

## git init
---

The `git init` command is used to create a new Git repository. It initializes a new, empty repository in the current directory or reinitializes an existing one.

### Usage

```bash
git init [options] [directory]
```

### Options

- `--bare`: Creates a bare repository without a working directory. Ideal for remote repositories.
- `--quiet` or `-q`: Suppresses the output of the command.
- `--initial-branch <branch_name>`: Specifies the name of the initial branch. Defaults to `master` if not specified.

## git reset
---

Actually a snippet, Reset branch head and force push it to origin:

```bash
git reset --hard [commit]
git push -f
```