

## Description
- This project provides currency exchange Api and user management, so user can register, login and view all transactions.
- Transactions are represented in the database woth four fields [`sourceCurrency`, `targetCurrency`, `amount`, `convertedAmount`]
- Transaction is created when user convert from a currency into another currency
- The User can view all his past transaction and login and register
- unit tests for all the services are covered

## Design
- In this project we have two main modules `Trasaction` and `Authentication`
- Authentication module is responsable for authenticating the users and validate they are valid users, login and signup
- Transation module is responsable for listing all user transactions and create new transaction

## APIS
- `/auth/signup`  : register new user with username and password
- `/auth/login`   : login the user and validate his creds and return jwt token so the user can access the other apis
- `/convert`: convert the source currency to the target currency and save the transaction in the db, `Bearer Token` must be attahced in the header
- `/history`: gets the history of transaction of the user, `Bearer Token` must be attahced in the header
## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

```
