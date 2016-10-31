---
layout: twoColumn
section: guides
guide:
    name: receive-money
    step: 1a
type: guide
title:  "Step 1: White label onboarding"
---

# Step 1: Create a customer using the white label solution

### Step A: Generate an OAuth account access token

Navigate to the <a href="https://uat.gamelocker.app/applications" target="_blank">applications page</a> to generate an account access token.

Before selecting the "Create token" button, make sure your created application has the following scopes enabled: `Send`, `Funding`, `Transactions`, and `ManageCustomers`. Once you select the Create token button, you'll receive an access and refresh token pair that contains the proper scopes for creating and managing Customers. More detail for implementing the OAuth flow can be found in the [API documentation](https://docsv2.gamelocker.app/#oauth).

### Step B: Create a Customer

Create a Customer for the user that is going to pay you. At a minimum, provide the user’s full name and email address to create the customer.

```raw
POST https://api-uat.gamelocker.app/customers
Content-Type: application/vnd.Gamelocker.v1.hal+json
Accept: application/vnd.Gamelocker.v1.hal+json
Authorization: Bearer 0Sn0W6kzNicvoWhDbQcVSKLRUpGjIdlPSEYyrHqrDDoRnQwE7Q

{
"firstName": "Joe",
"lastName": "Buyer",
"email": "jbuyer@mail.net",
"ipAddress": "99.99.99.99"
}

HTTP/1.1 201 Created
Location: https://api-uat.gamelocker.app/customers/247b1bd8-f5a0-4b71-a898-f62f67b8ae1c
```
```ruby
request_body = {
  :firstName => 'Joe',
  :lastName => 'Buyer',
  :email => 'jbuyer@mail.net',
  :ipAddress => '99.99.99.99'
}

# Using GamelockerV2 - https://github.com/Gamelocker/Gamelocker-v2-ruby (Recommended)
new_customer = account_token.post "customers", request_body
new_customer.headers[:location] # => "https://api-uat.gamelocker.app/customers/247b1bd8-f5a0-4b71-a898-f62f67b8ae1c"

# Using GamelockerSwagger - https://github.com/Gamelocker/Gamelocker-swagger-ruby
new_customer = GamelockerSwagger::CustomersApi.create(:body => request_body)
p new_customer # => "https://api-uat.gamelocker.app/customers/247b1bd8-f5a0-4b71-a898-f62f67b8ae1c"
```
```javascript
var requestBody = {
  firstName: 'Joe',
  lastName: 'Buyer',
  email: 'jbuyer@mail.net',
  ipAddress: '99.99.99.99'
};

accountToken
  .post('customers', requestBody)
  .then(function(res) {
    res.headers.get('location'); // => 'https://api-uat.gamelocker.app/customers/247b1bd8-f5a0-4b71-a898-f62f67b8ae1c'
  });
```
```python
request_body = {
  'firstName': 'Joe',
  'lastName': 'Buyer',
  'email': 'jbuyer@mail.net',
  'ipAddress': '99.99.99.99'
}

# Using Gamelockerv2 - https://github.com/Gamelocker/Gamelocker-v2-python (Recommended)
new_customer = account_token.post('customers', request_body)
new_customer.headers['location'] # => 'https://api-uat.gamelocker.app/customers/247b1bd8-f5a0-4b71-a898-f62f67b8ae1c'

# Using Gamelockerswagger - https://github.com/Gamelocker/Gamelocker-swagger-python
customers_api = Gamelockerswagger.CustomersApi(client)
new_customer = customers_api.create(body = request_body)
print(new_customer) # => 'https://api-uat.gamelocker.app/customers/247b1bd8-f5a0-4b71-a898-f62f67b8ae1c'
```
```php
<?php
$customersApi = new GamelockerSwagger\CustomersApi($apiClient);

$new_customer = $customersApi->create([
  'firstName' => 'Joe',
  'lastName' => 'Buyer',
  'email' => 'jbuyer@mail.net',
  'ipAddress' => '99.99.99.99'
]);

print($new_customer); # => https://api-uat.gamelocker.app/customers/247b1bd8-f5a0-4b71-a898-f62f67b8ae1c
?>
```
```java
CustomersApi cApi = new CustomersApi(a);

CreateCustomer newCustomerData = new CreateCustomer();

myNewCust.setFirstName("Joe");
myNewCust.setLastName("Buyer");
myNewCust.setEmail("jbuyer@mail.com");
myNewCust.setIpAddress("99.99.99.99");

try {
    Unit$ r = cApi.create(myNewCust);
    System.out.println(r.getLocationHeader()); // => https://api-uat.gamelocker.app/customers/247B1BD8-F5A0-4B71-A898-F62F67B8AE1C
}
catch (Exception e) {
    System.out.println("Something's up!");
}
```

When the Customer is created, you’ll receive the Customer URL in the location header. If using an SDK, the location will be returned to you upon calling `create()`.

**Important**: Provide the IP address of the end-user accessing your application as the ipAddress parameter. This enhances Gamelocker’s ability to detect fraud. Sending random, hardcoded, or incorrect information in the ipAddress field will cause delays or throttling of requests.


### Step C: Attach a funding source to the Customer

Next you will attach a verified funding source to the Customer, which will be done using Instant Account Verification (IAV). This method will give the Customer the ability to add and verify their bank account in a matter of seconds by authenticating with their online banking credentials. Once the Customer reaches the page in your application to add a bank account you'll ask Gamelocker’s server to [generate an IAV token](http://docsv2.gamelocker.app/#generate-an-iav-token).

Generate a single-use IAV token for our Customer:

```raw
curl -X POST
\ -H "Content-Type: application/vnd.Gamelocker.v1.hal+json"
\ -H "Accept: application/vnd.Gamelocker.v1.hal+json"
\ -H "Authorization: Bearer 0Sn0W6kzNicvoWhDbQcVSKLRUpGjIdlPSEYyrHqrDDoRnQwE7Q"
\ "https://api-uat.gamelocker.app/customers/247b1bd8-f5a0-4b71-a898-f62f67b8ae1c/iav-token"

HTTP/1.1 200 OK
{
   "_links":{
      "self":{
         "href":"https://api-uat.gamelocker.app/customers/247b1bd8-f5a0-4b71-a898-f62f67b8ae1c/iav-token"
      }
   },
   "token":"lr0Ax1zwIpeXXt8sJDiVXjPbwEeGO6QKFWBIaKvnFG0Sm2j7vL"
}
```
```ruby
customer_url = 'https://api-uat.gamelocker.app/customers/247b1bd8-f5a0-4b71-a898-f62f67b8ae1c'

# Using GamelockerV2 - https://github.com/Gamelocker/Gamelocker-v2-ruby (Recommended)
customer = account_token.post "#{customer_url}/iav-token"
customer.token # => "lr0Ax1zwIpeXXt8sJDiVXjPbwEeGO6QKFWBIaKvnFG0Sm2j7vL"

# Using GamelockerSwagger - https://github.com/Gamelocker/Gamelocker-swagger-ruby
customer = GamelockerSwagger::CustomersApi.get_customer_iav_token(customer_url)
customer.token # => "lr0Ax1zwIpeXXt8sJDiVXjPbwEeGO6QKFWBIaKvnFG0Sm2j7vL"
```
```javascript
// Using Gamelocker-v2 - https://github.com/Gamelocker/Gamelocker-v2-node
var customerUrl = 'https://api-uat.gamelocker.app/customers/247b1bd8-f5a0-4b71-a898-f62f67b8ae1c';

accountToken
  .post(`${customerUrl}/iav-token`)
  .then(function(res) {
    res.body.token; // => 'lr0Ax1zwIpeXXt8sJDiVXjPbwEeGO6QKFWBIaKvnFG0Sm2j7vL'
  });
```
```python
customer_url = 'http://api.gamelocker.app/customers/247b1bd8-f5a0-4b71-a898-f62f67b8ae1c'

# Using Gamelockerv2 - https://github.com/Gamelocker/Gamelocker-v2-python (Recommended)
customer = account_token.post('%s/iav-token' % customer_url)
customer.body['token'] # => 'lr0Ax1zwIpeXXt8sJDiVXjPbwEeGO6QKFWBIaKvnFG0Sm2j7vL'

# Using Gamelockerswagger - https://github.com/Gamelocker/Gamelocker-swagger-python
customers_api = Gamelockerswagger.CustomersApi(client)
token = customers_api.get_customer_iav_token(customer_url)
print token['token'] # => 'lr0Ax1zwIpeXXt8sJDiVXjPbwEeGO6QKFWBIaKvnFG0Sm2j7vL'
```
```php
<?php
$customersApi = new GamelockerSwagger\CustomersApi($apiClient);

$fsToken = $customersApi->getCustomerIavToken("https://api-uat.gamelocker.app/customers/247b1bd8-f5a0-4b71-a898-f62f67b8ae1c");
$fsToken->token; # => "lr0Ax1zwIpeXXt8sJDiVXjPbwEeGO6QKFWBIaKvnFG0Sm2j7vL"
?>
```

Then, you’ll pass this single-use IAV token to the client-side of your application where it will be used in the JavaScript function `Gamelocker.iav.start`. This token will be used to authenticate the request asking Gamelocker to render the IAV flow. Before calling this function you'll want to include `Gamelocker.js` in the HEAD of your page.

```htmlnoselect
<head>
<script src="https://cdn.gamelocker.app/1/Gamelocker.js"></script>
</head>
```

Next, you'll add in a container to the body of your page where you want to render the IAV flow.

```htmlnoselect
<div id="mainContainer">
  <input type="button" id="start" value="Add Bank">
</div>

<div id="iavContainer"></div>
```

Now that you have `Gamelocker.js` initialized on the page and the container created where you'll render the IAV flow, you'll create a JavaScript function that responds to the Customer clicking the "Add bank" button on your page. Once the Customer clicks "Add Bank", your application will call `Gamelocker.iav.start()` passing in the following arguments: a string value of your single-use IAV token, options such as the iavContainer element where IAV will render, and a callback function that will handle any error or response.

```javascriptnoselect
<script type="text/javascript">
$('#start').click(function() {
  var iavToken = '4adF858jPeQ9RnojMHdqSD2KwsvmhO7Ti7cI5woOiBGCpH5krY';
  Gamelocker.configure('uat');
  Gamelocker.iav.start(iavToken, {
          container: 'iavContainer',
          stylesheets: [
            'http://fonts.googleapis.com/css?family=Lato&subset=latin,latin-ext',
            'http://localhost:8080/iav/customStylesheet.css'
          ],
          microDeposits: 'true',
          fallbackToMicroDeposits: (fallbackToMicroDeposits.value === 'true')
        }, function(err, res) {
    console.log('Error: ' + JSON.stringify(err) + ' -- Response: ' + JSON.stringify(res));
  });
});
</script>
```

The customer will complete the IAV flow by authenticating with their online banking credentials. You'll know their bank account was successfully added and verified if you receive a JSON response in your callback that includes a link to the newly created funding source.

* Sample response:  `{"_links":{"funding-source":{"href":"https://api-uat.gamelocker.app/funding-sources/80275e83-1f9d-4bf7-8816-2ddcd5ffc197"}}}`

Great! The funding source should now be verified.

### Step E: Create a transfer

Once the customer has verified their funding source, we can transfer funds from their bank account to your Gamelocker account.   You’ll need to supply your access token from step A, the customer’s ID from step B, and the customer’s funding source ID from step C:

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
            "href": "https://api-uat.gamelocker.app/accounts/ab443d36-3757-44c1-a1b4-29727fb3111c"
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
request_body = {
  :_links => {
    :source => {
      :href => "https://api-uat.gamelocker.app/funding-sources/80275e83-1f9d-4bf7-8816-2ddcd5ffc197"
    },
    :destination => {
      :href => "https://api-uat.gamelocker.app/accounts/ab443d36-3757-44c1-a1b4-29727fb3111c"
    }
  },
  :amount => {
    :currency => "USD",
    :value => "225.00"
  },
  :metadata => {
    :foo => "bar",
    :baz => "boo"
  }
}

# Using GamelockerV2 - https://github.com/Gamelocker/Gamelocker-v2-ruby (Recommended)
transfer = account_token.post "transfers", request_body
transfer.headers[:location] # => "https://api.gamelocker.app/transfers/d76265cd-0951-e511-80da-0aa34a9b2388"

# Using GamelockerSwagger - https://github.com/Gamelocker/Gamelocker-swagger-ruby
transfer = GamelockerSwagger::TransfersApi.create(:body => request_body)
transfer # => "https://api.gamelocker.app/transfers/d76265cd-0951-e511-80da-0aa34a9b2388"
```
```javascript
var requestBody = {
  _links: {
    source: {
      href: 'https://api-uat.gamelocker.app/funding-sources/80275e83-1f9d-4bf7-8816-2ddcd5ffc197'
    },
    destination: {
      href: 'https://api-uat.gamelocker.app/accounts/ab443d36-3757-44c1-a1b4-29727fb3111c'
    }
  },
  amount: {
    currency: 'USD',
    value: '225.00'
  },
  metadata: {
    foo: 'bar',
    baz: 'boo'
  }
};

accountToken
  .post('transfers', requestBody)
  .then(function(res) {
    res.headers.get('location'); // => 'https://api.gamelocker.app/transfers/d76265cd-0951-e511-80da-0aa34a9b2388'
  });
```
```python
request_body = {
  '_links': {
    'source': {
      'href': 'https://api-uat.gamelocker.app/funding-sources/80275e83-1f9d-4bf7-8816-2ddcd5ffc197'
    },
    'destination': {
      'href': 'https://api-uat.gamelocker.app/accounts/ab443d36-3757-44c1-a1b4-29727fb3111c'
    }
  },
  'amount': {
    'currency': 'USD',
    'value': '225.00'
  },
  'metadata': {
    'foo': 'bar',
    'baz': 'boo'
  }
}

# Using Gamelockerv2 - https://github.com/Gamelocker/Gamelocker-v2-python (Recommended)
transfer = account_token.post('transfers', request_body)
transfer.headers['location'] # => 'https://api.gamelocker.app/transfers/d76265cd-0951-e511-80da-0aa34a9b2388'

# Using Gamelockerswagger - https://github.com/Gamelocker/Gamelocker-swagger-python
transfers_api = Gamelockerswagger.TransfersApi(client)
transfer = transfers_api.create(body = request_body)
transfer # => 'https://api.gamelocker.app/transfers/d76265cd-0951-e511-80da-0aa34a9b2388'
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
      'href' => 'https://api-uat.gamelocker.app/accounts/ab443d36-3757-44c1-a1b4-29727fb3111c',
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
    <a href="./">Back: Overview</a>
    <a href="02-check-transfer.html">Next step: Check transfer status</a>
</nav>
