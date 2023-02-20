const { Router } = require('express')
const router = Router()
const { getPostersPage, updatePoster, deletePoster, addNewPosterPage, addNewPoster, getOnePoster, getEditPosterPage } = require('../controllers/posterControllers');


router.get('/', getPostersPage)
router.get('/add', addNewPosterPage)
router.post('/add', addNewPoster)
router.get('/:id', getOnePoster)
router.get('/:id/edit', getEditPosterPage)
router.post('/:id/edit', updatePoster)
router.post('/:id/delete', deletePoster)

module.exports = router