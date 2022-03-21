const {db_read} = require('../config/db');
const Employee = require('../models/employee');
const ProjectWithEmployee = require('../models/projectWithEmployee');

function getAllEmployees(req, res) {
    db_read.query('SELECT * FROM employee',
        null, (err, response, fields) => {
            if (!err) {
                res.json({
                    message: "success",
                    data: response
                });
            } else {
                res.status(500).send({
                    error: 'Internal server error',
                    message: 'Something went wrong, try again in few minutes'
                });
            }
        });

}

function singleEmployee(req, res) {
    Employee.findById(req.params.id, (err, response) => {
        if (!err) {
            res.json({
                message: "success",
                data: response
            });
        } else {
            res.status(500).send({
                error: 'Internal server error',
                message: 'Something went wrong, try again in few minutes'
            });
        }
    });
}

function editEmployee(req, res) {
    db_read.query("UPDATE employee SET EMPLOYEE_NAME = " + JSON.stringify(req.body.EMPLOYEE_NAME) +
        ", STATUS = " + JSON.stringify(req.body.STATUS) +
        ", BIRTHDAY = " + JSON.stringify(req.body.BIRTHDAY) +
        ", PROJECTS_DONE = " + JSON.stringify(req.body.PROJECTS_DONE) +
        ", EMPLOYED_SINCE = " + JSON.stringify(req.body.EMPLOYED_SINCE) +
        " WHERE employee.EMPLOYEE_ID =" + req.params.id,
        null, (err, response) => {
            if (!err) {
                res.json({
                    message: "success",
                    data: response
                });
            } else {
                res.status(500).send({
                    error: 'Internal server error',
                    message: 'Something went wrong, try again in few minutes'
                });
            }
        });
}

function addNewEmployeeAndLinkWithProject(req, res) {
    db_read.query('INSERT INTO employee (EMPLOYEE_NAME, STATUS, BIRTHDAY, PROJECTS_DONE, EMPLOYED_SINCE, EMPLOYEE_ID) VALUES (' + JSON.stringify(req.body.EMPLOYEE_NAME)
        + ',' + JSON.stringify(req.body.STATUS) + ',' + JSON.stringify(req.body.BIRTHDAY) + ',' + JSON.stringify(req.body.PROJECTS_DONE) + ',' + JSON.stringify(req.body.EMPLOYED_SINCE) + ',NULL)',
        null, (err, response, fields) => {
            if (!err) {
                db_read.query('INSERT INTO project_with_employees (PROJECT_WITH_EMPLOYEE_ID, EMPLOYEE_ID, PROJECT_ID) VALUES (NULL,' + response.insertId + ',' + req.body.PROJECT_ID + ')',
                    null, (emplErr, emplResponse, fields) => {
                        if (!emplErr) {
                            ProjectWithEmployee.findById(emplResponse.insertId, (prjErr, prjResponse) => {
                                res.json({
                                    message: "success",
                                    data: prjResponse
                                });
                            });
                        } else {
                            res.status(500).send({
                                error: 'Internal server error',
                                message: 'Something went wrong, try again in few minutes'
                            });
                        }
                    });
            } else {
                res.status(500).send({
                    error: 'Internal server error',
                    message: 'Something went wrong, try again in few minutes'
                });
            }
        });
}

function deleteEmployee(req, res) {
    db_read.query("DELETE FROM employee WHERE employee.EMPLOYEE_ID = " + req.params.id,
        null, (err, response, fields) => {
            if (!err) {
                res.json({
                    message: "success",
                    data: response
                });
            } else {
                res.status(500).send({
                    error: 'Internal server error',
                    message: 'Something went wrong, try again in few minutes'
                });
            }
        });
}

function addNewEmployee(req, res) {
    db_read.query('INSERT INTO employee (EMPLOYEE_NAME, STATUS, BIRTHDAY, PROJECTS_DONE, EMPLOYED_SINCE, EMPLOYEE_ID) VALUES (' + JSON.stringify(req.body.EMPLOYEE_NAME)
        + ',' + JSON.stringify(req.body.STATUS) + ',' + JSON.stringify(req.body.BIRTHDAY) + ',' + JSON.stringify(req.body.PROJECTS_DONE) + ',' + JSON.stringify(req.body.EMPLOYED_SINCE) + ',NULL)',
        null, (err, response, fields) => {
            if (!err) {
                Employee.findById(response.insertId, (employeeErr, employeeResponse) => {
                    res.json({
                        message: "success",
                        data: employeeResponse
                    });
                });
            } else {
                res.status(500).send({
                    error: 'Internal server error',
                    message: 'Something went wrong, try again in few minutes'
                });
            }
        });
}

function addEmployeeToProject(req, res) {
    db_read.query('INSERT INTO project_with_employees (PROJECT_WITH_EMPLOYEE_ID, EMPLOYEE_ID, PROJECT_ID) VALUES (NULL,' + req.body.employee_id + ',' + req.body.project_id + ')',
        null, (err, response, fields) => {
            if (!err) {
                res.json({
                    message: "success",
                    data: response
                });
            } else {
                res.status(500).send({
                    error: 'Internal server error',
                    message: 'Something went wrong, try again in few minutes'
                });
            }
        });
}

function deleteEmployeeFromProject(req, res) {
    db_read.query('DELETE FROM project_with_employees WHERE project_with_employees.PROJECT_WITH_EMPLOYEE_ID = ' + req.params.id,
        null, (err, response, fields) => {
            if (!err) {
                res.json({
                    message: "success",
                    data: response
                });
            } else {
                res.status(500).send({
                    error: 'Internal server error',
                    message: 'Something went wrong, try again in few minutes'
                });
            }
        });

}

module.exports = {
    deleteEmployeeFromProject,
    getAllEmployees,
    addEmployeeToProject,
    addNewEmployee,
    addNewEmployeeAndLinkWithProject,
    deleteEmployee,
    editEmployee,
    singleEmployee
};
