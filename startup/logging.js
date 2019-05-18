const winston = require('winston');
const config = require('config');
require('winston-mongodb');
require('express-async-errors');

module.exports = function () {
    const files = new winston.transports.File({ filename: 'logfile.log', level: 'info' });
    const myconsole = new winston.transports.Console({ colorize: true, prettyPrint: true });

    winston.add(myconsole);
    winston.add(files);

    process.on('unhandledRejection', (ex) => {
        throw ex;
    });
}