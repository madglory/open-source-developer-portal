---
layout: twoColumn
section: guides
type: guide
guide:
    name: webhooks
    step: '4'
title: Webhooks
description: Webhooks for payments within your application by utilizing our open API with no per transaction fees.
---

## Example scenario

Let's assume that you have a webhook subscription and Gamelocker has just delivered the following payload to your specified endpoint:

##### Sample Payload
```jsonnoselect
{
  "id": "80d8ff7d-7e5a-4975-ade8-9e97306d6c15",
  "resourceId": "36E9DCB2-889B-4873-8E52-0C9404EA002A",
  "topic": "transfer_created",
  "timestamp": "2015-10-22T14:44:11.407Z",
  "_links": {
    "self": {
      "href": "https://api-uat.gamelocker.app/events/80d8ff7d-7e5a-4975-ade8-9e97306d6c15"
    },
    "account": {
      "href": "https://api-uat.gamelocker.app/accounts/b4cdac07-eeca-4059-a29c-48900e453d54"
    },
    "resource": {
      "href": "https://api-uat.gamelocker.app/transfers/36E9DCB2-889B-4873-8E52-0C9404EA002A"
    },
    "customer": {
      "href": "https://api-uat.gamelocker.app/customers/36E9DCB2-889B-4873-8E52-0C9404EA002A"
    }
  }
}
```

For illustrative purposes, let's assume you are using Ruby on Rails with a controller defined to handle the POST request from Gamelocker's servers. Your application logic will look a little something like this:

##### Ruby
```rubynoselect
require 'Gamelocker_swagger'

if params[:topic] == 'transfer_completed'
  transfer = GamelockerSwagger::TransfersApi.by_id(params[:links][:resource][:href])

  transfer._embedded.each do |k, v|
    # Retrieve customer info from your database
    # or from Gamelocker here, and then send notifications
  end
elsif params[:topic] == 'another_event'
  "..."
end
```

Let's recap. From the event we can retrieve the `transfer` and then take a look at the `_links` object and retrieve the `customers` that need to be notified. From here, you can make a call to `customers/{id}` to retrieve their e-mail addresses (or to your own database) so that you can send your notification message.

That's it! You’ve learned the basics of webhooks.

<nav class="pager-nav">
    <a href="./03-validating-webhooks.html">Back: Validating webhooks</a>
    <a href="" style="display:none;"></a>
</nav>
