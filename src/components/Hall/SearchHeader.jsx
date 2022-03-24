import debounce from "lodash.debounce";
import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { API } from "../../api/api";
import { api_key } from "../../config";

const SearchHeader = ({ currentHall }) => {
  const dispatch = useDispatch();

  const [isEdit, setIsEdit] = useState(false);
  const [foundedMovies, setFoundedMovies] = useState([]);
  const inputEl = useRef(null);

  useEffect(() => {
    if (isEdit) {
      inputEl?.current?.focus();
    }
  });

  const setCurrentHallMovie = (event) => {
    API.get(`search/movie`, {
      params: {
        api_key,
        query: event.target.value,
        language: "ru-RU",
      },
    })
      .then((response) => setFoundedMovies(response.data.results))
      .catch((err) =>
        setFoundedMovies([{ title: "Попробуйте иначе", id: 100002 }])
      );
  };

  const debouncedOnChange = debounce(setCurrentHallMovie, 400);

  const itemClickHandler = (key) => {
    let updatedHall = {
      ...currentHall,
      movie: foundedMovies.find((movie) => movie.id === key),
    };
    dispatch({ type: "EDIT_HALL", payload: updatedHall });
    setIsEdit(!isEdit);
  };

  return (
    <div className="cinema-name">
      <div className="cinema-name__header">
        Фильм&nbsp;
        {isEdit ? (
          <form className="search_form">
            <input
              type="text"
              onChange={debouncedOnChange}
              className="cinema-name__input"
              maxLength={20}
              ref={inputEl}
            ></input>

            <ul className="autocomplete">
              {isEdit
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
                            ? `${movie.release_date.substr(0, 4)}г.`
                            : null}
                        </span>
                      </li>
                    );
                  })
                : null}
            </ul>
          </form>
        ) : (
          <span>
            "{!currentHall.movie ? "Введите название" : currentHall.movie.title}
            "
          </span>
        )}
        <button
          className={`cinema-name__edit_btn ${isEdit ? "active" : ""}`}
          onClick={() => setIsEdit(!isEdit)}
        >
          {isEdit ? "Сохранить" : "Изменить"}
        </button>
      </div>
    </div>
  );
};

export default SearchHeader;
