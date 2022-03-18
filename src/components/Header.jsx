import React, { useEffect, useRef } from "react";

const Header = ({
  date,
  editName,
  debouncedOnChange,
  itemClickHandler,
  foundedMovies,
  isEdit,
  currentMovie,
}) => {
  const inputEl = useRef(null);

  useEffect(() => {
    if (isEdit) {
      inputEl?.current?.focus();
    }
  });

  return (
    <div className="cinema-name">
      <div className="cinema-name__header">
        Фильм&nbsp;
        {isEdit ? (
          <form className="search_form">
            <input
              type="text"
              placeholder={currentMovie.title}
              onChange={debouncedOnChange}
              className="cinema-name__input"
              maxLength={20}
              ref={inputEl}
            ></input>
            <ul className="autocomplete">
              {currentMovie.title && isEdit
                ? foundedMovies.map((movie) => {
                    return (
                      <li
                        key={movie.id}
                        className="autocomplete__item"
                        onClick={() => itemClickHandler(movie.id)}
                      >
                        {movie.title}
                        <span>
                          {movie.release_date
                            ? movie.release_date.substr(0, 4) + " г."
                            : null}
                        </span>
                      </li>
                    );
                  })
                : null}
            </ul>
          </form>
        ) : (
          <span>"{currentMovie.title}"</span>
        )}
        <button
          className={`cinema-name__edit_btn ${isEdit ? "active" : ""}`}
          onClick={editName}
        >
          {isEdit ? "Сохранить" : "Изменить"}
        </button>
      </div>
      <div className="cinema-name__date">{date}</div>
    </div>
  );
};

export default Header;
