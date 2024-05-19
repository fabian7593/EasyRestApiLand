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
  * Microservices: You have the possibillity to modify the code easly and set all of those functionallities on separate microservices.

  
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
I upload an example of .env here ->
https://github.com/fabian7593/EasyRestApiLand/blob/main/example.env.txt

```bash
# Company information 
COMPANY_NAME="Easy Rest Api Land"

# This logo is for show into the emails 
COMPANY_LOGO=https://github.com/fabian7593/EasyRestApiLand/blob/main/00/logo.png

# These are the subjects for register and forgot password
COMPANY_REGISTER_SUBJECT="Account Verification"
COMPANY_FORGOT_PASS_SUBJECT="Forgot Password"

#This is the host for confirmation register, I recomended to set the url of the backend project
COMPANY_HOST="http://localhost:3000/"

# This is for build the url for vefiry forgot password
COMPANY_FRONT_END_HOST="http://localhost:3000/"
COMPANY_RESET_PASS_FRONT_END_URL="password_reset/"

#This is the color of the emails titles
COMPANY_MAIN_COLOR="#055D00"

# this is the domain of the email logo
COMPANY_DOMAIN="https://www.example.com"

#This is the security api key if the endpoints require this, in the header you need to set -> x-api-key
COMPANY_SECRET_API_KEY="8170fcb2-ef45-4173-8a37-f682d38ddae9"
#If this variable is 1, the endpoints validate the x-api-key
COMPANY_HAS_SECRET_API_KEY=0

#This is the port of this server node backend
SERVER_PORT=3000

#DB Information on connection string
DB_PORT=3307
DB_HOST="localhost"
DB_USER="root"
DB_PASSWORD=""
DB_NAME="easy_api_land_db"
DB_CONNECTION_LIMIT=150

#JWT - All of JWT Tokens of login, refresh, forgot password and register token.
JWT_EXPIRE=30000s
JWT_SECRET_KEY=f749b45a-06e9-4ba1-a842-630184b443f6

#JWT REFRESH TOKEN
JWT_REFRESH_EXPIRE=1d
JWT_REFRESH_SECRET_KEY=44e7d167-fd16-41f4-9e48-e6218fbf0a41

#JWT forgot password
JWT_FORGOT_PASSWORD_EXPIRE=900s
JWT_FORGOT_PASSWORD_TOKEN=f749b45a-35a1-77ty-12we-630184b443f6

#JWT Register Token
JWT_REGISTER_TOKEN=44fr2167-1oi8-55ht-3ew1-630184b443f6


#Password Salt
SALT=550e8400e29b41d4a716446655412345

#Is debugging active, not validate the regular expressions and show all console logs.
IS_DEBUGGING=0

# General Settings
# This settings is the max numbers of fail logins, and page size by default if not set it on url params.
FAIL_LOGIN_MAX_NUMBER=3
PAGE_SIZE=3000
PAGE_OFFSET=1


# AWS S3 File Storage Information
BUCKET_NAME="bucket-name"
BUCKET_REGION="us-east-2"
#configure IAM AWS
ACCESS_KEY="AKIAZQ3DRSPRNUX12345"
SECRET_ACCESS_KEY=""

# Emails information - This information is for node mailer
EMAIL_SERVICE=gmail
EMAIL_AUTH_USER="test@gmail.com"
EMAIL_AUTH_PASSWORD="test_password"
EMAIL_FROM="test@gmail.com"
```

<br>
<br>

## RUN
* npm run dev


<br>

# Important information

First you need to understand the structure or the responses.
All the responses have the same body information in JSON:

* Status: is an object with id and message, this status id is not the HTTP status, is just an specific id.
* Message: represents the action, for example Unauthorized, Error, Warning, etc.
* Data: Is the important body information from backend response.
* Info: A simple string with more information related the response.


```bash
{
    "status": {
        "id": 1,
        "message": "Success"
    },
    "data": {  },
    "info": "Login Successful"
}
```


## Json Files Messages
The system have some files with message configuration, for any specific response, message text and others.
You can see it on this route -> https://github.com/fabian7593/EasyRestApiLand/tree/main/json

* errorDBList.json: This has some errors from db, with the respective error number, code and message that you need to show on the response.
* messages.json: This is the list of messages for sent in info response, depends response.
* regex.json: This is the list of regular expression and the respective messages if the rule is not followed. (It only works if IS_DEBUGGING=0 in .env file).
* statusResponse.json: This is the list of status object response, with the respective id, name and http status.


## Email Templates
This is some email templates for any important phases of the app, for example, register email, active account page and forgot password email.
As well a generic template email for send emails from the application.
You can see it on this route -> https://github.com/fabian7593/EasyRestApiLand/tree/main/email_templates

<br>

# How to run the existing Endpoints?

## POST MAN
Import the postman collection file to test the current endpoints
https://github.com/fabian7593/EasyRestApiLand/blob/main/Easy%20Rest%20Api%20Land.postman_collection.json

Structure: 



