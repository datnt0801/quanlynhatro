import React from "react";
import "./card.css";

function Card(props) {
  return (
    <div className="card">
      <p>Số phòng: {props.nha.sophong}</p>
      <p>Giá phòng: {props.nha.giaphong}</p>
      <p>Số người tối đa: {props.nha.songuoimax}</p>
    </div>
  );
}

export default Card;
