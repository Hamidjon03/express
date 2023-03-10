const express = require('express');
const path = require('path')
require('dotenv').config()
const session = require('express-session')
const Handlebars = require("handlebars")
const MongoStore = require('connect-mongodb-session')(session)
const flash = require("connect-flash")
const {engine} = require('express-handlebars')
const helpers = require('./utils/hbsHelper')
const connectDB = require('./config/db')
const app = express()

// Initialize session store
const store = new MongoStore({
  collection: 'sessions',
  uri: process.env.MONGO_URI
})



// connectting to DB
connectDB()

// Body parser
app.use(express.json())
app.use(express.urlencoded({extended: false}))


// register handlebars helpers
helpers(Handlebars)

// Session configuration
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  store
}))

app.use(flash())

// Config static folder
app.use(express.static(path.join(__dirname, 'public')))

// Config express hadlebars
app.engine('.hbs', engine({extname: ".hbs"}))
app.set('view engine', '.hbs')



// Initialize Routes
app.use('/', require('./routes/homeRoutes'))
app.use('/posters', require('./routes/posterRoutes'))
app.use('/auth', require('./routes/authRoutes'))
app.use('/profile', require('./routes/profileRoutes'))




const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))