import React from "react";

const Seat = ({
  reserved,
  seatNumber,
  price,
  reserve,id 
  }) => {

  return (
    <div 
      className={`seat ${reserved ? 'active' : ''}`}
      onClick={()=>reserve(id)}
    >
    {seatNumber}
    <p>{price}₽</p>
  </div>
  )
}

export default Seat;