// Imports
const router = require('express').Router()
const userRoutes = require('./user-routes')
const postRoutes = require('./post-routes')

// Plugins
router.use('/users', userRoutes)
router.use('/posts', postRoutes)

// Exports
module.exports = router