

## Description
- This project provides currency exchange Api and user management, so user can register, login and view all transactions.
- Transactions are represented in the database woth four fields [`sourceCurrency`, `targetCurrency`, `amount`, `convertedAmount`]
- Transaction is created when user convert from a currency into another currency
- The User can view all his past transaction and login and register
- **ExchangeRate-API** is used for converting the amount 
- unit tests for all the services are covered
- e2e tests are covered for all apis
- database are deployed to atlas and you can access it by adding db link in the env file into mongo-compass

## Design
- In this project we have two main modules `Trasaction` and `Authentication`
- Authentication module is responsable for authenticating the users and validate they are valid users, login and signup
- Transation module is responsable for listing all user transactions and create new transaction

## Documentation
- full documentation of the apis are added using swgger
- checking the apis swagger docs by running the application first then add this link into the chrome `http://localhost:3000/api`

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
- please note that node 18 is required to run the application locally
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
