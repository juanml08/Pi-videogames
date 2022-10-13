const router = require('express').Router();
const {
  createVideogame,
  getVideogameApiById,
  getVideoGameDb,
  gellAllVideogames,
  getVideogamesApiBdByName
} = require('../controllers/videogamesController');
const Videogame = require('../models/Videogame');

router.get('/', async (req, res) => {
  let name  = req.query.name;
    try {
      if(name) {
        const videogamesByName = await getVideogamesApiBdByName(name);
        res.status(200).send(videogamesByName);
      } else {
        const videogames =  await gellAllVideogames();
        res.status(200).send(videogames);
        }
    } catch(error) {
      res.status(404).send('error missing videogames', error);
    }
});

router.get('/:idvideogame', async (req, res) => {
  const id = req.params.idvideogame;

  try {
    const videogame = await getVideogameApiById(id);
    res.status(200).send(videogame);
  } catch (error) {
    const videogame = await getVideoGameDb(id);
    if (videogame) {
      console.log('videogame', videogame);
      res.status(200).send(videogame);
    } else {
      res.status(404).send(null);
    }
  }
});

router.post('/', async (req, res) => {
  try {
    await createVideogame(req.body);
  } catch (error) {
    console.log('error', error);
    res.status(500).send("Error");
  } 
})

module.exports = router;
    