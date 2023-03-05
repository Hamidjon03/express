const User = require('../models/userModel')

//@route       GET /auth/login
//@descr       Get login page
//@access      Public
const getLoginPage = (req, res) => {
  res.render('auth/login', {
    title: 'Login',
    url: process.env.URL
  })
}

//@route       GET /auth/signup
//@descr       Get register page
//@access      Public
const getRegisterPage = (req, res) => {
  res.render('auth/signup', {
    title: 'Registration',
    url: process.env.URL
  })
}

//@route       POST /auth/signup
//@descr       Register new user
//@access      Public
const registerNewUser = async (req, res) => {
  try {
    const { email, username, phone, password, password2, } = req.body
    // console.log(req.body)
    const userExist = await User.findOne({ email })

    if (userExist) {
      return res.redirect('/auth/signup')
    }

    if (password !== password2) {
      return res.redirect('/auth/signup')
    }

    await User.create({ email, username, phone, password })

    return res.redirect('/auth/login')

  } catch (err) {
    console.log(err)
  }
}

//@route       Post /auth/login
//@descr       Login user to website
//@access      Public
const loginUser = async (req, res) => {
  try {
    const userExist = await User.findOne({ email: req.body.email })
    if (userExist) {
      const matchPassword = userExist.password === req.body.password
      if (matchPassword) {
        req.session.user = userExist
        req.session.isLogged = true
        // console.log('authController line 60' + req.session.user)
        req.session.save(err => {
          if (err) throw err
          res.redirect('/profile/' + req.session.user.username)
        })
      } else {
        res.redirect('/auth/login')
      }
    } else {
      res.redirect('/auth/login')
    }
  } catch (err) {
    console.log(err)
  }
}

module.exports = {
  getLoginPage,
  getRegisterPage,
  registerNewUser,
  loginUser
}