const Poster = require('../models/posterModel')
const User = require("../models/userModel")


//@route       GET /posters
//@descr       Get All posters
//@access      Public
const getPostersPage = async (req, res) => {
  try {

    if(req.query){
      const {search} = req.query
      const posters = await Poster.searchPartial(search, (err, data) => {
        if(err) throw new Error
      }).lean()
      res.status(200).render('poster/searchResults', {
        title: 'Search results',
        user: req.session.user,
        url: process.env.URL,
        querySearch: req.query.search,
        posters: posters.reverse()
      })
    }


    const posters = await Poster.find().lean()
    res.render("poster/posters", {
      title: 'Posters page',
      user: req.session.user,
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
    url: process.env.URL,
    user: req.session.user,
  })
}


//@route       Post /posters/add
//@descr       Post new poster
//@access      Private
const addNewPoster = async (req, res) => {
  try {
    const newPoster = new Poster({
      title: req.body.title,
      amount: req.body.amount,
      region: req.body.region,
      description: req.body.description,
      image: 'uploads/' + req.file.filename,
      author: req.session.user._id
    })

    await User.findByIdAndUpdate(req.session.user._id,
      { $push: { posters: newPoster._id } },
      { new: true, upsert: true })

    await newPoster.save((err, posterSaved) => {
      if (err) throw err
      const posterId = posterSaved._id
      res.redirect("/posters/" + posterId)
    })

  } catch (err) {
    console.log(err)
  }

}


//@route       GET /posters/:id
//@descr       Get poster by id
//@access      Public 
const getOnePoster = async (req, res) => {
  try {
    const poster = await Poster
      .findByIdAndUpdate(req.params.id, { $inc: { visits: 1 } }, { new: true })
      .populate('author')
      .lean()
    res.render("poster/one", {
      title: poster.title,
      url: process.env.URL,
      user: req.session.user,
      author: poster.author,
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
    const poster = await Poster.findById(req.params.id).lean()
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
    await Poster.findByIdAndUpdate(req.params.id, editedPoster)
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
    await Poster.findByIdAndRemove(req.params.id)
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