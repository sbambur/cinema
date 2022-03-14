import React from "react";
import Seat from "./Seat";
import seats from "../sample-hall";

const Hall = (props) => {
  return (
    <div className="hallSide">
      <div className="cinema-name">
        <div className="cinema-name__header">
          Фильм <span>"{props.title}"</span>
        </div>
        <div className="cinema-name__date">{props.date}</div>
      </div>
      <div className="cinema-hall">
        {seats.map((seat) => {
          return (
            <Seat
              key={seat.id}
              seatNumber={seat.seatNumber}
              price={seat.price}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Hall;
