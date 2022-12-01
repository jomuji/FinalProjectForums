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
const {
	getAllModulesbyLien,
} = require('./handlers/modules/getAllModulesbyLien');
const { getModulesLiens } = require('./handlers/modules/getModuleLiens');
const {
	getModulesTitlesByLien,
} = require('./handlers/modules/getModulesTitlesByLien');
// handlers THEMES
const { postNewTheme } = require('./handlers/themes/postNewTheme');
const {
	getThemesByModulesLien,
} = require('./handlers/themes/getThemesByModulesLien');
// hander EMAILLIST
const {
	postEmailListLaunch,
} = require('./handlers/emailList/postEmailListLaunch');
const { updateThemeById } = require('./handlers/themes/updateThemeById');
const { deleteThemeById } = require('./handlers/themes/deleteThemeById');

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
	.get('/allmodules/:lien', getAllModulesbyLien)
	.get('/moduletitles', getModulesTitles)
	.get('/moduleliens', getModulesLiens)
	.get('/titles/:lien', getModulesTitlesByLien)

	// theme endpoints
	.get('/themesbymodules/:lien', getThemesByModulesLien)
	.post('/newtheme', postNewTheme)
	.delete('/deletethemeById/:_id', deleteThemeById)
	.patch('/updatetheme/:_id', updateThemeById)

	// email list Launch
	.post('/emailListLaunch', postEmailListLaunch)

	.listen(port, () => {
		console.log(`Example app listening on port ${port}`);
	});
