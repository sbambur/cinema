import React from "react";

const Seat = props => {
  return (
    <div className="seat">
    {props.seatNumber}
    <p>{props.price}₽</p>
  </div>
  )
}

export default Seat;