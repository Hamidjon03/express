//@route       GET /
//@descr       Get Home page
//@access      Public
const getHomePage = (req, res) => {
  res.render("home", {
    title: 'Home page',
    user: req.session.user,
    isLogged: req.session.isLogged,
    url: process.env.URL
  })
}

module.exports = {
  getHomePage
}