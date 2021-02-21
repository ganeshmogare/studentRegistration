  const mongoose = require('mongoose');
  const http = require('http');
  const Promise = require('bluebird');
  
  process.on('unhandledRejection', err => console.error(err));
  
  const mongooseOptions = {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  };
  
  mongoose.Promise = global.Promise;
  const dbUrl = "mongodb://localhost:27017/students-courses"
  mongoose.connect(dbUrl, mongooseOptions);
  const db = mongoose.connection;
  
  db.on('error', function (err) {
    console.error('Mongoose error', err);
  });
  
  db.once('open', async function () {
    global.byjus = {};
    const port = process.env.PORT || 5000;

    require('./models');
    const setupServer = require('./app');
    const app = setupServer();
    const server = http.createServer(app).listen(port);
  
    // console.info('Connected to db', config.db);
    console.info('Application started on port', port);
  });
  