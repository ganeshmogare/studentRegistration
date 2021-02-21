const Router = require('express-promise-router');

const controller = require('./controller');

module.exports = () => {
    const router = Router({ mergeParams: true });

    router.get('/list',  controller.list);

    router.post('/create',  controller.create);
    
    router.put('/update/:id',  controller.update);
    
    router.delete('/delete/:id',  controller.remove);

    return router;
}