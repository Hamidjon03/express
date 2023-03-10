const User = require('../models/userModel')
const bcrypt = require('bcryptjs')

//@route       GET /auth/login
//@descr       Get login page
//@access      Public
const getLoginPage = (req, res) => {
  if (!req.session.isLogged) {
    res.render('auth/login', {
      title: 'Login',
      loginError: req.flash('loginError'),
      url: process.env.URL
    })
  }
}

//@route       GET /auth/signup
//@descr       Get register page
//@access      Public
const getRegisterPage = (req, res) => {
  if (!req.session.isLogged) {
    res.render('auth/signup', {
      title: 'Registration',
      regError: req.flash("regError"),
      url: process.env.URL
    })
  }

}

//@route       POST /auth/signup
//@descr       Register new user
//@access      Public
const registerNewUser = async (req, res) => {
  try {
    const { email, username, phone, password, password2, } = req.body
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)
    // console.log(req.body)
    const userExist = await User.findOne({ email })

    if (userExist) {
      req.flash('regError', "Bunday foydalanuvchi bazada bor")
      return res.redirect('/auth/signup')
    }

    if (password !== password2) {
      req.flash('regError', "Parollar mos tushmayabdi")
      return res.redirect('/auth/signup')
    }

    await User.create({ email, username, phone, password: hashedPassword })

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
      const matchPassword = await bcrypt.compare(req.body.password, userExist.password)
      if (matchPassword) {
        req.session.user = userExist
        req.session.isLogged = true
        // console.log('authController line 60' + req.session.user)
        req.session.save(err => {
          if (err) throw err
          res.redirect('/profile/' + req.session.user.username)
        })
      } else {
        req.flash('loginError', 'Noto`g`ri ma`lumot kiritildi')
        res.redirect('/auth/login')
      }
    } else {
      req.flash('loginError', "Bunday foydalanuvchi mavjud emas")
      res.redirect('/auth/login')
    }
  } catch (err) {
    console.log(err)
  }
}

//@route       Get /auth/logout
//@descr       Logout user
//@access      Private
const logout = async (req, res) => {
  try {
    req.session.destroy(() => {
      res.redirect('/')
    })
  } catch (er) {
    console.log(err)
  }
}

module.exports = {
  getLoginPage,
  getRegisterPage,
  registerNewUser,
  loginUser,
  logout
}