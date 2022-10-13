import React from "react";
import "./videogameCard.css";
import imgNotFound from '../../imgs/interrogacion.png';

export default function VideogameCard (props) {
  const genres = props.genres.join(' - ');
  return (
    <div className="container_vgcard">
      <p>
        {props.likes}
      </p>
      <p className="vcard_rating">{props.rating}</p>
      <img className="img_vgcard" src={props.img ? props.img : imgNotFound} alt={props.name} />
      <div className="vgcard_genres_title">
        <div className="vgcard_genres">
          <p title={genres}> {genres} </p> 
        </div>
        <h3 className="vgcard_title">{props.name}</h3>
      </div>
    </div>
  );
}


