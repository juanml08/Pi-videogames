const router = require('express').Router();
const {
    createGenresValidator
  } = require('../controllers/genresController');
  

router.get('/', async (req, res) => {
    try {
        const genres = await createGenresValidator();
        res.status(200).send(genres);
    } catch(e) {
        console.log('error', e);
    } 
})

module.exports = router;