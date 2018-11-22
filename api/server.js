const express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    cors = require('cors'),
    mongoose = require('mongoose'),
    config = require('./DB'),
    exRoutes = require('./routes/ex.route')
    port = process.env.port || 4000;

mongoose.Promise = global.Promise;
mongoose.connect(config.DB, { useNewUrlParser: true }).then(
    () => { console.log('Database is connected'); },
    err => { console.log('Can not connect to the database ' + err); }
);

app.use(bodyParser.json());
app.use(cors());
app.use('/', exRoutes);

app.listen(port, () => {
    console.log('Listening on port ' + port);
})