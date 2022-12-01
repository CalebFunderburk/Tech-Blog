// Imports
const router = require('express').Router()
const { User } = require('../../models')
const bcrypt = require('bcrypt')

// Get all users
router.get('/', (req, res) => {
    User.findAll({
        attributes: { exclude: ['password'] }
    })
    .then(userData => res.json(userData))
    .catch(err => {
        console.log(err)
        res.status(500).json(err)
    })
})

// Get one user
router.get('/:id', (req, res) => {
    User.findOne({
        attributes: { exclude: ['password'] }
    })
    .then(userData => {
        if (!userData) {
            res.status(404).json({ message: 'No user found with this id' })
            return
        }
        res.json(userData)
    })
    .catch(err => {
        console.log(err)
        res.status(500).json(err)
    })
})

// Create a user
router.post('/', (req, res) => {
    User.create({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    })
    .then(userData => res.json(userData))
    .catch(err => {
        console.log(err)
        res.status(500).json(err)
    })
})

// Update a user
router.put('/:id', (req, res) => {
    User.update(req.body, {
        individualHooks: true,
        where: {
            id: req.params.id
        }
    })
    .then(userData => {
        if(!userData[0]) {
            res.status(404).json({ message: 'No user found with this id'})
            return
        }
        res.json(userData)
    })
    .catch(err => {
        console.log(err)
        res.status(500).json(err)
    })
})

// Delete a user
router.delete('/:id', (req, res) => {
    User.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(userData => {
        if (!userData) {
            res.status(404).json({ message:'No user found with this id' })
            return
        }
        res.json(userData)
    })
    .catch(err => {
        console.log(err)
        res.status(500).json(err)
    })
})

module.exports = router