//@route       GET /
//@descr       Get Home page
//@access      Public
const getHomePage = (req, res) => {
  res.render("home", {
    title: 'Home page'
  })
}

module.exports = {
  getHomePage
}