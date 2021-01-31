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
  
  follow this link for more related information [Core Midtrans API Reference](https://api-docs.midtrans.com/) official
  
- #### Iris API Documentation

  follow this link for more related information [Iris Midtrans API Reference](https://snap-docs.midtrans.com/) official

- #### Snap API Documentation

  follow this link for more related information [Snap Midtrans API Reference](https://iris-docs.midtrans.com/) official

## API Reference

### Core API Services

  - #### charge( parameter: object ) : Promise
  
    | Method | Request | Description                                                            | 
    | ------ | ------- | ---------------------------------------------------------------------- |
    | charge | *POST*  | Create transaction with various available payment methods and features |
  
    + ##### Example Usage Using CommonJS
  
    ```javascript
       const { MidtransClient } = require('@midtrans/node')
       const { v4: uuidv4 } = require('uuid')
       
       const core = new MidtransClient.CoreApi({
         isProduction: process.env.DEVELOPMENT,
         serverKey: process.env.SERVER_KEY,
         clientKey: process.env.CLIENT_KEY
       })
        
       core.charge({
        	payment_type: 'bank_transfer',
          bank_transfer: { bank: 'bca' },
          transaction_details: {
            order_id: uuidv4(),
            gross_amount: 100000
          },
          item_details: [
            {
             id: uuidv4(),
             name: 'ayam bakar sambal balado'
             quantity: 2
             price: 25000
            },
            {
             id: uuidv4(),
             name: 'sop iga bakar daging lunak'
             quantity: 1
             price: 30000
            },
            {
             id: uuidv4(),
             name: 'just alpuckat'
             quantity: 2
             price: 10000
            }
          ],
          customer_details: {
          	first_name: 'restu wahyu',
            last_name: ' saputra',
            email: 'restuwahyu13@zetmail.com',
            phone: '087820154350',
            billing_address:  {
            	address: 'jl.sibuta gua hantu no.120',
              city: 'Depok',
              postal_code: '16436'
            }
          }
       })
       .then(console.log)
       .catch(console.error)
    ```

    + ##### Example Usage Using ES6
  
    ```javascript
       import { MidtransClient } from '@midtrans/node'
       import { v4 as uuidv4 } from 'uuid'
       
       const core = new MidtransClient.CoreApi({
         isProduction: process.env.DEVELOPMENT,
         serverKey: process.env.SERVER_KEY,
         clientKey: process.env.CLIENT_KEY
       })
        
       core.charge({
        	payment_type: 'bank_transfer',
          bank_transfer: { bank: 'bca' },
          transaction_details: {
            order_id: uuidv4(),
            gross_amount: 100000
          },
          item_details: [
            {
             id: uuidv4(),
             name: 'ayam bakar sambal balado'
             quantity: 2
             price: 25000
            },
            {
             id: uuidv4(),
             name: 'sop iga bakar daging lunak'
             quantity: 1
             price: 30000
            },
            {
             id: uuidv4(),
             name: 'just alpuckat'
             quantity: 2
             price: 20000
            }
          ],
          customer_details: {
          	first_name: 'restu wahyu',
            last_name: ' saputra',
            email: 'restuwahyu13@zetmail.com',
            phone: '087820154350',
            billing_address:  {
            	address: 'jl.sibuta gua hantu no.120',
              city: 'Depok',
              postal_code: '16436'
            }
          }
       })
       .then(console.log)
       .catch(console.error)
    ```

  + #### capture( parameter: object ) : Promise

    | Method  | Request | Description                                        |
    | ------- | ------- | -------------------------------------------------- |
    | capture | *POST*  | Capture an authorized transaction for card payment |

    + ##### Example Usage Using CommonJS
  
    ```javascript
       const { MidtransClient } = require('@midtrans/node')
               
       const core = new MidtransClient.CoreApi({
         isProduction: process.env.DEVELOPMENT,
         serverKey: process.env.SERVER_KEY,
         clientKey: process.env.CLIENT_KEY
       })
        
       core.capture({
         transaction_id: "be4f3e44-d6ee-4355-8c64-c1d1dc7f4590",
         gross_amount: 100000
       })
       .then(console.log)
       .catch(console.error)
    ```

    + ##### Example Usage Using ES6
  
    ```javascript
       import { MidtransClient } from '@midtrans/node'
       
       const core = new MidtransClient.CoreApi({
         isProduction: process.env.DEVELOPMENT,
         serverKey: process.env.SERVER_KEY,
         clientKey: process.env.CLIENT_KEY
       })
        
       core.capture({
         transaction_id: "be4f3e44-d6ee-4355-8c64-c1d1dc7f4590",
         gross_amount: 100000
       })
       .then(console.log)
       .catch(console.error)
    ```

  + #### cardRegister( parameter: object ) : Promise

    | Method       | Request | Description                                                                                | 
    | ------------ | ------- | ------------------------------------------------------------------------------------------ |
    | cardRegister | *GET*   | Register card information (card number and expiry) to be used for two clicks and one click |

    + ##### Example Usage Using CommonJS
  
    ```javascript
       const { MidtransClient } = require('@midtrans/node')
       
       const core = new MidtransClient.CoreApi({
         isProduction: process.env.DEVELOPMENT,
         serverKey: process.env.SERVER_KEY,
         clientKey: process.env.CLIENT_KEY
       })
        
       core.cardRegister({
			   card_number: '5421813858532415',
			   card_exp_month: '10',
			   card_exp_year: '2024',
			   card_cvv: '426',
			   client_key: core.apiConfig.get().clientKey
		   })
       .then(console.log)
       .catch(console.error)
    ```

    + ##### Example Usage Using ES6
  
    ```javascript
       import { MidtransClient } from '@midtrans/node'
       
       const core = new MidtransClient.CoreApi({
         isProduction: process.env.DEVELOPMENT,
         serverKey: process.env.SERVER_KEY,
         clientKey: process.env.CLIENT_KEY
       })
        
       core.cardRegister({
			   card_number: '5421813858532415',
			   card_exp_month: '10',
			   card_exp_year: '2024',
			   card_cvv: '426',
			   client_key: core.apiConfig.get().clientKey
		   })
       .then(console.log)
       .catch(console.error)
    ```

  + #### cardToken( parameter: object ) : Promise

    | Method    | Request | Description                                           |
    | --------- | ------- | ----------------------------------------------------- |
    | cardToken | *GET*   | Tokenize Credit Card information before being charged |

    + ##### Example Usage Using CommonJS
  
    ```javascript
       const { MidtransClient } = require('@midtrans/node')
       
       const core = new MidtransClient.CoreApi({
         isProduction: process.env.DEVELOPMENT,
         serverKey: process.env.SERVER_KEY,
         clientKey: process.env.CLIENT_KEY
       })
        
       core.cardToken({
			   card_number: '5421813858532415',
			   card_exp_month: '10',
			   card_exp_year: '2024',
			   card_cvv: '426',
			   client_key: core.apiConfig.get().clientKey
		   })
       .then(console.log)
       .catch(console.error)
    ```

    + ##### Example Usage Using ES6
  
    ```javascript
       import { MidtransClient } from '@midtrans/node'
       
       const core = new MidtransClient.CoreApi({
         isProduction: process.env.DEVELOPMENT,
         serverKey: process.env.SERVER_KEY,
         clientKey: process.env.CLIENT_KEY
       })
        
       core.cardToken({
			   card_number: '5421813858532415',
			   card_exp_month: '10',
			   card_exp_year: '2024',
			   card_cvv: '426',
			   client_key: core.apiConfig.get().clientKey
		   })
       .then(console.log)
       .catch(console.error)
    ```

  + #### cardPointInquiry( tokenId: string ) : Promise

    | Method           | Request | Description                                              |
    | ---------------- | ------- | -------------------------------------------------------- |
    | cardPointInquiry | *GET*   | Get the point balance of the card in denomination amount |

    + ##### Example Usage Using CommonJS
  
    ```javascript
       const { MidtransClient } = require('@midtrans/node')
       
       const core = new MidtransClient.CoreApi({
         isProduction: process.env.DEVELOPMENT,
         serverKey: process.env.SERVER_KEY,
         clientKey: process.env.CLIENT_KEY
       })
        
       core.cardPointInquiry("526422-4659-80f25158-71dd-4a87-aad2-3c37689e6bfd")
       .then(console.log)
       .catch(console.error)
    ```

    + ##### Example Usage Using ES6
  
    ```javascript
       import { MidtransClient } from '@midtrans/node'
       
       const core = new MidtransClient.CoreApi({
         isProduction: process.env.DEVELOPMENT,
         serverKey: process.env.SERVER_KEY,
         clientKey: process.env.CLIENT_KEY
       })
        
       core.cardPointInquiry("526422-4659-80f25158-71dd-4a87-aad2-3c37689e6bfd")
       .then(console.log)
       .catch(console.error)
    ```

### Iris API Services

  + #### ping(): Promise

    | Method | Request | Description                                 |
    | ------ | ------- | ------------------------------------------- |
    | ping   | *GET*   | Returns pong message for monitoring purpose |

    + ##### Example Usage Using CommonJS
  
    ```javascript
       const { MidtransClient } = require('@midtrans/node')
       
       const iris = new MidtransClient.Iris({
         isProduction: process.env.DEVELOPMENT,
         serverKey: process.env.SERVER_KEY,
         clientKey: process.env.CLIENT_KEY
       })
        
       iris.ping()
       .then(console.log)
       .catch(console.error)
    ```

    + ##### Example Usage Using ES6
  
    ```javascript
       import { MidtransClient } from '@midtrans/node'
       
       const iris = new MidtransClient.Iris({
         isProduction: process.env.DEVELOPMENT,
         serverKey: process.env.SERVER_KEY,
         clientKey: process.env.CLIENT_KEY
       })
        
       iris.ping()
       .then(console.log)
       .catch(console.error)
    ```

  + #### createBeneficiaries( parameter: object ): Promise 

    | Method              | Request | Description                                                                              |
    | ------------------- | ------- | ---------------------------------------------------------------------------------------- |
    | createBeneficiaries | *POST*  | create a new beneficiary information for quick access on the payout page in Iris Portal. |

    + ##### Example Usage Using CommonJS
  
    ```javascript
       const { MidtransClient } = require('@midtrans/node')
       
       const iris = new MidtransClient.Iris({
         isProduction: process.env.DEVELOPMENT,
         serverKey: process.env.SERVER_KEY,
         clientKey: process.env.CLIENT_KEY
       })
        
       iris.createBeneficiaries({
				name: 'Restu Wahyu Saputra',
				account: '5432198760',
				bank: 'bca',
				alias_name: 'restu',
				email: 'restuwahyu13@zetmail.com'
			})
       .then(console.log)
       .catch(console.error)
    ```

    + ##### Example Usage Using ES6
  
    ```javascript
       import { MidtransClient } from '@midtrans/node'
       
       const iris = new MidtransClient.Iris({
         isProduction: process.env.DEVELOPMENT,
         serverKey: process.env.SERVER_KEY,
         clientKey: process.env.CLIENT_KEY
       })
        
       iris.createBeneficiaries({
				 name: 'Restu Wahyu Saputra',
				 account: '5432198760',
				 bank: 'bca',
				 alias_name: 'restu',
				 email: 'restuwahyu13@zetmail.com'
			 })
        .then(console.log)
        .catch(console.error)
    ```

  + #### updateBeneficiaries( aliasName: string, parameter: object ): Promise  

    | Method              | Request | Description                                                 |
    | ------------------- | ------- | ----------------------------------------------------------- |
    | updateBeneficiaries | *PATCH* | Update an existing beneficiary identified by its alias_name |

    + ##### Example Usage Using CommonJS
  
    ```javascript
       const { MidtransClient } = require('@midtrans/node')
       
       const iris = new MidtransClient.Iris({
         isProduction: process.env.DEVELOPMENT,
         serverKey: process.env.SERVER_KEY,
         clientKey: process.env.CLIENT_KEY
       })
        
       iris.updateBeneficiaries('restu',{
				name: 'Restu Wahyu Saputra',
				account: '5432198760',
				bank: 'bca',
				alias_name: 'restu',
				email: 'restuwahyu13@zetmail.com'
			})
       .then(console.log)
       .catch(console.error)
    ```

    + ##### Example Usage Using ES6
  
    ```javascript
       import { MidtransClient } from '@midtrans/node'
       
       const iris = new MidtransClient.Iris({
         isProduction: process.env.DEVELOPMENT,
         serverKey: process.env.SERVER_KEY,
         clientKey: process.env.CLIENT_KEY
       })
        
       iris.updateBeneficiaries('restu',{
				 name: 'Restu Wahyu Saputra',
				 account: '5432198760',
				 bank: 'bca',
				 alias_name: 'restu',
				 email: 'restuwahyu13@zetmail.com'
			 })
        .then(console.log)
        .catch(console.error)
    ```

  + #### getBeneficiaries(): Promise 

    | Method           | Request | Description                                          |
    | ---------------- | ------- | ---------------------------------------------------- |
    | getBeneficiaries | *GET*   | Fetch list of all beneficiaries saved in Iris Portal |

    + ##### Example Usage Using CommonJS
  
    ```javascript
       const { MidtransClient } = require('@midtrans/node')
       
       const iris = new MidtransClient.Iris({
         isProduction: process.env.DEVELOPMENT,
         serverKey: process.env.SERVER_KEY,
         clientKey: process.env.CLIENT_KEY
       })
        
       iris.getBeneficiaries()
       .then(console.log)
       .catch(console.error)
    ```

    + ##### Example Usage Using ES6
  
    ```javascript
       import { MidtransClient } from '@midtrans/node'
       
       const iris = new MidtransClient.Iris({
         isProduction: process.env.DEVELOPMENT,
         serverKey: process.env.SERVER_KEY,
         clientKey: process.env.CLIENT_KEY
       })
        
       iris.getBeneficiaries()
       .then(console.log)
       .catch(console.error)
    ```

  + #### createPayouts( parameter: object ): Promise

    | Method        | Request | Description                                                                             |
    | ------------- | ------- | --------------------------------------------------------------------------------------- |
    | createPayouts | *POST*  | Creator to create a payout. It can be used for single payout and also multiple payouts. |

    + ##### Example Usage Using CommonJS
  
    ```javascript
       const { MidtransClient } = require('@midtrans/node')
       
       const iris = new MidtransClient.Iris({
         isProduction: process.env.DEVELOPMENT,
         serverKey: process.env.SERVER_KEY,
         clientKey: process.env.CLIENT_KEY
       })
        
       iris.createPayouts({
        payouts: [
           {
             beneficiary_name: 'Restu Wahyu Saputra',
             beneficiary_account: '5432198760',
             beneficiary_bank: 'bca',
             beneficiary_email: 'restuwahyu13@zetmail.com',
             amount: '100000',
             notes: 'Payout 31 January 2021'
           }
         ]
       })
       .then(console.log)
       .catch(console.error)
    ```

    + ##### Example Usage Using ES6
  
    ```javascript
       import { MidtransClient } from '@midtrans/node'
       
       const iris = new MidtransClient.Iris({
         isProduction: process.env.DEVELOPMENT,
         serverKey: process.env.SERVER_KEY,
         clientKey: process.env.CLIENT_KEY
       })
        
       iris.createPayouts({
        payouts: [
           {
             beneficiary_name: 'Restu Wahyu Saputra',
             beneficiary_account: '5432198760',
             beneficiary_bank: 'bca',
             beneficiary_email: 'restuwahyu13@zetmail.com',
             amount: '100000',
             notes: 'Payout 31 January 2021'
           }
         ]
       })
       .then(console.log)
       .catch(console.error)
    ```

  + #### approvePayouts( parameter: object ): Promise

    | Method         | Request | Description                                  |
    | -------------- | ------- | -------------------------------------------- |
    | approvePayouts | *POST*  | Apporver to approve multiple payout request. |

    + ##### Example Usage Using CommonJS
  
    ```javascript
       const { MidtransClient } = require('@midtrans/node')
       
       const iris = new MidtransClient.Iris({
         isProduction: process.env.DEVELOPMENT,
         serverKey: process.env.SERVER_KEY,
         clientKey: process.env.CLIENT_KEY
       })
        
       iris.approvePayouts({
				reference_nos: ['20543502291'],
				otp: '335163'
			})
       .then(console.log)
       .catch(console.error)
    ```

    + ##### Example Usage Using ES6
  
    ```javascript
       import { MidtransClient } from '@midtrans/node'
       
       const iris = new MidtransClient.Iris({
         isProduction: process.env.DEVELOPMENT,
         serverKey: process.env.SERVER_KEY,
         clientKey: process.env.CLIENT_KEY
       })
        
       iris.approvePayouts({
				reference_nos: ['20543502291'],
				otp: '335163'
			})
       .then(console.log)
       .catch(console.error)
    ```

  + #### rejectPayouts( parameter: object ): Promise

    | Method        | Request | Description                                 |
    | ------------- | ------- | ------------------------------------------- |
    | rejectPayouts | *POST*  | Apporver to reject multiple payout request. |

    + ##### Example Usage Using CommonJS
  
    ```javascript
       const { MidtransClient } = require('@midtrans/node')
       
       const iris = new MidtransClient.Iris({
         isProduction: process.env.DEVELOPMENT,
         serverKey: process.env.SERVER_KEY,
         clientKey: process.env.CLIENT_KEY
       })
        
       iris.rejectPayouts({
			  reference_nos: ['eyad5swd9b026c5kmr'],
			  reject_reason: 'Reason to reject payouts'
		  })
       .then(console.log)
       .catch(console.error)
    ```

    + ##### Example Usage Using ES6
  
    ```javascript
       import { MidtransClient } from '@midtrans/node'
       
       const iris = new MidtransClient.Iris({
         isProduction: process.env.DEVELOPMENT,
         serverKey: process.env.SERVER_KEY,
         clientKey: process.env.CLIENT_KEY
       })
        
       iris.rejectPayouts({
			  reference_nos: ['eyad5swd9b026c5kmr'],
			  reject_reason: 'Reason to reject payouts'
		  })
       .then(console.log)
       .catch(console.error)
    ```

  + #### getPayoutDetails( referenceNo: string ): Promise

    | Method           | Request | Description                    |
    | ---------------- | ------- | ------------------------------ |
    | getPayoutDetails | *GET*   | Get details of a single payout |

    + ##### Example Usage Using CommonJS
  
    ```javascript
       const { MidtransClient } = require('@midtrans/node')
       
       const iris = new MidtransClient.Iris({
         isProduction: process.env.DEVELOPMENT,
         serverKey: process.env.SERVER_KEY,
         clientKey: process.env.CLIENT_KEY
       })
        
       iris.rejectPayouts({
			  reference_nos: ['eyad5swd9b026c5kmr'],
			  reject_reason: 'Reason to reject payouts'
		  })
       .then(console.log)
       .catch(console.error)
    ```

    + ##### Example Usage Using ES6
  
    ```javascript
       import { MidtransClient } from '@midtrans/node'
       
       const iris = new MidtransClient.Iris({
         isProduction: process.env.DEVELOPMENT,
         serverKey: process.env.SERVER_KEY,
         clientKey: process.env.CLIENT_KEY
       })
        
       iris.rejectPayouts({
			  reference_nos: ['eyad5swd9b026c5kmr'],
			  reject_reason: 'Reason to reject payouts'
		  })
       .then(console.log)
       .catch(console.error)
    ```

  + #### getTransactionHistory( parameter: string): Promise

    | Method                | Request | Description                                |
    | --------------------- | ------- | ------------------------------------------ |
    | getTransactionHistory | *GET*   | List all transactions history for a month. |

    + ##### Example Usage Using CommonJS
  
    ```javascript
       const { MidtransClient } = require('@midtrans/node')
       
       const iris = new MidtransClient.Iris({
         isProduction: process.env.DEVELOPMENT,
         serverKey: process.env.SERVER_KEY,
         clientKey: process.env.CLIENT_KEY
       })
        
       iris.getTransactionHistory({ from_date: "2020-11-01", to_date: "2020-12-28" })
       .then(console.log)
       .catch(console.error)
    ```

    + ##### Example Usage Using ES6
  
    ```javascript
       import { MidtransClient } from '@midtrans/node'
       
       const iris = new MidtransClient.Iris({
         isProduction: process.env.DEVELOPMENT,
         serverKey: process.env.SERVER_KEY,
         clientKey: process.env.CLIENT_KEY
       })
        
       iris.getTransactionHistory({ from_date: "2020-11-01", to_date: "2020-12-28" })
       .then(console.log)
       .catch(console.error)
    ```

  + #### getTopupChannels(): Promise

    | Method           | Request | Description                                               |
    | ---------------- | ------- | --------------------------------------------------------- |
    | getTopupChannels | *GET*   | Provide top up information channel for Aggregator Partner |

    + ##### Example Usage Using CommonJS
  
    ```javascript
       const { MidtransClient } = require('@midtrans/node')
       
       const iris = new MidtransClient.Iris({
         isProduction: process.env.DEVELOPMENT,
         serverKey: process.env.SERVER_KEY,
         clientKey: process.env.CLIENT_KEY
       })
        
       iris.getTopupChannels()
       .then(console.log)
       .catch(console.error)
    ```

    + ##### Example Usage Using ES6
  
    ```javascript
       import { MidtransClient } from '@midtrans/node'
       
       const iris = new MidtransClient.Iris({
         isProduction: process.env.DEVELOPMENT,
         serverKey: process.env.SERVER_KEY,
         clientKey: process.env.CLIENT_KEY
       })
        
       iris.getTopupChannels()
       .then(console.log)
       .catch(console.error)
    ```

  + #### getBalance(): Promise

    | Method     | Request | Description         |
    | ---------- | ------- | ------------------- |
    | getBalance | *GET*   | get current balance |

    + ##### Example Usage Using CommonJS
  
    ```javascript
       const { MidtransClient } = require('@midtrans/node')
       
       const iris = new MidtransClient.Iris({
         isProduction: process.env.DEVELOPMENT,
         serverKey: process.env.SERVER_KEY,
         clientKey: process.env.CLIENT_KEY
       })
        
       iris.getBalance()
       .then(console.log)
       .catch(console.error)
    ```

    + ##### Example Usage Using ES6
  
    ```javascript
       import { MidtransClient } from '@midtrans/node'
       
       const iris = new MidtransClient.Iris({
         isProduction: process.env.DEVELOPMENT,
         serverKey: process.env.SERVER_KEY,
         clientKey: process.env.CLIENT_KEY
       })
        
       iris.getBalance()
       .then(console.log)
       .catch(console.error)
    ```

  + #### getFacilitatorBankAccounts(): Promise

    | Method                     | Request | Description                                                   |
    | -------------------------- | ------- | ------------------------------------------------------------- |
    | getFacilitatorBankAccounts | *GET*   | Show list of registered bank accounts for facilitator partner |

    + ##### Example Usage Using CommonJS
  
    ```javascript
       const { MidtransClient } = require('@midtrans/node')
       
       const iris = new MidtransClient.Iris({
         isProduction: process.env.DEVELOPMENT,
         serverKey: process.env.SERVER_KEY,
         clientKey: process.env.CLIENT_KEY
       })
        
       iris.getFacilitatorBankAccounts()
       .then(console.log)
       .catch(console.error)
    ```

    + ##### Example Usage Using ES6
  
    ```javascript
       import { MidtransClient } from '@midtrans/node'
       
       const iris = new MidtransClient.Iris({
         isProduction: process.env.DEVELOPMENT,
         serverKey: process.env.SERVER_KEY,
         clientKey: process.env.CLIENT_KEY
       })
        
       iris.getFacilitatorBankAccounts()
       .then(console.log)
       .catch(console.error)
    ```

  + #### getFacilitatorBalance( bankAccountId: string ): Promise

    | Method                | Request | Description                                                      |
    | --------------------- | ------- | ---------------------------------------------------------------- |
    | getFacilitatorBalance | *GET*   | Get current balance information of your registered bank account. |

    + ##### Example Usage Using CommonJS
  
    ```javascript
       const { MidtransClient } = require('@midtrans/node')
       
       const iris = new MidtransClient.Iris({
         isProduction: process.env.DEVELOPMENT,
         serverKey: process.env.SERVER_KEY,
         clientKey: process.env.CLIENT_KEY
       })
        
       iris.getFacilitatorBalance('mandiri38fd1f0e')
       .then(console.log)
       .catch(console.error)
    ```

    + ##### Example Usage Using ES6
  
    ```javascript
       import { MidtransClient } from '@midtrans/node'
       
       const iris = new MidtransClient.Iris({
         isProduction: process.env.DEVELOPMENT,
         serverKey: process.env.SERVER_KEY,
         clientKey: process.env.CLIENT_KEY
       })
        
       iris.getFacilitatorBalance('mandiri38fd1f0e')
       .then(console.log)
       .catch(console.error)
    ```

  + #### getBeneficiaryBanks(): Promise

    | Method              | Request | Description                           |
    | ------------------- | ------- | ------------------------------------- |
    | getBeneficiaryBanks | *GET*   | Show list of supported banks in IRIS. |

    + ##### Example Usage Using CommonJS
  
    ```javascript
       const { MidtransClient } = require('@midtrans/node')
       
       const iris = new MidtransClient.Iris({
         isProduction: process.env.DEVELOPMENT,
         serverKey: process.env.SERVER_KEY,
         clientKey: process.env.CLIENT_KEY
       })
        
       iris.getBeneficiaryBanks()
       .then(console.log)
       .catch(console.error)
    ```

    + ##### Example Usage Using ES6
  
    ```javascript
       import { MidtransClient } from '@midtrans/node'
       
       const iris = new MidtransClient.Iris({
         isProduction: process.env.DEVELOPMENT,
         serverKey: process.env.SERVER_KEY,
         clientKey: process.env.CLIENT_KEY
       })
        
       iris.getBeneficiaryBanks()
       .then(console.log)
       .catch(console.error)
    ```

  + #### validateBankAccount( parameter: object ): Promise

    | Method              | Request | Description                                                        |
    | ------------------- | ------- | ------------------------------------------------------------------ |
    | validateBankAccount | *GET*   | Check if an account is valid, if valid return account information. |

    + ##### Example Usage Using CommonJS
  
    ```javascript
       const { MidtransClient } = require('@midtrans/node')
       
       const iris = new MidtransClient.Iris({
         isProduction: process.env.DEVELOPMENT,
         serverKey: process.env.SERVER_KEY,
         clientKey: process.env.CLIENT_KEY
       })
        
       iris.validateBankAccount({ bank: 'danamon', account: '000001137298' )
       .then(console.log)
       .catch(console.error)
    ```

    + ##### Example Usage Using ES6
  
    ```javascript
       import { MidtransClient } from '@midtrans/node'
       
       const iris = new MidtransClient.Iris({
         isProduction: process.env.DEVELOPMENT,
         serverKey: process.env.SERVER_KEY,
         clientKey: process.env.CLIENT_KEY
       })
        
       iris.validateBankAccount({ bank: 'danamon', account: '000001137298' )
       .then(console.log)
       .catch(console.error)
    ```

### Snap API Services

  + #### createTransaction( parameter: object ): Promise

    | Method            | Request | Description                                                       | 
    | ----------------- | ------- | ----------------------------------------------------------------- |
    | createTransaction | *POST*  | create transaction payment using snap integaration payment method |

    + ##### Example Usage Using CommonJS
  
    ```javascript
       const { MidtransClient } = require('@midtrans/node')
       const { v4: uuidv4 } = require('uuid')
       
       const snap = new MidtransClient.Snap({
         isProduction: process.env.DEVELOPMENT,
         serverKey: process.env.SERVER_KEY,
         clientKey: process.env.CLIENT_KEY
       })
        
       snap.createTransaction({
        	payment_type: 'bank_transfer',
          bank_transfer: { bank: 'bca' },
          transaction_details: {
            order_id: uuidv4(),
            gross_amount: 100000
          },
          item_details: [
            {
             id: uuidv4(),
             name: 'ayam bakar sambal balado'
             quantity: 2
             price: 25000
            },
            {
             id: uuidv4(),
             name: 'sop iga bakar daging lunak'
             quantity: 1
             price: 30000
            },
            {
             id: uuidv4(),
             name: 'just alpuckat'
             quantity: 2
             price: 10000
            }
          ],
          customer_details: {
          	first_name: 'restu wahyu',
            last_name: ' saputra',
            email: 'restuwahyu13@zetmail.com',
            phone: '087820154350',
            billing_address:  {
            	address: 'jl.sibuta gua hantu no.120',
              city: 'Depok',
              postal_code: '16436'
            }
          }
       })
       .then(console.log)
       .catch(console.error)
    ```

    + ##### Example Usage Using ES6
  
    ```javascript
       import { MidtransClient } from '@midtrans/node'
       import { v4 as uuidv4 } from 'uuid'
       
       const snap = new MidtransClient.Snap({
         isProduction: process.env.DEVELOPMENT,
         serverKey: process.env.SERVER_KEY,
         clientKey: process.env.CLIENT_KEY
       })
        
       snap.createTransaction({
        	payment_type: 'bank_transfer',
          bank_transfer: { bank: 'bca' },
          transaction_details: {
            order_id: uuidv4(),
            gross_amount: 100000
          },
          item_details: [
            {
             id: uuidv4(),
             name: 'ayam bakar sambal balado'
             quantity: 2
             price: 25000
            },
            {
             id: uuidv4(),
             name: 'sop iga bakar daging lunak'
             quantity: 1
             price: 30000
            },
            {
             id: uuidv4(),
             name: 'just alpuckat'
             quantity: 2
             price: 20000
            }
          ],
          customer_details: {
          	first_name: 'restu wahyu',
            last_name: ' saputra',
            email: 'restuwahyu13@zetmail.com',
            phone: '087820154350',
            billing_address:  {
            	address: 'jl.sibuta gua hantu no.120',
              city: 'Depok',
              postal_code: '16436'
            }
          }
       })
       .then(console.log)
       .catch(console.error)
    ```

  + #### createTransactionToken( parameter: object ): Promise

    | Method                 | Request | Description                                                             |
    | ---------------------- | ------- | ----------------------------------------------------------------------- |
    | createTransactionToken | *POST*  | create transaction payment token using snap integaration payment method | 

    + ##### Example Usage Using CommonJS
  
    ```javascript
       const { MidtransClient } = require('@midtrans/node')
       const { v4: uuidv4 } = require('uuid')
       
       const snap = new MidtransClient.Snap({
         isProduction: process.env.DEVELOPMENT,
         serverKey: process.env.SERVER_KEY,
         clientKey: process.env.CLIENT_KEY
       })
        
       snap.createTransactionToken({
        	payment_type: 'bank_transfer',
          bank_transfer: { bank: 'bca' },
          transaction_details: {
            order_id: uuidv4(),
            gross_amount: 100000
          },
          item_details: [
            {
             id: uuidv4(),
             name: 'ayam bakar sambal balado'
             quantity: 2
             price: 25000
            },
            {
             id: uuidv4(),
             name: 'sop iga bakar daging lunak'
             quantity: 1
             price: 30000
            },
            {
             id: uuidv4(),
             name: 'just alpuckat'
             quantity: 2
             price: 10000
            }
          ],
          customer_details: {
          	first_name: 'restu wahyu',
            last_name: ' saputra',
            email: 'restuwahyu13@zetmail.com',
            phone: '087820154350',
            billing_address:  {
            	address: 'jl.sibuta gua hantu no.120',
              city: 'Depok',
              postal_code: '16436'
            }
          }
       })
       .then(console.log)
       .catch(console.error)
    ```

    + ##### Example Usage Using ES6
  
    ```javascript
       import { MidtransClient } from '@midtrans/node'
       import { v4 as uuidv4 } from 'uuid'
       
       const snap = new MidtransClient.Snap({
         isProduction: process.env.DEVELOPMENT,
         serverKey: process.env.SERVER_KEY,
         clientKey: process.env.CLIENT_KEY
       })
        
       snap.createTransactionToken({
        	payment_type: 'bank_transfer',
          bank_transfer: { bank: 'bca' },
          transaction_details: {
            order_id: uuidv4(),
            gross_amount: 100000
          },
          item_details: [
            {
             id: uuidv4(),
             name: 'ayam bakar sambal balado'
             quantity: 2
             price: 25000
            },
            {
             id: uuidv4(),
             name: 'sop iga bakar daging lunak'
             quantity: 1
             price: 30000
            },
            {
             id: uuidv4(),
             name: 'just alpuckat'
             quantity: 2
             price: 20000
            }
          ],
          customer_details: {
          	first_name: 'restu wahyu',
            last_name: ' saputra',
            email: 'restuwahyu13@zetmail.com',
            phone: '087820154350',
            billing_address:  {
            	address: 'jl.sibuta gua hantu no.120',
              city: 'Depok',
              postal_code: '16436'
            }
          }
       })
       .then(console.log)
       .catch(console.error)
    ```

  + #### createTransactionRedirectUrl( parameter: object ): Promise

    | Method                       | Request | Description                                                                |
    | ---------------------------- | ------- | -------------------------------------------------------------------------- |
    | createTransactionRedirectUrl | *POST*  | create transaction payment redirect using snap integaration payment method | 

    + ##### Example Usage Using CommonJS
  
    ```javascript
       const { MidtransClient } = require('@midtrans/node')
       const { v4: uuidv4 } = require('uuid')
       
       const snap = new MidtransClient.Snap({
         isProduction: process.env.DEVELOPMENT,
         serverKey: process.env.SERVER_KEY,
         clientKey: process.env.CLIENT_KEY
       })
        
       snap.createTransactionRedirectUrl({
        	payment_type: 'bank_transfer',
          bank_transfer: { bank: 'bca' },
          transaction_details: {
            order_id: uuidv4(),
            gross_amount: 100000
          },
          item_details: [
            {
             id: uuidv4(),
             name: 'ayam bakar sambal balado'
             quantity: 2
             price: 25000
            },
            {
             id: uuidv4(),
             name: 'sop iga bakar daging lunak'
             quantity: 1
             price: 30000
            },
            {
             id: uuidv4(),
             name: 'just alpuckat'
             quantity: 2
             price: 10000
            }
          ],
          customer_details: {
          	first_name: 'restu wahyu',
            last_name: ' saputra',
            email: 'restuwahyu13@zetmail.com',
            phone: '087820154350',
            billing_address:  {
            	address: 'jl.sibuta gua hantu no.120',
              city: 'Depok',
              postal_code: '16436'
            }
          }
       })
       .then(console.log)
       .catch(console.error)
    ```

    + ##### Example Usage Using ES6
  
    ```javascript
       import { MidtransClient } from '@midtrans/node'
       import { v4 as uuidv4 } from 'uuid'
       
       const snap = new MidtransClient.Snap({
         isProduction: process.env.DEVELOPMENT,
         serverKey: process.env.SERVER_KEY,
         clientKey: process.env.CLIENT_KEY
       })
        
       snap.createTransactionRedirectUrl({
        	payment_type: 'bank_transfer',
          bank_transfer: { bank: 'bca' },
          transaction_details: {
            order_id: uuidv4(),
            gross_amount: 100000
          },
          item_details: [
            {
             id: uuidv4(),
             name: 'ayam bakar sambal balado'
             quantity: 2
             price: 25000
            },
            {
             id: uuidv4(),
             name: 'sop iga bakar daging lunak'
             quantity: 1
             price: 30000
            },
            {
             id: uuidv4(),
             name: 'just alpuckat'
             quantity: 2
             price: 20000
            }
          ],
          customer_details: {
          	first_name: 'restu wahyu',
            last_name: ' saputra',
            email: 'restuwahyu13@zetmail.com',
            phone: '087820154350',
            billing_address:  {
            	address: 'jl.sibuta gua hantu no.120',
              city: 'Depok',
              postal_code: '16436'
            }
          }
       })
       .then(console.log)
       .catch(console.error)
    ```

### Transaction API Services

  + #### status( transactionId: string ): Promise

    | Method | Request | Description                                                                     |
    | ------ | ------- | ------------------------------------------------------------------------------- |
    | status | *GET*   | Get information status of a transaction with certain order_id or transaction_id |

    + ##### Example Usage Using CommonJS
  
    ```javascript
       const { MidtransClient } = require('@midtrans/node')
       const { v4: uuidv4 } = require('uuid')
       
       const core = new MidtransClient.CoreApi({
         isProduction: process.env.DEVELOPMENT,
         serverKey: process.env.SERVER_KEY,
         clientKey: process.env.CLIENT_KEY
       })
        
       core.transaction.status('be4f3e44-d6ee-4355-8c64-c1d1dc7f4590')
       .then(console.log)
       .catch(console.error)
    ```

    + ##### Example Usage Using ES6
  
    ```javascript
       import { MidtransClient } from '@midtrans/node'
       import { v4 as uuidv4 } from 'uuid'
       
       const core = new MidtransClient.CoreApi({
         isProduction: process.env.DEVELOPMENT,
         serverKey: process.env.SERVER_KEY,
         clientKey: process.env.CLIENT_KEY
       })
        
       core.transaction.status('be4f3e44-d6ee-4355-8c64-c1d1dc7f4590')
       .then(console.log)
       .catch(console.error)
    ```

  + #### statusb2b( transactionId: string ): Promise

    | Method    | Request | Description                                                                                       |
    | --------- | ------- | ------------------------------------------------------------------------------------------------- |
    | statusb2b | *GET*   | Get information status of multiple B2B transactions related to certain order_id or transaction_id |

    + ##### Example Usage Using CommonJS
  
    ```javascript
       const { MidtransClient } = require('@midtrans/node')
       const { v4: uuidv4 } = require('uuid')
       
       const core = new MidtransClient.CoreApi({
         isProduction: process.env.DEVELOPMENT,
         serverKey: process.env.SERVER_KEY,
         clientKey: process.env.CLIENT_KEY
       })
        
       core.transaction.status('be4f3e44-d6ee-4355-8c64-c1d1dc7f4590')
       .then(console.log)
       .catch(console.error)
    ```

    + ##### Example Usage Using ES6
  
    ```javascript
       import { MidtransClient } from '@midtrans/node'
       import { v4 as uuidv4 } from 'uuid'
       
       const core = new MidtransClient.CoreApi({
         isProduction: process.env.DEVELOPMENT,
         serverKey: process.env.SERVER_KEY,
         clientKey: process.env.CLIENT_KEY
       })
        
       core.transaction.statusb2b('be4f3e44-d6ee-4355-8c64-c1d1dc7f4590')
       .then(console.log)
       .catch(console.error)
    ```

  + #### approve( transactionId: string ): Promise

    | Method  | Request | Description                                                                                                           |
    | ------- | ------- | --------------------------------------------------------------------------------------------------------------------- |
    | approve | *POST*  | Approve a transaction with certain order_id or transaction_id which gets challenge status from Fraud Detection System |

    + ##### Example Usage Using CommonJS
  
    ```javascript
       const { MidtransClient } = require('@midtrans/node')
       const { v4: uuidv4 } = require('uuid')
       
       const core = new MidtransClient.CoreApi({
         isProduction: process.env.DEVELOPMENT,
         serverKey: process.env.SERVER_KEY,
         clientKey: process.env.CLIENT_KEY
       })
        
       core.transaction.approve('be4f3e44-d6ee-4355-8c64-c1d1dc7f4590')
       .then(console.log)
       .catch(console.error)
    ```

    + ##### Example Usage Using ES6
  
    ```javascript
       import { MidtransClient } from '@midtrans/node'
       import { v4 as uuidv4 } from 'uuid'
       
       const core = new MidtransClient.CoreApi({
         isProduction: process.env.DEVELOPMENT,
         serverKey: process.env.SERVER_KEY,
         clientKey: process.env.CLIENT_KEY
       })
        
       core.transaction.approve('be4f3e44-d6ee-4355-8c64-c1d1dc7f4590')
       .then(console.log)
       .catch(console.error)
    ```

  + #### deny( transactionId: string ): Promise

    | Method | Request | Description                                                                                                        |
    | ------ | ------- | ------------------------------------------------------------------------------------------------------------------ |
    | deny   | *POST*  | Deny a transaction with certain order_id or transaction_id which gets challenge status from Fraud Detection System |

    + ##### Example Usage Using CommonJS
  
    ```javascript
       const { MidtransClient } = require('@midtrans/node')
       const { v4: uuidv4 } = require('uuid')
       
       const core = new MidtransClient.CoreApi({
         isProduction: process.env.DEVELOPMENT,
         serverKey: process.env.SERVER_KEY,
         clientKey: process.env.CLIENT_KEY
       })
        
       core.transaction.deny('be4f3e44-d6ee-4355-8c64-c1d1dc7f4590')
       .then(console.log)
       .catch(console.error)
    ```

    + ##### Example Usage Using ES6
  
    ```javascript
       import { MidtransClient } from '@midtrans/node'
       import { v4 as uuidv4 } from 'uuid'
       
       const core = new MidtransClient.CoreApi({
         isProduction: process.env.DEVELOPMENT,
         serverKey: process.env.SERVER_KEY,
         clientKey: process.env.CLIENT_KEY
       })
        
       core.transaction.deny('be4f3e44-d6ee-4355-8c64-c1d1dc7f4590')
       .then(console.log)
       .catch(console.error)
    ```

  + #### cancel( transactionId: string ): Promise

    | Method | Request | Description                                                                            |
    | ------ | ------- | -------------------------------------------------------------------------------------- |
    | cancel | *POST*  | Cancel a transaction with certain order_id or transaction_id before settlement process |

    + ##### Example Usage Using CommonJS
  
    ```javascript
       const { MidtransClient } = require('@midtrans/node')
       const { v4: uuidv4 } = require('uuid')
       
       const core = new MidtransClient.CoreApi({
         isProduction: process.env.DEVELOPMENT,
         serverKey: process.env.SERVER_KEY,
         clientKey: process.env.CLIENT_KEY
       })
        
       core.transaction.cancel('be4f3e44-d6ee-4355-8c64-c1d1dc7f4590')
       .then(console.log)
       .catch(console.error)
    ```

    + ##### Example Usage Using ES6
  
    ```javascript
       import { MidtransClient } from '@midtrans/node'
       import { v4 as uuidv4 } from 'uuid'
       
       const core = new MidtransClient.CoreApi({
         isProduction: process.env.DEVELOPMENT,
         serverKey: process.env.SERVER_KEY,
         clientKey: process.env.CLIENT_KEY
       })
        
       core.transaction.cancel('be4f3e44-d6ee-4355-8c64-c1d1dc7f4590')
       .then(console.log)
       .catch(console.error)
    ```

  + #### expire( transactionId: string ): Promise

    | Method | Request | Description                                                         | 
    | ------ | ------- | ------------------------------------------------------------------- |
    | expire | *POST*  | Update order_id or transaction_id with pending status to be expired |
  
      + ##### Example Usage Using CommonJS
  
    ```javascript
       const { MidtransClient } = require('@midtrans/node')
       const { v4: uuidv4 } = require('uuid')
       
       const core = new MidtransClient.CoreApi({
         isProduction: process.env.DEVELOPMENT,
         serverKey: process.env.SERVER_KEY,
         clientKey: process.env.CLIENT_KEY
       })
        
       core.transaction.expire('be4f3e44-d6ee-4355-8c64-c1d1dc7f4590')
       .then(console.log)
       .catch(console.error)
    ```

    + ##### Example Usage Using ES6
  
    ```javascript
       import { MidtransClient } from '@midtrans/node'
       import { v4 as uuidv4 } from 'uuid'
       
       const core = new MidtransClient.CoreApi({
         isProduction: process.env.DEVELOPMENT,
         serverKey: process.env.SERVER_KEY,
         clientKey: process.env.CLIENT_KEY
       })
        
       core.transaction.expire('be4f3e44-d6ee-4355-8c64-c1d1dc7f4590')
       .then(console.log)
       .catch(console.error)
    ```
  
  + #### refund( transactionId: string, parameter?: object): Promise

    | Method | Request | Description                                                           |
    | ------ | ------- | --------------------------------------------------------------------- |
    | refund | *POST*  | Update order_id or transaction_id with settlement status to be refund |

      + ##### Example Usage Using CommonJS
  
    ```javascript
       const { MidtransClient } = require('@midtrans/node')
       const { v4: uuidv4 } = require('uuid')
       
       const core = new MidtransClient.CoreApi({
         isProduction: process.env.DEVELOPMENT,
         serverKey: process.env.SERVER_KEY,
         clientKey: process.env.CLIENT_KEY
       })
        
       core.transaction.refund('be4f3e44-d6ee-4355-8c64-c1d1dc7f4590', {
         amount: 1000000, 
         reason: 'Reason to refund payouts'
       })
       .then(console.log)
       .catch(console.error)
    ```

    + ##### Example Usage Using ES6
  
    ```javascript
       import { MidtransClient } from '@midtrans/node'
       import { v4 as uuidv4 } from 'uuid'
       
       const core = new MidtransClient.CoreApi({
         isProduction: process.env.DEVELOPMENT,
         serverKey: process.env.SERVER_KEY,
         clientKey: process.env.CLIENT_KEY
       })
        
       core.transaction.refund('be4f3e44-d6ee-4355-8c64-c1d1dc7f4590', {
         amount: 1000000, 
         reason: 'Reason to refund payouts'
       })
       .then(console.log)
       .catch(console.error)
    ```

  + #### refundDirect( transactionId: string, parameter?: object): Promise

    | Method       | Request | Description                                                                                                    |
    | ------------ | ------- | -------------------------------------------------------------------------------------------------------------- |
    | refundDirect | *POST*  | Attempt to send refund to bank or payment provider and update the transaction status to refund if it succeeded |

      + ##### Example Usage Using CommonJS
  
    ```javascript
       const { MidtransClient } = require('@midtrans/node')
       const { v4: uuidv4 } = require('uuid')
       
       const core = new MidtransClient.CoreApi({
         isProduction: process.env.DEVELOPMENT,
         serverKey: process.env.SERVER_KEY,
         clientKey: process.env.CLIENT_KEY
       })
        
       core.transaction.refundDirect('be4f3e44-d6ee-4355-8c64-c1d1dc7f4590', {
         amount: 1000000, 
         reason: 'Reason to refund direct payouts'
       })
       .then(console.log)
       .catch(console.error)
    ```

    + ##### Example Usage Using ES6
  
    ```javascript
       import { MidtransClient } from '@midtrans/node'
       import { v4 as uuidv4 } from 'uuid'
       
       const core = new MidtransClient.CoreApi({
         isProduction: process.env.DEVELOPMENT,
         serverKey: process.env.SERVER_KEY,
         clientKey: process.env.CLIENT_KEY
       })
        
       core.transaction.refundDirect('be4f3e44-d6ee-4355-8c64-c1d1dc7f4590', {
         amount: 1000000, 
         reason: 'Reason to direct payouts'
       })
       .then(console.log)
       .catch(console.error)
    ```

  + #### notification( notification: object ): Promise

    | Method       | Request     | Description                                                                                              |
    | ------------ | ----------- | -------------------------------------------------------------------------------------------------------- |
    | notification | *undefined* | additional mechanism we provide to verify the content and the origin of the notification is to challenge |

      + ##### Example Usage Using CommonJS
  
    ```javascript
       const { MidtransClient } = require('@midtrans/node')
       const { v4: uuidv4 } = require('uuid')
       
       let getResponse;
       
       const core = new MidtransClient.CoreApi({
         isProduction: process.env.DEVELOPMENT,
         serverKey: process.env.SERVER_KEY,
         clientKey: process.env.CLIENT_KEY
       })
        
        core.transaction.status('be4f3e44-d6ee-4355-8c64-c1d1dc7f4590')
       .then((res) => getResponse = res)
       .catch(console.error)
       
       core.transaction.notification(JSON.stringify(getResponse))
       .then(console.log)
       .catch(console.error)
    ```

    + ##### Example Usage Using ES6
  
    ```javascript
       import { MidtransClient } from '@midtrans/node'
       import { v4 as uuidv4 } from 'uuid'
       
       let getResponse;
       
       const core = new MidtransClient.CoreApi({
         isProduction: process.env.DEVELOPMENT,
         serverKey: process.env.SERVER_KEY,
         clientKey: process.env.CLIENT_KEY
       })
        
       core.transaction.status('be4f3e44-d6ee-4355-8c64-c1d1dc7f4590')
       .then((res) => getResponse = res)
       .catch(console.error)
       
       core.transaction.notification(JSON.stringify(getResponse))
       .then(console.log)
       .catch(console.error)
    ```
