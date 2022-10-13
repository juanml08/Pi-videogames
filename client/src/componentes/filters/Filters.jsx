import "./filters.css";
import { useDispatch} from "react-redux";
import { useState } from "react";
import { 
  getVideogamesByName, 
  setVideogamesAlphabetic, 
  setVideogamesCreatedOrApi,
  setVideogamesRating,
  getVideogamesList,
  setVideogamesByGenres
} from "../../redux/actions/index";
import { useSelector } from "react-redux";


export default function Filters(props) {  
  const videogames = useSelector(state => state.videogames);
  const genres = useSelector ((state) => state.genres);

  const [name, setName] = useState("");
  const dispatch = useDispatch();
  
  const handleChangeInputName = (e) => {
    e.preventDefault()
    setName(e.target.value)
  
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(getVideogamesByName(name));
  }
  
   const handleRating = (e) => {
    dispatch(setVideogamesRating(e.target.value));
  } 

  const handleSortAlphabetic = (e) => {
    dispatch(setVideogamesAlphabetic(e.target.value));
  }

  const handleExistOrCreate = (e) => {

    dispatch(setVideogamesCreatedOrApi(e.target.value));
  }

  const handleGenre = (e) => {
    dispatch(setVideogamesByGenres(e.target.value));
  }

  const handleShowAll = () => {
    dispatch(getVideogamesList());
  }

  return (
    <div className="container_filters">
      <div className="container_show_all">
        <button onClick={handleShowAll} className="show_all">Mostrar Todos</button>
      </div>
      <div className="title_block">
        <h1 className="title_list">
          Juegos
        </h1>
        <label>Busca por nombre: </label>
        <input type="text" onChange={handleChangeInputName} className="select_filter"/>
        <button type="submit" onClick={handleSubmit} className="filter_search_btn">
          Buscar
        </button>
      </div>
      <div>
        <select onChange={handleSortAlphabetic} className="input_filter" id="a-z">
          <option value="default">Ordena por alfabeto: </option>
          <option value="a-z">A-Z</option>
          <option value="z-a">Z-A</option>
        </select>

        <select onChange={handleExistOrCreate} className="select_filter" >
          <option value="default">Filtra por origen: </option> 
          <option value="existing">Existentes</option>
          <option value="created">Creados</option>
        </select>

        <select onChange={handleGenre} className="select_filter">
          <option>Filtra por género: </option>
          {genres.map((genre) =>(
            <option 
            key={genre.name}
            value={genre.name}>
              {genre.name}
            </option>
          ))}                  
        </select> 

        <select onChange={handleRating}  className="select_filter" >
          <option value="default">Ordena por rating: </option> 
          <option value="higher">Mayor a menor</option>
          <option value="minor">Menor a mayor</option>
        </select>
      </div>
    </div>
  );
}
  