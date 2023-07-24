const { selectUsers, createUser } = require('../models/model.Users')

exports.getUsers = (req, res, next) => {
    selectUsers()
        .then((users) => {
            res.status(200).send({ users })
        })
        .catch((error) => {
            console.log(error)
        })
}

exports.postUser = (req, res, next) => {
    createUser(req.body.uuid)
        .then(() => {
            res.status(200).send(res.body.uuid)
        })
        .catch((error) => {
            console.log(error)
        })
}