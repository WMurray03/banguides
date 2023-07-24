const {selectUsers, createUser} = require('../models/model.Users');

exports.getUsers = (req, res) => {
	selectUsers()
		.then(users => {
			res.status(200).send({users});
		})
		.catch(error => {
			throw (error);
		});
};

exports.postUser = (req, res) => {
	createUser(req.body.uuid)
		.then(() => {
			res.status(200).send(req.body.uuid);
		})
		.catch(error => {
			throw (error);
		});
};
