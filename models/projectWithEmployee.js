'user strict';

const {db_read} = require('../config/db');

// Project with Employee object constructor
const ProjectWithEmployee = data => {
    this.PROJECT_ID = data.PROJECT_ID;
    this.EMPLOYEE_ID = data.EMPLOYEE_ID;
    this.PROJECT_WITH_EMPLOYEE_ID = data.PROJECT_WITH_EMPLOYEE_ID;
};

ProjectWithEmployee.findById = function getProjectWithEmployee(projectWithEmployeeId, result) {
    db_read.query('Select * from project_with_employees JOIN employee On project_with_employees.EMPLOYEE_ID = employee.EMPLOYEE_ID where project_with_employees.PROJECT_WITH_EMPLOYEE_ID = ' + projectWithEmployeeId, function (err, res) {
        if (err) {
            result(err, null);
        } else {
            result(null, res[0]);
        }
    });
};

module.exports = ProjectWithEmployee;
