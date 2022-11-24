const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const { updateUserByEmail } = require('./handlers/users/updateUserByEmail');
const { getAllModules } = require('./handlers/modules/getAllModules');
const { getModulesTitles } = require('./handlers/modules/getModulesTitles');
const { getModulesbyId } = require('./handlers/modules/getModulesById');

const port = 8000;

express()
	.use(express.json())
	.use(helmet())
	.use(morgan('tiny'))

	// test endpoint
	.get('/hello', (req, res) => {
		res.status(200).json({
			status: 200,
			message: 'Final project backend is up and running...',
		});
	})

	// user endpoints
	.patch('/user/:email', updateUserByEmail)

	// modules endpoints
	.get('/modules', getAllModules)
	.get('/modules/:_id', getModulesbyId)
	.get('/moduletitles', getModulesTitles)

	.listen(port, () => {
		console.log(`Example app listening on port ${port}`);
	});
