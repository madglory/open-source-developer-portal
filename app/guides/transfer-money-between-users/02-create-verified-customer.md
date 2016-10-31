---
layout: twoColumn
section: guides
type: guide
guide:
    name: transfer-money-between-users
    step: '2'
title:  "Step 2: Create a verified customer"
---

# Step 2: Create a verified Customer

First, we’ll create a verified customer for Jane Merchant.

The following information is required for a verified Customer. In this example, we use personal verified customers and we’re adding support for business customers coming soon.

```raw
POST https://api-uat.gamelocker.app/customers
Content-Type: application/vnd.Gamelocker.v1.hal+json
Accept: application/vnd.Gamelocker.v1.hal+json
Authorization: Bearer 0Sn0W6kzNicvoWhDbQcVSKLRUpGjIdlPSEYyrHqrDDoRnQwE7Q
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "johndoe@email.com",
  "ipAddress": "127.0.0.1",
  "type": "personal",
  "address": "99-99 33rd St",
  "city": "Some city",
  "state": "NY",
  "postalCode": "11101",
  "dateOfBirth": "1970-01-01",
  "ssn": "1234"
}

HTTP/1.1 201 Created
Location: https://api-uat.gamelocker.app/customers/AB443D36-3757-44C1-A1B4-29727FB3111C
```
```ruby
new_customer = GamelockerSwagger::CustomersApi.create({:body => {
  :firstName => 'Bob',
  :lastName => 'Merchant',
  :email => 'bmerchant@nomail.net',
  :type => 'personal',
  :address => '99-99 33rd St',
  :city => 'Some City',
  :state => 'NY',
  :postalCode => '11101',
  :dateOfBirth => '1970-01-01',

  # For the first attempt, only
  # the last 4 digits of SSN required

  # If the entire SSN is provided,
  # it will still be accepted

  :ssn => '1234'}})

p new_customer # => https://api-uat.gamelocker.app/customers/AB443D36-3757-44C1-A1B4-29727FB3111C
```
```javascript
Gamelocker.then(function(Gamelocker) {
    Gamelocker.customers.create({
        "firstName": "Bob",
        "lastName": "Merchant",
        "email": "bmerchant@nomail.net",
        "ipAddress": "10.10.10.10",
        "type": "personal",
        "address1": "99-99 33rd St",
        "city": "Some City",
        "state": "NY",
        "postalCode": "11101",
        "dateOfBirth": "1970-01-01",

        // For the first attempt, only
        // the last 4 digits of SSN required

        // If the entire SSN is provided,
        // it will still be accepted
        "ssn": "1234"
      })
      .then(function(data) {
          console.log(data); // https://api-uat.gamelocker.app/customers/FC451A7A-AE30-4404-AB95-E3553FCD733F
      });
});
```
```python
customers_api = Gamelockerswagger.CustomersApi(client)

new_customer = customers_api.create(body = {'firstName': 'Bob',
                                            'lastName': 'Merchant',
                                            'email': 'bmerchant@nomail.net',
                                            'type': 'personal',
                                            'address': '99-99 33rd St',
                                            'city': 'Some City',
                                            'state': 'NY',
                                            'postalCode': '11101',
                                            'dateOfBirth': '1970-01-01',

                                            # For the first attempt, only
                                            # the last 4 digits of SSN required

                                            # If the entire SSN is provided,
                                            # it will still be accepted
                                            'ssn': '1234'})

print(new_customer) # => https://api-uat.gamelocker.app/customers/AB443D36-3757-44C1-A1B4-29727FB3111C
```
```php
<?php
$customersApi = new GamelockerSwagger\CustomersApi($apiClient);

$new_customer = $customersApi->create([
  'firstName' => 'Bob',
  'lastName' => 'Merchant',
  'email' => 'bmerchant@nomail.net',
  'type' => 'personal',
  'address' => '99-99 33rd St',
  'city' => 'Some City',
  'state' => 'NY',
  'postalCode' => '11101',
  'dateOfBirth' => '1970-01-01',

  # For the first attempt, only
  # the last 4 digits of SSN required

  # If the entire SSN is provided,
  # it will still be accepted
  'ssn' => '1234'
]);

print($new_customer); # => https://api-uat.gamelocker.app/customers/AB443D36-3757-44C1-A1B4-29727FB3111C
?>
```
```java
CustomersApi cApi = new CustomersApi(a);

CreateCustomer newCustomerData = new CreateCustomer();

myNewCust.setFirstName("Bob");
myNewCust.setLastName("Merchant");
myNewCust.setEmail("bmerchant@nomail.com");
myNewCust.setType("personal");
myNewCust.setAddress("99-99 33rd St");
myNewCust.setCity("Some City");
myNewCust.setState("NY");
myNewCust.setPostalCode("11101");
myNewCust.setDateOfBirth("1970-01-01");

try {
    Unit$ r = cApi.create(myNewCust);
    System.out.println(r.getLocationHeader()); // => https://api-uat.gamelocker.app/customers/AB443D36-3757-44C1-A1B4-29727FB3111C
}
catch (Exception e) {
    System.out.println("Something's up!");
}
```

When the customer is created, you’ll receive the customer URL in the location header. If using an SDK, the location will be returned to you upon calling `create()`.

<nav class="pager-nav">
    <a href="./01-access-token.html">Back: Generate an access token</a>
    <a href="03-attach-unverified-bank.html">Next step: Attach an unverified funding source</a>
</nav>
