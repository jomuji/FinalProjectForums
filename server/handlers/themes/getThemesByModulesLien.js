'use strict';
const { MongoClient } = require('mongodb');

require('dotenv').config({ path: '../.env' });
const { MONGO_URI } = process.env;

const options = {
	useNewUrlParser: true,
	useUnifiedTopology: true,
};

// RETURN AN ARRAY OF ALL MODULES BY MODULE WILL USE TO USEPARAMS

const getThemesByModulesLien = async (req, res) => {
	console.log('Hello');
	// CREATE A NEW CLIENT
	const client = new MongoClient(MONGO_URI, options);

	try {
		// connect to the client
		await client.connect();
		// connect to the database (db name is provided as an argument to the function)
		const db = client.db('ailleursConseil');
		console.log('connected!');

		// create category to request params
		const { lien } = req.params;

		//add some data to this empty collection
		let result = await db
			.collection('modules')
			.find(
				{ lien } /* , { _id: 0, titre: 0, objectif: 0, lien: 0, themes: 1 } */
			)
			.toArray();

		result = result.map(({ themes }) => themes);
		// not nested
		result = result.flat();

		// get all themes
		const allThemes = await db
			.collection('themes')
			.find({ _id: { $in: result } })
			.toArray();

		// On success/no error, send
		if (allThemes.length <= 0) {
			res.status(404).json({ status: 404, message: 'themes not found' });
		} else {
			res.status(200).json({ status: 200, data: allThemes });
		}
	} catch (err) {
		console.log(err.stack);
		res.status(500).json({ status: 500, data: req.body, message: err.message });
	} finally {
		// close the connection to the database server
		client.close();
		console.log('disconnected!');
	}
};

module.exports = { getThemesByModulesLien };
