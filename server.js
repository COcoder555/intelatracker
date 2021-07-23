const inquirer = require("inquirer");
const connection = require("./db/connection");
console.log(`Welcome to Intelatracker ${connection.threadId}\n`);

const firstQuestion = async () => {
  try {
    const { userOption } = await inquirer.prompt([
      {
        name: 'userOption',
        type: 'list',
        message: 'What would you like to do?',
        choices: [
          'View all Employees',
          'View Departments',
          'View Roles',
          'Add Employee',
          'Add Role',
          'Add Department',
          'Update Employee',

        ],
      }
    ]);
    userChoice(userOption);
  } catch (err) {
    console.log(err);

  }
}


const userChoice = (userOption) => {
  switch (userOption) {
    case 'View all Employees': 
       getAllEMP();
      break;
    case 'View Departments':
      getALLDep();
      break;
    case 'View Roles':
      getALLRole();
      break;
    case 'Add Employee':
      addEMP();
      break;
    case 'Add Role':
      addRole();
      break;
    case 'Add Department':
      addDept();
      break;
    case 'Update Employee':
      updateEMP();
      break;
  }
};

const getAllEMP = async () => {
  try {
    const employee = await connection.query('SELECT * FROM employee INNER JOIN role ON employee.role_id = role.id');
    console.table(employee);
    firstQuestion()
  } catch (err) {
    console.log(err);
  }
};

const getALLDep = async () => {
  try {
    const department = await connection.query('SELECT * FROM department');
    console.table(department);
    firstQuestion()
  } catch (err) {
    console.log(err);
  }
};

const getALLRole = async () => {
  try {
    const role = await connection.query('SELECT * FROM role');
    console.table(role);
    firstQuestion()
  } catch (err) {
    console.log(err)
  }
};


const addEMP = async() => {
const post = await connection.query('SELECT title, id FROM role')
    try {
      const Useranswer = await inquirer.prompt([
        {
          name: 'first_name',
          message: "What is the emloyee's first name?",
          type: 'input'
        },
        {
          name: 'last_name',
          message: "What is the employee's last name?",
          type: 'input'
        },
        {
          name: 'role_id',
          message: "What is the employee's role?",
          type: 'list',
          choices: post.map(title => ({ name: title.title, value: title.id }))

        }
      ]);
      const query = 'INSERT INTO employee(first_name,last_name,role_id,manager_id) VALUES(?,?,?,1)';
      connection.query(query, [Useranswer.first_name, Useranswer.last_name, Useranswer.role_id], (err, result) => {
        if (err) throw err;
        console.log('Employee succesfully added!', result);
        firstQuestion();
      });
    } catch (err) {
      console.log(err);
      connection.end();

    }
}
const addRole = () => {
  connection.query('SELECT title, id FROM role', async (err, roles) => {
    if (err) throw err;
    try {
      const { title, salary, departmentID } = await inquirer.prompt([
        {
          name: 'title',
          message: 'What is the title of the new role?',
          type: 'input'
        },
        {
          name: 'salary',
          message: 'What is the salary of the new role?',
          type: 'input'

        },
        {
          name: 'departmentID',
          message: 'What is the department ID of the new role?',
          type: 'list',
          choices: roles.map(options => ({ name: options.name, value: options.id }))

        }

      ]);
      const query = 'INSERT INTO role(title,salary,department_id) VALUES(?,?,?)';
      connection.query(query, [title, salary, departmentID], (err, result) => {
        if (err) throw err;
        console.log('Succsessfully added new role!', result)
        firstQuestion();
      });
    } catch (err) {
      console.log(err)
      connection.end();
    }
  });
}
const addDept = async () => {
  try {
    const newDept = await inquirer.prompt([
      {
        name: "name",
        message: "What Department would you like to add?",
        type: 'input'
      }
    ]);
    connection.query('INSERT INTO department(name) VALUES(?)', newDept.name);
    console.log(`Succsessfully added new Department ${newDept.name}`);
    firstQuestion();
  } catch (err) {
    console.log(err);
    connection.end();
  }
}

const updateEMP = async () => {
  const Employees = await connection.query('SELECT first_name, last_name, id FROM employee')
  try {
    const update = await inquirer.prompt([
      {
        name: "EMP",
        message: "Please select an employee to update.",
        type: 'list',
        choices: Employees.map(employee => ({ name: `${employee.first_name}${employee.last_name}`, value: employee.id }))
      },
      {
        name: "col",
        message: "What would you like to update?",
        type: 'list',
        choices: ['First Name', 'Last Name', 'Role','Department']
      }
    ]);
    switch (update.col) {
      case "First Name":
        const { first_name } = await inquirer.prompt([
          {
            name: "first_name",
            type: 'input',
            message: "What would you like to update the First Name to?"


          }
        ]);
        connection.query(`UPDATE employee SET first_name = ? WHERE id= ?`, [first_name, update.EMP]);
        break
      case "Last Name":
        const { last_name } = await inquirer.prompt([
          {
            name: "last_name",
            type: "input",
            message: "What would you like to update the Last Name to?"
          }
        ]);
        connection.query(`UPDATE employee SET last_name =? WHERE id =?`, [last_name, update.EMP]);
        break
      case "Role":
        const { role } = await inquirer.prompt([
          {
            name: "role",
            type: 'input',
            message: "What would you like to update the Role to?"
          }
        ]);
        connection.query(`UPDATE employee SET role_id = ? WHERE id =?`, [parseInt(role), update.EMP])
        break
      case "Department":
        const {department} = await inquirer.prompt([
          {
            name: "department",
            type: "input",
            message:"What is the updated department?"
             
          }
        ]);
        connection.query(`UPDATE employee SET salary = ? WHRER id =?`[department,update.EMP])

        break
    };

    console.log('finished');
    firstQuestion();

  } catch (err) {
    console.log(err);
    connection.end();
  }
}


console.log(`Welcome to Intelatracker ${connection}\n`);
firstQuestion();