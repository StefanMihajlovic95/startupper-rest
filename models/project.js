'user strict';

const { db_read } = require('../config/db');

// User object constructor
const Project = data => {
    this.PROJECT_ID = data.PROJECT_ID;
    this.CLIENT_ID = data.CLIENT_ID;
    this.FINANCE_ID = data.FINANCE_ID;
    this.PROJECT_NAME = data.PROJECT_NAME;
    this.DESCRIPTION = data.DESCRIPTION;
    this.START_DATE = data.START_DATE;
    this.END_DATE = data.END_DATE;
};

Project.findById = function getProject(projectId, result) {
    db_read.query('Select * from project LEFT JOIN finance On finance.FINANCE_ID = project.FINANCE_ID LEFT JOIN client on client.CLIENT_ID = project.CLIENT_ID where PROJECT_ID = ' + projectId, function (err, res) {
        if(err) {
            result(err, null);
        } else{
            result(null, res[0]);
        }
    });
};

module.exports = Project;
