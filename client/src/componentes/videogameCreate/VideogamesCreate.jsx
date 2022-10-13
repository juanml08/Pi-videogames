import React, { useState } from "react";
import "./videogameCreate.css"
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import arrowBack from "../../imgs/arrow-back.png";
import { postVideogame } from "../../redux/actions/index";


 const validate = (input) => {
  console.log(input)
  let errors = {};
  if (!input.name) {
    errors.name = "Nombre requerido";
  } else if (input.name.length > 20) {
    errors.name = "Maximo de caracteres permitidos";
  } if (!input.release_date) {
    errors.release_date = "Fecha requerida";
  } if (!input.description) {
    errors.description = "Descripción requerida";
  } if (!input.genres) {
    errors.description = "Generos requeridos";
  }  if (!input.rating) {
    errors.description = "Rating requerido";
  } else if (isNaN(input.rating)) {
    errors.rating = "Ingresar solo numeros";
  } if (!input.image) {
    errors.image = "Url requerida";
  } else {
    const pattern = new RegExp('^(https?:\\/\\/)?'+ 
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ 
    '((\\d{1,3}\\.){3}\\d{1,3}))'+
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ 
    '(\\?[;&a-z\\d%_.~+=-]*)?'+ 
    '(\\#[-a-z\\d_]*)?$','i');
    if (!pattern.test(input.image)) {
      errors.image = "Ingrese una URl valida";
    }
  }
  return errors;
} 


export default function VideogamesCreate() {
  const dispatch = useDispatch();
  const genres = useSelector ((state) => state.genres);
  console.log('genres del state', genres);
  const platforms = useSelector((state) => state.platforms);
  const [errors, setErrors] = useState({});


  const [input, setInput] = useState({
    name:"",
    description:"",
    platforms:[],
    genres:[],
    image:"",
    rating:"",
    release_date:"",
  }) 


  function handleChange(e) {
    const newInputState = {
      ...input,
      [e.target.name] : e.target.value
    };
    setInput(newInputState)
    setErrors(validate(newInputState));
  }

  const handleSelectGenres  = (e) => {
    if (e.target.value !== 'Selecciona...' && !input.genres.includes(e.target.value)) {
      setInput({
        ...input,
        genres: [...input.genres, e.target.value]
      });
    }
  }
  
  const handleSelectPlatforms  = (e) => {
    if (e.target.value !== 'Selecciona...' && !input.platforms.includes(e.target.value)) {
      setInput({
        ...input,
        platforms: [...input.platforms, e.target.value]
      });
    }
  }

  const handleDeleteGenres = (value) => {
    setInput({
      ...input,
      genres: input.genres.filter(genre => genre !== value)
    });
  }

  const handleDeletePlatform = (value) => {
    setInput({
      ...input,
      platforms: input.platforms.filter(platform => platform !== value)
    });
  }

  const handleSubmit =(e) => {
    e.preventDefault();
    const errorsFields = validate(input);
    setErrors(errorsFields);
    if(!Object.keys(errorsFields).length) {
      dispatch(postVideogame(input));
      setInput({
        name:"",
        description:"",
        platforms:[],
        genres:[],
        image:"",
        rating:"",
        release_date:"",
        likes: ""
      })
      alert("Video juego creado con exito!!!");
    } else {
      alert('Por favor complete todos los campos');
    }
  }

  return (
    <div className="vgcreate_img">
      <NavLink to="/videogames" exact className="vgcreate_arrow_back">
        <img src={arrowBack} alt={arrowBack} />
      </NavLink>
      <form onSubmit={handleSubmit}>
        <div className="container_vgcreate_title">
          <h1 className="vgcreate_title">SHADOW GAMES</h1>
        </div>
        <div className="container_vgcreate">
          <div className="container_vgcreate_elements">
            <div className="container_img_url">
              <h2 id="vg_visual">Crea tu Juego</h2>
              <div className="container_prev_img">
                {input.image && <img  className="created_img" src={input.image} alt="" />}
              </div>
              <div>
                <label className="vgcreat_label_url"> likes </label>
                <input className="vgcreate_select_filter" />
              </div>
              <div className="container_vgcreate_label_url">
                <label className="vgcreat_label_url"> URL Imagen: </label>
                <input className="vgcreate_select_filter" 
                type="text" 
                value={input.image}
                name="image"
                onChange={handleChange}
                />
                {errors.image && (
                  <p className="error">{errors.image}</p>
                )}
              </div>
            </div>
              <div className="vgcreate_inputs">
                <label>Nombre: </label>
                <input className="vgcreate_select_filter" 
                type="text"
                value= {input.name}
                name="name"
                onChange={handleChange}

                />
                {errors.name && (
                  <p className="error">{errors.name}</p>
                )}

                <label>Fecha de lanzamiento: </label>
                <input className="vgcreate_select_filter" 
                  type="date"
                  value= {input.release_date}
                  name="release_date"
                  onChange={handleChange}
                />
                {errors.release_date && (
                  <p className="error">{errors.release_date}</p>
                )}

                <label>Descripción: </label>
                <textarea 
                  className="vgcreate_select_filter" 
                  type="text"
                  value= {input.description}
                  name="description"
                  onChange={handleChange}
                />
                {errors.description && (
                  <p className="error">{errors.description}</p>
                )}

                <label>Rating: </label>
                <input 
                  className="vgcreate_select_filter" 
                  type="text"
                  value= {input.rating}
                  name="rating"
                  onChange={handleChange}
                />
                {errors.rating && (
                  <p className="error">{errors.rating}</p>
                )}
                <div className="vgcreate_container_label">
                  <label>Géneros: </label>
                  <label className="vgcreate_platform">Plataformas: </label>
                </div>
                <div className="vgcreate_genre_platform">
                  <select
                    name="genres" 
                    className="vgcreate_select_filter select" 
                    onChange={handleSelectGenres}
                  >
                    <option>Selecciona...</option>
                    {genres.map((genre) =>(
                      <option value={genre.name}>
                        {genre.name}
                      </option>
                    ))}          
                  </select>
                
                  <select
                    name="platforms" 
                    className="vgcreate_select_filter select" 
                    onChange={handleSelectPlatforms}
                  >
                    <option>Selecciona...</option>
                    {platforms.map((platform) => (
                      <option value={platform.name}>
                        {platform.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="container_vgcreate_ul">
                  <ul>
                    {input.genres.map(genre => 
                      <li key={genre}>
                        {genre} 
                        <button 
                          className="vgcreate_btn_genres_delete" 
                          onClick={()=> handleDeleteGenres(genre)}
                        >
                          x
                        </button>
                      </li>
                    )}
                  </ul>
                  <ul className="vgcreate_ul">
                      {input.platforms.map(platform => 
                        <li key={platform}>
                          {platform} 
                          <button 
                            className="vgcreate_btn_genres_delete"
                            onClick={()=> handleDeletePlatform(platform)}
                            >
                              x
                          </button>
                        </li>
                      )}
                      
                  </ul>
                </div>
              </div>             
          </div>
          <div className="container_btn_create">
            <input type="submit" className="btn btn_create" value="Crear"/> 
          </div>  
        </div>
      </form>
    </div>
  );
}
