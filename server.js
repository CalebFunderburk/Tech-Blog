const express = require('express')
const session = require('express-session')
// add handlebars here

const app = express()
const PORT = process.env.PORT || 3001

const sequelize = require('./config/connection')
const SequelizeStore = require('connect-session-sequelize')(session.Store)

const sess = {
    secret: 'The crow flies high on an empty stomach...',
    cookie: {},
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequelize
    })
}

app.use(session(sess))

// helpers and view engine stuff for handlebars goes here

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
// app.use(express.static(path.join(__dirname, 'public')))

// routes go here

sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log(`Now listening on port ${PORT}`))
})