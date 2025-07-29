---
title: Create Jenkins Agent
description: How to create Jenkins agents with Docker.
---

# Create Jenkins Agent
---
Guide written at 02:00 AM and a coffee to create new Agents in Jenkins.

> [!info]
> Official Documentation: [Document](https://www.jenkins.io/doc/book/using/using-agents/)


## Generate SSH Key Pair
---
Create SSH Keys in Jenkins Server:

```bash
ssh-keygen -f ~/.ssh/jenkins_agent_key
```

This will generate these keys in `/home/$USER/.ssh` with name `jenkins_agent_key` and `jenkins_agent_key.pub`


## Create Jenkins Credentials with SSH Key
---
`Manage Jenkins -> Credentials -> Add Credentials`

- __Kind__: SSH Username with private key;
- __id__: jenkins
- __description__: The jenkins ssh key
- __username__: jenkins
- __Private__ Key: select `Enter directly` and press the Add button to insert the content of your private key file at `~/.ssh/jenkins_agent_key`
- __Passphrase__: fill your passphrase used to generate the SSH key pair (leave empty if you didn’t use one at the previous step) and then press the `Create` button


## Create Docker Agent
---
> [!info]
> Official docker image repository: [Jenkins SSH Agent](https://github.com/jenkinsci/docker-ssh-agent)

Run the Agent:

```bash
docker run -d --rm --name=agent1 -p 22:22 \
-e "JENKINS_AGENT_SSH_PUBKEY=[your-public-key]" \
jenkins/ssh-agent:alpine-jdk17
```

Where `[your-public-key]` is your public key without brackets.

> [!tip]
> [your-public-key] is the value of the `.pub` key, get the value with `cat ~/.ssh/jenkins_agent_key.pub`.
> If port 22 is being used in Server, use other one `-p 4444:22`.

### Customizing Agent

This Docker Image can be extended and you can freely add your dependencies, for example my dockerfile using python, ansible, and node.js:

```dockerfile
FROM jenkins/ssh-agent:debian-jdk17 as jenkins-agent

RUN apt-get update
RUN apt-get install -y ansible python3 python3-pip nodejs npm
```


## Setup Node in Jenkins
---
`Manage Jenkins -> Nodes -> New Node`

- Remote root directory; (e.g.: /home/jenkins )
- label; (e.g.: agent1 )
- usage; (e.g.: only build jobs with label expression…​)
- Launch method; (e.g.: Launch agents by SSH )
    - Host; (e.g.: localhost or your IP address )
    - Credentials; (e.g.: jenkins )
    - Host Key verification Strategy; (e.g.: Manually trusted key verification …​ )

> [!tip]
> If `Manually trusted key verification` is selected, you will have to trust that new host.


## Use new Agent
---
To use this new Agent in any Job just write the label introduced in the node:

Scripted Pipeline example:

```groovy
package com.rdvl.jenkinsLibrary

def call() {
    node ('docker-agent') {
        try {
            stage('Test') {
                echo 'TEST'
            }
        } catch(Exception err) {
            error(err.getMessage())
        }
    }
}
```


TAG: #Dev #Jenkins