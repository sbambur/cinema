import React from "react";

const Seat = ({ reserved, seatNumber, price, reserve, id, openModal }) => {
  return (
    <div
      className={`seat ${reserved ? "active" : ""}`}
      onClick={() => reserve(id)}
    >
      {seatNumber}
      <p>{price}₽</p>
      <button className="edit_seat_button" onClick={(e) => openModal(e, id)}>
        Edit
      </button>
    </div>
  );
};

export default Seat;