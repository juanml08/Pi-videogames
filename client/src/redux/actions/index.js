export const GET_VIDEOGAMES_LIST = "GET_VIDEOGAMES_LIST";
export const GET_GENRES = "GET_GENRES";
export const GET_PLATFORMS = "GET_PLATFORMS";
export const GET_VIDEOGAME_DETAIL = "GET_VIDEOGAME_DETAIL";
export const GET_VIDEOGAMES_BY_NAME = "GET_VIDEOGAMES_BY_NAME";
export const SET_VIDEOGAMES_ALPHABETIC = "SET_VIDEOGAMES_ALPHABETIC";
export const SET_VIDEOGAMES_GENRES = "SET_VIDEOGAMES_GENRES"
export const SET_VIDEOGAMES_CREATED_API_BD = "SET_VIDEOGAMES_CREATED_API_BD";
export const SET_VIDEOGAMES_RATING = "SET_VIDEOGAMES_RATING";
export const SET_FILTERS = "SET_FILTERS";


export const getVideogamesList = () => dispatch => {
    return fetch('http://localhost:3001/videogames')
    .then(res => res.json()
    .then(data => {
        dispatch({
            type: GET_VIDEOGAMES_LIST,
            payload: data
        })
    }))
    .catch(error => {
        console.log(error);
    })
}


export const getGenres = () => dispatch => {
    return fetch('http://localhost:3001/genres')
    .then(res => res.json())
    .then(data => {
        dispatch({
            type: GET_GENRES,
            payload: data            
        })
    })
    .catch(error => {
        alert('Error cargando');
        console.log(error);
    })    
}


export const getPlatforms = () => dispatch => {
    return fetch('http://localhost:3001/platforms')
    .then(res => res.json())
    .then(data => {
        dispatch({
            type: GET_PLATFORMS,
            payload: data
        })
    })
    .catch(error => {
        console.log(error);
    }) 
};


export const getDetail = (id) => dispatch => {
    return fetch(`http://localhost:3001/videogames/${id}`)
    .then(res => res.json())
    .then(data => {
        if (data) {
            data.genres = data.genres.map(genre => genre.name).join(' - ');
            if (!data.createdInDb) {
                data.platforms = data.platforms.map(platform => platform.platform.name).join(' - ');
            }
        }
        dispatch({
            type: GET_VIDEOGAME_DETAIL,
            payload: data
        })
    })
    .catch(error => {
        console.log(error);
    }) 
};


export const getVideogamesByName = (name) => dispatch => {
    return fetch (`http://localhost:3001/videogames?name=${name}`)
    .then(res => res.json())
    .then(data => {
        dispatch({
            type : GET_VIDEOGAMES_BY_NAME,
            payload: data
        })
    })
};


export const postVideogame = (dataToCreate) => () => {
    console.log('dataToCreate', dataToCreate);
    return fetch('http://localhost:3001/videogames', {
        method: "POST",
        body: JSON.stringify(dataToCreate),
        headers: {
            "Content-Type": "application/json",
        }
    });      
};


export const setVideogamesRating = (payload) => (dispatch) => {
    dispatch({
        type : SET_VIDEOGAMES_RATING,
        payload: payload
    })
  };

export const setVideogamesAlphabetic = (payload) => (dispatch) => {
    dispatch({
        type : SET_VIDEOGAMES_ALPHABETIC,
        payload: payload
    })
  };


  export const setVideogamesByGenres = (payload) => (dispatch) => {
    dispatch({
        type : SET_VIDEOGAMES_GENRES,
        payload: payload
    })
  };

  export const setVideogamesCreatedOrApi = (payload) => (dispatch) => {
    dispatch({
        type : SET_VIDEOGAMES_CREATED_API_BD,
        payload: payload
    })
  };

  
  export const setFilters = (payload) => (dispatch) => {
    dispatch({
        type : SET_VIDEOGAMES_CREATED_API_BD,
        payload: payload
    })
  };