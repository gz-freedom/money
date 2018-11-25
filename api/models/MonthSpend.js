const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

let SpendItem = new Schema({
    name: {
        type: String
    },
    price: {
        type: Number
    },
    note: {
        type: String
    }
});

let DaySpend = new Schema({
    day: {
        type: Number
    },
    dayLeft: {
        type: Number
    },
    dayNote: {
        type: String
    },
    items: [SpendItem]
});

let MonthSpend = new Schema({
    year: {
        type: Number
    },
    month: {
        type: Number
    },
    days: {
        type: Number
    },
    total: {
        type: Number
    },
    dayTotal: {
        type: Number
    },
    monthNote: {
        type: String
    },
    dayExpenditure: [DaySpend]
}, {
    collection: 'monthExpenditures'
});

module.exports = mongoose.model('MonthSpend', MonthSpend);