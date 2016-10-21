---
layout: twoColumn
section: guides
type: guide
guide:
    name: send-money
    step: '2'
title:  "Step 2: Fetch funding sources"
---

# Step 2: Fetch funding sources

No matter which method you used to set up your customers, the remaining steps of sending money are the same. Please note the difference in terminology between the two onboarding experiences:

| Solution | Recipient|
|----------|----------|
|White label solution|Customer|
|Gamelocker Direct|Account|

Now that you’ve created a Customer or an Account and associated its funding source, you can initiate your first transfer. The transfer requires the following information:

- The funding source to pull the funds from (your linked bank account)
- The recipient to push the funds to

Gamelocker uses URLs to represent relations between resources. Therefore, you’ll need to provide the full URL of the funding source and recipient.

### Fetch your Account's list of available funding sources

Use the [List an account's funding sources](https://docsv2.gamelocker.app/#list-funding-sources-for-an-account) endpoint to fetch a list of your own funding sources. You'll need your account URL which can be retrieved by calling [the Root](https://docsv2.gamelocker.app/#root) of the API.

#### Request and response (view schema in 'raw')

```raw
GET https://api-uat.gamelocker.app/accounts/4BB512E4-AD4D-4F7E-BFD0-A232007F21A1/funding-sources
Accept: application/vnd.Gamelocker.v1.hal+json
Authorization: Bearer 0Sn0W6kzNicvoWhDbQcVSKLRUpGjIdlPSEYyrHqrDDoRnQwE7Q

{
  "_links": {
    "self": {
      "href": "https://api-uat.gamelocker.app/accounts/4bb512e4-ad4d-4f7e-bfd0-a232007f21a1/funding-sources"
    }
  },
  "_embedded": {
    "funding-sources": [
      {
        "_links": {
          "self": {
            "href": "https://api-uat.gamelocker.app/funding-sources/0094b1b4-e171-4dc8-865b-cb121c2377bb"
          },
          "account": {
            "href": "https://api-uat.gamelocker.app/accounts/4bb512e4-ad4d-4f7e-bfd0-a232007f21a1"
          },
          "with-available-balance": {
            "href": "https://api-uat.gamelocker.app/funding-sources/0094b1b4-e171-4dc8-865b-cb121c2377bb"
          }
        },
        "id": "0094b1b4-e171-4dc8-865b-cb121c2377bb",
        "status": "verified",
        "type": "balance",
        "name": "Balance",
        "created": "2013-09-07T14:42:52.000Z"
      },
      {
        "_links": {
          "self": {
            "href": "https://api-uat.gamelocker.app/funding-sources/5cfcdc41-10f6-4a45-b11d-7ac89893d985"
          },
          "account": {
            "href": "https://api-uat.gamelocker.app/accounts/4bb512e4-ad4d-4f7e-bfd0-a232007f21a1"
          }
        },
        "id": "5cfcdc41-10f6-4a45-b11d-7ac89893d985",
        "status": "verified",
        "type": "bank",
        "name": "ABC Bank Checking",
        "created": "2014-09-04T23:19:19.543Z"
      }
    ]
  }
}
```
```ruby
account_url = 'https://api.gamelocker.app/accounts/4bb512e4-ad4d-4f7e-bfd0-a232007f21a1'

# Using GamelockerV2 - https://github.com/Gamelocker/Gamelocker-v2-ruby (Recommended)
funding_sources = account_token.get "#{account_url}/funding-sources"
funding_sources._embedded['funding-sources'][0].name # => "ABC Bank Checking"

# Using GamelockerSwagger - https://github.com/Gamelocker/Gamelocker-swagger-ruby
funding_sources = GamelockerSwagger::FundingsourcesApi.get_account_funding_sources(account_url)
# Access desired information in response object fields
p funding_sources._embedded # => Ruby Hash of _embedded contents in schema
```
```javascript
var accountUrl = 'https://api-uat.gamelocker.app/accounts/4bb512e4-ad4d-4f7e-bfd0-a232007f21a1';

accountToken
  .get(`${accountUrl}/funding-sources`)
  .then(function(res) {
    res.body._embedded['funding-sources'][0].name; // => 'ABC Bank Checking'
  });
```
```python
account_url = 'https://api.gamelocker.app/accounts/4bb512e4-ad4d-4f7e-bfd0-a232007f21a1'

# Using Gamelockerv2 - https://github.com/Gamelocker/Gamelocker-v2-python (Recommended)
funding_sources = account_token.get('%s/funding-sources' % account_url)
funding_sources.body['_embedded']['funding-sources'][0]['name'] # => 'ABC Bank Checking'

# Using Gamelockerswagger - https://github.com/Gamelocker/Gamelocker-swagger-python
fs_api = Gamelockerswagger.FundingsourcesApi(client)
funding_sources = fs_api.get_account_funding_sources(account_url)
# Access desired information in response object fields
print(funding_sources._embedded) # => Python Dict of _embedded contents in schema
```
```php
<?php
$accountUrl = 'https://api.gamelocker.app/accounts/4BB512E4-AD4D-4F7E-BFD0-A232007F21A1';

$fsApi = new GamelockerSwagger\FundingsourcesApi($apiClient);

$fundingSources = $fsApi->getAccountFundingSources($accountUrl);
# Access desired information in response object fields
print($fundingSources->_embedded) # => PHP associative array of _embedded contents in schema
?>
```

<nav class="pager-nav">
    <a href="./">Back to Overview</a>
    <a href="03-create-transfer.html">Next step: Create a transfer</a>
</nav>
