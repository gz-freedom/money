const express = require('express'),
    exRoutes = express.Router();

let MonthSpend = require('../models/MonthSpend');

exRoutes.route('/').get((req, res) => {
    MonthSpend.find((err, data) => {
        if(err) {
            console.log(err)
        } else {
            res.json(data);
        }
    });
});

module.exports = exRoutes;