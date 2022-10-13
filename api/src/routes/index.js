const { Router } = require('express');
const videoGamesRoute = require('./videoGamesRoute.js');
const genresRoute = require('./genresRoute.js');
const platformsRoute = require('./platformsRoute.js');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use("/videogames", videoGamesRoute);
router.use("/genres", genresRoute);
router.use("/platforms", platformsRoute);

module.exports = router;
