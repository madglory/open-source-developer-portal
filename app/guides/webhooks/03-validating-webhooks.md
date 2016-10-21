---
layout: twoColumn
section: guides
type: guide
guide:
    name: webhooks
    step: '3'
title: Webhooks
description: Webhooks for payments within your application by utilizing our open API with no per transaction fees.
---

# Validating webhooks

Assume that your integration is an online marketplace, and that a customer just placed an order on your site. A few days after the customer initiated their payment, your application receives this webhook.

The `topic` field of an event holds [a description](http://docsv2.gamelocker.app/#events) of the event, which is similar the subject of an e-mail message.  The `webhook` itself contains _links the the resource impacted by the event that can be used to retrieve more information about the webhook you have received.

**NOTE**: The `event` must be retrieved with a `client_credentials` granted access_token.

##### JSON
```jsonnoselect
{
  "id": "2c311238-b9ef-4763-b1cb-03e1aa651227",
  "resourceId": "0089A051-9B79-E511-80DB-0AA34A9B2388",
  "topic": "transfer_completed",
  "timestamp": "2015-10-23T15:35:35.366Z",
  "_links": {
    "self": {
      "href": "https://api-uat.gamelocker.app/events/2c311238-b9ef-4763-b1cb-03e1aa651227"
    },
    "account": {
      "href": "https://api-uat.gamelocker.app/accounts/b4cdac07-eeca-4059-a29c-48900e453d54"
    },
    "resource": {
      "href": "https://api-uat.gamelocker.app/transfers/0089A051-9B79-E511-80DB-0AA34A9B2388"
    }
  }
}
```

#### Step A. Authenticating the webhook request
Before we process any data from the webhook we’ll want to validate that the request really came from Gamelocker and not someone pretending to be Gamelocker. Gamelocker signs each webhook request with the `secret` you passed in when you created the webhook subscription. The signature is contained in the `X-Request-Signature-Sha-256` header and is a SHA256 HMAC hash of the request body with the key being your webhook secret.

You can validate the webhook by generating the same SHA256 HMAC hash and comparing it to the signature sent with the payload.

```ruby
def verify_signature(payload_body, request_signature)
  signature = OpenSSL::HMAC.hexdigest(OpenSSL::Digest.new("sha256"),
ENV["GAMELOCKER_WEBHOOK_SECRET"],
payload_body)
  unless Rack::Utils.secure_compare(signature, request_signature)
    halt 500, "Signatures didn't match!"
  end
end
```
```raw
not available
```
```javascript
var verifyGatewaySignature = function(proposed_signature, webhook_secret, payload_body) {
  var crypto    = require('crypto');

  var hash = crypto.createHmac('sha256', webhook_secret).update(payload_body).digest('hex');

return proposed_signature === hash;
}
```
```python
def verify_gateway_signature(proposed_signature, webhook_secret, payload_body):
  import hmac
  from hashlib import sha256

  signature = hmac.new(webhook_secret, payload_body, sha256).hexdigest()

  return True if (signature == proposed_signature) else False
```
```php
<?php
function verifyGatewaySignature($proposedSignature, $webhookSecret, $payloadBody) {
    $signature = hash_hmac("sha256", $payloadBody, $webhookSecret);
    return $signature == $proposedSignature;
}
?>
```

#### Step B. Check for duplicate events

It is important to consider that multiple webhooks are fired for the same action on certain events. For example, multiple webhooks are fired for `Transfer` events, that is, two `transfer_created` events with different resource IDs (and, by extension, resource URLs) will be fired, one for each customer. To avoid doing any business logic twice, you would have to check if you have already received a webhook relating to the `Transfer` resource responsible for the event.

To do this, keep a queue of events in a database and check to see if an `Event` has the same `self` resource location in `_links` as another event. If not, process the logic for that event. To illustrate, this is how a developer would implement this using Ruby and the ActiveRecord ORM.

##### Ruby/ActiveRecord
```rubynoselect
check_db = ActiveRecord::Base.connection.execute("SELECT * FROM EVENTS WHERE SELF = #{event[:_links][:self].to_s}")

# check_db will be an array of rows returned
unless check_db.length() == 0
    # do something
end
```

<nav class="pager-nav">
    <a href="02-create-subscription.html">Back: Create a webhook subscription</a>
    <a href="04-process-webhooks.html">Next step: Processing webhooks</a>
</nav>
