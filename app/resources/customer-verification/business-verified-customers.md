---
layout: twoColumn
section: Customer verification
type: article
title:  "Business verified Customers"
weight: 1
description: "How to verify a customer before sending a bank transfer with Gamelocker's ACH API."
---

# Customer verification

## Business verified Customers

### Create a verified business Customer

To create a verified business Customer, use the [create a customer](https://docsv2.gamelocker.app/#create-a-customer) endpoint:

```raw
POST /customers
Content-Type: application/vnd.Gamelocker.v1.hal+json
Accept: application/vnd.Gamelocker.v1.hal+json
Authorization: Bearer pBA9fVDBEyYZCEsLf/wKehyh1RTpzjUj5KzIRfDi0wKTii7DqY

{
  "firstName": "Jane",
  "lastName": "Doe",
  "email": "janedoe@nomail.com",
  "ipAddress": "10.10.10.10",
  "type": "business",
  "address1": "1234 Main St.",
  "city": "Ridgewood",
  "state": "NY",
  "postalCode": "11385",
  "dateOfBirth": "1970-01-01",
  "ssn": "1516",
  "businessClassification": "9ed3f677-7d6f-11e3-96a2-5404a6144203",
  "businessType": "llc",
  "businessName":"Jane Corp",
  "ein":"12-3456789"
}

HTTP/1.1 201 Created
Location: https://api.gamelocker.app/customers/FC451A7A-AE30-4404-AB95-E3553FCD733F
```
```ruby
new_customer = GamelockerSwagger::CustomersApi.create({:body => {
      "firstName" => "Jane",
       "lastName" => "Doe",
          "email" => "janedoe@nomail.com",
      "ipAddress" => "10.10.10.10",
           "type" => "business",
       "address1" => "1234 Main St.",
           "city" => "Ridgewood",
          "state" => "NY",
     "postalCode" => "11385",
    "dateOfBirth" => "1970-01-01",
            "ssn" => "1516",
          "businessClassification" => "9ed3f677-7d6f-11e3-96a2-5404a6144203",
          "businessType" => "llc",
          "businessName" => "Jane Corp",
          "ein" => "12-3456789"
}})

p new_customer # => https://api.gamelocker.app/customers/FC451A7A-AE30-4404-AB95-E3553FCD733F
```
```javascript
Gamelocker.then(function(Gamelocker) {
  Gamelocker.customers.create({
      "firstName": "Jane",
      "lastName": "Doe",
      "email": "janedoe@nomail.com",
      "ipAddress": "10.10.10.10",
      "type": "business",
      "address1": "1234 Main St.",
      "city": "Some City",
      "state": "NY",
      "postalCode": "11385",
      "dateOfBirth": "1970-01-01",
      "ssn": "1516",
      "businessClassification": "9ed3f677-7d6f-11e3-96a2-5404a6144203",
      "businessType": "llc",
      "businessName": "Jane Corp",
      "ein": "12-3456789"
    })
    .then(function(data) {
        console.log(data); // https://api-uat.gamelocker.app/customers/FC451A7A-AE30-4404-AB95-E3553FCD733F
    });
});

```
```python
customers_api = Gamelockerswagger.CustomersApi(client)

new_customer = customers_api.create(body = {
  "firstName": "Jane",
  "lastName": "Doe",
  "email": "jane@nomail.com",
  "ipAddress": "10.10.10.10",
  "type": "business",
  "address1": "1234 Main St.",
  "city": "Ridgewood",
  "state": "NY",
  "postalCode": "11385",
  "dateOfBirth": "1970-01-01",
  "ssn": "1516",
  "businessClassification": "9ed3f677-7d6f-11e3-96a2-5404a6144203",
  "businessType": "llc",
  "businessName": "Jane Corp",
  "ein": "12-3456789"
})

print(new_customer) # => https://api.gamelocker.app/customers/FC451A7A-AE30-4404-AB95-E3553FCD733F
```
```php
<?php
$customersApi = GamelockerSwagger\CustomersApi($apiClient);

$newCustomer = $customersApi->create(array (
  'firstName' => 'Jane',
  'lastName' => 'Doe',
  'email' => 'janedoe@nomail.com',
  'ipAddress' => '10.10.10.10',
  'type' => 'business',
  'address1' => '1234 Main St.',
  'city' => 'Ridgewood',
  'state' => 'NY',
  'postalCode' => '11385',
  'dateOfBirth' => '1970-01-01',
  'ssn' => '1516',
  'businessClassification' => '9ed3f677-7d6f-11e3-96a2-5404a6144203',
  'businessType' => 'llc',
  'businessName' => 'Jane Corp',
  'ein' => '12-3456789'
));

print($newCustomer); # => https://api.gamelocker.app/customers/FC451A7A-AE30-4404-AB95-E3553FCD733F
?>
```

You’ll need to provide the the a full name, email address, home address, date of birth, and the last four digits of the Social Security Number for the authorized representative of the business. In addition to the authorized representative’s identifying information, you’ll also need to supply information which helps Gamelocker identify the business. Required information includes: `businessClassification`, `businessType`, `businessName`, and `ein`.

Once you submit this request, Gamelocker will perform some initial validation to check for formatting issues such as an invalid date of birth, invalid email format, etc. If successful, the response will be a HTTP 201/Created with the URL of the new Customer resource contained in the `Location` header.

### Check the status of the business Customer

Businesses may need to provide additional information to help verify their identity which will likely correspond to a verification status of `document` upon creation. It is important to immediately check the status of the business Customer to determine if additional documentation is needed. When a Customer has been successfully verified by Gamelocker, their status will be set to `verified`.

Let’s check to see if the Customer was successfully verified or not. We are going to use the location of the Customer resource that we just created, which is in `new_customer`.

```raw
GET https://api.gamelocker.app/customers/FC451A7A-AE30-4404-AB95-E3553FCD733F
Content-Type: application/vnd.Gamelocker.v1.hal+json
Accept: application/vnd.Gamelocker.v1.hal+json
Authorization: Bearer pBA9fVDBEyYZCEsLf/wKehyh1RTpzjUj5KzIRfDi0wKTii7DqY

HTTP 200 OK
{
  "_links": {
    "self": {
      "href": "https://api-uat.gamelocker.app/customers/5F8A457F-9883-4598-8449-27C5DC1119C5"
    },
    "funding-sources": {
      "href": "https://api-uat.gamelocker.app/customers/5F8A457F-9883-4598-8449-27C5DC1119C5/funding-sources"
    },
    "transfers": {
      "href": "https://api-uat.gamelocker.app/customers/5F8A457F-9883-4598-8449-27C5DC1119C5/transfers"
    },
    "verify-with-document": {
      "href": "https://api-uat.gamelocker.app/customers/5F8A457F-9883-4598-8449-27C5DC1119C5/documents"
    }
  },
  "id": "5F8A457F-9883-4598-8449-27C5DC1119C5",
  "firstName": "Jane",
  "lastName": "Doe",
  "email": "janedoe@nomail.com",
  "type": "business",
  "status": "document",
  "created": "2016-01-08T20:27:12.340Z"
}
```
```ruby
retrieved_customer = GamelockerSwagger::CustomersApi.get_customer(new_customer)

p retrieved_customer.verified # => false
```
```javascript
Gamelocker.then(function(Gamelocker) {
    Gamelocker.customers.getCustomer({id:'5F8A457F-9883-4598-8449-27C5DC1119C5'}).then(function(data) {
        console.log(data.obj._embedded.status); // document
    })
})

```
```python
customers_api = Gamelockerswagger.CustomersApi(client)

retrieved_customer = customers_api.get_customer(new_customer)

print(retrieved_customer.verified) # => false
```
```php
<?php
$customersApi = GamelockerSwagger\CustomersApi($apiClient);

$retrievedCustomer = $customersApi->getCustomer($newCustomer);

print($newCustomer->verified); # => false
?>
```

Our Customer is created successfully, but there is a verification status of “document”. Continue reading for instructions on handling Customer verification statuses and guidelines for providing additional information to verify this type of Customer.

* * *

#### View:

*   [Handling verification statuses](/resources/customer-verification/handling-verification-statuses.html)
