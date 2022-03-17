import React from "react";
import Header from "./Header";
import Seat from "./utils/Seat";

const Hall = ({
  date,
  seats,
  reserveSeat,
  openModal,
  editName,
  debouncedOnChange,
  itemClickHandler,
  query,
  isEdit,
  currentMovie,
}) => {
  const getBackground = () => {
    if (currentMovie.backdrop_path) {
      return `linear-gradient(0deg, rgb(16 16 16 / 64%), rgb(11 11 11 / 89%)),center / cover no-repeat url(https://image.tmdb.org/t/p/original/${currentMovie.backdrop_path})`;
    }
    return "#353535";
  };

  return (
    <div
      className="hallSide"
      style={{ background: getBackground() }}
    >
      <Header
        date={date}
        editName={editName}
        debouncedOnChange={debouncedOnChange}
        itemClickHandler={itemClickHandler}
        query={query}
        isEdit={isEdit}
        currentMovie={currentMovie}
      />
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
