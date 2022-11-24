'use strict';
const { MongoClient } = require('mongodb');

require('dotenv').config();
const { MONGO_URI } = process.env;

const options = {
	useNewUrlParser: true,
	useUnifiedTopology: true,
};

// 	GET all modules ('/modules', getModules)
const getAllModules = async (req, res) => {
	const client = new MongoClient(MONGO_URI, options);

	try {
		// connect to the client
		await client.connect();
		// connect to the database (db name is provided as an argument to the function)
		const db = client.db('ailleursConseil');
		console.log('connected!');
		//add some data to this empty collection
		const result = await db.collection('modules').find().toArray();

		// On success/no error, send
		res.status(200).json({ status: 200, data: result });
	} catch (err) {
		console.error(err);
		return res.status(500).json({
			ok: false,
			status: 500,
			data: req.body,
			message: '[ ERROR ]: Internal server error',
		});
	} finally {
		await client.close();
	}
};

module.exports = { getAllModules };
