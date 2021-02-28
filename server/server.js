const http = require("http");

const DBHelper = require("./dbUtils/dbHelper");
const StudentsDBHelper = require('./dbUtils/studentsDbHelper');
const CoursesDBHelper = require('./dbUtils/coursesDbHelper');
const SubscriptionsDBHelper = require('./dbUtils/subscriptionsDbHelper');

const app = require("./app");

const dao = new DBHelper('./students-courses.db');
const students = new StudentsDBHelper(dao);
const courses = new CoursesDBHelper(dao);
const subscriptions = new SubscriptionsDBHelper(dao);
global = {
  students,
  courses,
  subscriptions
}

students.createTable()
  .then(() => courses.createTable())
  .then(() => subscriptions.createTable())
  .then(() => {
    const server = http.createServer(app);

    server.listen(5000, function () {
      console.log("Listening on port 5000");
    });
  });