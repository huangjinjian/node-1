const Router = require('koa-router');
let musicController = require('../controllers/music_controller');

const router = new Router()

router.get('/music/index', musicController.showIndex)
	.get('/music/add-music', musicController.showAddMusic)
	.get('/music/edit-music', musicController.editMusic)

	.post('/music/add-music', musicController.addMusic)
	.put('/music/update-music', musicController.updateMusic)
	.delete('/music/del-music', musicController.deleteMusic)
module.exports = router