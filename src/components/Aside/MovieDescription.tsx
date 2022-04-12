import { FC, memo } from "react";

import { imageBase } from "api/api";

import { IMovie } from "types/hall";

import { SideHeader, MovieItem, MoviePoster } from "components/Aside/styles";

interface MovieDescriptionProps {
  currentMovie?: IMovie | null;
}

const MovieDescription: FC<MovieDescriptionProps> = ({ currentMovie }) => {
  if (!currentMovie) return null;

  return (
    <div className="films">
      <SideHeader>Фильм</SideHeader>
      <MovieItem>
        <MoviePoster>
          <img
            src={`${imageBase}${currentMovie.poster_path}`}
            alt={currentMovie.title}
          />
        </MoviePoster>
        <div>
          <p>{currentMovie.title}</p>
          <p>{currentMovie.overview}</p>
        </div>
      </MovieItem>
    </div>
  );
};

export const MemoizedMovieDescription = memo(MovieDescription);
