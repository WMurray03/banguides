const {
	selectTasks, selectTask, createTask, updateTask, removeTask,
} = require('../models/model.Task');

exports.getTasks = (req, res) => {
	selectTasks()
		.then(tasks => {
			res.status(200).send({tasks});
		})
		.catch(error => {
			throw (error);
		});
};

exports.getTask = (req, res) => {
	selectTask(req.params.id)
		.then(task => {
			res.status(200).send({task});
		})
		.catch(error => {
			throw (error);
		});
};

exports.postTask = (req, res) => {
	createTask(req.body)
		.then(() => {
			res.status(200).send(req.body);
		})
		.catch(error => {
			throw (error);
		});
};

exports.putTask = (req, res) => {
	updateTask(req.body)
		.then(() => {
			res.status(200).send(req.body);
		})
		.catch(error => {
			throw (error);
		});
};

exports.deleteTask = (req, res) => {
	removeTask(req.params.id)
		.then(() => {
			res.status(200).send(req.params.id);
		})
		.catch(error => {
			throw (error);
		});
};
