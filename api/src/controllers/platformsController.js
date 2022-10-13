const axios = require('axios');
const { API_KEY } = process.env;
const { Platform } = require("../db");

const getPlatformsFromApi = async () => {
  try {
    let platformApi = await axios(`https://api.rawg.io/api/platforms?key=${API_KEY}`);
    return platformApi.data.results;
  } catch (error) {
    console.log(error);
  }
}

const getPlatformsFromBd = async () => {
  const platformsFindedBd = await Platform.findAll({
    attributes: ["name"]
  });
  return platformsFindedBd;
}

const createPlatformValidator = async () => {
  try {
    let platforms = await getPlatformsFromBd();

    if(!platforms.length){
      const platformsFromApi = await getPlatformsFromApi();
      // guarda lo que trajo de la api
      const platformsToCreate = platformsFromApi.map((platform) => {
        return {
          name: platform.name
        }
      });
      platforms = await Platform.bulkCreate(platformsToCreate);
    }  

    return platforms;
  } catch(e) {
    console.log(e);
  }
}

module.exports = {
  createPlatformValidator
}