const axios = require('axios');
const { Genre } = require("../db");
const { API_KEY } = process.env;

const getGenresFromApi = async () => {
  try {
    let genresApi = await axios(`https://api.rawg.io/api/genres?key=${API_KEY}`);
    return genresApi.data.results;
  } catch (error) {
    console.log(error);
  }
}

const getGenresFromBd = async () => {
  const genresFindedBd = await Genre.findAll({
    attributes: ["id", "name"]
  });
  
  return genresFindedBd;
}

const createGenresValidator = async () => {
  try {
    let genres = await getGenresFromBd();

    if(!genres.length){
      const genresFromApi = await getGenresFromApi();
      // guarda lo que trajo de la api
      const genresToCreate = genresFromApi.map((genre) => {
        return {
          name: genre.name
        }
      });
      
      genres = Genre.bulkCreate(genresToCreate);
    }  

    return genres;
  } catch(e) {
    console.log('Error getting genres')
  }
}

module.exports = {
  createGenresValidator
}