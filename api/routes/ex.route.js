const express = require('express'),
    exRoutes = express.Router();

let MonthSpend = require('../models/MonthSpend');

exRoutes.route('/').get((req, res) => {
    let y = req.query.year;
    let m = req.query.month;
    MonthSpend.findOne((err, data) => {
        if(err) {
            console.log(err)
        } else {
            res.json(data);
        }
    }).where({ "year": y, "month": m });
});

exRoutes.route('/addMonth').post((req, res) => {
    let spend = new MonthSpend(req.body);
    console.log(spend);
    spend.save().then(spend => {
        res.status(200).json(spend);
    }).catch(err => {
        res.status(400).send("unable to save to database.");
    });
});

exRoutes.route('/update/:id').post((req, res) => {
    MonthSpend.findById(req.params.id, (err, spend) => {
        if(!spend) {
            return next(new Error('Could not load Document'));
        } else {
            if(!spend.dayExpenditure) {
                spend.dayExpenditure = [req.body.dayExpenditure];
                spend.save().then(data => {
                    res.json(data);
                });
            } else {
                let isExist = false, i, len;
                for(i = 0, len = spend.dayExpenditure.length; i < len; i++){
                    if(spend.dayExpenditure[i].day === req.body.dayExpenditure.day) {
                        isExist = true;
                        spend.dayExpenditure[i] = req.body.dayExpenditure;
                        break;
                    }
                }
                if(isExist) {
                    // save
                    spend.save().then(data => {
                        res.json(data);
                    });
                } else {
                    // insert
                    spend.updateOne({}, { $push: { "dayExpenditure": releaseEvents.body.dayExpenditure } })
                        .then(data => {
                            console.log('updated');
                            console.log(data);
                        });
                }
                
                /*
                console.log(spend);
                spend.updateOne({ "dayExpenditure.$.day": req.body.dayExpenditure.day }, {
                    $set: { 
                        "dayExpenditure.$.dayLeft": req.body.dayExpenditure.dayLeft, 
                        "dayExpenditure.$.items": req.body.dayExpenditure.items 
                    } 
                })
                    .then(data => {
                        console.log(data);
                    });
                */
            }
        }
    }).catch(err => {
        res.status(400).send('Unable to update the database');
    });
});

module.exports = exRoutes;