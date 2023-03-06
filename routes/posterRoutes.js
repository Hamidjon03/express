const { Router } = require('express')
const router = Router()
const { getPostersPage, updatePoster, deletePoster, addNewPosterPage, addNewPoster, getOnePoster, getEditPosterPage } = require('../controllers/posterControllers');
const upload = require('../utils/fileUpload')
const {protected} = require('../middleware/auth')

router.get('/', getPostersPage)
router.get('/add', protected, addNewPosterPage)
router.post('/add', protected, upload.single("image"), addNewPoster)
router.get('/:id', getOnePoster)
router.get('/:id/edit', protected, getEditPosterPage)
router.post('/:id/edit', protected, updatePoster)
router.post('/:id/delete', protected, deletePoster)

module.exports = router