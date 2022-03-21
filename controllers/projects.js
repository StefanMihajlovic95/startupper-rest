const {db_read} = require('../config/db');
const ProjectModel = require('../models/project');

/**
 * Returns all projects
 * @param req
 * @param res
 * @returns {*}
 */
function projects(req, res) {
    db_read.query('SELECT * FROM project left JOIN finance On project.FINANCE_ID = finance.FINANCE_ID left JOIN client On project.CLIENT_ID = client.CLIENT_ID',
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

function createFinanceAndProject(req, res) {
    db_read.query('INSERT INTO finance (FINANCE_ID, PROJECT_PRICE, PROJECT_PAID, IS_PROJECT_PAID) VALUES (NULL,' + req.body.PROJECT_PRICE + ',' + req.body.PROJECT_PAID + ',' + null + ')',
        null, (err, financeResponse, fields) => {
            if (!err) {
                db_read.query('INSERT INTO project (PROJECT_ID, CLIENT_ID, FINANCE_ID, PROJECT_NAME, DESCRIPTION, START_DATE, END_DATE, PAYMENT_CURRENCY) VALUES' +
                    ' (NULL, ' + req.body.CLIENT_ID + ', ' + financeResponse.insertId + ', ' + JSON.stringify(req.body.PROJECT_NAME) + ', '
                    + JSON.stringify(req.body.DESCRIPTION) + ', ' + JSON.stringify(req.body.START_DATE) + ', ' + JSON.stringify(req.body.END_DATE) + ', ' + JSON.stringify(req.body.CURRENCY) + ')',
                    null, (err, projectResponse, fields) => {
                        if (!err) {
                            ProjectModel.findById(projectResponse.insertId, (singleProjectErr, singleProjectRes) => {
                                res.json({
                                    message: "success",
                                    data: singleProjectRes
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

function singleProjectWithEmployees(req, res) {
    ProjectModel.findById(req.params.id, (err, response) => {
        var projectToRet = response;
        if (!err && response) {
            db_read.query('SELECT * FROM project LEFT JOIN project_with_employees On project_with_employees.PROJECT_ID = project.PROJECT_ID' +
                ' JOIN employee On project_with_employees.EMPLOYEE_ID = employee.EMPLOYEE_ID' +
                ' where project.PROJECT_ID = ' + req.params.id,
                null, (err, response, fields) => {
                    projectToRet.EMPLOYEES = response;
                    if (!err) {
                        res.json({
                            message: "success",
                            data: projectToRet
                        });
                    } else {
                        res.status(500).send({
                            error: 'Internal server error',
                            message: 'Something went wrong, try again in few minutes'
                        });
                    }
                });
        }
    });
}

function editProjectAndFinance(req, res) {
    db_read.query("UPDATE project JOIN finance On finance.FINANCE_ID = project.FINANCE_ID SET PROJECT_NAME =" + JSON.stringify(req.body.name) +
        ", DESCRIPTION = " + JSON.stringify(req.body.description) +
        ", START_DATE = " + JSON.stringify(req.body.start_date) +
        ", END_DATE = " + JSON.stringify(req.body.end_date) +
        ", PROJECT_PRICE = " + JSON.stringify(req.body.project_price) +
        ", PROJECT_PAID = " + JSON.stringify(req.body.project_paid) +
        " WHERE project.PROJECT_ID =" + req.params.id,
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

function changeProjectPayment(req, res) {
    db_read.query("UPDATE project JOIN finance On finance.FINANCE_ID = project.FINANCE_ID SET PROJECT_PAID = " + JSON.stringify(req.body.project_paid) + ','
        + "IS_PROJECT_PAID = " + req.body.is_project_paid +
        " WHERE project.PROJECT_ID =" + req.params.id,
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

function deleteProject(req, res) {
    db_read.query("DELETE FROM project WHERE project.PROJECT_ID = " + req.params.id,
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
    projects,
    singleProjectWithEmployees,
    editProjectAndFinance,
    createFinanceAndProject,
    changeProjectPayment,
    deleteProject
};
