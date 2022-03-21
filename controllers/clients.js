const {db_read} = require('../config/db');
const Client = require('../models/client');

/**
 * Returns all projects
 * @param req
 * @param res
 * @returns {*}
 */
function clients(req, res) {
    db_read.query('SELECT * FROM client',
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

function getNumberOfProjectsPerClient(req, res) {
    db_read.query('SELECT client.*, count(client.CLIENT_ID) as NUMBER_OF_PROJECTS from client inner join project on (project.CLIENT_ID = client.CLIENT_ID) group by project.CLIENT_ID',
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

function addClient(req, res) {
    db_read.query('INSERT INTO client (CLIENT_ID, CLIENT_NAME, CITY, COUNTRY) VALUES (NULL,' + JSON.stringify(req.body.CLIENT_NAME) + ', ' + JSON.stringify(req.body.CITY) + ', ' + JSON.stringify(req.body.COUNTRY) + ')',
        null, (err, response, fields) => {
            if (!err) {
                Client.findById(response.insertId, (clientErr, clientResponse) => {
                    res.json({
                        message: "success",
                        data: clientResponse
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

function editClient(req, res) {
    db_read.query('UPDATE client SET CLIENT_NAME = ' + JSON.stringify(req.body.CLIENT_NAME) + ', CITY = ' + JSON.stringify(req.body.CITY) + ', COUNTRY = ' + JSON.stringify(req.body.COUNTRY) + ' WHERE client.CLIENT_ID = ' + req.params.id,
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

function detachProjectFromClient(req, res) {
    db_read.query('UPDATE project SET CLIENT_ID = NULL WHERE project.PROJECT_ID = ' + req.params.id,
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

function attachProjectToClient(req, res) {
    db_read.query('UPDATE project SET CLIENT_ID = ' + req.body.CLIENT_ID + ' WHERE project.PROJECT_ID = ' + req.params.id,
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

function getClientWithProjects(req, res) {
    Client.findById(req.params.id, (clientErr, clientResponse) => {
        if (!clientErr) {
            db_read.query('SELECT * FROM project JOIN client ON project.CLIENT_ID = client.CLIENT_ID WHERE project.CLIENT_ID = ' + req.params.id,
                null, (err, response, fields) => {
                    clientResponse.projects = response;
                    if (!err) {
                        res.json({
                            message: "success",
                            data: clientResponse
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
function deleteClient(req, res) {
    db_read.query("DELETE FROM client WHERE client.CLIENT_ID = " + req.params.id,
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
    clients,
    addClient,
    getClientWithProjects,
    editClient,
    detachProjectFromClient,
    attachProjectToClient,
    getNumberOfProjectsPerClient,
    deleteClient
};
