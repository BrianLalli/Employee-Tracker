const inquirer = require('inquirer');
const connection = require('./db/connection');
const EmployeeDB = require('./db/index');
const cTable = require('console.table');
const { updateEmployeeRole } = require('./db/index');