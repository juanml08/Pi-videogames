const axios = require('axios');
const { Op } = require('sequelize');
const { Videogame, Genre } = require('../db.js');
const { API_KEY } = process.env;


//obteniendo los videogames de la api
const getVideoGamesFromApi = async () => {
  let one = `https://api.rawg.io/api/games?key=${API_KEY}&page_size=20`;
  let two = `https://api.rawg.io/api/games?key=${API_KEY}&page=2&page_size=20`;
  let three = `https://api.rawg.io/api/games?key=${API_KEY}&page=3&page_size=20`;
  let four = `https://api.rawg.io/api/games?key=${API_KEY}&page=4&page_size=20`;
  let five = `https://api.rawg.io/api/games?key=${API_KEY}&page=5&page_size=20`;

  const requestOne = axios.get(one);
  const requestTwo = axios.get(two);
  const requestThree = axios.get(three);
  const requestFour = axios.get(four);
  const requestFive = axios.get(five);
  try {
    let videogamesObtained = await axios.all([requestOne, requestTwo, requestThree, requestFour, requestFive])
      .then(axios.spread((dataOne, dataTwo, dataThree, dataFour, dataFive) => {
        return [
          ...dataOne.data.results, 
          ...dataTwo.data.results, 
          ...dataThree.data.results,
          ...dataFour.data.results,
          ...dataFive.data.results
        ];
      }));
    return videogamesObtained;
  } catch(error ) {
      console.error(error);
  };
}
// crear videogame con datos traidos por body
const createVideogame = async (body) => {
  try {
    const {
      name,
      description,
      rating,
      image,
      platforms,
      release_date,
      genres
    } = body;
    console.log('body', body);

    // trayendo los generos por los names que estan en el array genres que se manda del front: ['Action', 'Shooter']
    // sequelize retorna [{id: 1, name: 'Action'...}, {id: 7, name: 'Shooter'...}]
    let genresToAssociate = await Genre.findAll({
      where: { name: genres }
    })

    //se crea el video juego en la bd  
    const videogameNew = await Videogame.create({
      name, 
      background_image: image, 
      description, 
      rating, 
      platforms, 
      release_date,
      
    });
    // se agrega el nuevo juego añadiendole los generos en la tabla de relaciones
    videogameNew.addGenres(genresToAssociate);

    return videogameNew;
  } catch (error) {
    console.log(error);
  }
}


// se formatea la estructura de los videojuegos para tener generos y plataformas como arreglos de cadenas: ['Action', 'Shooter']
// genres: [{...}, {...}] de la base de datos y api
// platforms: [{...}, {...}] de la api, de la base de datos:['PC', 'Xbox']
const videogamesFormatted = (videogames) => {
  const videogamesFormatted = videogames.map((videogame)=> {
    let videogameProcessed = {};
    let genresStrings = videogame.genres.map((genre) => genre.name);
    let platformsStrings = [];

    if (!videogame.createdInDb) {
      platformsStrings = videogame.platforms.map((platform) => platform.platform.name);
    } else {
      platformsStrings = videogame.platforms;
    }
    
    videogameProcessed.id = videogame.id;
    videogameProcessed.name = videogame.name;
    videogameProcessed.description = videogame.description;
    videogameProcessed.rating = videogame.rating;
    videogameProcessed.background_image = videogame.background_image;
    videogameProcessed.genres = genresStrings;
    videogameProcessed.platforms = platformsStrings;
    videogameProcessed.createdInDb = videogame.createdInDb

    return videogameProcessed;
  });
  
  return videogamesFormatted;
}


const getVideogamesBd = () => {
  try {
    return Videogame.findAll({
      include: 
        Genre
    });
  }
  catch (error) {
    console.log(error);
  }
}  

const gellAllVideogames = async() => {
  
  const apiVideogames = await getVideoGamesFromApi();
  const bdVideogames = await getVideogamesBd();

  let allVideogames = [];

  if(apiVideogames.length) {
    allVideogames.push(...apiVideogames);
  }
  
  if(bdVideogames.length){
    allVideogames.push(...bdVideogames);
  }


  const allVideogamesFormatted = videogamesFormatted(allVideogames);

  return allVideogamesFormatted;
}


const getVideogameApiById = async (idVideogame) => {
  let videogame = await axios(
    `https://api.rawg.io/api/games/${idVideogame}?key=${API_KEY}`
  );

  if (videogame.data) {
    return videogame.data;
  }

  return null;
}


const getVideoGameDb = async (idVideogame) => {
  const videogamesFoundInBd = await getVideogamesBd();
  const getVideogameById = videogamesFoundInBd.find((game) => game.id == idVideogame);

  return getVideogameById;
}
  
const getVideogamesApiBdByName = async (nameToSearch) => {
  const videogamesByNameApi = await axios (`https://api.rawg.io/api/games?key=${API_KEY}&search=${nameToSearch}`)
  let allVideogames = [];
  let videogamesApi = videogamesByNameApi.data.results;
  console.log('videogamesApi', videogamesApi.data);

  if (videogamesApi.length) {
    allVideogames.push(...videogamesApi);
  }

  const videogamesByNameBd = await Videogame.findAll({
    where: {
        name: {
            [Op.substring]: nameToSearch,
        }
    },
    include: [{
        model: Genre, attributes: ["name"]
    }]
  });
   
  if (videogamesByNameBd.length) {
    allVideogames.push(...videogamesByNameBd);
  }

  const allVideogamesFormatted = videogamesFormatted(allVideogames);

  return allVideogamesFormatted;
}


module.exports = {
  createVideogame,
  getVideogamesBd,
  gellAllVideogames,
  getVideogameApiById,
  getVideoGameDb,
  getVideogamesApiBdByName,
  getVideoGamesFromApi
}