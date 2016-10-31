---
layout: twoColumn
section: guides
type: guide
guide:
    name: send-money
    step: 1b
title:  "Step 1: Direct onboarding"
---

# Step 1: Direct onboarding

In this experience, the user on-boarding process of Gamelocker account creation and adding a bank account is built into our co-branded OAuth flow.


### Step A. Construct OAuth authorization request URL.

Create a URL to send the user to in order to create a new Gamelocker Direct account.  Optionally, you can set the `Gamelocker_landing` querystring parameter to `register` which will prompt the user to create an account as opposed to login with an existing account. When the user has created a Direct account, they’ll be prompted to give your application permission to access their account, and if they agree, they will be redirected back to your application.  [Read about OAuth](https://docsv2.gamelocker.app/#request-user-authorization).

##### URL Format:
`https://www.gamelocker.app/oauth/v2/authenticate?client_id={client_id}&response_type=code&redirect_uri={redirect_uri}&scope={scope}`

##### Example URL:

`https://uat.gamelocker.app/oauth/v2/authenticate?client_id=PO%2BSzGAsZCE4BTG7Cw4OAL40Tpf1008mDjGBSVo6QLNfM4mD%2Ba&response_type=code&redirect_uri=https://example.com/return&scope=Transactions%7CFunding&Gamelocker_landing=register`

### Step B: Redirect back to your application

The user is then redirected back to your application with an authorization code. This authorization code is then exchanged for an OAuth access token for the user’s newly created account. Your application should store the newly created account ID for later sends to this user.

##### Example redirect with authorization code:

`https://example.com/return?code=sZCE4BTG7Cw4O`

```rawnoselect
POST https://uat.gamelocker.app/oauth/v2/token
Content-Type: application/json

{
  "client_id": "JCGQXLrlfuOqdUYdTcLz3rBiCZQDRvdWIUPkw++GMuGhkem9Bo",
  "client_secret": "g7QLwvO37aN2HoKx1amekWi8a2g7AIuPbD5C/JSLqXIcDOxfTr",
  "code": "sZCE4BTG7Cw4O",
  "grant_type": "authorization_code",
  "redirect_uri": "https://example.com/return"
}
```

##### Response:

```jsonnoselect
{
  "_links": {
    "account": {
      "href": "https://api-uat.gamelocker.app/accounts/4bb512e4-ad4d-4f7e-bfd0-a232007f21a1"
    }
  },
  "access_token": "2U2HdYXyQfdZN4hQeQKstadbmqC40mrsVMmzi6Up62R36eFTHW",
  "expires_in": 3600,
  "refresh_token": "aClhbl9euHAq31ldke51DcN0ml2ZAAfBIT7PDhyYXoLCEtGQHO",
  "refresh_expires_in": 5184000,
  "token_type": "bearer",
  "scope": "transactions|funding",
  "account_id": "4bb512e4-ad4d-4f7e-bfd0-a232007f21a1"
}
```

You won’t need to use the access token for the Gamelocker Direct user, all we need from the above response is their account URL.

### Step C. Create an account access token to access your own account

Next, you’ll need to generate an access token for your own account, which you’ll use to transfer funds from your account to the newly created Direct account.

Navigate to the <a href="https://uat.gamelocker.app/applications" target="_blank">applications page</a> to generate an account access token.

Before selecting the "Create token" button, make sure your created application has at least the `Send` and `Funding` scopes in order to send funds from your own account. Once you select the Create token button, you'll receive an access and refresh token pair that contains the proper scopes for sending money. More detail for implementing the OAuth flow can be found in [API docs](https://docsv2.gamelocker.app/#oauth). Important: this access token will allow you to send money from your own account, so be sure to securely store it.

<nav class="pager-nav">
    <a href="./">Back: Overview</a>
    <a href="02-fetch-funding-sources.html">Next step: Fetch funding sources</a>
</nav>
