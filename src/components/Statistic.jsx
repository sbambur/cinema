import React, { useEffect, useState } from "react";

const Statistic = ({ seats, currentMovie }) => {
  const [stat, setStat] = useState({});

  const getStat = () => {
    let total = seats.length;
    let free = seats.filter((seat) => !seat.reserved).length;
    let reserved = total - free;
    let sum = seats.reduce((acc, seat) => {
      if (seat.reserved) {
        acc += seat.price;
      }
      return acc;
    }, 0);

    return { total, free, reserved, sum };
  };

  useEffect(() => {
    let stat = getStat();
    setStat(stat);
  }, [seats]);

  return (
    <div className="infoSide">
      <div className="infoSide__header">Информация</div>
      <div className="infoSide__info">
        <p>
          Всего мест: <span>{stat.total}</span>
        </p>
        <p>
          Свободно: <span>{stat.free}</span>
        </p>
        <p>
          Куплено: <span>{stat.reserved}</span>
        </p>
        <p>
          Выручка: <span>{stat.sum}</span>₽
        </p>
      </div>
      {currentMovie.poster_path ? (
        <div className="infoSide__poster">
          <img
            src={`https://image.tmdb.org/t/p/original/${currentMovie.poster_path}`}
            alt={currentMovie.title}
          />
        </div>
      ) : null}
      {currentMovie.release_date || currentMovie.overview ? (
        <div className="infoSide__description">
          <p>Дата выхода: {currentMovie.release_date.substr(0, 4)} г.</p>
          <br />
          <p>{currentMovie.overview}</p>
        </div>
      ) : null}
    </div>
  );
};

export default Statistic;
