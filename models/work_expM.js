const Schema = require('mongoose').Schema;
const db = require('../config/db');

const Work_Exp = db.model('Work_Exp', {
    position_name: String,
    business_name: String,
    about: String,
    date: String,
    d3_model_name: String
});

module.exports = Work_Exp;