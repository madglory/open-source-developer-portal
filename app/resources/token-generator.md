---
layout: twoColumn
section: resources
type: tool
title:  "Token Generator"
description: "Generate an OAuth access token for Gamelocker's bank transfer API."
---

# Token generator

## Overview

The Gamelocker API requires an OAuth access token for authorization. Whether you’re using the API for payouts or integrating with Gamelocker White Label, sometimes you just need an access token for your own account without going through the hassle of creating an entire [OAuth flow](https://docsv2.gamelocker.app/#request-user-authorization). We have created a tool that lets you easily generate an access token with the click of a button. The token generator also serves as a great testing tool in our Sandbox environment for developers who are looking to quickly interact with the API.

### Generate an access token for your own Gamelocker account

To generate an account access token, navigate to the applications page within the gamelocker.app dashboard, located at: [https://www.gamelocker.app/applications](https://www.gamelocker.app/applications) (the Sandbox equivalent is located at: [https://uat.gamelocker.app/applications](https://uat.gamelocker.app/applications)). The applications page contains a list of existing applications you have created.

![Screenshot of Token Generator](/images/token-generator.png "Token Generator")

A **create token** button is located beneath each application, allowing you to easily generate an access token and refresh token. The access token generated will contain the scopes enabled on your application, so be sure to enable the scopes you need in order to call the Gamelocker API prior to generating the token.

**Important:** Keep in mind that Gamelocker’s implementation of the [OAuth 2.0](https://tools.ietf.org/html/rfc6749) standard uses short-lived access tokens and long-lived refresh tokens. The access token will expire one hour after it’s generated, so to maintain access be sure to [refresh authorization](https://docsv2.gamelocker.app/#refresh-authorization). Reference the [OAuth refresh strategies](https://developers.gamelocker.app/resources/oauth-refresh-strategies.html) article for more information on recommended refresh strategies.
