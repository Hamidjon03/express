

//@route       GET /login
//@descr       Get login page
//@access      Public
const getLoginPage = (req, res) => {
  res.render('auth/login', {
    title: 'Login',
    url: process.env.URL
  })
}

//@route       GET /sign
//@descr       Get sign page
//@access      Public
const getRegisterPage = (req, res) => {
  res.render('auth/signup', {
    title: 'Registration',
    url: process.env.URL
  })
}


module.exports = {
  getLoginPage,
  getRegisterPage
}