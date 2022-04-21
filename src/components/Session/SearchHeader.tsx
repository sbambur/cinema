import { FC, useEffect, useRef, useState } from "react";
import debounce from "lodash.debounce";

import { ISession, IMovie } from "types/session";

import { API } from "api/api";
import { api_key } from "config";
import { useActions } from "hooks/useActions";

import * as S from "components/Session/styles/searchHeader";
import axios from "axios";

interface SearchHeaderProps {
  currentSession: ISession;
}

const SearchHeader: FC<SearchHeaderProps> = ({ currentSession }) => {
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
    if (currentSession.movie) {
      setCurrentMovie(currentSession.movie.title);
    } else {
      setCurrentMovie("");
    }
  }, [currentSession]);

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

  const itemClickHandler = async (key: number) => {
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/${key}?api_key=9113d8d7a27ece3272cc84a40839bea3&language=ru-RU`
    );

    setCurrentMovie(response.data.title);
    setMovie(currentSession, response.data);
    setIsEdit(!isEdit);
  };

  return (
    <S.CinemaHeader>
      Фильм&nbsp;
      {isEdit ? (
        <S.SearchForm>
          <S.SearchInput
            type="text"
            onChange={setCurrentHallMovie}
            value={currentMovie}
            maxLength={20}
            ref={inputEl}
          ></S.SearchInput>

          <S.AutocompleteList>
            {isEdit
              ? foundedMovies.map((movie: IMovie) => {
                  return (
                    <li
                      key={movie.id}
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
          </S.AutocompleteList>
        </S.SearchForm>
      ) : (
        <span>
          "
          {!currentSession.movie
            ? "Введите название"
            : currentSession.movie.title}
          "
        </span>
      )}
      <S.ToggleButton $edit={isEdit} onClick={() => setIsEdit(!isEdit)}>
        {isEdit ? "Сохранить" : "Изменить"}
      </S.ToggleButton>
    </S.CinemaHeader>
  );
};

export default SearchHeader;