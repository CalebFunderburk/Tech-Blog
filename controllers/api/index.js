// Imports
const router = require('express').Router()
const userRoutes = require('./user-routes.js')

// Plugins
router.use('/users', userRoutes)

// Exports
module.exports = router