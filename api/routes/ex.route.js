const express = require('express'),
    exRoutes = express.Router();

let MonthSpend = require('../models/MonthSpend');

exRoutes.route('/').get((req, res) => {
    let y = req.query.year;
    let m = req.query.month;
    MonthSpend.find((err, data) => {
        if(err) {
            console.log(err)
        } else {
            res.json(data);
        }
    }).$where(function(d) {
        return d.year === y && d.month === m;
    });
});

module.exports = exRoutes;