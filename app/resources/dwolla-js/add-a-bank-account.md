---
layout: twoColumn
section: Gamelocker.js
type: article
title:  "Add a bank account"
weight: 0
description: "Quickly integrate instant bank verification for developers using the Gamelocker ACH API."
---

# Gamelocker.js

## Add a bank account

Using Gamelocker.js, securely transmit sensitive data (bank account and routing number) to Gamelocker without the data passing through your server. This resource guide will walk you through the process of generating a funding sources token, collecting the user's bank account information, and calling a JavaScript function to send this data to Gamelocker. When you collect and submit the user's bank account information, Gamelocker.js has built-in validation that will trigger an error if any of the required fields are invalid.

### Gamelocker.fundingSources.create()

Param | Type | Value
----------|-------------|-------------
funding-sources-token | string | A funding sources token generated on your server.
params | object | An object containing params to create a funding source. Contains keys: `routingNumber`, `accountNumber`, `type`, and `name`. See example below. <br> `routingNumber` represents a string value nine digit routing number. <br> `accountNumber` represents a string value account number. <br> `type` represents a string value of either `checking` or `savings`. <br> `name` represents a string value identifying name of the user's bank.
callback | function | A callback function that handles the response from Gamelocker.

#### Example

```javascriptnoselect
Gamelocker.fundingSources.create('1zN400zyPUobbdmeNfhTGH2Jh5JkFREJa9YBI8SLXp0ERXNTMT', {
          routingNumber: getVal('routingNumber'),
          accountNumber: getVal('accountNumber'),
          type: getVal('type'),
          name: getVal('name')
        }, function(err, res) {
    console.log('Error: ' + JSON.stringify(err) + ' -- Response: ' + JSON.stringify(res))
  })
})
```

### Step 1: Generate a funding sources token
Before calling a function within Gamelocker.js to add a new funding source, you need to generate a funding sources token. Your server initiates a POST request to Gamelocker, specifying for which Gamelocker account or white label Customer you want to add a bank account. Gamelocker will respond with a funding sources `token` that expires in an hour. This token will be sent to the client and used to authenticate the HTTP request asking Gamelocker to add a new funding source.

```raw
curl -X POST
\ -H "Content-Type: application/vnd.Gamelocker.v1.hal+json"
\ -H "Accept: application/vnd.Gamelocker.v1.hal+json"
\ -H "Authorization: Bearer qe634nV7dIYpYDf3VGZPciziPU2BCboUZ7G7EG8XEyGswKkBV5"
\ "https://api-uat.gamelocker.app/customers/28138609-30FF-4607-B28C-4A3872F8FD4A/funding-sources-token"

HTTP/1.1 200 OK
{
  "_links": {
    "self": {
      "href": "https://api-uat.gamelocker.app/customers/28138609-30ff-4607-b28c-4a3872f8fd4a/funding-sources-token"
    }
  },
  "token": "Z9BvpNuSrsI7Ke1mcGmTT0EpwW34GSmDaYP09frCpeWdq46JUg"
}
```
```ruby
customer_url = 'https://api-uat.gamelocker.app/customers/AB443D36-3757-44C1-A1B4-29727FB3111C'

# Using GamelockerV2 - https://github.com/Gamelocker/Gamelocker-v2-ruby (Recommended)
customer = account_token.post "#{customer_url}/funding-sources-token"
customer.token # => "Z9BvpNuSrsI7Ke1mcGmTT0EpwW34GSmDaYP09frCpeWdq46JUg"

# Using GamelockerSwagger - https://github.com/Gamelocker/Gamelocker-swagger-ruby
customer = GamelockerSwagger::CustomersApi.create_funding_sources_token_for_customer(customer_url)
customer.token # => "Z9BvpNuSrsI7Ke1mcGmTT0EpwW34GSmDaYP09frCpeWdq46JUg"
```
```javascript
// Using Gamelocker-v2 - https://github.com/Gamelocker/Gamelocker-v2-node
var customerUrl = 'https://api-uat.gamelocker.app/customers/28138609-30ff-4607-b28c-4a3872f8fd4a';

accountToken
  .post(`${customerUrl}/funding-sources-token`)
  .then(function(res) {
    res.body.token; // => 'Z9BvpNuSrsI7Ke1mcGmTT0EpwW34GSmDaYP09frCpeWdq46JUg'
  });
```
```python
customer_url = 'http://api.gamelocker.app/customers/28138609-30ff-4607-b28c-4a3872f8fd4a'
customers_api = Gamelockerswagger.CustomersApi(client)

token = customers_api.create_funding_sources_token_for_customer(customer_url)
print token['token'] # => 'Z9BvpNuSrsI7Ke1mcGmTT0EpwW34GSmDaYP09frCpeWdq46JUg'
```
```php
<?php
$customersApi = new GamelockerSwagger\CustomersApi($apiClient);

$fsToken = $customersApi->createFundingSourcesTokenForCustomer("https://api-uat.gamelocker.app/customers/28138609-30ff-4607-b28c-4a3872f8fd4a");
$fsToken->token; # => "Z9BvpNuSrsI7Ke1mcGmTT0EpwW34GSmDaYP09frCpeWdq46JUg"
?>
```

### Step 2: Add form to collect bank account information
You'll then add a form to the body of the page where you want to collect the user's bank account information.

```htmlnoselect
<form>
  <div>
    <label>Routing number</label>
    <input type="text" id="routingNumber" placeholder="273222226" />
  </div>
  <div>
    <label>Account number</label>
    <input type="text" id="accountNumber" placeholder="account number" />
  </div>
  <div>
    <label>Bank account name</label>
    <input type="text" id="name" placeholder="name" />
  </div>
  <div>
    <select name="type" id="type">
      <option value="checking">checking</option>
      <option value="savings">savings</option>
    </select>
  </div>
  <div>
    <input type="submit" value="Add Bank">
  </div>
</form>

<div id="logs">
</div>
```


### Step 3: Configure and call JavaScript function to create a new funding source
Assuming `Gamelocker.js` is already included and configured on your page, you will create the function that will call `Gamelocker.fundingSources.create()`. For this example, jQuery is used to call the function that creates a funding source when the user clicks the "Add Bank" button on your page. To test in the sandbox environment, use the `Gamelocker.configure()` helper function and pass in the value of `uat`.

In our example, `Gamelocker.fundingSources.create()` takes three arguments: a string value of the funding sources token, JavaScript object containing bank account information entered by the user, and a callback function that will handle any error or response.

```javascriptnoselect
<script type="text/javascript">
$('form').on('submit', function() {
  Gamelocker.configure('uat');
  var token = 'Z9BvpNuSrsI7Ke1mcGmTT0EpwW34GSmDaYP09frCpeWdq46JUg';
  var bankInfo = {
    routingNumber: $('routingNumber').val(),
    accountNumber: $('accountNumber').val(),
    type: $('type').val(),
    name: $('name').val()
  }
  Gamelocker.fundingSources.create(token, bankInfo, callback);
  return false
})

function callback(err, res) {
  $div = $('<div />')
  var logValue = {
    error: err,
    response: res
  }
  $div.text(JSON.stringify(logValue))
  console.log(logValue)
  $('#logs').append($div)
}
```

### Step 4: Callback function - handling the error or response
The callback function (err, res) allows you to determine if there is an error with the request (e.g. `Routing number invalid.`) or if the response was successful. In the example above, we are displaying any error or response within a `logs` container on our page.

* If there is an error: Display the error to the user to have them correct any fields, and have them re-attempt to add their bank.
  * Example: `{"error":{"code":"ValidationError","message":"Validation error(s) present. See embedded errors list for more details.","_embedded":{"errors":[{"code":"Invalid","message":"Routing number invalid.","path":"/routingNumber"}]}}}`
* If successful: You will receive a JSON response that includes a link to the newly attached funding source.
  * Example:  `{"error":null,"response":{"_links":{"funding-source":{"href":"https://api-uat.gamelocker.app/funding-sources/746d5c93-acb9-4826-a9c1-78ecf16401a6"}}}}`

* * *

#### View:

*   [Gamelocker.js - Overview](/resources/Gamelocker-js.html)
*   [Instant account verification](/resources/Gamelocker-js/instant-account-verification.html)
*   [On-demand bank transfers](/resources/Gamelocker-js/on-demand-bank-transfers.html)
