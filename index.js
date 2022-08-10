const inquirer = require('inquirer');
const db = require('./db/connection');
// const EmployeeDB = require('./db/index');
const cTable = require('console.table');


const mainMenu = () => {
    inquirer.prompt({
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
            "Update Employee Role"
        ]
    }).then ((answer) => {
        if (answer.choice === "View All Departments") {
            viewDepartments()
        }
        if (answer.choice === "View All Roles") {
            viewRoles()
        }
        if (answer.choice === "View All Employees") {
            viewEmployees()
        }
    })
}

const viewDepartments = () => {
    console.log("Viewing all departments")
    db.query("SELECT * FROM department;", [], (err, result) => {
    console.table(result)
    mainMenu()
    })
}

const viewRoles = () => {
    console.log("Viewing all roles")
    db.query("SELECT * FROM roles;", [], (err, result) => {
    console.table(result)
    mainMenu()
    })
}

const viewEmployees = () => {
    console.log("Viewing all employees")
    db.query("INSERT * INTO department;", [], (err, result) => {
    console.table(result)
    mainMenu()
    })
}


// const sql = `INSERT INTO movies (movie_name)
//     VALUES (?)`;
//   const params = [body.movie_name];
  
//   db.query(sql, params, (err, result) => {

mainMenu();