---
title: Daemon Config
description: Alternative docker daemon config.
---

Es posible establecer configuraciones secundarias para el Daemon de Docker creando un json.

## Cambiar ruta de Docker
---
Para que Docker guarde todos sus datos en otra ruta:

1. Crear archivo `/etc/docker/daemon.json`.
2. Editar el json para usar una ubicación distinta para el almacenamiento:

```json
{
  "data-root": "/mnt/WD/docker"
}
```