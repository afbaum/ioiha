const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);

const config = require('./config');
const router = require('./routes');

//mongodb connection
//mongoose.connect('mongodb://localhost/hearingaids')
mongoose.connection.openUri(`mongodb://${config.db.username}:${config.db.password}@${config.db.host}/${config.db.dbName}`);
const db = mongoose.connection;
//mongo error
db.on('error', console.error.bind(console, 'connection error:'));

require("./models/hearingaids.model.js");

const app = express();
const publicPath = path.resolve(__dirname, '../public');

app.use(express.static(publicPath));

app.use(bodyParser.json());

app.use('/api', router);

app.get('/', (req, res, next) => {
  res.render('index');
});

app.listen(config.port, function(){
  console.log(`${config.appName} is listening on port ${config.port}`);
});
