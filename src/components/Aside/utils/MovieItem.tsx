import { FC } from "react";

import { imageBase } from "api/api";

interface MovieItemProps {
  title: string;
  poster?: string;
}

export const MovieItem: FC<MovieItemProps> = ({ poster, title }) => {
  return (
    <div className="films_item">
      <div className="film_poster">
        {poster ? <img src={`${imageBase}${poster}`} alt={title} /> : null}
      </div>
      <div className="film_overview">
        <p>{title}</p>
      </div>
    </div>
  );
};
