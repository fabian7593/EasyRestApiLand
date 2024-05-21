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
  * typeorm-model-generator -h localhost -d easy_api_land_db -p 3307 -u root -x "password" -e mysql -o ./models_type_orm

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
COMPANY_MAIN_COLOR="#6666FF"

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


## Import into POST MAN
Import the postman collection file to test the current endpoints
https://github.com/fabian7593/EasyRestApiLand/blob/main/Easy%20Rest%20Api%20Land.postman_collection.json

Structure: 

<img src="https://github.com/fabian7593/EasyRestApiLand/blob/main/00/01.PNG?raw=true" alt="alt tag" width="200"/>


## Login and Register 

* First you need a registered user:
  
  <img src="https://github.com/fabian7593/EasyRestApiLand/blob/main/00/03.PNG?raw=true" alt="alt tag" width="200"/>


  <img src="https://github.com/fabian7593/EasyRestApiLand/blob/main/00/04.PNG?raw=true" alt="alt tag" width="600"/>

* This is an example reply of this register
  
  <img src="https://github.com/fabian7593/EasyRestApiLand/blob/main/00/05.PNG?raw=true" alt="alt tag" width="400"/>

* At this moment you can't do login, because you need to confirm registration on your email

  <img src="https://github.com/fabian7593/EasyRestApiLand/blob/main/00/06.PNG?raw=true" alt="alt tag" width="400"/>

* When you click on complete registration, this is an example of message showing

  <img src="https://github.com/fabian7593/EasyRestApiLand/blob/main/00/07.PNG?raw=true" alt="alt tag" width="400"/>

* And then you can do login, for obtain the access token, for do another request, as well you obtain the list of pages that the user can access, and the refresh token

  <img src="https://github.com/fabian7593/EasyRestApiLand/blob/main/00/08.PNG?raw=true" alt="alt tag" width="600"/>

* You can refresh your access token withouth do a login again, with this endpoint, and send it the refresh token.

  <img src="https://github.com/fabian7593/EasyRestApiLand/blob/main/00/09.PNG?raw=true" alt="alt tag" width="600"/>


## Logs

* You can save your traceabillity, of methods, with the respective values, or the error traceabillity as well, you have the possibillity to save the environment, the app guid, a description and others.
  
  <img src="https://github.com/fabian7593/EasyRestApiLand/blob/main/00/11.PNG?raw=true" alt="alt tag" width="600"/>


## Notifications

* You can save the specific notifications, and then send it to a specific user. You can send an url action, and if the notification need to send an email of not.

  <img src="https://github.com/fabian7593/EasyRestApiLand/blob/main/00/12.PNG?raw=true" alt="alt tag" width="600"/>

  <img src="https://github.com/fabian7593/EasyRestApiLand/blob/main/00/13.PNG?raw=true" alt="alt tag" width="600"/>

  <img src="https://github.com/fabian7593/EasyRestApiLand/blob/main/00/14.PNG?raw=true" alt="alt tag" width="400"/>


## Emails

* You can send emails to a specific user registered, or you can send emails to all users just with one post endpoint.

  <img src="https://github.com/fabian7593/EasyRestApiLand/blob/main/00/15.PNG?raw=true" alt="alt tag" width="600"/>

  <img src="https://github.com/fabian7593/EasyRestApiLand/blob/main/00/16.PNG?raw=true" alt="alt tag" width="400"/>


## Documents

* You can save any file into s3 bucket of AWS, with one endpoint, and the reply is an url from aws server just for access it from this url.

<img src="https://github.com/fabian7593/EasyRestApiLand/blob/main/00/17.PNG?raw=true" alt="alt tag" width="600"/>




<br>

# How to programming new endpoints and modules?

We need to add a CRUD for example table to management the information of manufactures.
We are going to introduce the programming of this module step by step.

<br>
Each code that wee need in this example, there is in the repository, in the test folder -> https://github.com/fabian7593/EasyRestApiLand/tree/main/src/Entities/test.

And in the file of db scripting just for testing ->  https://github.com/fabian7593/EasyRestApiLand/blob/main/dbScripting/04_db_scripting_just_for_testing.sql.

NOTE: You need to understand that those example files are not required, in the normal funcionallity of your backend application, we just added this for complete the programming documentation.

<br>

* For this example we need to add some information to Unit Dynamics Central, at the same time, we will learn how can we use the UDC module.
* We need to insert udc into db, at this form, for example: 
```bash
INSERT INTO `units_dynamic_central` (`code`, `name`, `type`, `value1`)
VALUES
('AUTOMOTIVE', 'Automotive Industry', 'INDUSTRY_TYPE', 'Automotive'),
('TEXTILE', 'Textile Industry', 'INDUSTRY_TYPE', 'Textile'),
('TECHNOLOGY', 'Technology Industry', 'INDUSTRY_TYPE', 'Technology'),
('FOOD_AND_BEVERAGE', 'Food and Beverage Industry', 'INDUSTRY_TYPE', 'Food and Beverage'),
('PHARMACEUTICAL', 'Pharmaceutical Industry', 'INDUSTRY_TYPE', 'Pharmaceutical');
```

* Then, we need to add the screen of manufacture, and the respective role asociated with this screen and its functionallities:
```bash
INSERT INTO screens (code, name, description)
VALUES 
    ('MANUFACTURE_SCREEN', 'MANUFACTURES', 'SCREEN FOR CREATE MANUFACTURES');

INSERT INTO role_screen (role_code, screen_code, description) VALUES 
('ADMIN', 'MANUFACTURE_SCREEN', 'Screen for creating MANUFACTURES');


INSERT INTO role_functionallity (role_code, func_type, function_code, screen_code, description) VALUES 
('ADMIN', 'C', 'MANUFACTURE_CREATE', 'MANUFACTURE_SCREEN', 'Create new project'),
('ADMIN', 'R', 'MANUFACTURE_READ', 'MANUFACTURE_SCREEN', 'Read new project'),
('ADMIN', 'U', 'MANUFACTURE_UPDATE', 'MANUFACTURE_SCREEN', 'Update new project'),
('ADMIN', 'D', 'MANUFACTURE_DELETE', 'MANUFACTURE_SCREEN', 'Delete new project');
```

* Then we need to add the new table of manufactures into DB
```bash
DROP TABLE IF EXISTS `manufactures`;
CREATE TABLE IF NOT EXISTS `manufactures` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `name` VARCHAR(255) NOT NULL,
    `address` VARCHAR(255) DEFAULT NULL,
    `city` VARCHAR(100) DEFAULT NULL,
    `state` VARCHAR(100) DEFAULT NULL,
    `zip_code` VARCHAR(20) DEFAULT NULL,
    `country_iso_code` VARCHAR(3) DEFAULT NULL,
    `phone` VARCHAR(20) DEFAULT NULL,
    `email` VARCHAR(255) DEFAULT NULL,
    `website` VARCHAR(255) DEFAULT NULL,
    `is_deleted` TINYINT(1) DEFAULT 0,
    `udc_industry_type` VARCHAR(100) DEFAULT NULL,
    `notes` TEXT DEFAULT NULL,
    `created_date` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `updated_date` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (`udc_industry_type`) REFERENCES `units_dynamic_central` (`code`)
);
```

* When you added all of those scripts into the db, you need to run the script to generate ORM with DB first, in this case we use ->
  * typeorm-model-generator -h localhost -d easy_api_land_db -p 3307 -u root -x "password" -e mysql -o ./models_type_orm
   
* The you can add a folder into entities, in this case with the name "test".
* And next you need to add to files, "ManufactureAdapter.ts" and "ManufactureRouter.ts".
  * ManufactureAdapter.ts:
    * This is a class that implements the Adapter Interface, and need to set it the respective functions into class, for example:
    
     ```bash
     //This method convert from body json, to entity type manufacture, for insert
     entityFromPostBody() : Manufactures{
          const entity = new Manufactures();
          entity.name = this.req.body.name;
          entity.city = this.req.body.city || null;
          entity.address = this.req.body.address || null;
          entity.countryIsoCode = this.req.body.country_iso_code || null;
          entity.email = this.req.body.email || null;
          entity.state = this.req.body.state || null;
          entity.zipCode = this.req.body.zip_code || null;
          entity.phone = this.req.body.phone || null;
          entity.website = this.req.body.website || null;
          entity.udcIndustryType = this.req.body.industry_type;
          entity.notes = this.req.body.notes || null;
          entity.createdDate = new Date();
          return entity;
      }
   ```


      //These methods convert the entity manufacture to json objecto to show into response
       entityToResponse(entity: Manufactures) : any{
           return  {
               id : entity.id,
               name: entity.name,
               address: entity.address,
               city: entity.city ,
               state: entity.state,
               zip_code: entity.zipCode,
               country_iso_code: entity.countryIsoCode,
               phone: entity.phone,
               email: entity.email,
               website: entity.createdDate,
               industry_type: entity.udcIndustryType,
               notes: entity.notes,
               created_date: entity.createdDate,
               updated_date: entity.updatedDate
           };
       }
   
       // this show multiple manufactures
       entitiesToResponse(entities: Manufactures[] | null): any {
           const response: any[] = [];
       
           if(entities != null){
               for (const entity of entities) {
                   response.push(this.entityToResponse(entity));
               }
           }
           return response;
       }
    ```
  * ManufactureRouter.ts (This class have the router for all methods of manufacture CRUD):
    * We need to set the controller object, and add the functionallities added in the last example of the table role_functionallity, like this ->
       ```bash
       const controllerObj: ControllerObject = {
         create: "MANUFACTURE_CREATE",
         update: "MANUFACTURE_UPDATE",
         delete: "MANUFACTURE_DELETE",
         getAll: "MANUFACTURE_READ",
         getById: "MANUFACTURE_READ",
         controller: "ManufactureController"
       };
      ```
