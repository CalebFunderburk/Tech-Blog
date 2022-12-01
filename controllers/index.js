// Imports
const router = require('express').Router()
const apiRoutes = require('./api')

// Plugins
router.use('/api', apiRoutes)

// Exports
module.exports = router