import { FC, memo } from "react";
import { imageBase } from "../../api/api";
import { IMovie } from "../../types/hall";

interface MovieDescProps {
  currentMovie?: IMovie | null
}

const MovieDescription:FC<MovieDescProps> = ({ currentMovie }) => {
  if (!currentMovie) {
    return null;
  }

  return (
    <div className="films">
      <div className="films__header">Фильм</div>
      <div className="film_item">
        <div className="film_poster">
          <img
            src={`${imageBase}${currentMovie.poster_path}`}
            alt={currentMovie.title}
          />
        </div>
        <div className="film_overview">
          <p>{currentMovie.title}</p>
          <p>{currentMovie.overview}</p>
        </div>
      </div>
    </div>
  );
};

export const MemoMovieDescription = memo(MovieDescription);