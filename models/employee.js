'user strict';

const {db_read} = require('../config/db');

// Employee object constructor
const Employee = data => {
    this.EMPLOYEE_NAME = data.EMPLOYEE_NAME;
    this.STATUS = data.STATUS;
    this.BIRTHDAY = data.BIRTHDAY;
    this.PROJECTS_DONE = data.PROJECTS_DONE;
    this.EMPLOYED_SINCE = data.EMPLOYED_SINCE;
    this.EMPLOYEE_ID = data.EMPLOYEE_ID;
};

Employee.findById = function getEmployee(employeeId, result) {
    db_read.query('Select * from employee where employee.EMPLOYEE_ID = ' + employeeId, function (err, res) {
        if (err) {
            result(err, null);
        } else {
            result(null, res[0]);
        }
    });
};

module.exports = Employee;
