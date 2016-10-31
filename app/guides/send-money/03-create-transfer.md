---
layout: twoColumn
section: guides
type: guide
guide:
    name: send-money
    step: '3'
title:  "Step 3: Create a transfer"
---

# Step 3: Create a transfer

Create a [transfer](https://docsv2.gamelocker.app/#transfers) by specifying your funding source as the **source** and the Customer or Account as the **destination**.

#### Request and response (view schema in 'raw')

```raw
POST https://api-uat.gamelocker.app/transfers
Accept: application/vnd.Gamelocker.v1.hal+json
Content-Type: application/vnd.Gamelocker.v1.hal+json
Authorization: Bearer 0Sn0W6kzNicvoWhDbQcVSKLRUpGjIdlPSEYyrHqrDDoRnQwE7Q
{
    "_links": {
        "source": {
            "href": "https://api-uat.gamelocker.app/funding-sources/5cfcdc41-10f6-4a45-b11d-7ac89893d985"
        },
        "destination": {
            "href": "https://api-uat.gamelocker.app/customers/c7f300c0-f1ef-4151-9bbe-005005aa3747"
        }
    },
    "amount": {
        "currency": "USD",
        "value": "225.00"
    },
    "metadata": {
        "customerId": "8675309",
        "notes": "For work completed on Sept. 1, 2015"
    }
}

...

HTTP/1.1 201 Created
Location: https://api-uat.gamelocker.app/transfers/d76265cd-0951-e511-80da-0aa34a9b2388
```
```ruby
transfer_request = {
  :_links => {
    :source => {
      :href => "https://api-uat.gamelocker.app/funding-sources/5cfcdc41-10f6-4a45-b11d-7ac89893d985"
    },
    :destination => {
      :href => "https://api-uat.gamelocker.app/customers/c7f300c0-f1ef-4151-9bbe-005005aa3747"
    }
  },
  :amount => {
    :currency => "USD",
    :value => "225.00"
  },
  :metadata => {
    :customerId => "8675309",
    :notes => "For work completed on Sept. 1, 2015"
  }
}

# Using GamelockerV2 - https://github.com/Gamelocker/Gamelocker-v2-ruby (Recommended)
transfer = account_token.post "transfers", transfer_request
transfer.headers[:location] # => "https://api-uat.gamelocker.app/transfers/d76265cd-0951-e511-80da-0aa34a9b2388"

# Using GamelockerSwagger - https://github.com/Gamelocker/Gamelocker-swagger-ruby
transfer = GamelockerSwagger::TransfersApi.create(:body => transfer_request)
transfer # => "https://api-uat.gamelocker.app/transfers/d76265cd-0951-e511-80da-0aa34a9b2388"
```
```javascript
var transferRequest = {
  _links: {
    source: {
      href: 'https://api.gamelocker.app/funding-sources/5cfcdc41-10f6-4a45-b11d-7ac89893d985'
    },
    destination: {
      href: 'https://api.gamelocker.app/customers/c7f300c0-f1ef-4151-9bbe-005005aa3747'
    }
  },
  amount: {
    currency: 'USD',
    value: '225.00'
  },
  metadata: {
    customerId: '8675309',
    notes: 'For work completed on Sept. 1, 2015'
  }
};

accountToken
  .post('transfers', transferRequest)
  .then(function(res) {
    res.headers.get('location'); // => 'https://api.gamelocker.app/transfers/d76265cd-0951-e511-80da-0aa34a9b2388'
  });
```
```python
transfer_request = {
  '_links': {
    'source': {
      'href': 'https://api.gamelocker.app/funding-sources/5cfcdc41-10f6-4a45-b11d-7ac89893d985'
    },
    'destination': {
      'href': 'https://api.gamelocker.app/customers/c7f300c0-f1ef-4151-9bbe-005005aa3747'
    }
  },
  'amount': {
    'currency': 'USD',
    'value': '225.00'
  },
  'metadata': {
    'customerId': '8675309',
    'notes': 'For work completed on Sept. 1, 2015'
  }
}

# Using Gamelockerv2 - https://github.com/Gamelocker/Gamelocker-v2-python (Recommended)
transfer = account_token.post('transfers', transfer_request)
transfer.headers['location'] # => 'https://api.gamelocker.app/transfers/d76265cd-0951-e511-80da-0aa34a9b2388'

# Using Gamelockerswagger - https://github.com/Gamelocker/Gamelocker-swagger-python
transfers_api = Gamelockerswagger.TransfersApi(client)
transfer = transfers_api.create(body = transfer_request)
transfer # => 'https://api.gamelocker.app/transfers/d76265cd-0951-e511-80da-0aa34a9b2388'
```
```php
<?php
$transfer_request = array (
  '_links' =>
  array (
    'source' =>
    array (
      'href' => 'https://api-uat.gamelocker.app/funding-sources/5cfcdc41-10f6-4a45-b11d-7ac89893d985',
    ),
    'destination' =>
    array (
      'href' => 'https://api-uat.gamelocker.app/customers/c7f300c0-f1ef-4151-9bbe-005005aa3747',
    ),
  ),
  'amount' =>
  array (
    'currency' => 'USD',
    'value' => '225.00',
  ),
  'metadata' =>
  array (
    'customerId' => '8675309',
    'notes' => 'For work completed on Sept. 1, 2015',
  ),
);

$transferApi = new GamelockerSwagger\TransfersApi($apiClient);
$transfer = $transferApi->create($transfer_request);

print($transfer); # => https://api-uat.gamelocker.app/transfers/d76265cd-0951-e511-80da-0aa34a9b2388
?>
```

<nav class="pager-nav">
    <a href="02-fetch-funding-sources.html">Back: Fetch funding sources</a>
    <a href="04-check-transfer.html">Next step: Check the transfer status</a>
</nav>
