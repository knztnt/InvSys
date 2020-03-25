

# Inventory Management System

> InvSys is the web application for inventory management system
> Department Inventory where students borrow components for their
> projects.


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
USE invsys;
CREATE TABLE users (
	username VARCHAR(10),
	password TEXT,
	PRIMARY KEY(username)
);
DESCRIBE users;
```

In InvSys/database/db.js (Line 3),
set your MySQL database username and password as follows.
Default values are, username: 'root' and password: ''.
```js
const  sequelize = new Sequelize('invsys', 'username', 'password', {
    host: 'localhost',
    dialect: 'mysql',
	    pool: {
		    max: 5,
		    min: 0,
		    acquire: 30000,
		    idle: 10000
	    }
    });
```
## Powered by

 - nodejs
 - React
 - MySQL
 
## Dependencies

> ### Server side
>  - bcrypt
>  - body-parser
>  - cors
>  - express
>  - jsonwebtoken
>  - mysql
>  - mysql2
>  - sequelize
>  ### Client side
>  - axios
>  - bootswatch
>  - jwt-decode
>  - react
>  - react-dom
>  - react-router-dom
>  - react-scripts
>  ### Developer dependencies
>  - nodemon
>  - concurrently

 

## Documentation



## Deployment


## Author

 - knztnt Solutions 	-	[http://knztnt.github.io](http://knztnt.github.io)

## Contributors

 - [Chamin Jayasooriya](https://github.com/chamin96)
 - [Anandi Karunaratne](https://github.com/AnandiKarunaratne)
 - [Devin Gallage](https://github.com/Kulanjith)
