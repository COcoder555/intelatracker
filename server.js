const inquirer = require("inquirer");
const connect = require("./db/connection");
const util = require('util');
const { type } = require("os");
const { listenerCount } = require("events");
const { getUnpackedSettings } = require("http2");



connect.connect(async (err) => {
  if (err) throw err;
  console.log(`Welcome to Intelatracker ${connection.threadId}\n`);
  firstQuestion();
});

connect.query = util.promisify(connect.query);
const firstQuestion = async () => {
  try {
    const { userOption } = await inquirer.prompt([
      {
        name: 'userOption',
        type: 'list',
        message: 'What would you like to do?',
        choices: [
          'View all Emloyees',
          'View Employees by Department',
          'View Employees by Role',
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
    case 'View all Employees by Department':
      getALLDep();
      break;
    case 'View all Emplowyees by Role':
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
    case 'Update Emloyee Role':
      updateEMP();
      break;
  }
};

const getAllEMP = async () => {
  try {
    const employee = await connect.query('SELECT * FROM employee');
    console.table(employee);
    firstQuestion()
  } catch (err) {
    console.log(err);
  }
};

const getALLDep = async () => {
  try {
    const department = await connect.query('SELECT *FROM depatment');
    conssole.table(department);
    firstQuestion()
  } catch (err) {
    console.log(err);
  }
};

const getALLRole = async () => {
  try {
    const role = await connect.query('SELECT * FROM role');
    console.table(role);
    firstQuestion()
  } catch (err) {
    console.log(err)
  }
};


const addEMP = () => {
  connect.query('SELECT title, id FROM role', async (err, posistions) => {
    if (err) throw err;
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
          choices: positions.map(title => ({ name: title.title, value: title.id }))

        }
      ]);
      const query = 'INSERT INTO employee(first_name,last_name,role_id,manager) VALUES(?,?,?,1)';
      connect.query(query, [Useranswer.first_name, Useranswer.last_name, Useranswer.role_id], (err, result) => {
        if (err) throw err;
        console.log('Employee succesfully added!', result);
        firstQuestion();
      });
    } catch (err) {
      console.log(err);
      connect.end();

    }
  });

}
const addRole = () => {
  connect.query('SELECT title, id FROM role', async (err, roles) => {
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
      connect.query(query, [title, parseINT(salary), departmentID], (err, result) => {
        if (err) throw err;
        console.log('Succsessfully added new role!', result)
        firstQuestion();
      });
    } catch (err) {
      console.log(err)
      connect.end();
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
    connect.query('INSERT INTO department(name) VALUES(?)', newDept.name);
    console.log(`Succsessfully added new Department ${newDept.name}`);
    firstQuestion();
  } catch (err) {
    console.log(err);
    connect.end();
  }
}

const updateEMP = async () => {
  const Employees = await connect.query('SELECT first_name, last_name, id FROM employee')
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
        choices: ['First Name', 'Last Name', 'Role', 'Salary', 'Department']
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
        connect.query(`UPDATE employee SET first_name = ? WHERE id= ?`, [first_name, update.EMP]);
        break
      case "Last Name":
        const { last_name } = await inquirer.prompt([
          {
            name: " last_name",
            type: "input",
            message: " What would you like to update the Last Name to?"
          }
        ]);
        connect.query(`UPDATE employee SET last_name =? WHERE id =?`, [last_name, update.EMP]);
        break
      case "Role":
        const { role } = await inquirer.prompt([
          {
            name: "Role",
            type: 'input',
            message: "What would you like to update the Role to?"
          }
        ]);
        connect.query(`UPDATE employee SET role = ? WHERE id =?`, [role, update.EMP])
        break
      case "Salary":
        const {salary} = await inquirer.prompt([
          {
            name: "salary",
            type:'input',
            message:" What is the updated salary?"

          }
        ]);
        connect.query(`UDATE employee SET salary =? WHERE id=?`,[salary,update.EMP])
        break
      case "Department":
        const {department} = await inquirer.prompt([
          {
            name: "department",
            type: "input",
            message:"What is the updated department?"
             
          }
        ]);
        
        break
    };

    console.log('finished');
    firstQuestion();

  } catch (err) {
    console.log(err);
    connect.end();
  }
}