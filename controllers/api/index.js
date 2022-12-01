// Imports
const router = require('express').Router()
const userRoutes = require('./user-routes')
const postRoutes = require('./post-routes')
const commentRoutes = require('./comment-routes')

// Plugins
router.use('/users', userRoutes)
router.use('/posts', postRoutes)
router.use('/comments', commentRoutes)

// Exports
module.exports = router