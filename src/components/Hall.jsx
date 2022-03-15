import React from "react";
import Seat from "./utils/Seat";

const Hall = ({title, date, seats, reserveSeat }) => {

  return (
    <div className="hallSide">
      <div className="cinema-name">
        <div className="cinema-name__header" >
          Фильм <span>"{title}"</span>
        </div>
        <div className="cinema-name__date">{date}</div>
      </div>
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
            />
          );
        })}
      </div>
    </div>
  );
};

export default Hall;
