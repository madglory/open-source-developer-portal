---
layout: twoColumn
section: Gamelocker.js
type: article
title:  "Instant account verification"
weight: 1
description: "Quickly integrate instant bank verification for developers using the Gamelocker ACH API."
---

# Gamelocker.js

## Using Gamelocker.js for Instant Account Verification (IAV)
For white label partners, `Gamelocker.js` has the added function of facilitating Instant Account Verification (IAV) on their Customer's bank or credit union account. By calling a separate function `Gamelocker.iav.start()`, the white label partner application can render the IAV flow within a specified container. `Gamelocker.iav.start()` allows for customization through configurable options such as: `stylesheets` which represents a list of CSS stylesheets for styling the IAV flow, `microDeposits` which presents the micro-deposit method of bank verification as an option throughout the IAV flow, and `fallbackToMicroDeposits` which gives the user the option fallback to selecting the micro-deposit method of bank verification within the IAV flow.

<ol class="alerts">
    <li class="alert icon-alert-info">Read more about how to use Gamelocker.js to quickly add and verify a white label Customer’s bank account in the <a href="/resources/funding-source-verification/instant-account-verification.html">funding source verification</a> resource article.</li>
</ol>

### Gamelocker.iav.start()

Param | Type | Value
----------|-------------|--------------
iav-token | string | A single use IAV token [generated on your server](https://docsv2.gamelocker.app/#generate-an-iav-token).
options | object | An object containing configurable options. Contains keys: `container`, `stylesheets`, `microDeposits` and `fallbackToMicroDeposits`. See example below. <br> `container` represents a string value container element where IAV will render. <br> `stylesheets` represents an array list of stylesheets to load IAV styles. <br> `microDeposits` represents a *true* or *false* value which determines if the micro-deposit method of bank verification is presented as an option throughout the IAV flow. <br> `fallbackToMicroDeposits` represents a boolean *true* or *false* value which determines if a fallback selection screen appears for choosing an alternative bank verification method.
callback | function | A callback function that handles the response from Gamelocker.

#### Example

```javascriptnoselect
Gamelocker.iav.start('8zN400zyPUobbdmeNfhTGH2Jh5JkFREJa9YBI8SLXp0ERXNTMT', {
    container: 'iavContainer',
    stylesheets: [
      'http://fonts.googleapis.com/css?family=Lato&subset=latin,latin-ext',
      'http://myapp.com/iav/customStylesheet.css'
    ],
    microDeposits: false,
    fallbackToMicroDeposits: true
  }, function(err, res) {
    log('Error: ' + JSON.stringify(err) + ' -- Response: ' + JSON.stringify(res))
  })
})
```

### Customization
#### Enabling micro-deposits or fallback to micro-deposits
Your application can present the micro-deposit method of bank verification throughout the IAV flow by setting the `microDeposits` option to *true*. This option gives the user the ability to initially select either the micro-deposit method of bank verification or IAV, as well as fallback to selecting the micro-deposit method of bank verification if un-successful in the initial IAV flow.

![Screenshot of micro-deposit fallback](/images/microdeposits-fallback.png "fallback to micro-deposits")

Alternatively, if your application sets the `fallbackToMicroDeposits` option to *true*, a fallback selection screen will appear if (a) the user is unable to locate their bank on the bank search screen, or (b) there was an issue with the initial IAV flow. This selection screen asks the user to choose from either the traditional micro-deposit method of bank verification or re-attempt the IAV flow.

#### IAV styles
Gamelocker provides a list of CSS classes available for styling certain elements of the IAV flow. These elements can be easily customized to match the look and feel of your application, and are included within the `options` JavaScript object of the function Gamelocker.iav.start(). You can specify one or many stylesheets as a list within the `stylesheets` attribute. By default, the elements within your specified container are responsive to any change in screen size.

##### Demo Gamelocker.js and IAV customization <a href="https://www.gamelocker.app/Gamelockerjs-bank-verification">here.</a>

#### List of CSS classes
```cssnoselect
/* Implement Gamelocker's styles */
.Gamelocker-iav-text-box,
.Gamelocker-iav-button,
.Gamelocker-iav-header,
.Gamelocker-iav-text,
.Gamelocker-iav-link,
.Gamelocker-iav-error,
.Gamelocker-iav-label {
    font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
    font-weight: 300;
}

.Gamelocker-iav-header {
    font-weight: 300;
    margin-bottom: 2.5rem;
}

.Gamelocker-iav-text-box {
    box-shadow: none;
    border: 1px solid #ddd;
    border-left: 0;
    border-right: 0;
    border-top: 0;
    border-radius: 0;
}

.Gamelocker-iav-text-box:focus {
    border-color: #1e88e5;
}

.Gamelocker-iav-link {
    color: #1e88e5;
    cursor: pointer;
}

.Gamelocker-iav-link:hover {
    color: #1565c0;
}

.Gamelocker-iav-button {
    background: #1e88e5;
    color: white;
    border-radius: 3px;
}

.Gamelocker-iav-button:hover {
    background: #4D8CD4;
    cursor: pointer;
}

.Gamelocker-iav-button:active {
    background: #1565c0;
}

.Gamelocker-iav-check-image {
    background: #1e88e5;
}

.Gamelocker-iav-radio-hover {
    background-color: #fff;
}

.Gamelocker-iav-radio-selected {
    background-color: #1e88e5;
}
```

* * *

#### View:

*   [Funding source verification - IAV](/resources/funding-source-verification/instant-account-verification.html)
*   [Gamelocker.js - Overview](/resources/Gamelocker-js.html)
*   [Add a bank account](/resources/Gamelocker-js/add-a-bank-account.html)
*   [On-demand bank transfers](/resources/Gamelocker-js/on-demand-bank-transfers.html)
