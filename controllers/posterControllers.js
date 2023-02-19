//@route       GET /posters
//@descr       Get All posters
//@access      Public
const getPostersPage = (req, res) => {
  res.render("posters", {
    title: 'Posters page'
  })
}

module.exports = {
  getPostersPage
}