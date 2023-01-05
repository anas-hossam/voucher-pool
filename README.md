# Voucher Pool

## How To Run
```sh
# Install dependencies
> npm i

# For init database in postgres docker container
> npm run start:dev:db

# For generate new file `ormconfig.json`
> npm run pretypeorm

# For generating migration for database to generate schemas and tables
> npm run typeorm:migration:generate -- my_init

# Run generated migration
> npm run typeorm:migration:run

#  Start Server :rocket:
> npm run start:dev
```

## Get customers

```sh
curl --location --request GET 'http://localhost:3000/customer'
```

## Create new customer 
```sh
curl --location --request POST 'http://localhost:3000/customer' \
--header 'Content-Type: application/json' \
--data-raw '{
        "name": "test customer",
        "email": "test@test.com"
    }'
```

## Update customer 
```sh
curl --location --request PATCH 'http://localhost:3000/customer/:id' \
--header 'Content-Type: application/json' \
--data-raw '{
        "name": "test customer updated"
    }'
```

#
## Get vouchers

```sh
curl --location --request GET 'http://localhost:3000/voucher'
```

## Generate new voucher for customer with special Offer
```sh
curl --location --request POST 'http://localhost:3000/voucher' \
--header 'Content-Type: application/json' \
--data-raw '{
        "code": "ABCD2023",
        "customer": { "id": "customerId" },
        "expirationDate": "2023-01-15",
        "offer": { "name": "NEW BIG OFFER", "discount": 30 }
    }'
```

## Generate new voucher for customer with default Offer `{ name: 'special offer for customer :customerId', discount: 5 }`
```sh
curl --location --request POST 'http://localhost:3000/voucher' \
--header 'Content-Type: application/json' \
--data-raw '{
        "code": "ABCDEF2023",
        "customer": { "id": "customerId" },
        "expirationDate": "2023-01-15"
    }'
```

## Get customer vouchers by email

```sh
curl --location --request GET 'http://localhost:3000/voucher/:email'
```

## Redeem and validate voucher
```sh
curl --location --request PATCH 'http://localhost:3000/voucher/' \
--header 'Content-Type: application/json' \
--data-raw '{
        "code": "ABCD2023",
        "email": "test@test.com"
    }'
```
