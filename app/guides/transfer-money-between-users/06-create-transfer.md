---
layout: twoColumn
section: guides
type: guide
guide:
    name: transfer-money-between-users
    step: '6'
title:  "Step 6: Create a transfer"
---

# Step 6: Create a transfer

[Create a transfer](https://docsv2.gamelocker.app/#transfers) by specifying Joe Buyer’s funding source as the source and Jane Merchant’s funding source as the destination.

```raw
POST https://api-uat.gamelocker.app/transfers
Accept: application/vnd.Gamelocker.v1.hal+json
Content-Type: application/vnd.Gamelocker.v1.hal+json
Authorization: Bearer 0Sn0W6kzNicvoWhDbQcVSKLRUpGjIdlPSEYyrHqrDDoRnQwE7Q
{
    "_links": {
        "source": {
            "href": "https://api-uat.gamelocker.app/funding-sources/80275e83-1f9d-4bf7-8816-2ddcd5ffc197"
        },
        "destination": {
            "href": "https://api-uat.gamelocker.app/customers/C7F300C0-F1EF-4151-9BBE-005005AC3747"
        }
    },
    "amount": {
        "currency": "USD",
        "value": "225.00"
    }
}

HTTP/1.1 201 Created
Location: https://api-uat.gamelocker.app/transfers/d76265cd-0951-e511-80da-0aa34a9b2388
```
```ruby
transfer_request = {
  :_links => {
      :destination => {:href => 'https://api-uat.gamelocker.app/customers/C7F300C0-F1EF-4151-9BBE-005005AC3747'},
      :source => {:href => 'https://api-uat.gamelocker.app/funding-sources/80275e83-1f9d-4bf7-8816-2ddcd5ffc197'}
  },
  :amount => {:currency => 'USD', :value => 225.00}
}

xfer = GamelockerSwagger::TransfersApi.create({:body => transfer_request})
p xfer # => https://api-uat.gamelocker.app/transfers/d76265cd-0951-e511-80da-0aa34a9b2388
```
```javascript
Gamelocker.then(function(Gamelocker) {
    Gamelocker.transfers.create({
      "_links": {
          "destination": {
              "href": "https://api-uat.gamelocker.app/customers/C7F300C0-F1EF-4151-9BBE-005005AC3747"
          },
          "source": {
              "href": "https://api-uat.gamelocker.app/funding-sources/80275e83-1f9d-4bf7-8816-2ddcd5ffc197"
          }
      },
      "amount": {
          "currency": "USD",
          "value": "225.00"
      }
      }).then(function(data) {
          console.log(data.obj); // https://api.gamelocker.app/transfers/74c9129b-d14a-e511-80da-0aa34a9b2388
      })
})t.
```
```python
transfer_request = {
    "_links": {
        "source": {
            "href": "https://api-uat.gamelocker.app/funding-sources/80275e83-1f9d-4bf7-8816-2ddcd5ffc197"
        },
        "destination": {
            "href": "https://api-uat.gamelocker.app/customers/C7F300C0-F1EF-4151-9BBE-005005AC3747"
        }
    },
    "amount": {
        "currency": "USD",
        "value": "225.00"
    }
}

transfers_api = Gamelockerswagger.TransfersApi(client)
xfer = transfers_api.create(body=transfer_request)

print(xfer) # => https://api-uat.gamelocker.app/transfers/d76265cd-0951-e511-80da-0aa34a9b2388
```
```php
<?php
$transfer_request = array (
  '_links' =>
  array (
    'source' =>
    array (
      'href' => 'https://api-uat.gamelocker.app/funding-sources/80275e83-1f9d-4bf7-8816-2ddcd5ffc197',
    ),
    'destination' =>
    array (
      'href' => 'https://api-uat.gamelocker.app/customers/C7F300C0-F1EF-4151-9BBE-005005AC3747',
    ),
  ),
  'amount' =>
  array (
    'currency' => 'USD',
    'value' => '225.00',
  )
);

$transferApi = new GamelockerSwagger\TransfersApi($apiClient);
$myAccount = $transferApi->create($transfer_request);

print($xfer); # => https://api-uat.gamelocker.app/transfers/d76265cd-0951-e511-80da-0aa34a9b2388
?>
```



<nav class="pager-nav">
    <a href="05-attach-verified-bank.html">Back: Attach a verified funding source</a>
    <a href="07-check-transfer.html">Next step: Check the status of your transfer</a>
</nav>
