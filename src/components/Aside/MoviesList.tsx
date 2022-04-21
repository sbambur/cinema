import { FC } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper";

import { useTypedSelector } from "hooks/useTypedSelector";

import { MovieItem } from "components/Aside/utils/MovieItem";

import "swiper/css";
import "swiper/css/pagination";
import { SideHeader, MoviesListSlider } from "components/Aside/styles";

export const MoviesList: FC = () => {
  const { sessions } = useTypedSelector((state) => state.sessionReducer);

  const listMovies = sessions.filter(({ movie }) => Boolean(movie));

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
          {sessions.map((session) => {
            if (!session.movie) {
              return null;
            }
            return (
              <SwiperSlide key={session.movie.id}>
                <MovieItem
                  title={session.movie.title}
                  poster={session.movie.poster_path}
                />
              </SwiperSlide>
            );
          })}
        </Swiper>
      </MoviesListSlider>
    </div>
  );
};
