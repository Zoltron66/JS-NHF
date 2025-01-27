const Schema = require('mongoose').Schema;
const db = require('../config/db');

const Edu = db.model('Edu', {
    highest_title: String,
    institution_name: String,
    institution_location: String,
    date: String,
    d3_model_name: String
});

module.exports = Edu;