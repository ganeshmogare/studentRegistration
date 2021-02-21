var express = require('express');
var controller = require("./controller");
var router = express.Router();

router.get('/list',  controller.list);

router.post('/create',  controller.create);

router.put('/update/:id',  controller.update);

router.delete('/delete/:id',  controller.remove);

// router.post('/reset-db',  leadsController.resetDb);

module.exports = router;
