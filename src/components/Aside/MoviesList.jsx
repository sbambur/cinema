import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import { imageBase } from "../../api/api";

export const MoviesList = ({ halls }) => {
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
              return (
                <SwiperSlide key={hall.id}>
                  <div className="films_item">
                    <p>Нет описания</p>
                  </div>
                </SwiperSlide>
              );
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
          })}
        </Swiper>
      </div>
    </div>
  );
};
