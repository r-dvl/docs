---
title: Commands cheatsheet
description: Docker commands cheatsheet.
---

## docker build
---
Build a `image` from a `Dockerfile`.

### Usage

```bash
docker build .
```
> `.` speficies path to `Dockerfile`.

### Options

- `-t`: Specifies the name and tag the image will have, example:
```bash
docker build -t [Image name]:[tag]
```

## docker exec
---

Execute commands inside specified container.

### Usage

```bash
docker exec -it [container name] [command]
```
> Using `docker exec -it [container name] sh` opens a shell inside specified container.

## docker container stats
---
View resouce usage stats

### Usage

```bash
docker container stats
```

## docker images
---
Lists local images.

### Usage
```bash
docker images
```

## docker info
---
Display system-wide information.

### Usage
```bash
docker info
```

## docker inspect
---
Inspect a running container.

### Usage
```bash
docker inspect [container name/id]
```

## docker login
---
Login into Docker registry.

### Usage
```bash
docker login -u [username]
```
> Password is promt.

## docker logs
---
Fetch and follow the logs of a container.

### Usage
```bash
docker logs -f [container name/id]
```

### Options
- `-f`: Follow logs streaming.

## docker prune
---
Remove unused resources.

### Usage
```bash
docker [resource] prune
```
> You can specify `image/container/network` as resource.

### Options
- `-f`: Forces deletion.
- `-a`: Prunes all resources.

## docker ps
---
To list currently running containers.

### Usage
```bash
docker ps
```

## docker pull
---
Pull an image from a Docker registry.

### Usage
```bash
docker pull [image name]
```
> Normally, if image is not from Docker Hub you have to specify registry before:
> `docker pull ghcr.io/user/image:tag`

## docker pull
---
Pull an image from a Docker registry.

### Usage
```bash
docker pull [image name]
```
> Normally, if image is not from Docker Hub you have to specify registry before:
> `docker pull ghcr.io/user/image:tag`

## docker push
---
push an image to a Docker registry.

### Usage
```bash
docker push [user]/[image name]
```
> Normally, if image is not from Docker Hub you have to specify registry before:
> `docker push ghcr.io/[user]/[image]:[tag]

## docker rm
---
Remove a stopped container.

### Usage
```bash
docker rm [container name/id]
```

## docker rmi
---
Delete a local image.

### Usage
```bash
docker rmi [image name]
```

## docker run
---
Create and run a container from an image.

### Usage
```bash
docker run [image]
```

### Options
```bash
docker run \
	-v [Host path]:[Container path] \
	-p [Host port]:[Container port] \
	-e [NAME]=[VALUE] \
	[Image to run]
```

#### General

|Option|Description|
|---|---|
|**`--name`**|Give a custom name to a container.|
|**`-d`**, **`--detach`**|Run container as a background process.|
|**`--entrypoint`**|Set a custom entry point for an image.|
|**`--help`**|Show help.|
|**`-i`**, **`--interactive`**|Keep standard input open.|
|**`--pull`**|Pull the image before creating a container.|
|**`--platform`**|Set platform (for multi-platform servers).|
|**`--restart`**|Set container restart policy.|
|**`--rm`**|Remove the container when it exits.|
|**`--runtime`**|Set [runtime](https://phoenixnap.com/glossary/runtime-environment) to use for a container.|
|**`-t`**, **`--tty`**|Allocate a pseudo-TTY.|
|**`--workdir`**|Set a working directory in a container.|


#### Networking

|Option|Description|
|---|---|
|**`--add-host`**|Create a custom host-to-IP mapping.|
|**`--hostname`**|Define a hostname for a container.|
|**`--dns`**|Set a custom [DNS](https://phoenixnap.com/kb/what-is-domain-name-system) server.|
|**`--dns-search`**|Set a custom DNS search domain.|
|**`--dns-option`**|Set a DNS option.|
|**`--ip`**|Set an IPv4 address for a container.|
|**`--ip6`**|Set an IPv6 address for a container.|
|**`--link`**|Link to another container.|
|**`--link-local-ip`**|Link a local IPv4/IPv6 address.|
|**`--mac-address`**|Set a [MAC address](https://phoenixnap.com/glossary/mac-address) for a container.|
|**`--network`**|Connect a container to a network.|
|**`-p`**, **`--publish`**|Publish a container [port](https://phoenixnap.com/glossary/what-is-a-port) to a [host](https://phoenixnap.com/glossary/what-is-a-host).|
|**`-P`**, **`--publish-all`**|Publish all exposed ports to random ports.|

#### Storage

| Option                   | Description                                  |
| ------------------------ | -------------------------------------------- |
| **`--mount`**            | Attach a filesystem mount.                   |
| **`--read-only`**        | Mount the container filesystem as read-only. |
| **`--tmpfs`**            | Mount a directory formatted as tmpfs.        |
| **`-v`**, **`--volume`** | Bind mount a volume.                         |

#### Resource Management

| Option                    | Description                                                                                                                                |
| ------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| **`--cpus`**              | Set the number of [CPUs](https://phoenixnap.com/glossary/cpu-definition).                                                                  |
| **`--cpuset-cpus`**       | Set CPUs where execution is allowed.                                                                                                       |
| **`--cpuset-mems`**       | Set MEMs where execution is allowed.                                                                                                       |
| **`--cpu-period`**        | Limit CFS period for CPUs.                                                                                                                 |
| **`--cpu-quota`**         | Limit CFS quota for CPUs.                                                                                                                  |
| **`--cpu-shares`**        | Set the number of CPU shares.                                                                                                              |
| **`--kernel-memory`**     | Limit [kernel](https://phoenixnap.com/glossary/what-is-a-kernel) memory.                                                                   |
| **`-m`**, **`--memory`**  | Set a memory limit.                                                                                                                        |
| **`--memory-swap`**       | Set the swap limit equal to memory and [swap](https://phoenixnap.com/kb/swap-memory) combined. The value of **-1** enables unlimited swap. |
| **`--memory-swappiness`** | Control memory [swappiness](https://phoenixnap.com/kb/swappiness).                                                                         |
| **`--oom-kill-disable`**  | Disable [OOM](https://phoenixnap.com/glossary/out-of-memory) Killer.                                                                       |
| **`--oom-score-adj`**     | Set OOM preferences.                                                                                                                       |
| **`--pids-limit`**        | Set pids limit for a container. The value of -1 allows unlimited pids.                                                                     |

#### Security

|Option|Description|
|---|---|
|**`--cap-add`**|Enable specific [Linux security](https://phoenixnap.com/kb/linux-security) features.|
|**`--cap-drop`**|Disable specific Linux security features.|
|**`--group-add`**|Add additional groups.|
|**`--no-new-privileges`**|Prevent container processes from obtaining new privileges.|
|**`--privileged`**|Set extended privileges for a container.|
|**`--security-opt`**|Enable security options.|
|**`--user`**|Set the user.|
|**`--userns`**|Set the user namespace.|

## docker search
---
Search for an image.

### Usage
```bash
docker search
```

## docker start/stop
---
Start or stop a container.

### Usage
```bash
docker start|stop [Container name/id]
```
