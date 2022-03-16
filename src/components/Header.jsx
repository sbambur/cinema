import React, { useState } from "react";

const Header = ({ date }) => {
  const [cinemaName, setCinemaName] = useState({
    name: "Название фильма",
    edit: false,
  });

  const editName = () => {
    setCinemaName( { ...cinemaName, edit: !cinemaName.edit } );
  };

  const currentName = (event) => {
    setCinemaName((prev) => ({ ...prev, name: event.target.value }));
  };

  return (
    <div className="cinema-name">
      <div className="cinema-name__header">
        Фильм&nbsp;
        {cinemaName.edit ? (
          <input
            type="text"
            value={cinemaName.name}
            onChange={currentName}
            className="cinema-name__input"
            maxLength={20}
          ></input>
        ) : (
          <span>"{cinemaName.name}"</span>
        )}
        <button className={`cinema-name__edit_btn ${cinemaName.edit  ? 'active' : ''}`} onClick={editName}>
          {cinemaName.edit ? "Сохранить" : "Изменить"}
        </button>
      </div>
      <div className="cinema-name__date">{date}</div>
    </div>
  );
};

export default Header;