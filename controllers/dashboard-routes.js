// Imports
const router = require('express').Router()
const { User, Post, Comment, } = require('../models')
const withAuth = require('../utils/auth')

// Query data for & render dashboard view
router.get('/', withAuth, (req, res) => {
    Post.findAll({
        where: {
            user_id: req.session.user_id
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
            const posts = postData.map(post => post.get({ plain: true }))
            res.render('dashboard', { posts, loggedIn: true })
        })
        .catch(err => {
            console.log(err)
            res.status(500).json(err)
        })
})

// Query to edit posts
router.get('/edit/:id', withAuth, (req, res) => {
    Post.findOne({
        where: {
          id: req.params.id
        },
        attributes: [
          'id',
          'title',
          'body',
          'user_id',
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
        const post = postData.get({ plain: true })
        res.render('edit-post', { post, loggedIn: true })
      })
      .catch(err => {
        console.log(err)
        res.status(500).json(err)
      })
})

// Exports
module.exports = router