---
layout: twoColumn
section: guides
type: guide
guide:
    name: receive-money
    step: '2'
title:  "Step 2: Check the transfer status"
---

# Step 2: Check the transfer status

You can check the status of the newly created transfer by retrieving the transfer by its URL.

#### Request and response (view schema in 'raw'):
```raw
GET https://api-uat.gamelocker.app/transfers/d76265cd-0951-e511-80da-0aa34a9b2388
Accept: application/vnd.Gamelocker.v1.hal+json
Authorization: Bearer 0Sn0W6kzNicvoWhDbQcVSKLRUpGjIdlPSEYyrHqrDDoRnQwE7Q

{
  "_links": {
    "cancel": {
      "href": "https://api-uat.gamelocker.app/transfers/d76265cd-0951-e511-80da-0aa34a9b2388",
      "type": "transfer"
    },
    "source": {
      "href": "https://api-uat.gamelocker.app/customers/247b1bd8-f5a0-4b71-a898-f62f67b8ae1c",
      "type": "customer"
    },
    "destination-funding-source": {
      "href": "https://api-uat.gamelocker.app/funding-sources/b268f6b9-db3b-4ecc-83a2-8823a53ec8b7",
      "type": "funding-source"
    },
    "self": {
      "href": "https://api-uat.gamelocker.app/transfers/d76265cd-0951-e511-80da-0aa34a9b2388",
      "type": "transfer"
    },
    "source-funding-source": {
      "href": "https://api-uat.gamelocker.app/funding-sources/80275e83-1f9d-4bf7-8816-2ddcd5ffc197",
      "type": "funding-source"
    },
    "destination": {
      "href": "https://api-uat.gamelocker.app/accounts/ab443d36-3757-44c1-a1b4-29727fb3111c",
      "type": "account"
    }
  },
  "id": "d76265cd-0951-e511-80da-0aa34a9b2388",
  "status": "pending",
  "amount": {
    "value": "225.00",
    "currency": "usd"
  },
  "created": "2015-08-05T20:35:26.520Z",
  "metadata": {
    "foo": "bar"
  }
}
```
```ruby
transfer_url = 'https://api.gamelocker.app/transfers/d76265cd-0951-e511-80da-0aa34a9b2388'

# Using GamelockerV2 - https://github.com/Gamelocker/Gamelocker-v2-ruby (Recommended)
transfer = account_token.get transfer_url
transfer.status # => "pending"

# Using GamelockerSwagger - https://github.com/Gamelocker/Gamelocker-swagger-ruby
transfer = GamelockerSwagger::TransfersApi.by_id(transfer_url)
# Access desired information in response object fields
transfer.status # => "pending"
```
```javascript
var transferUrl = 'https://api.gamelocker.app/transfers/d76265cd-0951-e511-80da-0aa34a9b2388';

accountToken
  .get(transferUrl)
  .then(function(res) {
    res.body.status; // => 'pending'
  });
```
```python
transfer_url = 'https://api.gamelocker.app/transfers/d76265cd-0951-e511-80da-0aa34a9b2388'

# Using Gamelockerv2 - https://github.com/Gamelocker/Gamelocker-v2-python (Recommended)
fees = account_token.get(transfer_url)
fees.body['stats'] # => 'pending'

# Using Gamelockerswagger - https://github.com/Gamelocker/Gamelocker-swagger-python
transfers_api = Gamelockerswagger.TransfersApi(client)
transfer = transfers_api.by_id(transfer_url)
transfer.status # => 'pending'
```
```php
<?php
$transferUrl = 'https://api.gamelocker.app/transfers/d76265cd-0951-e511-80da-0aa34a9b2388';

$transferApi = new GamelockerSwagger\TransfersApi($apiClient);
$transfer = $transferApi->by_id($transferUrl)
# Access desired information in response object fields
print($transfer->status) # => pending
?>
```

That’s it! You’ve successfully received money from a user. Please continue to the Webhooks guide for information on implementing notifications for your customers about the transfer.

<nav class="pager-nav">
    <a href="./">Back: Overview</a>
    <a href="/guides/webhooks">Next guide: Webhooks</a>
</nav>
