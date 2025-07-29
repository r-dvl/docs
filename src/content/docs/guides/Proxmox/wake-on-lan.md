---
title: WOL Configuration Guide
description: How to configure Wake On LAN.
---

# WOL or Wake on LAN

We all have devices we do not use 24/7 or even daily. For these devises it's convenient to perform a WoL when they are needed. They may run services not frequently needed or they are started when demand grows. 

We all have devices that we don't use every day. It's convenient to do a WOL on these devices when they're needed. They may run services that are not needed often, or they may be started when demand grows. For me, this is important because most devices are not in the lab, but in another building.

You can use WireGuard or PiVPN (end of life) or something else to log in to a Server running 24/7. Then you can issue a command or run a script.

Or by setting up a reverse SSH tunnel on something like an old Thin client, a Zuma board or a Raspberry Pi you can start your unattended server wherever you are in the world over the internet.

Or you could also use IPMI like iLo or iDRAC and start the server by it.

## Enable a Proxmox Server for WOL

You should check if your server is able to wake up with WOL; some might already have it, but most need some tweaking.

1. Find your name of the NIC, like _eth0_ or _enp14s0_
2. Find the MAC of this NIC
3. Try to wake it up

```
sudo etherwake ab:cd:ef:gk:hi:jk -i eth0
```

If it works, that's okay. Otherwise, read the next section.

### Install needed utilities

If you do not have the following, please do install them:

```bash
sudo apt install ethtool && sudo apt install net-tools
```

Copy

### Setting up your NIC

First, you need to check if WOL is available on your NIC. We use the ethtool for this. If it's not, you might need to enable it in the BIOS. It is usually there but under different labels.

Let's assume that we have _eth0_

```bash
sudo ethtool eth0
```

Copy

If WOL is available on your card, you should see something like this. What we really want to see is the letter G.

```
Supports Wake-on: pumbg
```

It's best to use `**g**` (magic packet) instead of `pumbg`. If you use `pumbg`, you might get reboots right after you shut down because you accept requests like ping and ARP to wake up the server.

💡

Only use settings u,m or b if you really need them! 

What arguments can you use to WOL

```
  wol p|u|m|b|a|g|s|d...
         Set Wake-on-LAN options.  Not all  devices  support  this.   The
         argument  to  this  option  is a string of characters specifying
         which options to enable.
         p  Wake on phy activity
         u  Wake on unicast messages
         m  Wake on multicast messages
         b  Wake on broadcast messages
         a  Wake on ARP
         g  Wake on MagicPacket(tm)
         s  Enable SecureOn(tm) password for MagicPacket(tm)
         d  Disable (wake on nothing).  This option clears  all  previous
            options.
```

**Some devices can use a password, the argument s**  
Set the Secure password by: **sopass** _xx_**:**_yy_**:**_zz_**:**_aa_**:**_bb_**:**_cc_.  
Append a four or six byte password to the packet. _Only a few adapters need or support this_. A six byte password may be specified in Ethernet hex format (00:22:44:66:88:aa) or four bytes dotted decimal (192.168.1.1) format. A four byte password must use the dotted decimal format.

### Enabling WOL

```bash
sudo ethtool -s eth0 wol g
```

Copy

### Create a service for WOL

Create a file (`wol.service`) and add the section below

```bash
nano /etc/systemd/system/wol.service
```

Copy

```bash
[Unit]
Description=Re-enable WOL

[Service]
Type=oneshot
ExecStart=/sbin/ethtool -s eth0 wol g

[Install]
WantedBy=basic.target
```

Copy

### Enable the service and check it's running

```bash
systemctl start wol.service && systemctl enable wol.service
```

Copy

```bash
systemctl status wol.service
```

Copy

## How to start servers on your device

I prefer the _**etherwake**_ package, but you can use any other, like _wakelan_ package. You need to install it on a machine that you have remote access to if you like to do it out of your lab. I have it on my lab PC and don't use remote login.

### Install the utility

```bash
sudo apt install etherwake
```

Copy

### Starting a server

The syntax is easy: sudo etherwake [MAC of the server] -i [name of this PCs NIC]

```bash
sudo etherwake ab:cd:ef:00:01:11 -i eth0
```

Copy

### The Script

I use a script where I can choose what Proxmox and Ubuntu servers to be started. See my post [Creating Linux Commands](https://homelab.casaursus.net/creating-linux-commands/) and on [GitHub](https://github.com/nallej/MyJourney/blob/main/scripts/wolstart.sh).

## How do WOL Work

Wake-on-LAN (“WOL”) is implemented using a specially magic packet, which is broadcasted over the network, among them the computer to be awakened.

- The magic packet contains the MAC address of the destination computer
- Power down a computer capable of Wake-on-LAN will keep network devices to listen for incoming packets in low-power mode.
- If a magic packet is received for this NIC's MAC address, the NIC signals the computer’s PS or MoBo wake-up, as pressing the power button would do.
- The magic packet is sent on the data link layer (layer 2 in the OSI model) and is broadcast to all attached devices on a given network, using the network broadcast address; the IP-address (layer 3 in the OSI model) is not used.

### Magic Packet Structure

The packet is a broadcast frame containing anywhere within its payload 6 bytes of all 255 (FF FF FF FF FF FF in hexadecimal), followed by 16 repetitions of the target computer’s 48-bit MAC address, for a total of 102 bytes.  
Since the magic packet is only scanned for the string above, and not actually parsed by a full protocol stack, it may be sent as any network- and transport-layer protocol, although it is typically sent as a UDP datagram to port 0, 7, or 9, or directly over Ethernet as Ether Type 0x0842.

> Some old consumer grade NIC's do not remember their settings after a power off. Fix by add a last line to `/etc/network/interfaces` , <your interface> `post-up /usr/sbin/ethtool -s <ens1> wol g`.

> Set possible speeds to 10/100/1000 `ethtool -s ens1 advertise 0x03c`