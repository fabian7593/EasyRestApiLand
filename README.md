[![alt tag](https://github.com/fabian7593/EasyRestApiLand/blob/main/00/logo.png)](https://github.com/fabian7593/EasyRestApiLand)

# Easy RestApi Land
A node js with typescript and express js project that increases the development speed of rest apis backends by 30 or 40% includes document management, logs, users and roles, sending emails, among others.
<br>
<br>
# Contents
<br>

## Getting Started
We need to install necessary packages to use this framework.
## Install Node
* curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash
* nvm install 20.5.0
* nvm use 20.5.0
* nvm alias default 20.5.0
* node -v
* npm --version - 6.14.4
  
## Create Project and Install packages
* mkdir myproject
* cd myproject
* npm init -y
* npm install express axios dotenv aws-sdk cors mariadb nodemailer jsonwebtoken multer
* npm install typescript
* npm install ts-node-dev --save-dev


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

## Install packages typescript
* npm install @‌types/express -D
* npm install @‌types/cors -D
* npm i --save-dev @‌types/multer
* npm install mariadb @‌types/mariadb -D
* npm i --save-dev @types/nodemailer

## Run Scripting
* Run the sql files in order on your MariaDb or MySQL.
* https://github.com/fabian7593/EasyRestApiLand/tree/main/dbScripting
* Install these libraries
   * npm install -g typeorm@0.2.34
   * npm install -g typeorm-model-generator@0.4.6
* Copy File ormConfig in the root of the project
  * https://github.com/fabian7593/EasyRestApiLand/blob/main/ormconfig.js
* Run
  * typeorm-model-generator -h localhost -d easy_api_land_db -p 3307 -u root -x "" -e mysql -o ./models_type_orm

## RUN
* npm run dev


