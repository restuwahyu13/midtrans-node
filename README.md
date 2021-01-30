# Midtrans Node

[![Build Status](https://travis-ci.org/restuwahyu13/streambox-collection.svg?branch=main)](https://travis-ci.org/restuwahyu13/streambox-collection) [![Coverage Status](https://coveralls.io/repos/github/restuwahyu13/streambox-collection/badge.svg?branch=main)](https://coveralls.io/github/restuwahyu13/streambox-collection?branch=main) [![npm version](https://badge.fury.io/js/stream-collection.svg)](https://badge.fury.io/js/stream-collection) ![node-current](https://img.shields.io/node/v/stream-collection?style=flat-square) ![npm](https://img.shields.io/npm/dm/stream-collection) ![npm bundle size](https://img.shields.io/bundlephobia/min/stream-collection) ![npm bundle size (version)](https://img.shields.io/bundlephobia/minzip/stream-collection/1.0.1-rc1) ![Snyk Vulnerabilities for GitHub Repo](https://img.shields.io/snyk/vulnerabilities/github/restuwahyu13/stream-collection) [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](https://github.com/restuwahyu13/stream-collection/blob/main/CONTRIBUTING.md)

- [Installation](#Installation)
- [API Documentation](#API-Documentation)
    + [Core API Documentation]()
    + [Iris API Documentation]()
    + [Snap API Documentation]()
- [API Reference](#API-Reference)
  * [Core API Services](#Card-Services)
    + [charge]()
    + [capture]()
    + [cardRegister]()
    + [cardToken]()
    + [cardPointInquiry]()
  * [Iris API Services](#Iris-Services)
    + [ping]()
    + [createBeneficiaries]()
    + [updateBeneficiaries]()
    + [getBeneficiaries]()
    + [createPayouts]()
    + [approvePayouts]()
    + [rejectPayouts]()
    + [getPayoutDetails]()
    + [getTransactionHistory]()
    + [getTopupChannels]()
    + [getBalance]()
    + [getFacilitatorBankAccounts]()
    + [getFacilitatorBalance]()
    + [getBeneficiaryBanks]()
    + [validateBankAccount]()
  * [Snap API Services](#Snap-Services)
    + [createTransaction]()
    + [createTransactionToken]()
    + [createTransactionRedirectUrl]()
  * [Transaction API Service](#Transaction-Service)
    + [status]()
    + [statusb2b]()
    + [approve]()
    + [deny]()
    + [cancel]()
    + [expire]()
    + [refund]()
    + [refundDirect]()
    + [notification]()
- [Example Usage]()
- [Testing](#Testing)
- [Bugs](#Bugs)
- [Contributing](#Contributing)
- [License](#License)

<!-- tocstop -->

## Installation

```bash
npm install @midtrans/node -S or yarn add @midtrans/node -S
```

## API Documentation

- #### Core API Documentation
  
  follow this link more about information official [Core Midtrans API Reference]()
  
- #### Iris API Documentation

  follow this link more about information official [Iris Midtrans API Reference]()

- #### Snap API Documentation

  follow this link more about information official [Snap Midtrans API Reference]()

## API Reference

### Core API Services

  + #### charge( parameter: object ) : Promise

  | Method | Request Method | Description                                                            |
  | ------ | -------------- | ---------------------------------------------------------------------- |
  | charge | *POST*         | Create transaction with various available payment methods and features |


  + #### capture( parameter: object ) : Promise

  | Method  | Request Method | Description                                        |
  | ------- | -------------- | -------------------------------------------------- |
  | capture | *POST*         | Capture an authorized transaction for card payment |

  + #### cardRegister( parameter: object ) : Promise

  | Method       | Request Method | Description                                                                                |
  | ------------ | -------------- | ------------------------------------------------------------------------------------------ |
  | cardRegister | *GET*          | Register card information (card number and expiry) to be used for two clicks and one click |

  + #### cardToken( parameter: object ) : Promise

  | Method    | Request Method | Description                                           |
  | --------- | -------------- | ----------------------------------------------------- |
  | cardToken | *GET*          | Tokenize Credit Card information before being charged |

  + #### cardPointInquiry( tokenId: string ) : Promise

  | Method           | Request Method | Description                                              |
  | ---------------- | -------------- | -------------------------------------------------------- |
  | cardPointInquiry | *GET*          | Get the point balance of the card in denomination amount |

### Iris API Services

  + #### ping(): Promise

  | Method | Request Method | Description                                 |
  | ------ | -------------- | ------------------------------------------- |
  | ping   | *GET*          | Returns pong message for monitoring purpose |

  + #### createBeneficiaries( parameter: object ): Promise 

  | Method              | Request Method | Description                                                                              |
  | ------------------- | -------------- | ---------------------------------------------------------------------------------------- |
  | createBeneficiaries | *POST*         | create a new beneficiary information for quick access on the payout page in Iris Portal. |

  + #### updateBeneficiaries( aliasName: string, parameter: object ): Promise  

  | Method              | Request Method | Description                                                 |
  | ------------------- | -------------- | ----------------------------------------------------------- |
  | updateBeneficiaries | *PATCH*        | Update an existing beneficiary identified by its alias_name |

  + #### getBeneficiaries(): Promise 

  | Method           | Request Method | Description                                          |
  | ---------------- | -------------- | ---------------------------------------------------- |
  | getBeneficiaries | *GET*          | Fetch list of all beneficiaries saved in Iris Portal |

  + #### createPayouts( parameter: object ): Promise

  | Method        | Request Method | Description                                                                             |
  | ------------- | -------------- | --------------------------------------------------------------------------------------- |
  | createPayouts | *POST*         | Creator to create a payout. It can be used for single payout and also multiple payouts. |

  + #### approvePayouts( parameter: object ): Promise

  | Method         | Request Method | Description                                  |
  | -------------- | -------------- | -------------------------------------------- |
  | approvePayouts | *POST*         | Apporver to approve multiple payout request. |

  + #### rejectPayouts( parameter: object ): Promise

  | Method        | Request Method | Description                                 |
  | ------------- | -------------- | ------------------------------------------- |
  | rejectPayouts | *POST*         | Apporver to reject multiple payout request. |

  + #### getPayoutDetails( referenceNo: string ): Promise

  | Method           | Request Method | Description                    |
  | ---------------- | -------------- | ------------------------------ |
  | getPayoutDetails | *GET*          | Get details of a single payout |

  + #### getTransactionHistory( parameter: string): Promise

  | Method                | Request Method | Description                                |
  | --------------------- | -------------- | ------------------------------------------ |
  | getTransactionHistory | *GET*          | List all transactions history for a month. |

  + #### getTopupChannels(): Promise

  | Method           | Request Method | Description                                               |
  | ---------------- | -------------- | --------------------------------------------------------- |
  | getTopupChannels | *GET*          | Provide top up information channel for Aggregator Partner |

  + #### getBalance(): Promise

  | Method     | Request Method | Description         |
  | ---------- | -------------- | ------------------- |
  | getBalance | *GET*          | get current balance |

  + #### getFacilitatorBankAccounts(): Promise

  | Method                     | Request Method | Description                                                   |
  | -------------------------- | -------------- | ------------------------------------------------------------- |
  | getFacilitatorBankAccounts | *GET*          | Show list of registered bank accounts for facilitator partner |

  + #### getFacilitatorBalance( bankAccountId: string ): Promise

  | Method                | Request Method | Description                                                      |
  | --------------------- | -------------- | ---------------------------------------------------------------- |
  | getFacilitatorBalance | *GET*          | Get current balance information of your registered bank account. |

  + #### getBeneficiaryBanks(): Promise

  | Method              | Request Method | Description                           |
  | ------------------- | -------------- | ------------------------------------- |
  | getBeneficiaryBanks | *GET*          | Show list of supported banks in IRIS. |

  + #### validateBankAccount( parameter: object ): Promise

  | Method              | Request Method | Description                                                        |
  | ------------------- | -------------- | ------------------------------------------------------------------ |
  | validateBankAccount | *GET*          | Check if an account is valid, if valid return account information. |

### Snap API Services

  + #### createTransaction( parameter: object ): Promise

  | Method            | Params Type | Request Method | Description |
  | ----------------- | ----------- | -------------- | ----------- |
  | createTransaction | *object*    | *POST*         |             |

  + #### createTransactionToken(): Promise

  | Method                 | Params Type | Request Method | Description                                    |
  | ---------------------- | ----------- | -------------- | ---------------------------------------------- |
  | createTransactionToken | *object*    | *undefined*    | Wrapper function that call `createTransaction` |

  + #### createTransactionRedirectUrl(): Promise

  | Method                       | Params Type | Request Method | Description                                    |
  | ---------------------------- | ----------- | -------------- | ---------------------------------------------- |
  | createTransactionRedirectUrl | *object*    | *undefined*    | Wrapper function that call `createTransaction` |

### Transaction API Services

  + #### status( transactionId: string ): Promise

  | Method | Params Type | Request Method | Description                                                                     |
  | ------ | ----------- | -------------- | ------------------------------------------------------------------------------- |
  | status | *object*    | *GET*          | Get information status of a transaction with certain order_id or transaction_id |

  + #### statusb2b( transactionId: string ): Promise

  | Method    | Params Type | Request Method | Description                                                                                       |
  | --------- | ----------- | -------------- | ------------------------------------------------------------------------------------------------- |
  | statusb2b | *object*    | *GET*          | Get information status of multiple B2B transactions related to certain order_id or transaction_id |

  + #### approve( transactionId: string ): Promise

  | Method  | Request Method | Description                                                                                                           |
  | ------- | -------------- | --------------------------------------------------------------------------------------------------------------------- |
  | approve | *POST*         | Approve a transaction with certain order_id or transaction_id which gets challenge status from Fraud Detection System |

  + #### deny( transactionId: string ): Promise

  | Method | Request Method | Description                                                                                                        |
  | ------ | -------------- | ------------------------------------------------------------------------------------------------------------------ |
  | deny   | *POST*         | Deny a transaction with certain order_id or transaction_id which gets challenge status from Fraud Detection System |

  + #### cancel( transactionId: string ): Promise

  | Method | Params Type | Request Method | Description                                                                            |
  | ------ | ----------- | -------------- | -------------------------------------------------------------------------------------- |
  | cancel | *tokenI*d   | *POST*         | Cancel a transaction with certain order_id or transaction_id before settlement process |

  + #### expire( transactionId: string ): Promise

  | Method | Request Method | Description     |                                                  |
  | ------ | -------------- | --------------- | ------------------------------------------------ |
  | expire | *POST*         | Update order_id | transaction_id with pending status to be expired |
  
  + #### refund( transactionId: string, parameter?: object): Promise

  | Method | Request Method | Description                                                           |
  | ------ | -------------- | --------------------------------------------------------------------- |
  | refund | *POST*         | Update order_id or transaction_id with settlement status to be refund |

  + #### refundDirect( transactionId: string, parameter?: object): Promise

  | Method       | Request Method | Description                                                                                                    |
  | ------------ | -------------- | -------------------------------------------------------------------------------------------------------------- |
  | refundDirect | *POST*         | Attempt to send refund to bank or payment provider and update the transaction status to refund if it succeeded |

  + #### notification( notification: object ): Promise

  | Method       | Params Type | Request Method | Description                                                                                              | 
  | ------------ | ----------- | -------------- | -------------------------------------------------------------------------------------------------------- |
  | notification | *object*    | *undefined*    | additional mechanism we provide to verify the content and the origin of the notification is to challenge |