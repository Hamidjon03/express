const Poster = require('../models/posterModel')

//@route       GET /
//@descr       Get Home page
//@access      Public
const getHomePage = async (req, res) => {
  try {
    const posters = await Poster.find().lean()
    res.render("home", {
      title: 'Home page',
      posters,
      user: req.session.user,
      isLogged: req.session.isLogged,
      url: process.env.URL
    })
  } catch (err) {
    console.log(err)
  }
}

module.exports = {
  getHomePage
}