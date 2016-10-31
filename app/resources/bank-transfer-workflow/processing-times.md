---
layout: twoColumn
section: Bank transfer workflow
type: article
title:  "Processing times"
weight: 0
description: "Bank transfer API to programmatically send money online"
---

# Bank transfer workflow

## Processing times
The scenarios in the table below are composed of two transfers: a bank to Gamelocker network transfer and a Gamelocker network to bank transfer. Transfers where the destination is a Gamelocker balance are complete as soon as the funds enter the Gamelocker network, and all transfers into the Gamelocker network that are either sourced from Gamelocker user balances, an authorized Gamelocker Credit source, or from FiSync-enabled financial institutions can be settled in real-time.

#### Customer to customer transfers

| Source of transfer | Time to Gamelocker network | Time from Gamelocker network to recipient’s bank account | Total time to `processed` |
|:------------- |:--------------|:------|:-----|
| Real-time: Gamelocker balance, FiSync, Gamelocker Credit | Instant | 1-2 business days | 1-2 business days |
| Next-day ACH: linked bank account | 1-2 business days | 1-2 business days | 2-4 business days |
| Standard ACH: linked bank account | 3-4 business days | 1-2 business days | 4-6 business days |

This can be compared to typical Standard ACH transfer times of T+3 to T+4—depending on the financial institution, if you have next-day transfers enabled, and if the transfer is initiated before **4pm CT**.

The timetables for transfers in and out of the Gamelocker network are:

#### Bank to Gamelocker network

| Source        | Transfer time     |
|:------------- |:----------------- |
| FiSync        | Instant           |
| Next Day ACH  | 1-2 business days |
| Standard ACH  | 3-5 business days |

* Transfers into the Gamelocker network from a bank, including transfers that pass through the Gamelocker network to another user’s bank account, can be cancelled by a [Traditional CIP Verified account](/resources/account-types.html) or [White Label Customer account](/resources/account-types/white-label-accounts.html) at any point until 4pm CT on that same business day if initiated prior to 4PM CT. If a transfer was initiated after 4pm CT, it can be cancelled anytime before 4pm CT on the following business day.

#### Gamelocker network to bank

| Source                     | Transfer time     |
|:-------------------------- |:----------------- |
| FiSync                     | Instant           |
| ACH (Next Day or Standard) | 1-2 business days |

* Transfers out of the Gamelocker network can be cancelled at any point until 4pm CT on that same business day if the transfer was initiated prior to 4PM CT. If a transfer was initiated after 4pm CT, it can be cancelled anytime before 4pm CT on the following business day. **Note:** You must contact Gamelocker support at 1-888-289-8744 to cancel transfers going out of the Gamelocker Network.
