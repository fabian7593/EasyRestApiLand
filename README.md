# Easy RestApi Land

[![alt tag](https://github.com/fabian7593/EasyRestApiLand/blob/main/00/logo.png)](https://github.com/fabian7593/EasyRestApiLand)

## Table of Contents
1. [Introduction](#introduction)
2. [Project Structure](#project-structure)
3. [Getting Started](#getting-started)
    1. [Install Node](#install-node)
    2. [Create Project and Install Necessary Packages](#create-project-and-install-necessary-packages)
    3. [Compile](#compile)
    4. [Install TypeScript Packages](#install-typescript-packages)
4. [Run SQL Scripting](#run-sql-scripting)
5. [Set Application Settings](#set-application-settings)
6. [Run the Application](#run-the-application)
7. [Response Structure](#response-structure)
8. [JSON Files Messages](#json-files-messages)
9. [Email Templates](#email-templates)
10. [Using Endpoints](#using-endpoints)
    1. [Import into Postman](#import-into-postman)
    2. [Login and Register](#login-and-register)
    3. [Logs](#logs)
    4. [Notifications](#notifications)
    5. [Emails](#emails)
    6. [Documents](#documents)
11. [Developing New Endpoints and Modules](#developing-new-endpoints-and-modules)

## Introduction
Easy RestApi Land is a REST API project written in Node.js with TypeScript and Express.js. This project aims to increase the development speed of REST API backends by 30-40%, providing the essential components for building a backend application.

The project uses several design patterns, including generics, builder, repository, dependency injection, and some SOLID principles. It supports multi-paradigm programming, combining functional and object-oriented programming (FOOP).

This is a lightweight, manually constructed "framework" for developing REST API backends, primarily focusing on CRUD operations.

## Project Structure
The project includes:

- **User and Roles Management**
  - User registration
  - CRUD operations for users
  - Role-based functionalities and screen permissions
  - User login
  - Password reset/forgot password
  - Email verification for user activation

- **Security**
  - JWT/User login
  - Refresh token
  - API key authorization
  - Role validation by user

- **Notifications**
  - Notification management
  - Send notifications to all users
  - Email notifications

- **Documents**
  - Document management with AWS S3
  - Save, update, and delete files on AWS S3
  - Retrieve file URLs by code

- **Additional Features**
  - Easy and fast structure for creating CRUD operations
  - Unit Dynamic Central (UDC) for managing dropdown lists and other configurations
  - Logging for important app events
  - Email management with Nodemailer
  - Error management structure
  - Validations (required fields, regular expressions, etc.)
  - Microservices support

## Getting Started
To use this framework, follow the steps below.

### Install Node
```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash
nvm install 20.5.0
nvm use 20.5.0
nvm alias default 20.5.0
node -v
npm --version - 6.14.4
```

### Create Project and Install Necessary Packages
```bash
mkdir myproject
cd myproject
npm init -y
npm install express axios dotenv aws-sdk cors mariadb nodemailer jsonwebtoken multer
npm install typescript
npm install ts-node-dev --save-dev
npm install mysql --save
```

Add the following scripts to your `package.json`:
```json
"scripts": {
  "dev": "ts-node-dev src/index.ts",
  "mail": "ts-node-dev src/indexSendMail.ts",
  "connection": "ts-node-dev src/indexdbconnection.ts",
  "compile": "tsc",
  "start": "node build/index.js",
  "test": "echo \"Error: no test specified\" && exit 1"
}
```

### Compile
```bash
npm run compile -- --init
```
Replace your `tsconfig.json` with the one provided [here](https://github.com/fabian7593/EasyRestApiLand/blob/main/tsconfig.json).

### Install TypeScript Packages
```bash
npm install @types/express -D
npm install @types/cors -D
npm i --save-dev @types/multer
npm install mariadb @types/mariadb -D
npm i --save-dev @types/nodemailer
npm install typeorm reflect-metadata
npm install @types/node --save-dev
npm i --save-dev @types/multer
```

## Run SQL Scripting
Run the SQL files in order on your MariaDB or MySQL from the [dbScripting folder](https://github.com/fabian7593/EasyRestApiLand/tree/main/dbScripting).

Install these libraries:
```bash
npm install -g typeorm@0.2.34
npm install -g typeorm-model-generator@0.4.6
```

Copy the [ormConfig file](https://github.com/fabian7593/EasyRestApiLand/blob/main/ormconfig.js) to the root of the project and run:
```bash
typeorm-model-generator -h localhost -d easy_api_land_db -p 3307 -u root -x "password" -e mysql -o ./models_type_orm
```

## Set Application Settings
Configure the `.env` file for correct endpoint operation. An example `.env` file is provided [here](https://github.com/fabian7593/EasyRestApiLand/blob/main/example.env.txt).

## Run the Application
```bash
npm run dev
```

## Response Structure
All responses have the same JSON body structure:

```json
{
    "status": {
        "id": 1,
        "message": "Success"
    },
    "data": { },
    "info": "Login Successful"
}
```
- **Status**: An object with `id` and `message`. This `id` is not the HTTP status but a specific identifier.
- **Message**: Indicates the action, e.g., Unauthorized, Error, Warning, etc.
- **Data**: Contains the main body information from the backend response.
- **Info**: A string with additional information related to the response.

## JSON Files Messages
The system uses several JSON files for message configuration. These files can be found [here](https://github.com/fabian7593/EasyRestApiLand/tree/main/json):
- **errorDBList.json**: Contains database errors with respective error numbers, codes, and messages.
- **messages.json**: Contains a list of messages for responses.
- **regex.json**: Contains regular expressions and respective messages (only works if `IS_DEBUGGING=0` in the `.env` file).
- **statusResponse.json**: Contains the list of status response objects with respective IDs, names, and HTTP statuses.

## Email Templates
Several email templates are available for various phases of the app, such as registration emails, account activation pages, and password reset emails. These templates can be found [here](https://github.com/fabian7593/EasyRestApiLand/tree/main/email_templates).

## Using Endpoints
### Import into Postman
Import the Postman collection file to test the current endpoints: [Postman Collection](https://github.com/fabian7593/EasyRestApiLand/blob/main/Easy%20Rest%20Api%20Land.postman_collection.json).

#### Structure
![Postman Collection Structure](https://github.com/fabian7593/EasyRestApiLand/blob/main/00/01.PNG?raw=true)

### Login and Register
- **Register a user**:
![Register User](https://github.com/fabian7593/EasyRestApiLand/blob/main/00/03.PNG?raw=true)
![Register User Response](https://github.com/fabian7593/EasyRestApiLand/blob/main/00/04.PNG?raw=true)

- **Registration response example**:
![Registration Response Example](https://github.com/fabian7593/EasyRestApiLand/blob/main/00/05.PNG?raw=true)

- **Email confirmation required**:
![Email Confirmation](https://github.com/fabian7593/EasyRestApiLand/blob/main/00/06.PNG?raw=true)

- **Email confirmation message**:
![Email Confirmation Message](https://github.com/fabian7593/EasyRestApiLand/blob/main/00/07.PNG?raw=true)

- **Login to get access token**:
![Login Response](https://github.com/fabian7593/EasyRestApiLand/blob/main/00/08.PNG?raw=true)

- **Refresh access token without login**:
![Refresh Token](https://github.com/fabian7593/EasyRestApiLand/blob/main/00/09.PNG?raw=true)

### Logs
- **Save traceability of methods and errors**:
![Logs](https://github.com/fabian7593/EasyRestApiLand/blob/main/00/11.PNG?raw=true)

### Notifications
- **Manage notifications and send them to users**:
![Notifications](https://github.com/fabian7593/EasyRestApiLand/blob/main/00/12.PNG?raw=true)
![Send Notification](https://github.com/fabian7593/EasyRestApiLand

/blob/main/00/13.PNG?raw=true)

### Emails
- **Send emails to users**:
![Emails](https://github.com/fabian7593/EasyRestApiLand/blob/main/00/14.PNG?raw=true)
![Send Email](https://github.com/fabian7593/EasyRestApiLand/blob/main/00/15.PNG?raw=true)

### Documents
- **Manage documents and files**:
![Documents](https://github.com/fabian7593/EasyRestApiLand/blob/main/00/16.PNG?raw=true)
![Document Management](https://github.com/fabian7593/EasyRestApiLand/blob/main/00/17.PNG?raw=true)
![Document URLs](https://github.com/fabian7593/EasyRestApiLand/blob/main/00/18.PNG?raw=true)

## Developing New Endpoints and Modules
To develop new endpoints, follow these steps:

1. Create a new module or folder inside the `src` folder.
2. Create necessary files like controllers, services, routes, etc.
3. Add routes in the main `index.ts` file.
4. Use the existing structure as a guide to ensure consistency and maintainability.

For detailed instructions and examples, refer to the existing code and structure provided in the repository.



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
    * Then install the GenericController, if you need to change something into GenericController, you can create new controller and extends from GenericController, and then override the methods.
       ```bash
       const controller = new GenericController(Manufactures, controllerObj);
      ```

    * Into the routers methods, you need to instance the builder request handler and set as a param of all methods of controller, for example:
       ```bash
       route.get("/manufacture/get", async (req: Request, res: Response) => {
           const requestHandler : RequestHandler = 
                                   new RequestHandlerBuilder(res,req)
                                   .setAdapter(new ManufactureAdapter(req))
                                   .setMethod("getManufactureById")
                                   .isValidateRole()
                                   .isLogicalRemove()
                                   .build();
       
           controller.getById(requestHandler);
       });
      ```

* We need to explain all the methods of the Builder
  * .setAdapter(new ManufactureAdapter(req)): This method is required and send the specific adapter as a param.
  * .setMethod("getManufactureById"): This is the name of the respective method, we need to set it, because all the methods are so generics. Then for identified in case of error or something, need to set it.
  * .isValidateWhereByUserId(): validate if the table have user id, for example if the table is linked with a user id, and just this user can change the information of this object.
  * .isValidateRole(): If the method need to validate roles permissions.
  * .isLogicalRemove(): If the table have "is_deleted" field, add this method for do a logical remove, if not add this method, the remove is complete into DB.
  * .setFilters(filters): If the endpoint get multiple responses, you can set filters into url params, like this:
      ```bash
        const countryParam : string | null = getUrlParam("country", req) || null;
        const industryParam : string | null = getUrlParam("industry_type", req) || null;
    
        const filters: FindManyOptions = {};
        if(industryParam != null){
            filters.where = { ...filters.where, udcIndustryType: industryParam};
        }
    
        if(countryParam != null){
            filters.where = { ...filters.where, countryIsoCode: countryParam};
        }
      ```
  * .setRegexValidation(regexValidationList): If the endpoint is post or put, or need to send something into body json, and validate regular expression, need to set it, like this:
     ```bash
        const regexValidationList: [string, string][] = [
          ['EMAIL_REGEX', req.body.email as string]
        ];
      ```
* For validate the required fields into body json for insert entities, use the validateRequiredBodyJson method, into -> https://github.com/fabian7593/EasyRestApiLand/blob/main/src/Helpers/Validations.ts
  Add into this method, something like this:
  ```bash
      else if(validateEndPoint == "MANUFACTURE_CREATE"){
          if (!this.req.body.name || !this.req.body.industry_type) {
              hasRequiredFields = false;
          }
      }
  ```

  * And for the last one step, we need to set the router into index.ts, like this:
  ```bash
      import ManufactureRouter from './Entities/test/ManufactureRouter';
      app.use(ManufactureRouter);
  ```

   * And then run: "npm run dev" for start the server and testing into postman.





---

For further details and updates, visit the [GitHub repository](https://github.com/fabian7593/EasyRestApiLand).
