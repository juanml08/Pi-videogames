import React, { useState, useEffect } from "react";
import "./detail.css";
import {  useDispatch, useSelector } from 'react-redux';
import { getDetail } from "../../redux/actions/index";
import arrowBack from "../../imgs/arrow-back.png";
import { NavLink } from "react-router-dom";
import imgNotFound from '../../imgs/interrogacion.png';


export default function Detail(props) {
  const videogameDetail = useSelector(state => state.videogameDetail);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  console.log('videogameDetail', videogameDetail);

  useEffect(async () => {
    await dispatch(getDetail(props.match.params.id));
    setLoading(false);
  }, []);
  
  return (
    <>
      <div className="container_detail">
        <NavLink to="/videogames" exact className="vgcreate_arrow_back">
          <img src={arrowBack} alt=""/>
        </NavLink> 
          {loading && <div className="detail_loading">
            <div>
              <h1 className="detail_message">CARGANDO...</h1>
            </div>
          </div>}
          {!videogameDetail && !loading && <div className="detail_error">
            <div>
              <h1 className="detail_message">VIDEO JUEGO NO ENCONTRADO</h1>
            </div>
          </div>
          }
          {videogameDetail && (
            <div className="container_detail_title">
              <h1 className="detail_title">Detalle Video Juego</h1>
            <div className="container_divs">
              <div className="container_detail_image">
                <h2 className="detail_videogame_title">{videogameDetail.name}</h2>
                <p className="detail_rating detail_general">
                  {
                  videogameDetail.rating
                  }
                  </p>
                <p className="detail_genres detail_general">
                  {
                    videogameDetail.genres
                  }
                  </p>
                <p className="detail_platforms detail_general">
                  {
                    videogameDetail.platforms
                  }
                  </p> 
                <img 
                  className="detail_img" 
                  src={videogameDetail.background_image ? videogameDetail.background_image : imgNotFound} 
                  alt="" 
                />
              </div>
              <div className="container_detail_description">
                <h2>Descripción</h2>
               <div dangerouslySetInnerHTML = {{__html: videogameDetail.description}}/> 
              </div>
            </div>
          </div>
          )
          }
      </div>
    </>
  )
};
