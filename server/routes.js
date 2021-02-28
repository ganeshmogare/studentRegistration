const coursesRoutes = require("./modules/courses/routes");
const studentsRoutes = require("./modules/students/routes");
const subscriptionsRoutes = require("./modules/subscriptions/routes");

const routes = {
    courses: (data,res)=>{
        let { endpoint="" } = data;
        coursesRoutes[endpoint](data,res);
    },
    students: (data , res)=>{
      let { endpoint="" } = data;
      studentsRoutes[endpoint](data,res);
    },
    subscriptions: (data , res)=>{
      let { endpoint="" } = data;
      subscriptionsRoutes[endpoint](data,res);
    },
    notFound: function(data, res) {
      //this one gets called if no route matches
      let payload = {
        message: "File Not Found",
        code: 404
      };
      res.sendError(payload);
    }
  };

  module.exports= routes;