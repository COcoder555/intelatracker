DROP DATABASE IF EXISTS personneldb;

CREATE DATABASE personneldb;

USE personneldb; 

CREATE TABLE department (
    id INT AUTO_INCREMENT PRIMARY KEY, 
    name VARCHAR(30)
);

CREATE TABLE role (
    id INT AUTO_INCREMENT PRIMARY KEY, 
    title VARCHAR(30),
    salary DECIMAL, 
    department_id INT, 
    FORIEGN KEY (department_id) REFERENCES deaprtment(id)
);

CREATE TABLE employee (
    id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INT,
    FORIEGN KEY (role_id) REFERENCES role(id),
    manager_id INT,
    FORIEGN KEY (manager_id) REFERENCES employee(id)
);