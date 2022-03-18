import React from "react";

const HallCard = ({ title, movie}) => {
  return (
    <div className="hall_list__item">
      <div className="hall_item">
        <p>Зал: <span>{title}</span></p>
        <p>Фильм: <span>{movie}</span></p>
      </div>
  </div>
  )
}

export default HallCard;