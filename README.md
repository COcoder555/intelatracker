# Intelatracker
This backe-end application manges and tracks employees and thier infromation by accessing a database that was created for the application.

### Built With :
* Node.js
* JavaScript
* mySQL2

### Instalation:
User should run npm start

## connection.js:
In here I required "mysql2" and  "util."  I also create a connection with "local host" and created a baseic fucnction if an error occurs to throw an error. Then I exported the connection.

## server.js:
I began by requiring "inquirer" and "./db/connection."  I then created a promt in a "try/catch" statement. The type of the promt was a "list" which I created seven options for the user to chose from and those were as follows: 
          View all Employees,
          View Departments,
          View Roles,
          Add Employee,
          Add Role',
          Add Department,
          Update Employee

After that I created a "switch" statement that corrisponded with each of the possible user choices.  I then created functions and queries that acceesed and manipulated data from the data base.  Each function created corrisponded with a possible user choice. 

[Walk Through Video](https://drive.google.com/file/d/1p6d-dovWcMoKy2ekYdBdDegMJnEDp9zg/view?usp=sharing)

