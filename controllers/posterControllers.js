//@route       GET /posters
//@descr       Get All posters
//@access      Public
const getPostersPage = (req, res) => {
  res.render("poster/posters", {
    title: 'Posters page',
    url: process.env.URL
  })
}

//@route       GET /posters/add
//@descr       Get add-posters page
//@access      Private
const addNewPosterPage = (req, res) => {
  res.render("poster/add-poster", {
    title: 'Add-poster page',
    url: process.env.URL
  })
}

//@route       Post /posters/add
//@descr       Post new poster
//@access      Private
const addNewPoster= (req, res) => {
  console.log(req.body.region)
  console.log(req.body.amount)
 
}


module.exports = {
  getPostersPage,
  addNewPosterPage,
  addNewPoster
}