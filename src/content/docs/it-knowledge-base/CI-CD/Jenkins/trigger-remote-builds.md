---
title: Trigger Builds Remotely
description: Trigger a target pipeline from other one.
---

## Target Pipeline
---
To trigger a build in the target Pipeline, it has to be configured with:

![[Pasted image 20231107105055.png]]

Assign your token to this job, we are going to use it in the Pipeline that triggers this one.

> [!info]
> In my case I had to activate the **Do not allow concurrent builds** since the target Pipeline was a Deployment one.


## Trigger Pipeline
---
This is an example of trigger:

```groovy
pipeline {
    agent any

    stages {
        stage('Trigger Remote Build') {
            steps {
                script {
                    String jobName = 'Concurrent-Deploy-Test'
                    String token = 'concurrentBuildTest'

                    def parallelTech = [:]

                    for (int i = 0; i < 3; i++) {
                        int index = i
                        parallelTech["Job ${index}"] = {
                            sleep(index)
                            def parameters = [
                                string(name: 'JOB_NAME', value: "test ${index}")
                            ]
                            def response = build job: jobName, parameters: parameters, remoteToken: token
                            println "Remote Job ${index} response: ${response}"
                        }
                    }
                    parallel parallelTech
                }
            }
        }
    }
}
```

This Pipeline creates 3 parallels  and uses  `build job: jobName, parameters: parameters, remoteToken: token` on each one to trigger a build in the target Pipeline, in my case I wanted to trigger three different builds with different parameters, that is why I set parameters inside the parallel.

> [!warning]
> If build parameters are the same, it will only trigger 1 build.

In my case, as I mentioned before, I wanted three builds and a queue for them, with **Do not allow concurrent builds** in target it is achieved:

![[imagen.png]]


#Dev #Jenkins