const express = require('express');
const app = express()
const path = require('path')
const dotenv = require('dotenv')
const {engine} = require('express-handlebars')
const connectDB = require('./config/db')


// connectting to DB
connectDB()

// Config DOTENV
dotenv.config()

// Body parser
app.use(express.json())
app.use(express.urlencoded({extended: false}))

// Config static folder
app.use(express.static(path.join(__dirname, 'public')))

// Config express hadlebars
app.engine('.hbs', engine({extname: ".hbs"}))
app.set('view engine', '.hbs')


// Initialize Routes
app.use('/', require('./routes/homeRoutes'))
app.use('/posters', require('./routes/posterRoutes'))
app.use('/auth', require('./routes/authRoutes'))




const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))