import React from "react";
import  { useState, useEffect } from "react";
import "./videogameList.css";
import { useDispatch, useSelector } from 'react-redux';
import Filters from "../filters/Filters";
import { getVideogamesList } from "../../redux/actions/index";
import VideogameCard from "../videogameCard/VideogameCard";
import Paginated from "../paginated/Paginated";
import { NavLink } from "react-router-dom";


const cardsPerPage = 15;

export default function VideogameList(props) {
  const dispatch = useDispatch();

  const videogames = useSelector(state => state.videogames);
  const [cards, setCards] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    dispatch(getVideogamesList());
  }, []);

  useEffect(() => {
    if (videogames.length) {
      console.log('useE<ffect 1');
      let indexPage; // indice de videojuegos
      indexPage = (currentPage - 1) * cardsPerPage; 
      setCards([...videogames].splice(indexPage, cardsPerPage));
      console.log("indexPage", indexPage)
    }
  }, [videogames, currentPage]);


  const nextHandler = () => {
    const videogamesLength = videogames.length;
    const totalPages =  Math.ceil(videogamesLength / cardsPerPage );
    if(currentPage === totalPages) return;
    setCurrentPage(currentPage + 1);
  } 

  const backHandler = () => {
    if(currentPage === 1) return;
    setCurrentPage(currentPage - 1);

  }

  const handlePage = (event) => {
    setCurrentPage(Number(event.target.id));
    
  }

  return (
    <div className="container_list">
      <div className="title_btn">
        <h1 className="title_vglist">
          SHADOW GAMES
        </h1>
        <NavLink to="/videogamecreate" className="btn_create_vglist">Crea tu juego</NavLink> 
      </div>
      <div className="component_filters">
        <Filters
        current={setCurrentPage}
        />
      </div>
      
      <div className="container_vgcard_list_component">
        <div className="container_paginated_component">
          <Paginated 
            cards={videogames} 
            nextHandler={nextHandler} 
            backHandler={backHandler} 
            handlePage={handlePage}
          />
        </div>
        {!videogames.length && 'Cargando'}
        { 
           cards.length > 0 && cards.map((card) => (
            <NavLink to={`/videogamedetail/${card.id}`}>
              <VideogameCard 
                name={card.name} 
                rating={card.rating}
                img={card.background_image} 
                genres={card.genres} 
                key={card.id}

              />
            </NavLink>
          ))
        }
      </div>   
    </div>
  );
}
