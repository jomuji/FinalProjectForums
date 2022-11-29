const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const cors = require('cors');

// handles USER
const { updateUserByEmail } = require('./handlers/users/updateUserByEmail');
const {
	getOrCreateUserByEmail,
} = require('./handlers/users/getOrCreateUserByEmail');
// handlers MODULES
const { getAllModules } = require('./handlers/modules/getAllModules');
const { getModulesTitles } = require('./handlers/modules/getModulesTitles');
const { getModulesbyId } = require('./handlers/modules/getModulesById');
const { getModulesLiens } = require('./handlers/modules/getModuleLiens');
// handlers THEMES
const { postNewTheme } = require('./handlers/themes/postNewTheme');
/* const { updateThemeById } = require('./handlers/themes/updateThemeById');
const { deleteThemeById } = require('./handlers/themes/deleteThemeById'); */

const port = 8000;

express()
	.use(express.json())
	.use(helmet())
	.use(morgan('tiny'))
	.use(cors())

	// test endpoint
	.get('/hello', (req, res) => {
		res.status(200).json({
			status: 200,
			message: 'Final project backend is up and running...',
		});
	})

	// user endpoints

	.patch('/user/:email', updateUserByEmail)
	.post('/user/:email', getOrCreateUserByEmail)

	// modules endpoints
	.get('/modules', getAllModules)
	.get('/modules/:_id', getModulesbyId)
	.get('/moduletitles', getModulesTitles)
	.get('/moduleliens', getModulesLiens)

	// theme endpoints
	.post('/newtheme', postNewTheme)
	/* 	.post('/newtheme/:_id', postNewThemeById) */
	/* 	.patch('/newtheme/:_id', updateThemeById)
	.delete('/newtheme/:_id', deleteThemeById) */

	.listen(port, () => {
		console.log(`Example app listening on port ${port}`);
	});
