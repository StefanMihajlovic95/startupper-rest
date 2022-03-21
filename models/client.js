'user strict';

const {db_read} = require('../config/db');

// Employee object constructor
const Client = data => {
    this.CLIENT_ID = data.CLIENT_ID;
    this.CLIENT_NAME = data.CLIENT_NAME;
    this.CITY = data.CITY;
    this.COUNTRY = data.COUNTRY;
};

Client.findById = function getClient(clientId, result) {
    db_read.query('Select * from client where client.CLIENT_ID = ' + clientId, function (err, res) {
        if (err) {
            result(err, null);
        } else {
            result(null, res[0]);
        }
    });
};

module.exports = Client;
