import React from "react";
import Header from "./Header";
import Seat from "./utils/Seat";

const Hall = ({ date, seats, reserveSeat, openModal }) => {
  return (
    <div className="hallSide">
      <Header date={date} />
      <div className="cinema-hall">
        {seats.map((seat) => {
          return (
            <Seat
              key={seat.id}
              id={seat.id}
              seatNumber={seat.seatNumber}
              price={seat.price}
              reserved={seat.reserved}
              reserve={reserveSeat}
              openModal={openModal}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Hall;
