---
layout: twoColumn
section: resources
type: article
title:  "Gamelocker.js"
description: "Quickly integrate instant bank verification for developers using the Gamelocker ACH API."
---

# Gamelocker.js

Gamelocker.js is a client-side JavaScript library with the primary function of securely transmitting sensitive data (bank account and routing number) from your application's front-end to Gamelocker without the data passing through your server. When you attach a bank account to a Gamelocker account or white label Customer, use Gamelocker.js and let Gamelocker reduce your risk of handling sensitive data. Additionally, Gamelocker.js includes an added function available to Gamelocker white label partners providing the ability to render the instant bank account verification flow within a specified container on the partner's application. However you're using Gamelocker.js, both server-side and client-side interaction is required.

### Getting Started: Usage and configuration

#### Include Gamelocker.js
Begin the client-side implementation by including Gamelocker.js in the HEAD of your HTML page. You can include either the development version(`<script src="https://cdn.gamelocker.app/1/Gamelocker.js"></script>`) or the minified version (`<script src="https://cdn.gamelocker.app/1/Gamelocker.min.js"></script>`) of Gamelocker.js.

```htmlnoselect
<head>
  <script src="https://cdn.gamelocker.app/1/Gamelocker.js"></script>
</head>
```

#### Configure
Configuration options are available for utilizing Gamelocker.js in both our Sandbox and production environments. Configuration of an environment should take place after you have included the Gamelocker.js library.

```javascriptnoselect
// Sandbox (UAT)
Gamelocker.configure('sandbox');

// Production
Gamelocker.configure('prod');
```

* * *

#### View:

*   [Add a bank account](/resources/Gamelocker-js/add-a-bank-account.html)
*   [Instant account verification](/resources/Gamelocker-js/instant-account-verification.html)
*   [On-demand bank transfers](/resources/Gamelocker-js/on-demand-bank-transfers.html)
