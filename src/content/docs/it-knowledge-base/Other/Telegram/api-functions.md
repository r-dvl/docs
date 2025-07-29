---
title: API Functions
description: Known Open API functions.
---

- send message : `https://api.telegram.org/bot<TOKEN>/sendMessage?chat_id=<CHAT_ID>&text=Hello%20World`
	- `$ curl -s -X POST https://api.telegram.org/bot<TOKEN>/sendMessage -d chat_id=<CHAT_ID> -d text="Hello World"`

- bot status: `https://api.telegram.org/bot<TOKEN>/getUpdates`
	- `curl https://api.telegram.org/bot<TOKEN>/getUpdates`