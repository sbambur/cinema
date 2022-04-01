import { FC } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper";

import { useTypedSelector } from "hooks/useTypedSelector";

import { MovieItem } from "components/Aside/utils/MovieItem";

import "swiper/css";
import "swiper/css/pagination";
import { SideHeader, MoviesListSlider } from "components/Aside/styles";

export const MoviesList: FC = () => {
  const { halls } = useTypedSelector((state) => state.hallReducer);

  const listMovies = halls.filter(({ movie }) => Boolean(movie));

  if (!listMovies.length) return null;

  return (
    <div>
      <SideHeader>Фильмы</SideHeader>
      <MoviesListSlider>
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
      </MoviesListSlider>
    </div>
  );
};
