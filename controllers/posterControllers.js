const {v4} = require('uuid')
const { addNewPosterToDB, getAllPosters, getPosterById } = require('../db/posters')


//@route       GET /posters
//@descr       Get All posters
//@access      Public
const getPostersPage = async (req, res) => {
  const posters = await getAllPosters();

  res.render("poster/posters", {
    title: 'Posters page',
    url: process.env.URL,
    posters
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
const addNewPoster = async (req, res) => {
  const poster = {
    id: v4(),
    title: req.body.title,
    amount: req.body.amount,
    region: req.body.region,
    image: req.body.image,
    description: req.body.description,
  }
  await addNewPosterToDB(poster)
  res.redirect('/posters')
 
}


//@route       GET /posters/:id
//@descr       Get poster by id
//@access      Public
const getOnePoster = async (req, res) => {
  try {
    const poster = await getPosterById(req.params.id)
    res.render("poster/one", {
      title: poster.title,
      url: process.env.URL,
      poster
    })
  } catch (err) {
    console.log(err)
  }
}



//@route       GET /posters/:id/edit
//@descr       Get edit poster page
//@access      Private (own)
const getEditPosterPage = async (req, res) => {
  try {
    res.render("poster/edit-poster", {
      title: "Edit page",
      url: process.env.URL,
    })
  } catch (err) {
    console.log(err)
  }
}





module.exports = {
  getPostersPage,
  addNewPosterPage,
  addNewPoster,
  getOnePoster,
  getEditPosterPage
}