---
title: Cloudflare Tunnels
description: 101 Configure Cloudflare Tunnel.
---

# Dominio
---
## Compra
---
Pilla un dominio en [Namecheap](https://www.namecheap.com/domains/registration/results/?domain=fon-osx)
![[Pasted image 20240316172746.png]]


## Registro en Cloudflare
---
Create una cuenta en cloudflare y registra el dominio.

Te pedira que te vayas a la config de namecheap (yo uso namecheap pero usa el que veas vaya) y le añadas los custom nameservers para traspasarlo a Cloudflare
![[Pasted image 20240316173228.png]]


## Cloudflare
---
Te vas en cloudflare a `zero trust`:
![[Pasted image 20240316173520.png]]

Te creas un tunnel:
![[Pasted image 20240316173552.png]]


## Cloudflared
---
Te instalas cloudflared en la store de CasaOS y le metes el token que se genera en el tunnel:
![[Pasted image 20240316173802.png]]

Ahi en el docker run se ve el token al final, solo pilla el token si quieres asi se instala en CasaOS como APP y lo metes en la UI:
![[Pasted image 20240316173858.png]]

Esto va actualizando tu IP pública con los servidores de Cloudflare asi no tienes que rallarte con DNS dinámicos ni ostias.


## Configuración del túnel
---
Metele el rango ip en la private network:
![[Pasted image 20240316174042.png]]

Y luego configura los túneles para poder acceder con el subdomain y tu dominio desde cualquier lado.

![[Pasted image 20240316174106.png]]

Si te fijas tiene algunos configuraciones adicionales que es la doble autentificacion, aqui puedes volverte loco configurando cosas, puedes incluso usar WARP como VPN para conectarte a tu red.