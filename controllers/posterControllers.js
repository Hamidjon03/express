const Poster = require('../models/posterModel')
const { v4 } = require('uuid')
const { addNewPosterToDB, getAllPosters, getPosterById, editPosterById, deletePosterById } = require('../db/posters')


//@route       GET /posters
//@descr       Get All posters
//@access      Public
const getPostersPage = async (req, res) => {
  try {
    const posters = await Poster.find().lean()
    res.render("poster/posters", {
      title: 'Posters page',
      url: process.env.URL,
      posters: posters.reverse()
    })
  } catch (err) {
    console.log(err)
  }

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
  try {
    const poster = {
      title: req.body.title,
      amount: req.body.amount,
      region: req.body.region,
      image: req.body.image,
      description: req.body.description,
    }
    await Poster.create(poster)
    res.redirect('/posters')
  } catch (err) {
    console.log(err)
  }

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
    const poster = await getPosterById(req.params.id)
    res.render("poster/edit-poster", {
      title: "Edit page",
      url: process.env.URL,
      poster
    })
  } catch (err) {
    console.log(err)
  }
}


//@route       Post /posters/:id/edit
//@descr       Edit poster page
//@access      Private (own)
const updatePoster = async (req, res) => {
  try {
    const editedPoster = {
      title: req.body.title,
      amount: req.body.amount,
      image: req.body.image,
      region: req.body.region,
      description: req.body.description,
    }
    await editPosterById(req.params.id, editedPoster)
    res.redirect('/posters')
  } catch (err) {
    console.log(err)
  }
}


//@route       Post /posters/:id/delete
//@descr       Delete poster page
//@access      Private (own)
const deletePoster = async (req, res) => {
  try {
    await deletePosterById(req.params.id)
    res.redirect('/posters')
  } catch (err) {
    console.log(err)
  }
}



module.exports = {
  getPostersPage,
  addNewPosterPage,
  addNewPoster,
  getOnePoster,
  getEditPosterPage,
  updatePoster,
  deletePoster
}