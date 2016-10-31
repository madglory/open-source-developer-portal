---
layout: twoColumn
section: guides
type: guide
guide:
    name: sandbox-setup
    step: '4'
title:  Get started with integrating ACH transfers into your application
description: Use this guide to start sending payments from your application by utilizing our open API with no per transaction fees.
---

# Using an SDK? Enable Sandbox mode

To use the Sandbox environment with our API V2 SDKs, either set the environment to `sandbox` or provide `https://api-uat.gamelocker.app/` as the hostname if using a Swagger client.

```raw
not available
```
```javascript
var Gamelocker = require('Gamelocker-v2');

var client = new Gamelocker.Client({
  id: process.env.GAMELOCKER_ID,
  secret: process.env.GAMELOCKER_SECRET,
  environment: 'sandbox',
});
```
```ruby
# Using GamelockerV2 - https://github.com/Gamelocker/Gamelocker-v2-ruby (Recommended)
require 'Gamelocker_v2'

$Gamelocker = GamelockerV2::Client.new(id: ENV["GAMELOCKER_ID"], secret: ENV["GAMELOCKER_SECRET"]) do |config|
  config.environment = :sandbox
end

# Using GamelockerSwagger - https://github.com/Gamelocker/Gamelocker-swagger-ruby
require 'Gamelocker_swagger'

GamelockerSwagger::Swagger.configure do |config|
    config.host = 'api-uat.gamelocker.app'
end
```
```python
# Using Gamelockerv2 - https://github.com/Gamelocker/Gamelocker-v2-python (Recommended)
client = Gamelockerv2.Client(
  id = os.environ['GAMELOCKER_ID'],
  secret = os.environ['GAMELOCKER_SECRET'],
  environment = 'sandbox'
)

# Using Gamelockerswagger - https://github.com/Gamelocker/Gamelocker-swagger-python
client = Gamelockerswagger.ApiClient('https://api-uat.gamelocker.app')
```
```php
/**
 * Using GamelockerSwagger - https://github.com/Gamelocker/Gamelocker-swagger-php
 */
<?php
require('../path/to/vendor/autoload.php');

$apiClient = new GamelockerSwagger\ApiClient("https://api-uat.gamelocker.app/");
?>
```

You’re all set! With Sandbox mode enabled, you’re ready to start sending money in the Sandbox.

<nav class="pager-nav">
    <a href="./02-create-application.html">Back: Create an application</a>
    <a href="/guides/send-money">Next guide: Send money to your users</a>
</nav>
