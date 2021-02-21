'use strict';

const express = require('express');

/* Module Related Routes */
const studentsRoutes = require('./modules/students/routes');
const coursesRoutes = require('./modules/courses/routes');
const subscriptionsRoutes = require('./modules/subscriptions/routes');

const apiRouter = express.Router();

// apiRouter
//     .use('/students', studentsRoutes)
// 	.use('/courses', coursesRoutes)
// 	.use('/subscriptions', subscriptionsRoutes)

// module.exports = apiRouter;

module.exports = () =>
	apiRouter
		.use('/students', studentsRoutes())
		.use('/courses', coursesRoutes)
		.use('/subscriptions', subscriptionsRoutes)
		.all('*', () => {
			throw "404: Path Not Found";
		});
