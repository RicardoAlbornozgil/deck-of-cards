import React from "react";
import './Card.css';

function Card({ image, style }) {
    return <img src={image} alt="card" className="Card" style={style} />;
}

export default Card;
