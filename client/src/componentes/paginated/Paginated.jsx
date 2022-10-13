import React from "react";
import "./paginated.css"




export default function Paginated(props) {
  const cardsNumber = props.cards.length;
  const cardsPerPage = 15;

  const pageCalcule = () => {
   const pageCalcule = Math.ceil(cardsNumber / cardsPerPage );
    return pageCalcule ;
  }

  const number = [];
  const pageNumber = pageCalcule();
  for (let i = 1; i <= pageNumber; i++) {
    number.push(i)
  }

  return (
    <div className="container_paginated_btn">
      <button onClick={props.backHandler} className="paginated_btn">{"<"}</button>
      {
        number.map((number, index) => {
          return <button
            onClick={props.handlePage} 
            className={`${props.current === number ? "on" : "paginated_btn" }`}
            key={index} 
            id={number}
          >
            {number}
          </button>
        })
      }
      <button onClick={props.nextHandler} className="paginated_btn">{">"}</button>
    </div>
  );
}
