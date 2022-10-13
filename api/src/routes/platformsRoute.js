const router = require('express').Router();
const {
    createPlatformValidator
  } = require('../controllers/platformsController');
  

router.get('/', async (req, res) => {
    try {
       const platforms = await createPlatformValidator();
    
        res.status(200).send(platforms);
    } catch(e) {
        console.log('error', e);
    } 
})

module.exports = router;