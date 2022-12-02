const router = require('express').Router()
const { Comment } = require('../../models')
const withAuth = require('../../utils/auth')

// Get all comments
router.get('/', (req, res) => {
    Comment.findAll()
        .then(commentData => res.json(commentData))
        .catch(err => {
            console.log(err)
            res.status(500).json(err)
        })
})

// Get one comment
router.get('/:id', (req, res) => {
    Comment.findOne({
        where: {
            id: req.params.id
        }
    })
        .then(commentData => {
            if (!commentData) {
                res.status(404).json({ message: 'No comment found with this id' })
                return
            }
            res.json(commentData)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json(err)
        })
})

// Create a comment
router.post('/', withAuth, (req, res) => {
    if (req.session) {
        Comment.create({
            comment: req.body.comment,
            user_id: req.body.user_id,
            post_id: req.body.post_id
        })
            .then(commentData => res.json(commentData))
            .catch(err => {
                console.log(err)
                res.status(400).json(err)
            })
    }
})

// Update a post
router.put('/:id', withAuth, (req, res) => {
    Comment.update(
        {
            comment: req.body.comment
        },
        {
            where: {
                id: req.params.id
            }
        }
    )
        .then(commentData => {
            if (!commentData) {
                res.status(404).json({ message: 'No comment found with this id' })
                return
            }
            res.json(commentData)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json(err)
        })
})

// Delete a comment
router.delete('/:id', withAuth, (req, res) => {
    Comment.destroy({
        where: {
            id: req.params.id
        }
    })
        .then(commentData => {
            if (!commentData) {
                res.status(404).json({ message: 'Comment not found' })
                return
            }
            res.json(commentData)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json(err)
        })
})

router.delete('/section/:id', withAuth, (req, res) => {
    Comment.destroy({
        where: {
            post_id: req.params.id
        }
    })
        .then(commentData => {
            if (!commentData) {
                res.status(404).json({ message: 'Comment section not found' })
                return
            }
            res.json(commentData)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json(err)
        })
})

module.exports = router