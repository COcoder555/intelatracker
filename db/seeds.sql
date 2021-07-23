USE personneldb; 

INSERT department (name)
VALUES ("Human Resources"),("Research and Development"),("Sales"),
("Accounting"),("Legal"),("Engineering");


INSERT role (title, salary, department_id)
VALUES ("Manager",100000,2),("Admin",80000,1),("Researcher",50000,2),("Sales Assocaiate",60000,3),
("Accountant",80000,4),("Inside Council",200000,5),("Engineer",900000,6);

INSERT employee (first_name,last_name,role_id,manager_id)
VALUES ("Sara","Slightworth",1,null), ("Bob","Builderschmit",2,1);