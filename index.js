const inquirer = require("inquirer");
const db = require("./db/connection");
// const EmployeeDB = require('./db/index');
const cTable = require("console.table");

const mainMenu = () => {
  inquirer
    .prompt({
      type: "list",
      name: "choice",
      message: "What would you like to do?",
      choices: [
        "View All Departments",
        "View All Roles",
        "View All Employees",
        "Create New Department",
        "Create New Role",
        "Create New Employee",
        "Update Employee Role",
      ],
    })
    .then((answer) => {
      if (answer.choice === "View All Departments") {
        viewDepartments();
      }
      if (answer.choice === "View All Roles") {
        viewRoles();
      }
      if (answer.choice === "View All Employees") {
        viewEmployees();
      }
      if (answer.choice === "Create New Department") {
        createNewDept();
      }
      if (answer.choice === "Create New Role") {
        createNewRole();
      }
      if (answer.choice === "Create New Employee") {
        createNewEmployee();
      }
      if (answer.choice === "Update Employee Role") {
        updateRole();
      }
    });
};

const viewDepartments = () => {
  console.log("Viewing all departments");
  db.query("SELECT * FROM department;", [], (err, result) => {
    console.table(result);
    mainMenu();
  });
};

const viewRoles = () => {
  console.log("Viewing all roles");
  db.query("SELECT * FROM role;", [], (err, result) => {
    console.table(result);
    mainMenu();
  });
};

const viewEmployees = () => {
  console.log("Viewing all employees");
  db.query("SELECT * FROM employee;", [], (err, result) => {
    console.table(result);
    mainMenu();
  });
};
const createNewDept = () => {
  console.log("Create new department");
  inquirer
    .prompt([
      {
        type: "input",
        name: "deptName",
        message: "What is the name of the new department?",
      },
    ])
    .then((answer) => {
      db.query(
        "INSERT INTO department (name) VALUES (?);",
        [answer.deptName],
        (err, result) => {
          console.log("Successfully added department!");
          mainMenu();
        }
      );
    });
};
const createNewEmployee = () => {
  console.log("Create new employee");
  inquirer
    .prompt([
      {
        type: "input",
        name: "first_name",
        message: "What is the first name of the new employee?",
      },
      {
        type: "input",
        name: "last_name",
        message: "What is the last name of the new employee?",
      },
      {
        type: "input",
        name: "role_id",
        message: "What is the role id of the new employee?",
      },
      {
        type: "input",
        name: "manager_id",
        message: "What is the manager id of the new employee?",
      },
    ])
    .then((answer) => {
      db.query(
        "INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?);",
        [
          answer.first_name,
          answer.last_name,
          answer.role_id,
          answer.manager_id,
        ],
        (err, result) => {
          if (err) {
            console.log(err);
          }
          console.log("Successfully added employee!");
          mainMenu();
        }
      );
    });
};
const createNewRole = () => {
  console.log("Create new role");
  inquirer
    .prompt([
      {
        type: "input",
        name: "title",
        message: "What is the title of the new role?",
      },
      {
        type: "input",
        name: "salary",
        message: "What is the salary of the new role?",
      },
      {
        type: "input",
        name: "department_id",
        message: "What is the department id of the new role?",
      },
    ])
    .then((answer) => {
      db.query(
        "INSERT INTO role (title, salary, department_id) VALUES (?,?,?);",
        [answer.title, answer.salary, answer.department_id],
        (err, result) => {
          console.log("Successfully added role!");
          mainMenu();
        }
      );
    });
};
const updateRole = () => {
  db.query("SELECT * FROM employee;", [], (err, result) => {
    const employeeList = result.map((e) => {
      return {
        name: e.first_name + " " + e.last_name,
        value: e.id,
      };
    });

    console.log("Update employee role");
    inquirer
      .prompt([
        // {
        //   type: "input",
        //   name: "employee_id",
        //   message: "What is the id of the employee you want to update?",
        // },
        {
          type: "list",
          name: "employee_id",
          message: "What is the id of the employee you want to update?",
          choices: employeeList,
        },
        {
          type: "input",
          name: "role_id",
          message: "What is the new role id for this employee?",
        },
      ])
      .then((answer) => {
        db.query(
          "UPDATE employee SET role_id = (?) where id = (?);",
          [answer.role_id, answer.employee_id],
          (err, result) => {
            console.log("Successfully updated employee!");
            mainMenu();
          }
        );
      });
  });
};

mainMenu();
