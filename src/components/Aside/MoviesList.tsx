import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import { imageBase } from "../../api/api";
import { memo } from "react";
import { FC } from "react";
import { IHall } from "../../types/hall";

interface MoviesListProps {
  halls: IHall[]
}

const MoviesList: FC<MoviesListProps> = ({ halls }) => {
  const moviesItems = halls.map((hall) => {
    if (!hall.movie) {
      return null;
    }

    return (
      <SwiperSlide key={hall.movie.id}>
        <div className="films_item">
          <div className="film_poster">
            <img
              src={`${imageBase}${hall.movie.poster_path}`}
              alt={hall.movie.title}
            />
          </div>
          <div className="film_overview">
            <p>{hall.movie.title}</p>
          </div>
        </div>
      </SwiperSlide>
    );
  });

  const isFilms = moviesItems.find(movie => movie !== null) ? false : true;

  if (halls.length === 0 || moviesItems.length === 0 || isFilms) {        
    return null;
  }
  
  return (
    <div className="films">
      <div className="films__header">Фильмы</div>
      <div className="films__list">
        <Swiper
          modules={[Pagination]}
          spaceBetween={50}
          slidesPerView={1}
          pagination={{ clickable: true }}
        >
          {moviesItems}
        </Swiper>
      </div>
    </div>
  );
};

export const MemoMoviesList = memo(MoviesList);
