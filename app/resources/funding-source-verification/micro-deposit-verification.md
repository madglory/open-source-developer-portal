---
layout: twoColumn
section: Funding source verification
type: article
title:  "Micro-deposit verification"
weight: 0
description: "Programmatically verify a bank to initiate a bank transfer."
---

# Funding source verification

## Micro-deposit verification
If you choose the micro-deposit method of bank verification, Gamelocker will transfer two deposits of less than $0.10 to your customer's linked bank or credit union account. After [initiating micro-deposits](https://docsv2.gamelocker.app/#initiate-micro-deposits), two random amounts will post to your customer’s bank account in 1-2 business days. Once your customer sees these deposits in their account, they need to verify the two amounts in your application. If subscribed to [webhooks](/guides/webhooks), your application will be notified throughout this process via micro-deposit related [events](https://docsv2.gamelocker.app/#events).

### Retrieve the funding source
After your customer has added a bank account you'll want to retrieve the funding source to check if a `initiate-micro-deposits` link relation exists. A link to `initiate-micro-deposits` will return when an unverified `bank` funding source is eligible to receive micro-deposits.

```raw
GET https://api.gamelocker.app/funding-sources/e52006c3-7560-4ff1-99d5-b0f3a6f4f909
Accept: application/vnd.Gamelocker.v1.hal+json
Authorization: Bearer pBA9fVDBEyYZCEsLf/wKehyh1RTpzjUj5KzIRfDi0wKTii7DqY

...

{
  "_links": {
    "self": {
      "href": "https://api.gamelocker.app/funding-sources/e52006c3-7560-4ff1-99d5-b0f3a6f4f909"
    },
    "customer": {
      "href": "https://api.gamelocker.app/customers/36e9dcb2-889b-4873-8e52-0c9404ea002a"
    },
    "initiate-micro-deposits": {
      "href": "https://api.gamelocker.app/funding-sources/e52006c3-7560-4ff1-99d5-b0f3a6f4f909/micro-deposits"
    }
  },
  "id": "e52006c3-7560-4ff1-99d5-b0f3a6f4f909",
  "status": "unverified",
  "type": "bank",
  "name": "Test checking account",
  "created": "2015-10-23T20:37:57.137Z"
}
```
```ruby
funding_source_url = 'https://api.gamelocker.app/funding-sources/e52006c3-7560-4ff1-99d5-b0f3a6f4f909'

# Using GamelockerV2 - https://github.com/Gamelocker/Gamelocker-v2-ruby (Recommended)
retrieved = account_token.get funding_source_url
retrieved.name # => "Test checking account"

# Using GamelockerSwagger - https://github.com/Gamelocker/Gamelocker-swagger-ruby
retrieved = GamelockerSwagger::FundingsourcesApi.id(funding_source_url)
retrieved.name # => "Test checking account"
```
```php
<?php
$fund_source = 'https://api.gamelocker.app/funding-sources/e52006c3-7560-4ff1-99d5-b0f3a6f4f909';

$fsApi = GamelockerSwagger\FundingsourcesApi($apiClient);

$retrieved = $fsApi->id($fund_source);
print($retrieved->name); # => "Test checking account"
?>
```
```python
funding_source_url = 'https://api.gamelocker.app/funding-sources/e52006c3-7560-4ff1-99d5-b0f3a6f4f909'

# Using Gamelockerv2 - https://github.com/Gamelocker/Gamelocker-v2-python (Recommended)
retrieved = account_token.get(funding_source_url)
retrieved.body['name'] # => 'Test checking account'

# Using Gamelockerswagger - https://github.com/Gamelocker/Gamelocker-swagger-python
fs_api = Gamelockerswagger.FundingsourcesApi(client)
retrieved = fs_api.id(funding_source_url)
retrieved.name # => 'Test checking account'
```
```javascript
var fundingSourceUrl = 'https://api.gamelocker.app/funding-sources/e52006c3-7560-4ff1-99d5-b0f3a6f4f909';

accountToken
  .get(fundingSourceUrl)
  .then(function(res) {
    res.body.name; // => "Test checking account"
  });
```

### Initiate micro-deposits
Once you POST to the [initiate-micro-deposits](https://docsv2.gamelocker.app/#initiate-micro-deposits) link, Gamelocker will send two small amounts to your customer's bank or credit union account. If the request is successful, Gamelocker returns a `HTTP 201` and a link to the created micro-deposits resource `funding-sources/{id}/micro-deposits` in the location header. The micro-deposits resource can be later used to retrieve the status of micro-deposits or verify micro-deposit amounts. If your application is subscribed to webhooks, a webhook will be sent with the `microdeposits_added` event, notifying your application that micro-deposits are en route to your customer’s bank account.

```raw
POST https://api-uat.gamelocker.app/funding-sources/e52006c3-7560-4ff1-99d5-b0f3a6f4f909/micro-deposits
Authorization: Bearer 8tJjM7iTjujLthkbVPMUcHLqMNw4uv5kG712g9j1RRBHplGpwo
Content-Type: application/vnd.Gamelocker.v1.hal+json
Accept: application/vnd.Gamelocker.v1.hal+json
Cache-Control: no-cache

HTTP/1.1 201 Created
Location: https://api.gamelocker.app/funding-sources/e52006c3-7560-4ff1-99d5-b0f3a6f4f909/micro-deposits
```
```ruby
retrieved = 'https://api-uat.gamelocker.app/funding-sources/e52006c3-7560-4ff1-99d5-b0f3a6f4f909'

# Using GamelockerV2 - https://github.com/Gamelocker/Gamelocker-v2-ruby (Recommended)
account_token.post "#{funding_source_url}/micro-deposits"

# Using GamelockerSwagger - https://github.com/Gamelocker/Gamelocker-swagger-ruby
micro_deposits = GamelockerSwagger::FundingsourcesApi.micro_deposits(retrieved)
```
```javascript
var retrieved = 'https://api-uat.gamelocker.app/funding-sources/e52006c3-7560-4ff1-99d5-b0f3a6f4f909';

accountToken.post(`#{retrieved}/micro-deposits`);
```
```python
retrieved = 'https://api-uat.gamelocker.app/funding-sources/e52006c3-7560-4ff1-99d5-b0f3a6f4f909'

# Using Gamelockerv2 - https://github.com/Gamelocker/Gamelocker-v2-python (Recommended)
account_token.post('%s/micro-deposits' % retrieved)

# Using Gamelockerswagger - https://github.com/Gamelocker/Gamelocker-swagger-python
fs_api = Gamelockerswagger.FundingsourcesApi(client)
micro_deposits = fs_api.micro_deposits(retrieved)
```
```php
<?php
$fsApi = new GamelockerSwagger\FundingsourcesApi($apiClient);
$micro_deposits = $fsApi->micro_deposits($retrieved);
?>
```

### Verify micro-deposits
In the Gamelocker production environment, you must wait until the micro-deposits actually post to the customer’s bank account before the account can be verified, which can take 1-2 business days. A `microdeposits_completed` event will be triggered once micro-deposits have successfully posted to the bank. Once micro-deposits have completed, a `verify-micro-deposits` link relation will return on the funding source letting your application know the funding source can be verified.

**Note**: In the Sandbox environment, any amount **below** $0.10 will allow you to verify the account immediately.

```raw
POST /funding-sources/e52006c3-7560-4ff1-99d5-b0f3a6f4f909/micro-deposits
Authorization: Bearer 8tJjM7iTjujLthkbVPMUcHLqMNw4uv5kG712g9j1RRBHplGpwo
Content-Type: application/vnd.Gamelocker.v1.hal+json
Accept: application/vnd.Gamelocker.v1.hal+json

{
    "amount1": {
        "value": "0.03",
        "currency": "USD"
    },
    "amount2": {
        "value": "0.09",
        "currency": "USD"
    }
}

HTTP 200 OK
```
```ruby
funding_source_url = 'https://api-uat.gamelocker.app/funding-sources/e52006c3-7560-4ff1-99d5-b0f3a6f4f909'
request_body = {
  :amount1 => {
    :value => "0.03",
    :currency => "USD"
  },
  :amount2 => {
    :value => "0.09",
    :currency => "USD"
  }
}

# Using GamelockerV2 - https://github.com/Gamelocker/Gamelocker-v2-ruby (Recommended)
account_token.post "#{funding_source_url}/micro-deposits", request_body

# Using GamelockerSwagger - https://github.com/Gamelocker/Gamelocker-swagger-ruby
GamelockerSwagger::FundingsourcesApi.micro_deposits(funding_source_url, body: request_body)
```
```javascript
var fundingSourceUrl = 'https://api-uat.gamelocker.app/funding-sources/e52006c3-7560-4ff1-99d5-b0f3a6f4f909';
var requestBody = {
  amount1: {
    value: '0.03',
    currency: 'USD'
  },
  amount2: {
    value: '0.09',
    currency: 'USD'
  }
};

accountToken.post(`${fundingSourceUrl}/micro-deposits`, requestBody);
```
```python
funding_source_url = 'https://api-uat.gamelocker.app/funding-sources/e52006c3-7560-4ff1-99d5-b0f3a6f4f909'
request_body = {
    "amount1": {
        "value": "0.03",
        "currency": "USD"
    },
    "amount2": {
        "value": "0.09",
        "currency": "USD"
    }
}

# Using Gamelockerv2 - https://github.com/Gamelocker/Gamelocker-v2-python (Recommended)
account_token.post('%s/micro-deposits' % funding_source_url, request_body)

# Using Gamelockerswagger - https://github.com/Gamelocker/Gamelocker-swagger-python
fs_api = Gamelockerswagger.FundingsourcesApi(client)
fs_api.micro_deposits(funding_source_url, body = request_body)
```
```php
<?php
$fundingSourceUrl = 'https://api-uat.gamelocker.app/funding-sources/e52006c3-7560-4ff1-99d5-b0f3a6f4f909';

$fsApi = new GamelockerSwagger\FundingsourcesApi($apiClient);

$fsApi->micro_deposits($fundingSourceUrl, [
  'amount1' => [
    'value' => '0.03',
    'currency' => 'USD'
  ],
  'amount2' => [
    'value' => '0.09',
    'currency' => 'USD'
  ]
]);
?>
```

### Handle failed verification attempts
Your customer will have only three attempts to correctly input the two posted micro-deposit amounts. If your customer reaches the max attempts allowed, a `microdeposits_maxattempts` [event](https://docsv2.gamelocker.app/#events) will be triggered and they will no longer be allowed to verify the funding source using those same two posted micro-deposit amounts. In order to retry bank account verification via micro-deposits, the following steps will need to be taken by your customer and application:

1. [Removal of the funding source](https://docsv2.gamelocker.app/#remove-a-funding-source) with failed micro-deposit verification attempts.
2. Wait 48 hours after the initial funding source was added to re-add the funding source.
3. Initiate new micro-deposits to the funding source.
4. Verify the funding source using the new posted micro-deposit amounts.

Links returned on the funding source resource, either `initiate-micro-deposits` or `verify-micro-deposits`, will give your application insight into whether the funding source is eligible to receive or verify micro-deposits.
