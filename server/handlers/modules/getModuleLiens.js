'use strict';

const { MongoClient } = require('mongodb');

require('dotenv').config({ path: '../.env' });
const { MONGO_URI } = process.env;

const options = {
	useNewUrlParser: true,
	useUnifiedTopology: true,
};

// RETURN AN ARRAY OF LIENS -- they are titles but without french accent that throw errors in URL
const getModulesLiens = async (req, res) => {
	// CREATE A NEW CLIENT
	const client = new MongoClient(MONGO_URI, options);

	try {
		// connect to the client
		await client.connect();
		// connect to the database (db name is provided as an argument to the function)
		const db = client.db('ailleursConseil');
		console.log('connected!');

		const result = await db.collection('modules').find().toArray();

		// target lien
		let lien = result.map(({ lien }) => lien);

		// response
		if (result.length <= 0) {
			res.status(404).json({ status: 404, message: 'lien not found' });
		} else {
			res.status(200).json({ status: 200, data: lien });
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

module.exports = { getModulesLiens };
