---
title: Windows VM in Ubuntu Server
description: How-to create a Windows VM in Ubuntu with Virtual Box.
---

## Preparación en tu máquina Windows
---
Tiene que haber imágenes ya preparadas para acceder directamente pero para no comerme el tarro he tirado de esta gitanada.

1. Descargar imagen que quieras instalar.
2. Descargar VirtualBox.

> [!info]
> Yo he tirado de [MiniOS - Rápido. Sencillo. Fiable.](https://minios.dev/es/) que es una versión ligera de W10 pero tengo que testear otras.

> [!warning]
> Las versiones Home no tienen RDP, tienes que tirar de una W10 LTSC, enterprise etc o imágenes tocadas como la que he cogido yo, Tiny11 también va nike.


### Crear VM
---
Create una VM en VirtualBox con el GUI, yo le puse `2 CPUs`, `2 Gb de RAM` y `20 Gb de almacenamiento virtual`.

Metele la `.iso` que vayas a instalarle y procede normal con la configuración de Windows.

Y desactiva el `USB 3.0`, con el `USB 1.1` a mi me ha ido bien aunque creo que después resolví lo que me pasaba con el `3.0`. Por si las moscas ponle el `1.1`.

![[Pasted image 20240318161705.png]]


### Activa el RDP
---
`Settings > Remote Desktop Settings` y lo habilitas.

![[Pasted image 20240318162320.png]]


### Exportar la VM
---
En mi caso elegí que se creara la VM en `C:\Users\rauld\VirtualBox VMs\minios\`, copiate todo el contenido de la carpeta y te lo subes a `CasaOS`, yo de paso he metido las VMs en el SSD de la Zima.

Te digo todos pero los importantes son:
- `.vbox`: Es la configuración de la machine.
- `.vdi`: El virtual disk.

Yo he subido incluso la `.iso` por tenerlo todo junto.

## Preparación en Ubuntu Server
---
Abrete una terminal y conecta por `ssh` que empieza la fiezzzta, te pongo mis rutas pero adáptalo a las tuyas.


### Permisos
---
Asumo que ya tienes los archivos en la Zima, vamos a matar moscas a cañonazos y le damos permisos `777` a todos los archivos que has subido jeje.
```bash
sudo chmod 777 -R /mnt/SSD/vms/minios
```


### Instalación de VirtualBox
---
VirtualBox:
```bash
sudo apt install virtualbox
```



Extensiones (por esto digo que creo que solucióne lo del `USB 3.0`) sin el extension pack no vale el `RDP`.
```bash
sudo apt install virtualbox-ext-pack
```


### Registro de la VM
---
Registramos la VM con el CLI:
```bash
VBoxManage registervm /mnt/SSD/vms/minios/minios.vbox
```


Activale el `vrde` a la VM, de forma predeterminada el puerto que usa es el `3389` para bindear el puerto:
```bash
VBoxManage modifyvm "minios" --vrde on
```


Si quieres usar otro puerto por ej:
```bash
VBoxManage modifyvm "minios" --vrde-port 5000
```


### Arrancar la VM
---
Hay que arrancarla headless para que no de fallo al intentar sacarte el escritorio:
```bash
VBoxManage startvm "minios" --type headless
```

> [!info]
> Para apagarla haz un `VBoxManage controlvm "minios" poweroff`.

En principio ya deberías poder acceder desde otra máquina por Remote Desktop, VNC, Remmina etc usando la IP de la tu Zima u el hostname + el puerto (`server:3389`).

> [!note] 
> Te pongo otras cosas que tuve que hacer antes de darme cuenta del extension pack por si hacen falta también.


## Troubleshooting
---
Si no te conecta a la primera yo tuve que hacer o comprobar varias cosas.


### Abrir el puerto
---
Puede que el firewall te bloquee el puerto:
```bash
sudo ufw status | grep 3389
```

Si te sale vacío es que no hay ninguna regla de firewall bloqueando el puerto, si no abrelo:
```bash
sudo ufw allow 3389
```


### Comprobar el estado de la VM
---
Para ver si está running el puerto o si está activado el `vrde` yo tiré de `grep` que el CLI devuelve buen tocho:
```bash
VBoxManage showvminfo "minios" | grep VRDE
```

Este es mi output por si te vale de ref:
```log
VRDE:                        enabled (Address 0.0.0.0, Ports 3389, MultiConn: off, ReuseSingleConn: off, Authentication type: null)
VRDE property               : TCP/Ports  = "3389"
VRDE property               : TCP/Address = <not set>
VRDE property               : VideoChannel/Enabled = <not set>
VRDE property               : VideoChannel/Quality = <not set>
VRDE property               : VideoChannel/DownscaleProtection = <not set>
VRDE property               : Client/DisableDisplay = <not set>
VRDE property               : Client/DisableInput = <not set>
VRDE property               : Client/DisableAudio = <not set>
VRDE property               : Client/DisableUSB = <not set>
VRDE property               : Client/DisableClipboard = <not set>
VRDE property               : Client/DisableUpstreamAudio = <not set>
VRDE property               : Client/DisableRDPDR = <not set>
VRDE property               : H3DRedirect/Enabled = <not set>
VRDE property               : Security/Method = <not set>
VRDE property               : Security/ServerCertificate = <not set>
VRDE property               : Security/ServerPrivateKey = <not set>
VRDE property               : Security/CACertificate = <not set>
VRDE property               : Audio/RateCorrectionMode = <not set>
VRDE property               : Audio/LogPath = <not set>
```

### Crear una red NAT
---
Yo es de las primeras cosas que probé pero no estoy seguro de que haga falta:

Crea la red, ponle el rango y el nombre que quieras:
```bash
VBoxManage natnetwork add --netname VBoxNAT --network "192.168.10.0/24" --enable
```

Asignala a la VM:
```bash
VBoxManage modifyvm "minios" --nic1 natnetwork --nat-network1 "VBoxNAT"
```

Configura el reenvío de puertos:
```bash
VBoxManage modifyvm "minios" --natpf1 "rdp,tcp,,3389,,3389"
```

