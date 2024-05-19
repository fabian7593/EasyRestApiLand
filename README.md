[![alt tag](https://github.com/fabian7593/EasyRestApiLand/blob/main/00/logo.png)](https://github.com/fabian7593/EasyRestApiLand)

# Easy RestApi Land
This projetc is a RestApi project written on node js with typescript and express js. That Project increases the development speed of rest apis backends by 30 or 40%.
And gives us the most important and basic parts of developing a backend application.

This project use some design patterns like generics, builder, repository, dependency injection, and others and some of the SOLID principles.

As well the project have a multiparadigm programming with Function oriented and POO oriented as well, with the result of FOOP (Function-Oriented and Object-Oriented Programming).

This is a lit manually "framework" for do rest apis backend, with the CRUD methods mainly.

## The project contains:

* Logic of User and roles
  * Register
  * CRUD Users
  * Roles by functionallities
  * Roles by Screens
  * Login
  * Password Reset / Forgot Password
  * Activate User by email Verification
    
* Security to validate on each request
  * JWT / User login
  * Refresh token
  * Api key on authorization
  * Roles validation by user
    
* Notifications
  * Notifications management
  * Send notification of all users of the app
  * Posibillity to send emails when send notifications
    
* Documents
  * Document management with AWS S3
  * Logic to save, update and delete files on AWS S3.
  * Get file by code, and obtain the specific URL to access file.

* Another things
  * Easy Fast Structure: An Structure to create a complete CRUD of any tables of DB, with just 2 files and less than 300 lines of code.
  * UDC (Unit Dynamic Central):
      This is the important information to show on drop down list, checklist, or another types of information, for config or for fill the other tables.
      For example the list of countries, in db, or list of currencies or phones codes, or anything that you need as miscellaneous information.
  * Logs: This is a table for save all the logs on the apps, with important information like platform, ip, method and class, and anothers.
  * Email Management: Some requests for send emails fast and easy (in this example with gmail).
  * Error Management: This project has a strong structure of error management.
  * Validations: A lot of important validations like required fields, regular expressions, and others.

  
<br>
<br>

# Getting Started
We need to install necessary packages to use this framework.
## Install Node
* curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash
* nvm install 20.5.0
* nvm use 20.5.0
* nvm alias default 20.5.0
* node -v
* npm --version - 6.14.4
  
## Create Project and Install some necessary packages
* mkdir myproject
* cd myproject
* npm init -y
* npm install express axios dotenv aws-sdk cors mariadb nodemailer jsonwebtoken multer
* npm install typescript
* npm install ts-node-dev --save-dev
* npm install mysql --save


Then add into package.json script, this code -> 
```bash
  "scripts": {
    "dev": "ts-node-dev src/index.ts",
    "mail": "ts-node-dev src/indexSendMail.ts",
    "connection": "ts-node-dev src/indexdbconnection.ts",
    "compile": "tsc",
    "start": "node build/index.js",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
```

## Compile
* npm run compile -- --init
* change your tsconfig.json with this one.
  * https://github.com/fabian7593/EasyRestApiLand/blob/main/tsconfig.json

## Install typescript packages
* npm install @‌types/express -D
* npm install @‌types/cors -D
* npm i --save-dev @‌types/multer
* npm install mariadb @‌types/mariadb -D
* npm i --save-dev @types/nodemailer
* npm install typeorm reflect-metadata
* npm install @types/node --save-dev
* npm i --save-dev @types/nodemailer
* npm i --save-dev @types/multer


<br>
<br>

## Run SQL Scripting
* Run the sql files in order on your MariaDb or MySQL.
  * https://github.com/fabian7593/EasyRestApiLand/tree/main/dbScripting
* Install these libraries
   * npm install -g typeorm@0.2.34
   * npm install -g typeorm-model-generator@0.4.6
* Copy File ormConfig in the root of the project
  * https://github.com/fabian7593/EasyRestApiLand/blob/main/ormconfig.js
* Run
  * typeorm-model-generator -h localhost -d easy_api_land_db -p 3307 -u root -x "" -e mysql -o ./models_type_orm

<br>
<br>


## Set settings of application into .env file 
This file is so important to the correct working of the endpoints.

<br>
<br>

## RUN
* npm run dev


