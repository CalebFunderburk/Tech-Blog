// Imports
const router = require('express').Router()
const { User, Post, Comment } = require('../models')

// Query data and render homepage
router.get('/', (req, res) => {
    Post.findAll({
        attributes: [
            'id',
            'title',
            'body',
            'created_at',
        ],
        include: [
            {
                model: Comment,
                attributes: ['id', 'comment', 'user_id', 'post_id', 'created_at'],
                include: {
                    model: User,
                    attributes: ['username']
                }
            },
            {
                model: User,
                attributes: ['username']
            }
        ]
    })
        .then(postData => {
            const posts = postData.map(post => post.get({ plain: true }))
            res.render('homepage', {
                posts,
                loggedIn: req.session.loggedIn,
                username: req.session.username
            })
        })
        .catch(err => {
            console.log(err)
            res.status(500).json(err)
        })
})

// Login page
router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/')
        return;
    }
    res.render('login')
})

// Query data for single post view
router.get('/post/:id', (req, res) => {
    Post.findOne({
        where: {
            id: req.params.id
        },
        attributes: [
            'id',
            'title',
            'body',
            'user_id',
            'created_at'
        ],
        include: [
            {
                model: Comment,
                attributes: ['id', 'comment', 'user_id', 'post_id', 'created_at'],
                include: {
                    model: User,
                    attributes: ['username']
                }
            },
            {
                model: User,
                attributes: ['username']
            }
        ]
    })
        .then(postData => {
            if (!postData) {
                res.status(404).json({ message: 'No post found with this id' })
                return
            }

            const post = postData.get({ plain: true })

            res.render('single-post', {
                post,
                loggedIn: req.session.loggedIn,
                username: req.session.username,
                user_id: req.session.user_id
            })
        })
        .catch(err => {
            console.log(err)
            res.status(500).json(err)
        })
})

// Exports
module.exports = router