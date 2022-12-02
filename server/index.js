const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const cors = require('cors');

// handles USER
const { updateUserByEmail } = require('./handlers/users/updateUserByEmail');
const {
	getOrCreateUserByEmail,
} = require('./handlers/users/getOrCreateUserByEmail');

const { getThemesByUser } = require('./handlers/users/getThemesByUser');

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
const { updateThemeById } = require('./handlers/themes/updateThemeById');
const { deleteThemeById } = require('./handlers/themes/deleteThemeById');
const { getThemeById } = require('./handlers/themes/getThemeById');
//handler COMMENT
const { postNewComment } = require('./handlers/comments/postNewComment');
const {
	getCommentsByThemeId,
} = require('./handlers/comments/getCommentsByThemeId');
// hander EMAILLIST
const {
	postEmailListLaunch,
} = require('./handlers/emailList/postEmailListLaunch');

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
	.get('/userThemes/:email', getThemesByUser)

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
	.get('/theme/:_id', getThemeById)

	// comment
	.post('/newcomment', postNewComment)
	.get('/comments/:_Id', getCommentsByThemeId)
	// email list Launch
	.post('/emailListLaunch', postEmailListLaunch)

	.listen(port, () => {
		console.log(`Example app listening on port ${port}`);
	});
