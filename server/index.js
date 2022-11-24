const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const { updateUserByEmail } = require('./handlers/users/updateUserByEmail');

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

	.listen(port, () => {
		console.log(`Example app listening on port ${port}`);
	});
