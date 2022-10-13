import React from "react";
import "./home.css";
import IMG from "../../imgs/Octane-Radioactive-1.png";
import { NavLink } from "react-router-dom";



export default function Home() {
    return (
       <div className="home">
        <div className="container">
          <p className="paragraph">Bienvenidos a</p>
          <h1 className="home_title">SHADOW GAMES</h1>
        </div>
        <div className="container_btn">
          <NavLink to="/videogames" className="btn btn_home">Entrar</NavLink>
        </div>
        <img id="octane" src={IMG} alt="img_octane"/>
      </div>
    );  
}
