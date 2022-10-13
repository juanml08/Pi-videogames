import {
  GET_VIDEOGAMES_LIST, 
  GET_GENRES, 
  GET_PLATFORMS, 
  GET_VIDEOGAME_DETAIL, 
  GET_VIDEOGAMES_BY_NAME,
  SET_VIDEOGAMES_ALPHABETIC,
  SET_VIDEOGAMES_CREATED_API_BD,
  SET_VIDEOGAMES_RATING,
  SET_VIDEOGAMES_GENRES
} from "../actions";


const initialState = {
  videogames: [],
  videogamesAll: [],
  videogameDetail: null,
  genres: [],
  platforms: []
};


const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_VIDEOGAMES_LIST:
      return {
        ...state,
        videogames: action.payload,
        videogamesAll: action.payload
      }

    case GET_GENRES:
      return {
        ...state,
        genres:  action.payload
      }

    case GET_PLATFORMS:
      return {
        ...state,
        platforms: action.payload
      }

    case GET_VIDEOGAME_DETAIL:
      return {
        ...state,
        videogameDetail: action.payload
      }

    case GET_VIDEOGAMES_BY_NAME:
      return {
        ...state,
        videogames: action.payload
      }

    case SET_VIDEOGAMES_ALPHABETIC:
      if(action.payload === "a-z") {
        state.videogames.sort((a , b)=> {
          if(a.name > b.name) return 1;
          if(b.name > a.name) return -1;
          return 0;
        });
        
        state.videogamesAll.sort((a , b) => {
          if(a.name > b.name) return 1;
          if(b.name > a.name) return -1;
          return 0;
        });
      } 
    
      if (action.payload === "z-a") {
        state.videogames.sort((a , b)=> {
          if(a.name > b.name) return -1;
          if(b.name > a.name) return 1;
          return 0;
        });

        state.videogamesAll.sort((a , b)=> {
          if(a.name > b.name) return -1;
          if(b.name > a.name) return 1;
          return 0;
        });
      }

      return {
        ...state,
        videogames: [...state.videogames]
      }

     case SET_VIDEOGAMES_CREATED_API_BD:
      let videogamesFiltered = []
      
      if(action.payload === "existing") {
        videogamesFiltered = state.videogamesAll.filter((videogame) => !videogame.createdInDb);
      }

      if(action.payload === "created") {
        videogamesFiltered = state.videogamesAll.filter((videogame) => videogame.createdInDb);
      }
      
      return {
        ...state,
        videogames: videogamesFiltered
      } 

    case SET_VIDEOGAMES_RATING:
      if(action.payload === "minor") {
        state.videogames.sort((a , b) => {
         return a.rating - b.rating;
        });

        state.videogamesAll.sort((a , b) => {
          return a.rating - b.rating;
         });
      } 
    
      if (action.payload === "higher") {
        state.videogames.sort((a , b)=> {
          return b.rating - a.rating;
        });

        state.videogamesAll.sort((a , b)=> {
          return b.rating - a.rating;
        });
      }

      return {
        ...state,
        videogames: [...state.videogames]
      }
    
    case SET_VIDEOGAMES_GENRES:

      return {
        ...state,
        videogames: state.videogamesAll.filter((videogame) => videogame.genres.includes(action.payload))
      }  

    default:
      return state;
  }
}      


export default rootReducer;