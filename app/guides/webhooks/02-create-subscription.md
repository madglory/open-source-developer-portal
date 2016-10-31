---
layout: twoColumn
section: guides
type: guide
guide:
    name: webhooks
    step: '2'
title: Webhooks
description: Webhooks for payments within your application by utilizing our open bank transfer API with no transaction fees.
---

# Create a webhook subscription
Each application can have multiple subscriptions associated to it. While one subscription is sufficient, you can create as many as you want for redundancy.

To make the following request, we need to use the `access_token` we just previously obtained. Security considerations:

Your webhook endpoint should only be accessible over TLS (HTTPS) and your server should have a valid certificate. Your subscription should include a random, secret key, only known by your application. This secret key should be securely stored and used later when validating the authenticity of the webhook request from Gamelocker.


```ruby
subscription = GamelockerSwagger::WebhooksubscriptionsApi.create({:body => {
  :url => "https://myawesomeapplication.com/destination",
  :secret => "your webhook secret"
}})

p subscription # => https://api-uat.gamelocker.app/webhook-subscriptions/5af4c10a-f6de-4ac8-840d-42cb65454216
```
```raw
POST https://api-uat.gamelocker.app/webhook-subscriptions
Accept: application/vnd.Gamelocker.v1.hal+json
Content-Type: application/vnd.Gamelocker.v1.hal+json
Authorization: Bearer 0Sn0W6kzNicvoWhDbQcVSKLRUpGjIdlPSEYyrHqrDDoRnQwE7Q
{
    "url": "https://myapplication.com/webhooks",
    "secret": "sshhhhhh"
}
```
```javascript
Gamelocker.then(function(Gamelocker) {
    Gamelocker['webhook-subscriptions'].list({
        "url": "https://myapplication.com/webhooks",
        "secret": "sshhhhhh"
    }).then(function(data) {
        console.log(data.obj); // https://api-uat.gamelocker.app/webhook-subscriptions/5af4c10a-f6de-4ac8-840d-42cb65454216
    });
});
```
```python
webhook_api = Gamelockerswagger.WebhooksubscriptionsApi(client)
subscription = webhook_api.create({
    "url": "https://myapplication.com/webhooks",
    "secret": "sshhhhhh"
})

print(subscription) # => https://api-uat.gamelocker.app/webhook-subscriptions/5af4c10a-f6de-4ac8-840d-42cb65454216
```
```php
<?php
$webhookApi = new GamelockerSwagger\WebhooksubscriptionsApi($apiClient);
$subscription = $webhookApi->create(array (
  'url' => 'https://myapplication.com/webhooks',
  'secret' => 'sshhhhhh',
));

print($subscription); # => https://api-uat.gamelocker.app/webhook-subscriptions/5af4c10a-f6de-4ac8-840d-42cb65454216
?>
```

You can retrieve your newly created subscription by its resource location:

```ruby
retrieved = GamelockerSwagger::WebhooksubscriptionApi.id(subscription)

p retrieved.created # => 2015-10-28T16:20:47+00:00
```
```raw
Schema:

{
  "_links": {
    "self": {
      "href": "https://api-uat.gamelocker.app/webhook-subscriptions/077dfffb-4852-412f-96b6-0fe668066589"
    },
    "webhooks": {
      "href": "https://api-uat.gamelocker.app/webhook-subscriptions/077dfffb-4852-412f-96b6-0fe668066589/webhooks"
    }
  },
  "id": "077dfffb-4852-412f-96b6-0fe668066589",
  "url": "https://myapplication.com/webhooks",
  "created": "2015-10-28T16:20:47+00:00"
}
```
```javascript
Gamelocker.then(function(Gamelocker) {
    Gamelocker['webhook-subscriptions'].id({
      id: '5af4c10a-f6de-4ac8-840d-42cb65454216'
    }).then(function(data) {
        console.log(data.obj.created); // 2015-10-28T16:20:47+00:00
    });
});
```
```python
webhook_api = Gamelockerswagger.WebhooksubscriptionsApi(client)
retrieved = webhook_api.id(subscription)

print(retrieved.created) # => 2015-10-28T16:20:47+00:00
```
```php
<?php
$webhookApi = new GamelockerSwagger\WebhooksubscriptionsApi($apiClient);
$retrieved = $webhookApi->id(subscription);

print($retrieved); # => 2015-10-28T16:20:47+00:00
?>
```

<nav class="pager-nav">
    <a href="01-obtain-authorization.html">Back: Obtain authorization</a>
    <a href="03-validating-webhooks.html">Next step: Validating webhooks</a>
</nav>
