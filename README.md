# Crypto wallet
Crypto wallet is simple Crypto wallet REST API build in node.js express.  

## Features
- Register New User
- Read Balance
- Deposit Balance
- Transfer Between Wallets
- List Top 10 Transaction Per User
- List Top 10 Overall Transaction Users

## Prerequisite
- Node.js v16.13.2 or early version
- Mysql, MariaDB or Postgres
- npm v8.1.2 or early version

## Installation
Clone Repository or download this projects

    git clone https://github.com/aldyrifaldi/challange-rest-api-currency-insignia.git

   Install package using command npm install in your terminal
   

    npm install

Create .env file in root project and paste this code below

 

    DATABASE_URL="mysql://yourdbuser:yourdbpassword@localhost:3306/yourdbname?connection_limit=5&socket_timeout=3"    
    PORT=3002
    JWT_SECRET=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c

Migrate table to database using Prisma CLI run this command below in your terminal

    npx prisma migrate dev
    
Finally start the project use command below in your terminal

    npm start
Or

    npm run start
