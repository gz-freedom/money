const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

let SpendItem = new Schema({
    name: {
        type: String
    },
    price: {
        type: Number
    }
});

let DaySpend = new Schema({
    dayLeft: {
        type: Number
    },
    dayNote: {
        type: String
    },
    items: SpendItem
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
    dayExpenditure: DaySpend
}, {
    collection: 'monthExpenditures'
});

module.exports = mongoose.model('MonthSpend', MonthSpend);