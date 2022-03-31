import { FC } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper";

import { useTypedSelector } from "hooks/useTypedSelector";

import { MovieItem } from "components/Aside/utils/MovieItem";

import "swiper/css";
import "swiper/css/pagination";

export const MoviesList: FC = () => {
  const { halls } = useTypedSelector((state) => state.hallReducer);

  const listMovies = halls.filter(({ movie }) => Boolean(movie));

  if (!listMovies.length) return null;

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
          {halls.map((hall) => {
            if (!hall.movie) {
              return null;
            }
            return (
              <SwiperSlide key={hall.movie.id}>
                <MovieItem
                  title={hall.movie.title}
                  poster={hall.movie.poster_path}
                />
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </div>
  );
};
