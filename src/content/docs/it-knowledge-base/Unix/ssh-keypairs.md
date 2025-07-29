---
title: Generate SSH Keypairs
description: How to configure ssh keypairs.
---

# Configure SSH Host with Key pairs
---
I use key pairs to access my hosts without user password in Ansible and Jenkins.
To make a Host accessible via ssh in this way, the key pairs must be configured like this.


## Generate key pairs
---
OpenSSH must be installed on both machines, with this command a key pair is generated:

```bash
ssh-keygen
```

The keys are generated in the folder where you run this command be sure to save them in `~/.ssh`.


### Public key
The public key (.pub) as its name mentions is not secret and acts as a lock.

### Private Key
This key is secret and will act as a key for that lock (public key).

## Copy keys to the Host
---
Now that you have those keys in `~/.ssh` you need to configure the host to be accessible with that key without a password, to accomplish this, the easiest way is to use this command:

```bash
ssh-copy-id -i ~/.ssh/mickey myUser@myHost
```


Both keys must be in the folder where you run this command, and you will be prompted for the password for this user on the host machine.

This command will store that public key in `~/.ssh/authorized_keys`.


## Permissions
---
The host machine must have these permissions for keys and folders:

- **.ssh**: chmod 700
- **myKey**: chmod 600
- **my_key.pub**: chmod 600
- **authorized_keys**: chmod 644

Make sure that the user is the owner of _authorized_keys_, check it with:

```bash
ls -l
```
.
And if the user does not own this file use this command to change it:

```bash
su root 
chown myUser authorized_keys
```

## Troubleshooting
---
- If your host is still unreachable, make sure that it is registered in `~/.ssh/known_hosts`.

> In my case I was launching a playbook from Jenkins and I had to connect first to the machine with SSH to confirm it as a known host.
