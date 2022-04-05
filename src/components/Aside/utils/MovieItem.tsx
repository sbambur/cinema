import { FC } from "react";

import { imageBase } from "api/api";
import { MoviesItem, MoviePoster } from "components/Aside/styles";

interface MovieItemProps {
  title: string;
  poster?: string;
}

export const MovieItem: FC<MovieItemProps> = ({ poster, title }) => {
  return (
    <MoviesItem>
      <MoviePoster>
        {poster ? <img src={`${imageBase}${poster}`} alt={title} /> : null}
      </MoviePoster>
      <div>
        <p>{title}</p>
      </div>
    </MoviesItem>
  );
};
