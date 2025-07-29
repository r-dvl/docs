---
title: Commands cheatsheet
description: Bash commands cheatsheet.
---

## cat
---
Cat is used to read a file sequentially and print it to the standard output. The name is derived from its function to con**cat**enate files.

### Usage

```bash
cat [options] [file_names]
```

### Options

- `-b`: Numbers non blank output lines
- `-n`: Number all output lines.
- `-s`: Squeeze multiple adjacent blank lines.
- `-v`: Display nonprinting characters, except for tabs and the end of line character

## cd
---
Changes directory to the path specified.

### Usage

```bash
cd [/path/to/directory]
```

### Useful Arguments

- `.`: Refers to current directoy.
- `..`: Refers to the upper directory.
- `/`: Refers to root.
- `~`: Refers to home directoy.
- If you use `cd` without an path, it will change directory to home.

## grep
---
`grep` (Global Regular Expression Print) is a command-line tool used for searching and filtering text by matching patterns.

### Usage

```bash
grep [options] [pattern] [file]
```

### Options

- `-i`: Ignore case distinctions in both the pattern and the input files.
- `-v`: Invert the match; select lines that do not match the pattern.
- `-r` or `-R`: Recursively search directories for the pattern.
- `-n`: Prefix each line of output with the line number within its input file.
- `-l`: Only print the names of files with matching lines, once for each file.
- `-c`: Count the number of lines that match the pattern.

### Example

```bash
grep -i "error" log.txt
```

This command searches for the word "error" (case insensitive) in `log.txt`.

## head
---
Head is used to print the first ten lines (by default) or any other amount specified of a file or files. Cat is used to read a file sequentially and print it to the standard output.

### Usage

```bash
head [options] [file_name(s)]
```

### Options

- `-n [N]`, prints out the first `[N]` lines of the file(s)
- `-q`, doesn’t print out the file headers
- `-v`, always prints out the file headers

### Example

```bash
head -n 7 file.txt
```

## ls
---
List contents of a directory

### Usage

```bash
ls -altr
```


### Options

- `-a`: Esta opción muestra todos los archivos, incluyendo los ocultos. Los archivos ocultos en Unix y Linux comienzan con un punto (por ejemplo, `.archivo_oculto`).
- `-l`: Esta opción produce una salida detallada que incluye información sobre los archivos, como permisos, número de enlaces, dueño, grupo, tamaño, fecha de modificación y nombre del archivo.
- `-t`: Esta opción ordena los archivos y directorios según la marca de tiempo de modificación, desde el más reciente hasta el más antiguo.
- `-r`: Esta opción invierte el orden de la lista, es decir, muestra los archivos de manera inversa.

## man
---
Man, the abbreviation of **man**ual, is a bash command used to display on-line reference manuals of the given command.

Man displays the reletive man page (short for **man**ual **page**) of the given command.

### Usage

```bash
man [options] [command]
```

### Options

- `-f`, print a short description of the given command
- `-a`, display, in succession, all of the available intro manual pages contained within the manual

### Example

Display the man page of ls:
```bash
man ls
```

## mv
---
Moves files and folders

### Usage

```text
mv [source] [target]
```

### Options

- `-f` to force move them and overwrite files without checking with the user.
- `-i` to prompt confirmation before overwriting files.

## sed
---
`sed` (Stream Editor) is used to perform automatic text processing and editing on data streams or files.

### Usage

```bash
sed [options] [command] [file]
```

### Options

- `-e`: Allows adding multiple editing commands.
- `-i`: Edits files in place without creating intermediate files.
- `-n`: Suppresses automatic output; only displays specified content.
- `-r`: Uses extended regular expressions instead of basic ones.

### Example

```bash
sed 's/find/replace/g' file.txt
```

This command replaces all occurrences of "find" with "replace" in `file.txt`.
