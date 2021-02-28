const controller =require("./controller");

const routes = {
    list: controller.list,
    create: controller.create,
    update: controller.update,
    delete: controller.remove,
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