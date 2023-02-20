const { Router } = require('express')
const router = Router()
const { getPostersPage, addNewPosterPage, addNewPoster, getOnePoster, getEditPosterPage } = require('../controllers/posterControllers');


router.get('/', getPostersPage)
router.get('/add', addNewPosterPage)
router.post('/add', addNewPoster)
router.get('/:id', getOnePoster)
router.get('/:id/edit', getEditPosterPage)

module.exports = router