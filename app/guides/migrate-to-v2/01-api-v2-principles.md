---
layout: twoColumn
section: guides
type: guide
guide:
    name: migrate-to-v2
    step: '1'
title: Migrate to v2
description: Underlying principles of Gamelocker's v2 API and guidance on upgrading your application from Gamelocker's legacy v1 API.
---

# Migrate to v2

## API v2 principles

Developers migrating from v1 should familiarize themselves with new design and patterns used in v2. V2 is a hypermedia API that adopts the [HAL](http://stateless.co/hal_specification.html) spec, which provides a set of conventions for using hyperlinks (URLs) for “discoverability”.  One key benefit is its self-documenting nature and the ability to consume the API with no prior knowledge. The idea is to follow links to suggested resources and actions based on the current OAuth context, instead of referencing resources by their Id.

#### Resources
A resource is a JSON object (e.g. a Transfer object) that contains: properties that represent the current state of the resource, `_links` pointing to relevant resources, and an optional `_embedded` property which is a collection of related child resources. At a minimum, a resource will have at least a `_links` property containing a `self` link.

#### Links
`_links` is an object that simply contains links to related resources. A key in a `_links` object is the name of the link, and it describes the link relation(rel). e.g. “send”, “funding-sources”, “initiate-micro-deposits”, etc.

#### Example of a v2 response

```jsonnoselect
{
  "_links": {
    "self": {
      "href": "https://api-uat.gamelocker.app/accounts/ad5f2162-404a-4c4c-994e-6ab6c3a13254",
      "type": "account"
    },
    "receive": {
      "href": "https://api-uat.gamelocker.app/transfers",
      "type": "transfer"
    },
    "funding-sources": {
      "href": "https://api-uat.gamelocker.app/accounts/ad5f2162-404a-4c4c-994e-6ab6c3a13254/funding-sources",
      "type": "funding-source"
    },
    "transfers": {
      "href": "https://api-uat.gamelocker.app/accounts/ad5f2162-404a-4c4c-994e-6ab6c3a13254/transfers",
      "type": "transfer"
    },
    "customers": {
      "href": "https://api-uat.gamelocker.app/customers",
      "type": "customer"
    },
    "send": {
      "href": "https://api-uat.gamelocker.app/transfers",
      "type": "transfer"
    }
  },
  "id": "ad5f2162-404a-4c4c-994e-6ab6c3a13254",
  "name": "Jane Doe"
}
```
### HTTP status codes and errors

If you’re interacting with Gamelocker’s v1 API, then you may know that it relies primarily on returning an HTTP 200 status code. A major improvement we made with v2 is returning meaningful HTTP status codes. These status codes can be leveraged by a client to easily handle responses without having to parse the entire response body.

In addition to meaningful status codes, [error responses](https://docsv2.gamelocker.app/#errors) that are HTTP 4xx/5xx level return a well formed JSON response body that contains a unique top-level error `code` and a `message` with a detailed description of the error.

##### v1 error response

```noselect
HTTP 200

{
  "Success": false,
  "Message": "Please enter a valid 9-digit routing number.",
  "Response": null,
  "_links": null
}
```
##### v2 error response

```noselect
HTTP 400

{
  "code": "ValidationError",
  "message": "Validation error(s) present. See embedded errors list for more details.",
  "_embedded": {
    "errors": [
      {
        "code": "InvalidFormat",
        "message": "Routing number must be 9 characters.",
        "path": "/routingNumber"
      }
    ]
  }
}
```

<nav class="pager-nav">
    <a href="./">Back: Overview</a>
    <a href="02-making-requests.html">Next step: Making requests</a>
</nav>
