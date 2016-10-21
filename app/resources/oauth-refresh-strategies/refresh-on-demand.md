---
layout: twoColumn
section: OAuth refresh strategies
type: article
title: "Refresh on-demand"
weight: 1
description: "Manage OAuth access tokens for Gamelocker's bank transfer API."
---

# OAuth refresh strategies

## Refresh on demand or handle failure

### On demand
Before making any API call to Gamelocker, query your database to get the stored refresh token, refresh authorization, update the new token pair in your database, and lastly make the call to Gamelocker. This method prevents excessive calls to Gamelocker and only requires you to refresh authorization when needed.

### Handle failure
Make API call with access token; if access token is invalid, try to update it using the stored refresh token; if refresh request is successful, update the existing token pair in your database and re-attempt the initial API request. Optional: cache the access token for reuse on subsequent requests.
