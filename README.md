# Inventory Management System

> InvSys is the web application for inventory management system
> Department Inventory where students borrow components for their
> projects.

![Image](https://github.com/knztnt/InvSys/blob/master/client/src/navbar-logo-blue.png)

## Preview
[![Preview of InvSys](https://github.com/knztnt/InvSys/blob/gh-pages/Demo-InvSys.gif?raw=true)](https://www.youtube.com/watch?v=tKSnByDig_E)

## Quick Start

- Clone the repo: `$ git clone https://github.com/knztnt/InvSys.git`

     **or**

- [Download from Github](https://github.com/knztnt/InvSys/archive/master.zip)

### Running Locally

Navigate to root directory of the project.

```
   $ npm install
   $ cd client
   $ npm install
   $ cd ..
   $ npm run dev
```

### Database Connection Configuration

Run following script.
[InvSys.sql](https://gist.github.com/chamin96/4b507153b0ebee2f1b4d0a8d8f8a58de)

```sql
CREATE DATABASE invsys;
```

In InvSys/app/config/db.config.js (Line 3 and 4),
set your MySQL database username and password as follows.
Default values are, username: 'root' and password: ''.

```js
module.exports = {
  HOST: "localhost",
  USER: "root",
  PASSWORD: "",
  DB: "invsys",
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};
```
#### ! For the First Time running the Server 
In InvSys/app/server.js file, uncomment (29-32) lines and comment 26th line. This will initialize the database and sync all the tables.
Or simply replace exixting server.js file with following script.
Following script contains the server.js file when it is run initially.

[InvSys server file | Resets database to initial state](https://gist.github.com/chamin96/320548e02818752a8c545de2b4db4926)

## Powered by

- nodejs
- React
- MySQL

## Dependencies

> ### Server side
>
> - bcryptjs
> - body-parser
> - cors
> - express
> - jsonwebtoken
> - mysql2
> - sequelize
>
> ### Client side
>
> - axios
> - bootstrap
> - fontawesome
> - jwt-decode
> - prop-types
> - react
> - react-avatar
> - react-datepicker
> - react-dom
> - react-router-dom
> - react-scripts
> - react-validation
> - validator
>
> ### Developer dependencies
>
> - nodemon
> - concurrently

## Documentation

> - [Database Project Report](https://drive.google.com/file/d/1icETHglfJ0oSD3KXyziNj3D2A1N39fwc/view)
> - [Software Engineering Project Report](https://drive.google.com/file/d/18Bn6DQaMhoiQ5B5yE42CdZy5o8lluPG3/view)

## Deployment

## Author

- knztnt Solutions - [http://knztnt.github.io](http://knztnt.github.io)

## Contributors

- [Chamin Jayasooriya](https://github.com/chamin96)
- [Anandi Karunaratne](https://github.com/AnandiKarunaratne)
- [Devin Gallage](https://github.com/Kulanjith)
