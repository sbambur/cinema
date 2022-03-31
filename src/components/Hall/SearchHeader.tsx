import { FC, useEffect, useRef, useState } from "react";
import debounce from "lodash.debounce";

import { IHall, IMovie } from "types/hall";

import { API } from "api/api";
import { api_key } from "config";
import { useActions } from "hooks/useActions";

interface SearchHeaderProps {
  currentHall: IHall;
}

const SearchHeader: FC<SearchHeaderProps> = ({ currentHall }) => {
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [currentMovie, setCurrentMovie] = useState<string>("");
  const [foundedMovies, setFoundedMovies] = useState<IMovie[]>([]);
  const inputEl = useRef<HTMLInputElement>(null);
  const { setMovie } = useActions();

  useEffect(() => {
    if (inputEl) {
      inputEl?.current?.focus();
    }
  });

  useEffect(() => {
    if (currentHall.movie) {
      setCurrentMovie(currentHall.movie.title);
    } else {
      setCurrentMovie("");
    }
  }, [currentHall]);

  const requestMovies = () => {
    API.get(`search/movie`, {
      params: {
        api_key,
        query: currentMovie,
        language: "ru-RU",
      },
    })
      .then((response) => setFoundedMovies(response.data.results))
      .catch((err) =>
        setFoundedMovies([{ title: "Попробуйте иначе", id: 100002 }])
      );
  };

  const debouncedOnChange = debounce(requestMovies, 400);

  const setCurrentHallMovie = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentMovie(e.target.value);
    debouncedOnChange();
  };

  const itemClickHandler = (key: number) => {
    const movie: any = foundedMovies.find((movie: IMovie) => movie.id === key);

    setCurrentMovie(movie.title);
    setMovie(currentHall, movie);
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
              onChange={setCurrentHallMovie}
              className="cinema-name__input"
              value={currentMovie}
              maxLength={20}
              ref={inputEl}
            ></input>

            <ul className="autocomplete">
              {isEdit
                ? foundedMovies.map((movie: IMovie) => {
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
