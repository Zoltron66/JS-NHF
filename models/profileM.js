const Schema = require('mongoose').Schema;
const db = require('../config/db');

const Prof = db.model('Prof', {
    name: String,
    info: String
});

module.exports = Prof;